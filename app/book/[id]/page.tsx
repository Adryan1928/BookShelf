'use-client';
import { getBookById } from "@/lib/books";
import { notFound } from "next/navigation";
import React from "react";

export default async function BookDetails({ params }: { params: { id: string } }) {
  const book = await getBookById(params.id);
  if (!book) return notFound();

  return (
    <section className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/3 flex justify-center">
            <img
            src="https://i.pinimg.com/736x/4b/09/98/4b09981418a482010e228d8dd7bad1d9.jpg"
            alt="Capa do livro O Hobbit"
            className="w-64 h-80 object-cover rounded-lg shadow-md"
            />
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
            <div>
            <h1 className="text-2xl font-semibold text-gray-800">O Hobbit</h1>
            <p className="text-gray-600 text-lg">por J.R.R. Tolkien</p>
            </div>

            <div className="border-t border-gray-200 my-2"></div>

            <div className="flex flex-col gap-2 text-gray-700">
            <p><span className="font-semibold">Gênero:</span> Fantasia</p>
            <p><span className="font-semibold">Ano de publicação:</span> 1937</p>
            <p><span className="font-semibold">Editora:</span> HarperCollins</p>
            <p className="mt-2">
                <span className="font-semibold">Descrição:</span>  
                Um clássico da literatura fantástica, “O Hobbit” narra a aventura de Bilbo Bolseiro, um hobbit que parte em uma jornada inesperada ao lado de anões e do mago Gandalf em busca de um tesouro guardado por um dragão.
            </p>
            </div>

            <div className="flex gap-4 mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition">
                Editar
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition">
                Remover
            </button>
            </div>
        </div>
        </section>

  );
}