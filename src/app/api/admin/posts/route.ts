import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";
import { verifyAuth } from "@/lib/auth";
import { buildMarkdown } from "@/lib/blog";
import { createOrUpdateFile, listFiles, getFileContent } from "@/lib/github";

export async function GET() {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const files = await listFiles("content/blog");
  const mdFiles = files.filter((f) => f.name.endsWith(".md"));

  const posts = await Promise.all(
    mdFiles.map(async (f) => {
      const raw = await getFileContent(f.path);
      const slug = f.name.replace(/\.md$/, "");
      if (!raw) return { slug, title: slug, date: "", description: "" };
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        description: data.description ?? "",
      };
    }),
  );

  posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, frontmatter, content } = await req.json();

  if (!slug || !content) {
    return NextResponse.json({ error: "slug and content are required" }, { status: 400 });
  }

  const md = buildMarkdown(frontmatter, content);

  await createOrUpdateFile(
    `content/blog/${slug}.md`,
    md,
    `blog: add ${slug}`,
  );

  return NextResponse.json({ ok: true, slug });
}
