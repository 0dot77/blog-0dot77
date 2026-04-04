import { getAllPosts, type Lang } from "@/lib/blog";

const VALID_LANGS = new Set(["ko", "en"]);

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  if (!VALID_LANGS.has(lang)) {
    return new Response("Not found", { status: 404 });
  }

  const posts = getAllPosts(lang as Lang);
  const siteUrl = "https://0dot77.com";

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${lang}/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${lang}/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>0dot77 Blog${lang === "en" ? " (EN)" : ""}</title>
    <link>${siteUrl}/blog</link>
    <description>Taeyang Yoo — Media Artist, Developer, Technical Director</description>
    <language>${lang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed/${lang}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
