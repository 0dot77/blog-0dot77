import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";
import { verifyAuth } from "@/lib/auth";
import { buildMarkdown } from "@/lib/blog";
import { createOrUpdateFile, listFiles, getFileContent } from "@/lib/github";

export async function GET(req: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lang = req.nextUrl.searchParams.get("lang");
  const langs = lang ? [lang] : ["ko", "en"];

  const allPosts: { slug: string; lang: string; title: string; date: string; description: string }[] = [];

  for (const l of langs) {
    const files = await listFiles(`content/blog/${l}`);
    const mdFiles = files.filter((f) => f.name.endsWith(".md"));

    const posts = await Promise.all(
      mdFiles.map(async (f) => {
        const raw = await getFileContent(f.path);
        const slug = f.name.replace(/\.md$/, "");
        if (!raw) return { slug, lang: l, title: slug, date: "", description: "" };
        const { data } = matter(raw);
        return {
          slug,
          lang: l,
          title: data.title ?? slug,
          date: data.date ?? "",
          description: data.description ?? "",
        };
      }),
    );

    allPosts.push(...posts);
  }

  allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return NextResponse.json(allPosts);
}

export async function POST(req: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, lang = "ko", frontmatter, content } = await req.json();

  if (!slug || !content) {
    return NextResponse.json({ error: "slug and content are required" }, { status: 400 });
  }

  const md = buildMarkdown(frontmatter, content);

  await createOrUpdateFile(
    `content/blog/${lang}/${slug}.md`,
    md,
    `blog: add ${lang}/${slug}`,
  );

  return NextResponse.json({ ok: true, slug });
}
