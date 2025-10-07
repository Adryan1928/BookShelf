/app/api/books/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const books = await prisma.book.findMany({
    include: { genre: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(books);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const book = await prisma.book.create({
      data: {
        title: data.title,
        author: data.author,
        year: Number(data.year) || null,
        pages: Number(data.pages) || 0,
        rating: Number(data.rating) || null,
        synopsis: data.synopsis || "",
        cover: data.cover || "",
        isbn: data.isbn || "",
        notes: data.notes || "",
        currentPage: Number(data.currentPage) || 0,
        status: data.status || "QUERO_LER",
        genreId: data.genreId,
      },
    });
    return NextResponse.json(book);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao adicionar livro" }, { status: 500 });
  }
}
