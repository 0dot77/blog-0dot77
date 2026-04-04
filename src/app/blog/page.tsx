"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/blog";

interface PostMeta {
  slug: string;
  lang: Lang;
  title: string;
  date: string;
  description: string;
}

export default function BlogPage() {
  const [lang, setLang] = useState<Lang>("ko");
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);

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
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${lang}/${post.slug}`} className="group block">
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
          target="popupwindow"
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
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
