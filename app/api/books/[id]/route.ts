// app/api/books/[id]/route.ts
import { NextResponse } from "next/server";
import { getBookById, updateBook, deleteBook } from "@/lib/books";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const book = await getBookById(params.id);
  if (!book) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(book);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = await updateBook(params.id, body);
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await deleteBook(params.id);
  return NextResponse.json({ success: true });
}
