import { getAllGeneros } from "@/lib/genero";
import AddBookClient from "./AddBookClient";

export default async function BookDetailsPage() {
  const generos = await getAllGeneros();
  return <AddBookClient generos={generos} />;
}
