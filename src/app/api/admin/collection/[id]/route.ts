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

  // Auto-fetch OG metadata if url changed and fields are empty
  let { url, title, description, thumbnail } = body;
  if (url && (!title || !description || !thumbnail)) {
    const og = await fetchOgMeta(url);
    if (!title && og.title) title = og.title;
    if (!description && og.description) description = og.description;
    if (!thumbnail && og.image) thumbnail = og.image;
  }

  const item = await updateItem(id, {
    ...body,
    title: title || undefined,
    description: description || undefined,
    thumbnail: thumbnail || undefined,
  });
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
