'use client';
import { getBookById } from "@/lib/books";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import React from "react";

type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  rating: number;
  synopsis: string;
  cover: string;
};


export default async function BookDetails({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id);
  if (!book) return notFound();

  function BookDetailsClient({ book }: { book: Book }) {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleDelete = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/books/${book.id}`, { method: "DELETE" });
        if (!res.ok) throw new Error();
        router.push("/bookshelf");
      } finally {
        setLoading(false);
        setOpen(false);
      }
    };

    return (
      <div className="p-6 space-y-4 max-w-xl mx-auto">
        <img src={book.cover} alt={`Capa de ${book.title}`} className="w-40 h-60 object-cover rounded shadow" />
        <h1 className="text-3xl font-bold mt-4">{book.title}</h1>
        <div className="grid grid-cols-2 gap-2 text-lg">
          <span className="font-semibold">Autor:</span> <span>{book.author}</span>
          <span className="font-semibold">Gênero:</span> <span>{book.genre}</span>
          <span className="font-semibold">Ano:</span> <span>{book.year}</span>
          <span className="font-semibold">Páginas:</span> <span>{book.pages}</span>
          <span className="font-semibold">Avaliação:</span> <span>⭐ {book.rating}/5</span>
        </div>
        <div className="mt-4">
          <span className="font-semibold block mb-1">Sinopse detalhada:</span>
          <p className="text-justify bg-gray-50 rounded p-3 border border-gray-200">{book.synopsis}</p>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold shadow"
            onClick={() => router.push(`/bookshelf/edit-book/${book.id}`)}
          >
            Editar Livro
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-bold shadow"
            onClick={() => setOpen(true)}
          >
            Excluir Livro
          </button>
        </div>

        {/* Diálogo de confirmação */}
        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full shadow-lg">
              <h2 className="text-xl font-bold mb-2">Confirmar exclusão</h2>
              <p className="mb-6">Você tem certeza que deseja apagar este livro? Essa ação não pode ser desfeita.</p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-bold"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <BookDetailsClient book={book} />;
}