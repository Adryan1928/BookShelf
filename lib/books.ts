let books = [
  {
    id: "1",
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasia",
    year: 1937,
    pages: 310,
    rating: 4.8,
    synopsis: "Bilbo embarca numa aventura inesperada...",
    cover: "/hobbit.jpg",
  },
];

export async function getBookById(id: string) {
  return books.find(book => book.id === id);
}

export async function deleteBookById(id: string) {
  books = books.filter(book => book.id !== id);
}