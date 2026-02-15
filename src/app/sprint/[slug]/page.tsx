import Link from "next/link";
import Image from "next/image";
import { getSprintPost, getSprintPosts } from "@/lib/content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getSprintPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getSprintPost(slug);
  if (!post) return { title: "Not Found" };
  return { title: post.title };
}

export default async function SprintPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getSprintPost(slug);
  if (!post) notFound();

  const allPosts = getSprintPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="font-[family-name:var(--font-mono)] text-sm text-text-secondary mb-8">
          <Link href="/sprint" className="hover:text-accent transition-colors">
            Sprint
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-text">{post.title}</span>
        </nav>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full aspect-video max-h-[60vh] mb-8 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Post Meta */}
        <div className="max-w-[720px] mx-auto mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap mb-4">
            <span className="font-[family-name:var(--font-mono)] text-sm text-text-secondary">
              {post.date}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`} className="tag-pill">
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          className="prose mx-auto"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Navigation */}
        <div className="max-w-[720px] mx-auto mt-16 pt-8 border-t border-border flex justify-between">
          {prevPost ? (
            <Link
              href={`/sprint/${prevPost.slug}`}
              className="font-[family-name:var(--font-mono)] text-sm text-text-secondary hover:text-accent transition-colors"
            >
              &larr; {prevPost.title}
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/sprint/${nextPost.slug}`}
              className="font-[family-name:var(--font-mono)] text-sm text-text-secondary hover:text-accent transition-colors"
            >
              {nextPost.title} &rarr;
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
