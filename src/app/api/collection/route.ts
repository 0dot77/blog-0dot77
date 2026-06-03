import { NextResponse } from "next/server";
import { getAllItems } from "@/lib/collection";

export async function GET() {
  const items = await getAllItems();
  return NextResponse.json(items);
}
