import { NextRequest, NextResponse } from "next/server";
import matter from "gray-matter";
import { verifyAuth } from "@/lib/auth";
import { buildMarkdown } from "@/lib/blog";
import { createOrUpdateFile, deleteFile, getFileContent } from "@/lib/github";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const lang = req.nextUrl.searchParams.get("lang") ?? "ko";
  const raw = await getFileContent(`content/blog/${lang}/${slug}.md`);
  if (!raw) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { data, content } = matter(raw);
  return NextResponse.json({
    slug,
    lang,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    content,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const { lang = "ko", frontmatter, content } = await req.json();

  const md = buildMarkdown(frontmatter, content);

  await createOrUpdateFile(
    `content/blog/${lang}/${slug}.md`,
    md,
    `blog: update ${lang}/${slug}`,
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const lang = _req.nextUrl.searchParams.get("lang") ?? "ko";
  await deleteFile(`content/blog/${lang}/${slug}.md`, `blog: delete ${lang}/${slug}`);
  return NextResponse.json({ ok: true });
}
