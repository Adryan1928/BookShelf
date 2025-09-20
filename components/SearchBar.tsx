"use client";

import { useState } from "react";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
}

interface SearchBarProps {
  books: Book[];
}

export function SearchBar({ books }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!query.trim()) {
      setError("Digite o título, autor ou gênero para pesquisar.");
      setResults([]);
      return;
    }

    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.genre.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      setError(
        `Nenhum livro encontrado para "${query}". Verifique se o nome, autor ou gênero estão corretos.`
      );
    } else {
      setError("");
    }

    setResults(filtered);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Campo de busca */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Pesquise por título, autor ou gênero..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleSearch}
          className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Pesquisar
        </button>
      </div>

      {/* Mensagem de erro */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Resultados */}
      <ul className="space-y-3">
        {results.map((book) => (
          <li
            key={book.id}
            className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm"
          >
            <div>
              <p className="font-bold">{book.title}</p>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-gray-500 text-sm">{book.genre}</p>
            </div>
            <Link
              href={`/edit-book/${book.id}`}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-500 transition"
            >
              Editar
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
