"use client";
import { useRouter } from "next/navigation";
import { Book } from "@/lib/books";
import { DeleteBookDialog } from "@/components/DeleteBookDialog";
import { useState } from "react";
import { StarRating } from "@/components/Stars";

interface BookDetailsClientProps {
  book: Book;
  deleteBookAction: (id: string) => Promise<void>;
}

export default function BookDetailsClient({ book, deleteBookAction }: BookDetailsClientProps) {
  const router = useRouter();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleOpenEdit = () => {
    router.push(`/book/edit/${book.id}`);
  };

  return (
    <section className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-8">
      {/* Imagem */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={book.cover}
          alt={`Capa do livro ${book.title}`}
          className="w-64 h-80 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Detalhes */}
      <div className="w-full md:w-2/3 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{book.title}</h1>
          <p className="text-gray-600 text-lg">por {book.author}</p>
        </div>

        <div className="border-t border-gray-200 my-2"></div>

        <div className="flex gap-4 text-gray-700">
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold">Gênero:</span> {book.genre.name}
            </p>
            {book.year && <p>
              <span className="font-semibold">Ano de publicação:</span> {book.year}
            </p>}
            <p>
              <span className="font-semibold">Páginas:</span> {book.currentPage}/{book.pages}
            </p>
            {book.synopsis && <p className="mt-2">
              <span className="font-semibold">Sinopse:</span> {book.synopsis}
            </p>}
            <p className="mt-2">
              <span className="font-semibold">Status:</span> {book.status}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-start">
            {book.rating && (
              <div className="flex items-center gap-2">
                <p>
                  <span className="font-semibold">Rating:</span> 
                </p>
                <StarRating value={book.rating} readOnly />
              </div>
            )}
            {book.isbn && (
              <p>
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </p>
            )}
            {book.notes && (
              <p>
                <span className="font-semibold">Notas:</span> {book.notes}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleOpenEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition cursor-pointer"
          >
            Remover
          </button>
        </div>
      </div>
      <DeleteBookDialog
        open={isDeleteDialogOpen}
        bookId={book.id}
        onClose={() => setIsDeleteDialogOpen(false)}
        deleteBook={deleteBookAction}
      />
    </section>
  );
}
