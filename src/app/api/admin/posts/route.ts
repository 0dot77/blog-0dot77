import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getAllPosts, buildMarkdown } from "@/lib/blog";
import { createOrUpdateFile } from "@/lib/github";

export async function GET() {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = getAllPosts();
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
