import { getBookById, updateBook } from "@/lib/books";
import { notFound } from "next/navigation";
import BookDetailsClient from "./EditBookClient";
import { getAllGeneros } from "@/lib/genero";

export default async function BookDetailsPage({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id);
  const generos = await getAllGeneros();
  if (!book) return notFound();

  async function updateBookAction(values: any) {
    'use server';
    values.genre = undefined;
    return await updateBook(params.id, values);
  }

  book.genreId = book.genre.id;

  return <BookDetailsClient generos={generos} book={book} updateBookAction={updateBookAction} />;
}
