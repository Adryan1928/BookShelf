// /app/book/editar/[id]/page.tsx
import { getBookById } from "@/lib/books";
import { notFound } from "next/navigation";
import EditBookClient from "./EditBookClient";

export default async function BookDetailsPage({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id);
  if (!book) return notFound();

  return <EditBookClient book={book} />;
}
