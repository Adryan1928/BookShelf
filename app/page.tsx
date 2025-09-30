import { Book, BookOpenCheck, CheckCircle, FileText } from "lucide-react";
import { BookCard } from "@/components/bookCard";
import { StatCard } from "@/components/statCard";
import { ThemeToggle } from "@/components/theme-toggle";

const stats = [
  { title: "Total de Livros", value: 120, icon: <Book size={32} /> },
  { title: "Livros em Leitura", value: 8, icon: <BookOpenCheck size={32} /> },
  { title: "Livros Finalizados", value: 45, icon: <CheckCircle size={32} /> },
  { title: "Total de Páginas Lidas", value: "15.230", icon: <FileText size={32} /> },
];

const recentlyReadBooks = [
  {
    title: "O Quinze",
    author: "Rachel de Queiroz",
    coverUrl: "https://i.pinimg.com/736x/ee/ea/36/eeea361df319626c4e385196b3a14116.jpg",
  },
  {
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    coverUrl: "https://i.pinimg.com/1200x/e8/31/ef/e831efc6b89b6c4af9e7fd7457370319.jpg",
  },
  {
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    coverUrl: "https://i.pinimg.com/736x/4b/09/98/4b09981418a482010e228d8dd7bad1d9.jpg",
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    coverUrl: "https://i.pinimg.com/736x/7c/5b/15/7c5b153fdc40f631c995f55d26026346.jpg",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>
      
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

      <section>
        <div className="bg-card p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-6">
            Lidos Recentemente
          </h2>
          <div className="grid grid-cols-2 sm-grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {recentlyReadBooks.map((book) => (
              <BookCard
                key={book.title}
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