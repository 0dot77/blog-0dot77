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

  if (!title || !url) {
    return NextResponse.json(
      { error: "title and url are required" },
      { status: 400 },
    );
  }

  // Auto-fetch OG metadata if fields are empty
  if (!thumbnail || !title || title === url) {
    const og = await fetchOgMeta(url);
    if (!thumbnail && og.image) thumbnail = og.image;
    if ((!title || title === url) && og.title) title = og.title;
  }

  const item = await addItem({
    title: title || url,
    url,
    description: description ?? "",
    tags: Array.isArray(tags) ? tags : [],
    thumbnail: thumbnail || undefined,
  });

  return NextResponse.json(item, { status: 201 });
}
