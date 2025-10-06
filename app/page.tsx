import { StatCard } from "@/components/statCard";
import { BookCard } from "@/components/bookCard";
import { Book, BookOpenCheck, CheckCircle, FileText } from "lucide-react";
import { books } from "@/data/books";


const stats = [
  { title: "Total de Livros", value: 120, icon: <Book size={32} /> },
  { title: "Livros em Leitura", value: 8, icon: <BookOpenCheck size={32} /> },
  { title: "Livros Finalizados", value: 45, icon: <CheckCircle size={32} /> },
  { title: "Total de Páginas Lidas", value: "15.230", icon: <FileText size={32} /> },
];

const recentlyReadBooks = books

export default function DashboardPage() {
  return (
    <div className="space-y-8">
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
                key={book.title}
                id={book.id}
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