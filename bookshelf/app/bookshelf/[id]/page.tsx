import { getBookById } from "@/lib/books";
import { DeleteBookDialog } from "@/components/DeleteBookDialog";
import { notFound } from "next/navigation";

export default async function BookDetails({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id);
  if (!book) return notFound();

  return (
    <div className="p-6 space-y-4">
      <img src={book.cover} alt={`Capa de ${book.title}`} className="w-40 h-60 object-cover" />
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p>Autor: {book.author}</p>
      <p>Gênero: {book.genre}</p>
      <p>Ano: {book.year}</p>
      <p>Páginas: {book.pages}</p>
      <p>Avaliação: ⭐ {book.rating}/5</p>
      <p className="mt-4">{book.synopsis}</p>
      <DeleteBookDialog bookId={params.id} />
    </div>
  );
}
