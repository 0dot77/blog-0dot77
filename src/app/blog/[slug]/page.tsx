import Link from "next/link";
import Image from "next/image";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.summary || undefined,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const allPosts = getBlogPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-205 mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="font-(family-name:--font-mono) text-sm text-text-secondary mb-8">
          <Link href="/blog" className="hover:text-accent transition-colors">
            Blog
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-text">{post.title}</span>
        </nav>

        {/* Post Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-text mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <time className="font-(family-name:--font-mono) text-sm text-text-secondary">
              {post.date}
            </time>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`} className="tag-pill">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full aspect-video mb-10 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-border flex justify-between">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="font-(family-name:--font-mono) text-sm text-text-secondary hover:text-accent transition-colors"
            >
              &larr; {prevPost.title}
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="font-(family-name:--font-mono) text-sm text-text-secondary hover:text-accent transition-colors text-right"
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
