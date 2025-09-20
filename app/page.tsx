"use client";

import { StatCard } from "@/components/statCard";
import { BookCard } from "@/components/bookCard";
import { SearchBar } from "@/components/SearchBar";
import { Book, BookOpenCheck, CheckCircle, FileText } from "lucide-react";

const stats = [
  { title: "Total de Livros", value: 120, icon: <Book size={32} /> },
  { title: "Livros em Leitura", value: 8, icon: <BookOpenCheck size={32} /> },
  { title: "Livros Finalizados", value: 45, icon: <CheckCircle size={32} /> },
  { title: "Total de Páginas Lidas", value: "15.230", icon: <FileText size={32} /> },
];

// Agora cada livro tem também o campo genre
const recentlyReadBooks = [
  {
    id: 1,
    title: "O Quinze",
    author: "Rachel de Queiroz",
    genre: "Romance",
    coverUrl:
      "https://i.pinimg.com/736x/ee/ea/36/eeea361df319626c4e385196b3a14116.jpg",
  },
  {
    id: 2,
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    genre: "Fábula / Política",
    coverUrl:
      "https://s3.static.brasilescola.uol.com.br/be/2025/03/capa-do-livro-a-revolucao-dos-bichos-de-george-orwell-publicado-pela-editora-principis.jpg",
  },
  {
    id: 3,
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasia",
    coverUrl:
      "https://i.pinimg.com/736x/4b/09/98/4b09981418a482010e228d8dd7bad1d9.jpg",
  },
  {
    id: 4,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    genre: "Ficção Científica",
    coverUrl:
      "https://i.pinimg.com/736x/7c/5b/15/7c5b153fdc40f631c995f55d26026346.jpg",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Seção de Pesquisa */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Pesquisar Livros</h2>
        <SearchBar books={recentlyReadBooks} />
      </section>

      {/* Seção de Estatísticas */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      </section>

      {/* Seção de Lidos Recentemente */}
      <section>
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Lidos Recentemente
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {recentlyReadBooks.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                coverUrl={book.coverUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
