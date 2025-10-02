// /app/edit-book/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { books, Book } from "@/data/books";
import Link from "next/link";

export default function EditBookPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const router = useRouter();

  const [book, setBook] = useState<Book | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const found = books.find((b) => b.id === id) ?? null;
    setBook(found);
  }, [id]);

  if (!book) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Livro não encontrado</h1>
        <p className="text-gray-600">
          O livro com id <strong>{id}</strong> não foi encontrado.
        </p>
        <Link href="/home" className="text-blue-600 mt-4 inline-block">
          Voltar para Home
        </Link>
      </div>
    );
  }

  const handleChange = (field: keyof Book, value: any) => {
    setBook((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setMessage(null);

    // Atualiza o array in-memory (mock)
    const idx = books.findIndex((b) => b.id === book.id);
    if (idx >= 0) {
      books[idx] = { ...book };
      setMessage("Salvo com sucesso (mock).");
    } else {
      setMessage("Erro: não foi possível salvar (mock).");
    }

    setSaving(false);

    // opcional: navegar de volta
    // router.push("/home");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Editar Livro</h1>

      <form onSubmit={handleSave} className="max-w-xl bg-white p-6 rounded shadow">
        <label className="block mb-3">
          <span className="font-medium">Título</span>
          <input
            className="mt-1 block w-full border rounded p-2"
            value={book.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </label>

        <label className="block mb-3">
          <span className="font-medium">Autor</span>
          <input
            className="mt-1 block w-full border rounded p-2"
            value={book.author}
            onChange={(e) => handleChange("author", e.target.value)}
          />
        </label>

        <label className="block mb-3">
          <span className="font-medium">Editora</span>
          <input
            className="mt-1 block w-full border rounded p-2"
            value={book.publisher}
            onChange={(e) => handleChange("publisher", e.target.value)}
          />
        </label>

        <label className="block mb-3">
          <span className="font-medium">Ano</span>
          <input
            type="number"
            className="mt-1 block w-full border rounded p-2"
            value={book.year}
            onChange={(e) => handleChange("year", Number(e.target.value))}
          />
        </label>

        <label className="block mb-3">
          <span className="font-medium">Gênero</span>
          <input
            className="mt-1 block w-full border rounded p-2"
            value={book.genre ?? ""}
            onChange={(e) => handleChange("genre", e.target.value)}
          />
        </label>

        <label className="block mb-3">
          <span className="font-medium">Capa (URL)</span>
          <input
            className="mt-1 block w-full border rounded p-2"
            value={book.cover}
            onChange={(e) => handleChange("cover", e.target.value)}
          />
        </label>

        <label className="block mb-3">
          <span className="font-medium">Edição</span>
          <input
            className="mt-1 block w-full border rounded p-2"
            value={book.edition ?? ""}
            onChange={(e) => handleChange("edition", e.target.value)}
          />
        </label>

        <label className="block mb-3">
          <span className="font-medium">Cidade</span>
          <input
            className="mt-1 block w-full border rounded p-2"
            value={book.city ?? ""}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </label>

        <label className="block mb-3">
          <span className="font-medium">Telefone</span>
          <input
            className="mt-1 block w-full border rounded p-2"
            value={book.phone ?? ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </label>

        <label className="block mb-3">
          <span className="font-medium">Status</span>
          <select
            className="mt-1 block w-full border rounded p-2"
            value={book.status}
            onChange={(e) => handleChange("status", e.target.value as Book["status"])}
          >
            <option>Disponível</option>
            <option>Indisponível</option>
            <option>Favorito</option>
            <option>Não Lido</option>
          </select>
        </label>

        <div className="flex gap-3 items-center mt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {saving ? "Salvando..." : "Salvar"}
          </button>

          <Link href="/home" className="text-gray-600">
            Voltar
          </Link>

          {message && <div className="text-sm text-green-700 ml-4">{message}</div>}
        </div>
      </form>
    </div>
  );
}



