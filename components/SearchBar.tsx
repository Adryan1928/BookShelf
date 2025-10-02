// /components/SearchBar.tsx
"use client";

import { useState } from "react";
import { books as allBooks, Book } from "@/data/books";

interface SearchBarProps {
  /**
   * Recebe o resultado (array com 0 ou mais livros) ou null
   * e uma mensagem de erro (opcional).
   * onResult(null) => limpa resultados na página pai
   */
  onResult: (res: Book[] | null, err?: string) => void;
}

export default function SearchBar({ onResult }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const q = query.trim();
    if (!q) {
      onResult(null); // limpa
      return;
    }

    const lower = q.toLowerCase();

    const filtered = allBooks.filter((book) => {
      // pesquisar por título, autor, editora, ano ou gênero
      const yearMatch = String(book.year).includes(lower);
      return (
        book.title.toLowerCase().includes(lower) ||
        book.author.toLowerCase().includes(lower) ||
        book.publisher.toLowerCase().includes(lower) ||
        (book.genre || "").toLowerCase().includes(lower) ||
        yearMatch
      );
    });

    if (filtered.length === 0) {
      onResult(null, `Nenhum livro encontrado para "${q}". Verifique título, autor, editora, gênero ou ano.`);
    } else {
      onResult(filtered);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-3 items-center w-full">
      <input
        type="text"
        aria-label="Pesquisar livros"
        placeholder="Pesquise por título, autor, editora ou ano"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border rounded-md p-2 bg-white"
      />
      <button
        type="submit"
        onClick={() => handleSearch()}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Pesquisar
      </button>
    </form>
  );
}
