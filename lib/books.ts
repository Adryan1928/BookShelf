import { id } from "zod/locales";

const Generos = ["Literatura Brasileira", "Ficção Científica", "Realismo Mágico", "Ficção", "Fantasia", "Romance","Biografia", "História", "Autoajuda", "Tecnologia", "Programação", "Negócios", "Psicologia", "Filosofia","Poesia"];

const Books = [
  {
    id: "1",
    title: "O Quinze",
    author: "Rachel de Queiroz",

    coverUrl: "https://i.pinimg.com/736x/ee/ea/36/eeea361df319626c4e385196b3a14116.jpg",
    genre: Generos[0],
  },
  {
    id: "2",
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    
    coverUrl: "https://s3.static.brasilescola.uol.com.br/be/2025/03/capa-do-livro-a-revolucao-dos-bichos-de-george-orwell-publicado-pela-editora-principis.jpg",
    genre: Generos[3],
  },
  {
    id: "3",
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    
    coverUrl: "https://i.pinimg.com/736x/4b/09/98/4b09981418a482010e228d8dd7bad1d9.jpg",
    genre: Generos[4],
  },
  {
    id: "4",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",

    coverUrl: "https://i.pinimg.com/736x/7c/5b/15/7c5b153fdc40f631c995f55d26026346.jpg",
    genre: Generos[1],
  },
];

export async function getBookById(id: string) {
  return Books.find(book => book.id === id);
}

export async function deleteBookById(id: string) {
  // Books = Books.filter(book => book.id !== id);
}