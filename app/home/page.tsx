import { getAllBooks } from "@/lib/books";
import HomeClientPage from "./homeClient";
import { getAllGeneros } from "@/lib/genero";


export default async function HomePage() {
    const books = await getAllBooks();
    const generos = await getAllGeneros();
    
    return (
        <HomeClientPage books={books} generos={generos.map(genero => genero.name)} />
    );
}