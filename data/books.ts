// data/books.ts

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  publisher: string;
  cover: string;
  status: string;
}

export const books: Book[] = [
  {
    id: 1,
    title: "O Quinze",
    author: "Rachel de Queiroz",
    year: 1930,
    publisher: "José Olympio",
    cover: "https://m.media-amazon.com/images/I/71FmX6P9x8L.jpg",
    status: "Disponível",
  },
  {
    id: 2,
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    year: 1945,
    publisher: "Companhia Editora Nacional",
    cover: "https://m.media-amazon.com/images/I/81Bs+U0Pf2L.jpg",
    status: "Disponível",
  },
  {
    id: 3,
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    publisher: "HarperCollins Brasil",
    cover: "https://m.media-amazon.com/images/I/91b0C2YNSrL.jpg",
    status: "Indisponível",
  },
  {
    id: 4,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    year: 1953,
    publisher: "Biblioteca Azul",
    cover: "https://m.media-amazon.com/images/I/71OFqSRFDgL.jpg",
    status: "Disponível",
  },
];
