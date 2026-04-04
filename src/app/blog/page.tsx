import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-32">
      <header className="mb-16">
        <Link
          href="/"
          className="font-(family-name:--font-mono) text-xs text-text-secondary hover:text-teal transition-colors"
        >
          &larr; Home
        </Link>
        <h1 className="font-(family-name:--font-mono) text-2xl font-bold text-text mt-6">
          // blog
        </h1>
      </header>

      {posts.length === 0 ? (
        <p className="text-sm text-text-secondary">아직 글이 없습니다.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="text-base font-medium text-text group-hover:text-teal transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  {post.description}
                </p>
                <time className="font-(family-name:--font-mono) text-xs text-border mt-2 block">
                  {post.date}
                </time>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
