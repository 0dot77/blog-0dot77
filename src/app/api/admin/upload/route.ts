import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { uploadImage } from "@/lib/github";

export async function POST(req: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");

  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const fileName = `${timestamp}-${safeName}`;

  const url = await uploadImage(fileName, base64, `blog: upload ${fileName}`);

  return NextResponse.json({ url });
}
