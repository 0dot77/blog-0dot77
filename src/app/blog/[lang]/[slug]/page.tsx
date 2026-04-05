import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, type Lang } from "@/lib/blog";
import Giscus from "@/components/Giscus";

const LANGS: Lang[] = ["ko", "en"];

export function generateStaticParams() {
  return LANGS.flatMap((lang) =>
    getAllPosts(lang).map((post) => ({ lang, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPostBySlug(slug, lang as Lang);
  if (!post) return {};

  const otherLang = lang === "ko" ? "en" : "ko";

  return {
    title: `${post.title} — 0dot77`,
    description: post.description,
    alternates: {
      languages: {
        [lang]: `/blog/${lang}/${slug}`,
        [otherLang]: `/blog/${otherLang}/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      locale: lang === "ko" ? "ko_KR" : "en_US",
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!LANGS.includes(lang as Lang)) notFound();

  const post = await getPostBySlug(slug, lang as Lang);
  if (!post) notFound();

  const otherLang = lang === "ko" ? "en" : "ko";
  const otherPost = await getPostBySlug(slug, otherLang);

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 md:py-32">
      <header className="mb-12">
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="font-(family-name:--font-mono) text-xs text-text-secondary hover:text-teal transition-colors"
          >
            &larr; Blog
          </Link>
          {otherPost && (
            <Link
              href={`/blog/${otherLang}/${slug}`}
              className="font-(family-name:--font-mono) text-xs text-text-secondary hover:text-teal transition-colors border border-border rounded px-2 py-1"
            >
              {otherLang === "ko" ? "KR" : "EN"}
            </Link>
          )}
        </div>
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

      <section className="mt-20 pt-10 border-t border-border">
        <Giscus lang={lang as "ko" | "en"} />
      </section>
    </div>
  );
}
