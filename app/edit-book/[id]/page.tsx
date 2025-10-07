// /app/book/editar/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Book = {
  id: string;
  title: string;
  author: string;
  publisher?: string;
  year?: number | "";
  edition?: string;
  city?: string;
  phone?: string;
  genre?: string;
  coverUrl?: string;
  status?: "Disponível" | "Indisponível" | "Favorito" | string;
};

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [mounted, setMounted] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [edition, setEdition] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [genre, setGenre] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [status, setStatus] = useState<"Disponível" | "Indisponível" | "Favorito" | string>("Disponível");

  useEffect(() => {
    setMounted(true);
    if (!id) return;

    try {
      const raw = localStorage.getItem("bookshelf_books");
      const list: Book[] = raw ? JSON.parse(raw) : [];
      const book = list.find((b) => b.id === id);
      if (!book) {
        setNotFound(true);
        return;
      }

      setTitle(book.title || "");
      setAuthor(book.author || "");
      setPublisher(book.publisher || "");
      setYear(book.year ?? "");
      setEdition(book.edition || "");
      setCity(book.city || "");
      setPhone(book.phone || "");
      setGenre(book.genre || "");
      setCoverUrl(book.coverUrl || "");
      setStatus(book.status || "Disponível");
    } catch (err) {
      setNotFound(true);
    }
  }, [id]);

  function readStorage(): Book[] {
    try {
      const raw = localStorage.getItem("bookshelf_books");
      if (!raw) return [];
      return JSON.parse(raw) as Book[];
    } catch {
      return [];
    }
  }

  function writeStorage(list: Book[]) {
    localStorage.setItem("bookshelf_books", JSON.stringify(list));
  }

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const list = readStorage();
    const idx = list.findIndex((b) => b.id === id);
    if (idx === -1) {
      setNotFound(true);
      return;
    }

    const updated: Book = {
      id,
      title: title.trim(),
      author: author.trim(),
      publisher: publisher.trim() || undefined,
      year: year === "" ? undefined : Number(year),
      edition: edition.trim() || undefined,
      city: city.trim() || undefined,
      phone: phone.trim() || undefined,
      genre: genre.trim() || undefined,
      coverUrl: coverUrl.trim() || undefined,
      status: status || "Disponível",
    };

    list[idx] = updated;
    writeStorage(list);
    router.push("/home");
  };

  if (!mounted) return null;

  if (!id) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Editar Livro</h1>
        <p className="text-gray-600">ID do livro não foi informado na URL.</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Editar Livro</h1>
        <p className="text-red-600">Livro não encontrado. Verifique se já existe um livro com este ID.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Livro</h1>

      <form onSubmit={onSave} className="space-y-4 bg-white p-6 rounded-md shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Autor</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Editora</label>
            <input value={publisher} onChange={(e) => setPublisher(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ano</label>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))} className="w-full border px-3 py-2 rounded" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Edição</label>
            <input value={edition} onChange={(e) => setEdition(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cidade</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Telefone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gênero</label>
          <input value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL da Capa</label>
          <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option>Disponível</option>
            <option>Indisponível</option>
            <option>Favorito</option>
          </select>
        </div>

        <div className="flex gap-2 justify-end">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Salvar</button>
        </div>
      </form>
    </div>
  );
}
