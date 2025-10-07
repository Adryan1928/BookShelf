// /app/home/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { books } from "@/data/books";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [error, setError] = useState("");

  const handleSearch = () => {
    const results = books.filter((book) =>
      [book.title, book.author, book.publisher]
        .some((field) =>
          field.toLowerCase().includes(query.toLowerCase())
        )
    );

    if (results.length > 0) {
      setFilteredBooks(results);
      setError("");
    } else {
      setFilteredBooks([]);
      setError("Nenhum livro encontrado. Verifique o título, autor ou editora.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <BookOpen className="w-8 h-8 text-primary" /> BookShelf
      </h1>

      {/* 🔍 Barra de Pesquisa */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Buscar por título, autor ou editora"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded px-3 py-2 bg-background text-foreground"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Pesquisar
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* 🧾 Cards de Livros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg p-4 shadow bg-card text-card-foreground flex flex-col"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="h-56 w-full object-cover rounded mb-4"
              onError={(e) => (e.currentTarget.src = "/default-cover.png")}
            />
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            <p className="text-xs text-muted-foreground">{book.publisher}</p>
            <p className="text-xs">Ano: {book.year}</p>
            <p
              className={`font-medium ${
                book.status === "Disponível"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Status: {book.status}
            </p>
            <Link
              href={`/edit-book/${book.id}`}
              className="mt-4 bg-green-600 text-white px-3 py-2 rounded text-center hover:bg-green-700 transition"
            >
              Editar
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
