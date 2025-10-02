// app/home/page.tsx
"use client";

import { useState } from "react";
import { books, Book } from "@/data/books";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export default function HomePage() {
  const [results, setResults] = useState<Book[] | null>(books);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleResult = (res: Book[] | null, err?: string) => {
    setResults(res);
    setError(err);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">📚 BookShelf</h1>

      <SearchBar onResult={handleResult} />

      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {results &&
          results.map((book) => (
            <div key={book.id} className="border rounded p-4 shadow">
              <img src={book.cover} alt={book.title} className="h-48 mx-auto mb-3" />
              <h2 className="font-semibold">{book.title}</h2>
              <p>{book.author}</p>
              <p className="text-sm text-gray-600">{book.publisher}</p>
              <p className="text-sm">Ano: {book.year}</p>
              <p>Status: {book.status}</p>
              <Link
                href={`/edit-book/${book.id}`}
                className="mt-2 inline-block bg-green-600 text-white px-3 py-1 rounded"
              >
                Editar
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}


