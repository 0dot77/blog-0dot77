import Link from "next/link";
import Image from "next/image";
import { getLabPosts, getBlogPosts } from "@/lib/content";
import HeroGrid from "@/components/HeroGrid";

export default function Home() {
  const labPosts = getLabPosts().slice(0, 9);
  const blogPosts = getBlogPosts().slice(0, 5);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-bg" />
        <HeroGrid />
        <div className="relative z-10 text-center px-6">
          <h1 className="font-[family-name:var(--font-mono)] text-5xl md:text-7xl font-bold text-text mb-4">
            Taeyang Yoo
          </h1>
          <p className="font-[family-name:var(--font-mono)] text-base md:text-lg text-accent">
            Media Artist &middot; Developer &middot; Technical Director
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 bg-border animate-pulse" />
        </div>
      </section>

      {/* Recent Blog Posts */}
      {blogPosts.length > 0 && (
        <section className="max-w-[820px] mx-auto px-6 md:px-12 py-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-[family-name:var(--font-mono)] text-sm text-accent">
              // recent_posts
            </h2>
            <Link
              href="/blog"
              className="font-[family-name:var(--font-mono)] text-sm text-text-secondary hover:text-accent transition-colors"
            >
              $ view all &rarr;
            </Link>
          </div>
          <div className="flex flex-col">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="py-6 border-b border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <time className="font-[family-name:var(--font-mono)] text-xs text-text-secondary">
                      {post.date}
                    </time>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="font-[family-name:var(--font-mono)] text-[10px] text-accent"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-text group-hover:text-accent transition-colors mb-1">
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {post.summary}
                    </p>
                  )}
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Latest Lab */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-[family-name:var(--font-mono)] text-sm text-accent">
            // from_the_lab
          </h2>
          <Link
            href="/lab"
            className="font-[family-name:var(--font-mono)] text-sm text-text-secondary hover:text-accent transition-colors"
          >
            $ view all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {labPosts.map((post) => (
            <Link key={post.slug} href={`/lab/${post.slug}`} className="group">
              <div className="aspect-square relative overflow-hidden bg-surface">
                {post.coverImage ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <p className="font-[family-name:var(--font-mono)] text-xs text-text-secondary text-center">
                      {post.title}
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-xs text-text font-medium">
                      {post.title}
                    </p>
                    <p className="font-[family-name:var(--font-mono)] text-[10px] text-text-secondary mt-1">
                      {post.date}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
