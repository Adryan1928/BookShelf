import { getAllBooks } from "@/lib/books";
import DashboardClient from "./DashboardClient";
import { Book, BookOpenCheck, CheckCircle, FileText } from "lucide-react";

export default async function DashboardPage() {
  const recentlyReadBooks = await getAllBooks();
  const readBooks = recentlyReadBooks.filter(book => book.status === 'LIDO');
  const readingBooks = recentlyReadBooks.filter(book => book.status === 'LENDO');
  const readPages = recentlyReadBooks.reduce((acc, book) => acc + (book.currentPage || 0), 0);
  const stats = [
    { title: "Total de Livros", value: recentlyReadBooks.length, icon: <Book size={32} /> },
    { title: "Livros em Leitura", value: readingBooks.length, icon: <BookOpenCheck size={32} /> },
    { title: "Livros Finalizados", value: readBooks.length, icon: <CheckCircle size={32} /> },
    { title: "Total de Páginas Lidas", value: readPages, icon: <FileText size={32} /> },
  ];
  return <DashboardClient recentlyReadBooks={recentlyReadBooks.slice(0, 5)} stats={stats} />;
}