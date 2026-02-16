import Link from "next/link";
import Image from "next/image";
import { getLabPosts, getSprintPosts, getBlogPosts, getAllTags } from "@/lib/content";
import type { PostMeta } from "@/lib/content";

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  return { title: `#${tag}` };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const labPosts = getLabPosts().filter((p) => p.tags.includes(decodedTag));
  const sprintPosts = getSprintPosts().filter((p) => p.tags.includes(decodedTag));
  const blogPosts = getBlogPosts().filter((p) => p.tags.includes(decodedTag));

  const renderPostCard = (post: PostMeta, type: string) => (
    <Link key={`${type}-${post.slug}`} href={`/${type}/${post.slug}`} className="group">
      <div className="bg-surface border border-border overflow-hidden transition-all group-hover:border-accent/50">
        {post.coverImage && (
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-4">
          <span className="font-(family-name:--font-mono) text-[10px] text-accent uppercase mb-1 block">
            {type}
          </span>
          <h3 className="text-base font-semibold text-text mb-1">{post.title}</h3>
          <span className="font-(family-name:--font-mono) text-xs text-text-secondary">
            {post.date}
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="mb-10">
          <h1 className="font-(family-name:--font-mono) text-4xl font-bold text-text mb-2">
            # {decodedTag}
          </h1>
          <p className="font-(family-name:--font-mono) text-sm text-text-secondary">
            {labPosts.length + sprintPosts.length + blogPosts.length} posts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((p) => renderPostCard(p, "blog"))}
          {sprintPosts.map((p) => renderPostCard(p, "sprint"))}
          {labPosts.map((p) => renderPostCard(p, "lab"))}
        </div>
      </div>
    </div>
  );
}
