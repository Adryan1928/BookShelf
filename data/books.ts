// data/books.ts

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  publisher: string;
  coverUrl: string;
  status: string;
  genre: string;
  description: string;
}

export const Generos = ["Literatura Brasileira", "Ficção Científica", "Realismo Mágico", "Ficção", "Fantasia", "Romance","Biografia", "História", "Autoajuda", "Tecnologia", "Programação", "Negócios", "Psicologia", "Filosofia","Poesia"];

export const books: Book[] = [
  {
    id: "1",
    title: "O Quinze",
    author: "Rachel de Queiroz",
    year: 1930,
    publisher: "José Olympio",
    coverUrl: "https://i.pinimg.com/736x/ee/ea/36/eeea361df319626c4e385196b3a14116.jpg",
    status: "Disponível",
    genre: Generos[0],
    description: "O Quinze é um romance de Rachel de Queiroz que retrata a seca de 1915 no Nordeste brasileiro, focando na luta pela sobrevivência de uma família de retirantes. A obra destaca a resiliência humana diante das adversidades naturais e sociais, explorando temas como a pobreza, a migração e a solidariedade comunitária.",
  },
  {
    id: "2",
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    year: 1945,
    publisher: "Companhia Editora Nacional",
    coverUrl: "https://s3.static.brasilescola.uol.com.br/be/2025/03/capa-do-livro-a-revolucao-dos-bichos-de-george-orwell-publicado-pela-editora-principis.jpg",
    status: "Disponível",
    genre: Generos[3],
    description: "A Revolução dos Bichos é uma fábula satírica de George Orwell que narra a história de animais em uma fazenda que se rebelam contra seus donos humanos para estabelecer uma sociedade igualitária. No entanto, a revolução acaba sendo corrompida por líderes autoritários, refletindo críticas à corrupção do poder e à traição dos ideais revolucionários.",
  },
  {
    id: "3",
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    publisher: "HarperCollins Brasil",
    coverUrl: "https://i.pinimg.com/736x/4b/09/98/4b09981418a482010e228d8dd7bad1d9.jpg",
    status: "Indisponível",
    genre: Generos[4],
    description: "Um clássico da literatura fantástica, “O Hobbit” narra a aventura de Bilbo Bolseiro, um hobbit que parte em uma jornada inesperada ao lado de anões e do mago Gandalf em busca de um tesouro guardado por um dragão.",
  },
  {
    id: "4",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    year: 1953,
    publisher: "Biblioteca Azul",
    coverUrl: "https://i.pinimg.com/736x/7c/5b/15/7c5b153fdc40f631c995f55d26026346.jpg",
    status: "Disponível",
    genre: Generos[1],
    description: "Fahrenheit 451 é uma distopia de Ray Bradbury que se passa em um futuro onde os livros são proibidos e os 'bombeiros' queimam qualquer livro encontrado. A história segue Guy Montag, um bombeiro que começa a questionar a sociedade opressiva e a buscar conhecimento e liberdade através da leitura.",
  },
];