'use client';
import { StatCard } from "@/components/statCard";
import { BookCard } from "@/components/bookCard";
import { useTheme } from "next-themes";
import { Book as BookType } from "@/lib/books";

interface DashboardClientProps {
  recentlyReadBooks: BookType[];
  stats: { title: string; value: number; icon: React.ReactNode }[];
}

export default function DashboardClientPage({ recentlyReadBooks, stats }: DashboardClientProps) {
  const { theme } = useTheme();
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
        <div className={"p-8 rounded-lg shadow-sm" + (theme != "light" ? " bg-neutral-900" : " bg-white")}>
          <h2 className={"text-xl font-bold mb-4" + (theme != "light" ? " text-gray-200" : " text-gray-800")}>
            Lidos Recentemente
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {recentlyReadBooks.map((book) => (
              <BookCard
                key={book.title}
                id={book.id}
                title={book.title}
                author={book.author}
                coverUrl={book.cover}
              />
            ))}
            {recentlyReadBooks.length === 0 && (
                <p className={theme != "light" ? "text-gray-200" : "text-gray-800"}>Nenhum livro encontrado.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}