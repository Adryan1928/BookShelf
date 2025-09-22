"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBookPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    edition: "",
    publisher: "",
    city: "",
    phone: "",
    coverUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Novo livro adicionado:", formData);
    alert("Livro adicionado com sucesso!");
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Adicionar Novo Livro
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <div>
          <label className="block text-gray-700 font-medium">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Autor */}
        <div>
          <label className="block text-gray-700 font-medium">Autor</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Gênero */}
        <div>
          <label className="block text-gray-700 font-medium">Gênero</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Edição */}
        <div>
          <label className="block text-gray-700 font-medium">Edição</label>
          <input
            type="text"
            name="edition"
            value={formData.edition}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Editora */}
        <div>
          <label className="block text-gray-700 font-medium">Editora</label>
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Cidade */}
        <div>
          <label className="block text-gray-700 font-medium">Cidade</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-gray-700 font-medium">Telefone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Capa */}
        <div>
          <label className="block text-gray-700 font-medium">URL da Capa</label>
          <input
            type="text"
            name="coverUrl"
            value={formData.coverUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Botões */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-700"
          >
            Adicionar Livro
          </button>
        </div>
      </form>
    </div>
  );
}
