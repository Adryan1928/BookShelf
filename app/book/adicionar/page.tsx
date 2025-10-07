import { getAllGeneros } from "@/lib/genero";
import AddBookClient from "./AddBookClient";
import { createBook } from "@/lib/books";

export default async function BookDetailsPage() {
  const generos = await getAllGeneros();
  const createBookAction = async (values: any) => {
    'use server';
    return await createBook(values);
  }
  return <AddBookClient generos={generos} createBookAction={createBookAction} />;
}
