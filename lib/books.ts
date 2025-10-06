import { books as Books } from "@/data/books";

export async function getBookById(id: string) {
  return Books.find(book => book.id === id);
}

export async function deleteBookById(id: string) {
  // Books = Books.filter(book => book.id !== id);
}