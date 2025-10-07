// app/api/books/route.ts
import { NextResponse } from "next/server";
import { getAllBooks, createBook } from "@/lib/books";

export async function GET() {
  const books = await getAllBooks();
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newBook = await createBook(data);
  return NextResponse.json(newBook, { status: 201 });
}
