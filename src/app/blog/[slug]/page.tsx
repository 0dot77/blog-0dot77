import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — 0dot77`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-32">
      <header className="mb-12">
        <Link
          href="/blog"
          className="font-(family-name:--font-mono) text-xs text-text-secondary hover:text-teal transition-colors"
        >
          &larr; Blog
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-text mt-6 mb-3">
          {post.title}
        </h1>
        <time className="font-(family-name:--font-mono) text-xs text-border">
          {post.date}
        </time>
      </header>

      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </div>
  );
}
