import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/content";

export const metadata = {
  title: "Blog",
  description: "생각, 시도, 그리고 기록",
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-205 mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-(family-name:--font-mono) text-4xl font-bold text-text mb-2">
            &gt; blog
          </h1>
          <p className="font-(family-name:--font-mono) text-sm text-text-secondary">
            생각, 시도, 그리고 기록
          </p>
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <Link href="/blog" className="tag-pill border-accent text-accent">
              All
            </Link>
            {allTags.map((tag) => (
              <Link key={tag} href={`/tags/${tag}`} className="tag-pill">
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Post List */}
        <div className="flex flex-col">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="py-8 border-b border-border flex gap-6 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <time className="font-(family-name:--font-mono) text-xs text-text-secondary shrink-0">
                      {post.date}
                    </time>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-(family-name:--font-mono) text-[10px] text-accent"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold text-text group-hover:text-accent transition-colors mb-2">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  )}
                </div>
                {post.coverImage && (
                  <div className="relative w-32 h-24 shrink-0 overflow-hidden hidden md:block">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </article>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-(family-name:--font-mono) text-lg text-text-secondary mb-2">
                아직 글이 없습니다
              </p>
              <p className="font-(family-name:--font-mono) text-sm text-text-secondary">
                곧 첫 번째 글이 올라올 예정입니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
