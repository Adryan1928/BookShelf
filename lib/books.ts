// lib/books.ts
import prisma from "@/lib/prisma";

export type Status = "QUERO_LER" | "LENDO" | "LIDO" | "PAUSADO" | "ABANDONADO";

export type Genero = {
  id: string;
  name: string;
}

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: Genero;
  year?: number | null;
  pages: number;
  rating?: number | null;
  synopsis?: string | null;
  cover: string;
  isbn?: string | null;
  notes?: string | null;
  currentPage: number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};


export type BookPayload = Omit<Book, 'createdAt' | 'updatedAt' | 'id' | 'genre'> & { genreId: string };

export async function getAllBooks(): Promise<(Book & { genre: { id: string; name: string } })[]> {
  return prisma.book.findMany({ orderBy: { createdAt: "desc" }, include: { genre: true } });
}

export async function getBookById(id: string) {
  return prisma.book.findUnique({ where: { id } });
}

export async function createBook(data: BookPayload) {
  return prisma.book.create({ data });
}

export async function updateBook(id: string, data: Partial<BookPayload>) {

  return prisma.book.update({ where: { id }, data });
}

export async function deleteBook(id: string) {
  return prisma.book.delete({ where: { id } });
}
