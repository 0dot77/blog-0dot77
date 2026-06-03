import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { getAllItems, addItem } from "@/lib/collection";

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
  const { title, url, description, tags, thumbnail } = body;

  if (!title || !url) {
    return NextResponse.json(
      { error: "title and url are required" },
      { status: 400 },
    );
  }

  const item = await addItem({
    title,
    url,
    description: description ?? "",
    tags: Array.isArray(tags) ? tags : [],
    thumbnail: thumbnail || undefined,
  });

  return NextResponse.json(item, { status: 201 });
}
