/app/api/books/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const book = await prisma.book.findUnique({
    where: { id: params.id },
    include: { genre: true },
  });
  if (!book) return NextResponse.json({ error: "Livro não encontrado" }, { status: 404 });
  return NextResponse.json(book);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const book = await prisma.book.update({
      where: { id: params.id },
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
    return NextResponse.json({ error: "Erro ao atualizar livro" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.book.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Livro deletado com sucesso" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao deletar livro" }, { status: 500 });
  }
}
