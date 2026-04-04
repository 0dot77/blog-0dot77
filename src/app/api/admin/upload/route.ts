import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { verifyAuth } from "@/lib/auth";
import { uploadImage } from "@/lib/github";

const MAX_RAW_SIZE = 20 * 1024 * 1024; // 20MB raw input limit

export async function POST(req: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > MAX_RAW_SIZE) {
    return NextResponse.json({ error: "File too large (max 20MB)" }, { status: 400 });
  }

  const rawBuffer = Buffer.from(await file.arrayBuffer());

  // Convert to WebP (quality 80 gives good balance of size and clarity)
  const webpBuffer = await sharp(rawBuffer)
    .webp({ quality: 80 })
    .toBuffer();

  const base64 = webpBuffer.toString("base64");
  const timestamp = Date.now();
  const baseName = file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
  const fileName = `${timestamp}-${baseName}.webp`;

  const url = await uploadImage(fileName, base64, `blog: upload ${fileName}`);

  return NextResponse.json({ url });
}
