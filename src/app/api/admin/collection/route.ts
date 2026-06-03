import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getAllItems, addItem, fetchOgMeta } from "@/lib/collection";

export async function GET() {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await getAllItems();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  let { title, url, description, tags, thumbnail } = body;

  if (!url) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  // Auto-fetch OG metadata for empty fields
  const og = await fetchOgMeta(url);
  if (!title && og.title) title = og.title;
  if (!description && og.description) description = og.description;
  if (!thumbnail && og.image) thumbnail = og.image;

  const item = await addItem({
    title: title || url,
    url,
    description: description ?? "",
    tags: Array.isArray(tags) ? tags : [],
    thumbnail: thumbnail || undefined,
  });

  return NextResponse.json(item, { status: 201 });
}
