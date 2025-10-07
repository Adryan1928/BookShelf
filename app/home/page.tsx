import { getAllBooks } from "@/lib/books";
import HomeClientPage from "./homeClient";


export default async function HomePage() {
    const books = await getAllBooks();
    
    return (
        <HomeClientPage books={books} generos={[]} />
    );
}