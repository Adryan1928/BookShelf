// /app/edit-book/page.tsx
"use client";

import { useState } from "react";
import { books } from "@/data/books";
import Link from "next/link";

export default function EditBookListPage() {
  const [query, setQuery] = useState("");

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.publisher?.toLowerCase().includes(query.toLowerCase()) ||
      book.year?.toString().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">📖 Editar Livro</h1>
      <p className="text-gray-600">
        Pesquise o livro que deseja editar pelo título, autor, editora ou ano.
      </p>

      {/* Campo de busca */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Pesquisar livro..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Lista de livros */}
      <ul className="space-y-3">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <li
              key={book.id}
              className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm"
            >
              <div>
                <p className="font-bold">{book.title}</p>
                <p className="text-gray-600">{book.author}</p>
                <p className="text-gray-500 text-sm">{book.publisher}</p>
              </div>
              <Link
                href={`/edit-book/${book.id}`}
                prefetch={true}
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition"
              >
                Editar
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Nenhum livro encontrado.</p>
        )}
      </ul>
    </div>
  );
}

