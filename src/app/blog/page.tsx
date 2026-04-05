"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/blog";

interface PostMeta {
  slug: string;
  lang: Lang;
  title: string;
  date: string;
  description: string;
}

interface YearGroup {
  year: string;
  posts: PostMeta[];
}

function groupByYear(posts: PostMeta[]): YearGroup[] {
  const map = new Map<string, PostMeta[]>();
  for (const post of posts) {
    const year = post.date.slice(0, 4) || "Unknown";
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(post);
  }
  return Array.from(map, ([year, posts]) => ({ year, posts }));
}

export default function BlogPage() {
  const [lang, setLang] = useState<Lang>("ko");
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const groups = useMemo(() => groupByYear(posts), [posts]);

  // 최신 연도만 펼치고 나머지는 접기
  useEffect(() => {
    if (groups.length > 1) {
      setCollapsed(new Set(groups.slice(1).map((g) => g.year)));
    } else {
      setCollapsed(new Set());
    }
  }, [groups]);

  const toggleYear = (year: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`/api/blog/posts?lang=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, [lang]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-32">
      <header className="mb-16">
        <Link
          href="/"
          className="font-(family-name:--font-mono) text-xs text-text-secondary hover:text-teal transition-colors"
        >
          &larr; Home
        </Link>
        <div className="flex items-center justify-between mt-6">
          <h1 className="font-(family-name:--font-mono) text-2xl font-bold text-text">
            // blog
          </h1>
          <div className="flex gap-1 font-(family-name:--font-mono) text-xs border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setLang("ko")}
              className={`px-3 py-1.5 transition-colors ${lang === "ko" ? "bg-teal/20 text-teal" : "text-text-secondary hover:text-text"}`}
            >
              KR
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-teal/20 text-teal" : "text-text-secondary hover:text-text"}`}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {loading ? (
        <p className="text-sm text-text-secondary">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-text-secondary">
          {lang === "ko" ? "아직 글이 없습니다." : "No posts yet."}
        </p>
      ) : (
        <div className="space-y-10">
          {groups.map((group) => {
            const isCollapsed = collapsed.has(group.year);
            return (
              <section key={group.year}>
                <button
                  onClick={() => toggleYear(group.year)}
                  className="flex items-center gap-2 font-(family-name:--font-mono) text-sm font-semibold text-text mb-4 hover:text-teal transition-colors"
                >
                  <span
                    className="text-text-secondary text-xs transition-transform duration-200"
                    style={{ transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)" }}
                  >
                    ▼
                  </span>
                  // {group.year}
                  <span className="text-xs text-text-secondary font-normal">
                    ({group.posts.length})
                  </span>
                </button>
                {!isCollapsed && (
                  <div className="space-y-6 ml-5">
                    {group.posts.map((post) => (
                      <article key={post.slug}>
                        <Link href={`/blog/${lang}/${post.slug}`} className="group block">
                          <div className="flex items-baseline gap-3">
                            <time className="font-(family-name:--font-mono) text-xs text-border shrink-0">
                              {post.date.slice(5, 7)}
                            </time>
                            <h2 className="text-base font-medium text-text group-hover:text-teal transition-colors">
                              {post.title}
                            </h2>
                          </div>
                          <p className="text-sm text-text-secondary mt-1 ml-9">
                            {post.description}
                          </p>
                        </Link>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}

      {/* Newsletter */}
      <section className="mt-20 pt-10 border-t border-border">
        <h2 className="font-(family-name:--font-mono) text-sm font-semibold text-text mb-2">
          // newsletter
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          {lang === "ko"
            ? "새 글이 올라오면 이메일로 알려드립니다."
            : "Get notified when new posts are published."}
        </p>
        <form
          action={`https://buttondown.com/api/emails/embed-subscribe/${process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME ?? "0dot77"}`}
          method="post"
          className="flex gap-2"
        >
          <input
            type="email"
            name="email"
            placeholder={lang === "ko" ? "이메일 주소" : "Email address"}
            required
            className="flex-1 bg-surface border border-border rounded-lg px-4 py-2 text-sm text-text placeholder:text-text-secondary focus:outline-none focus:border-teal"
          />
          <button
            type="submit"
            className="bg-teal/10 border border-teal/30 text-teal rounded-lg px-4 py-2 text-sm font-(family-name:--font-mono) hover:bg-teal/20 transition-colors"
          >
            {lang === "ko" ? "구독" : "Subscribe"}
          </button>
        </form>
      </section>
    </div>
  );
}
