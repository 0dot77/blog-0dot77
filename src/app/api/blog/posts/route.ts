import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, type Lang } from "@/lib/blog";

const VALID_LANGS = new Set(["ko", "en"]);

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang") ?? "ko";
  if (!VALID_LANGS.has(lang)) {
    return NextResponse.json({ error: "Invalid lang" }, { status: 400 });
  }
  const posts = getAllPosts(lang as Lang);
  return NextResponse.json(posts);
}
