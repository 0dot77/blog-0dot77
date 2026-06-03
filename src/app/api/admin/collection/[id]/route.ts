import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { updateItem, deleteItem, fetchOgMeta } from "@/lib/collection";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  // Auto-fetch OG metadata if url is provided but title/thumbnail are empty
  let { url, title, thumbnail } = body;
  if (url && (!thumbnail || !title)) {
    const og = await fetchOgMeta(url);
    if (!thumbnail && og.image) thumbnail = og.image;
    if (!title && og.title) title = og.title;
  }

  const item = await updateItem(id, { ...body, thumbnail: thumbnail || undefined, title: title || undefined });
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteItem(id);
  return NextResponse.json({ ok: true });
}
