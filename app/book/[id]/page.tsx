import { deleteBook, getBookById } from "@/lib/books";
import { notFound } from "next/navigation";
import BookDetailsClient from "./BookDetailsClient";

export default async function BookDetailsPage({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id);
  if (!book) return notFound();

  async function deleteBookAction(id: string) {
    "use server";
    deleteBook(id);
  }

  return <BookDetailsClient book={book} deleteBookAction={deleteBookAction} />;
}
