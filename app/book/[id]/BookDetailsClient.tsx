"use client";

import { useRouter } from "next/navigation";
import { Book } from "@/data/books";

export default function BookDetailsClient({ book }: { book: Book }) {
  const router = useRouter();

  const handleOpenEdit = () => {
    router.push(`/book/edit/${book.id}`);
  };

  const handleRemove = () => {
    // Aqui você pode abrir um modal de confirmação ou chamar uma API
    console.log("Remover livro:", book.id);
  };

  return (
    <section className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-8">
      {/* Imagem */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={book.coverUrl}
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

        <div className="flex flex-col gap-2 text-gray-700">
          <p>
            <span className="font-semibold">Gênero:</span> {book.genre}
          </p>
          <p>
            <span className="font-semibold">Ano de publicação:</span> {book.year}
          </p>
          <p>
            <span className="font-semibold">Editora:</span> {book.publisher}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Descrição:</span> {book.description}
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleOpenEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition cursor-pointer"
          >
            Editar
          </button>
          <button
            onClick={handleRemove}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition cursor-pointer"
          >
            Remover
          </button>
        </div>
      </div>
    </section>
  );
}
