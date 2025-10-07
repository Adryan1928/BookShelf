'use client';
import { BookCard } from "@/components/bookCard";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Book } from "@/lib/books";

const formSchema = yup.object({
  search: yup.string().optional(),
  genre: yup.string().optional(),
});

export default function HomeClientPage({ books, generos }: { books: Book[], generos: string[] }) {
    const [filteredBooks, setFilteredBooks] = useState(books);

    const { theme } = useTheme();

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            search: "",
            genre: "",
        },
    });

    const onSubmit = (values: any) => {
        const { search, genre } = values;

        const filtered = books.filter((book) => {
            const matchesSearch =
                !search ||
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase());

            
            const matchesGenre = genre === "Todos" || !genre || book.genre === genre;

            return matchesSearch && matchesGenre;
        });

        setFilteredBooks(filtered);
    };
    
    return (
        <div>
        <section className="flex justify-center mb-8 items-center">
            <Form {...form}>
                <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-wrap md:flex-nowrap gap-4 items-end justify-center w-full max-w-4xl"
                >
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="flex-1 min-w-[200px]">
                            <FormLabel>Buscar por título ou autor</FormLabel>
                            <FormControl>
                            <Input
                                placeholder="Ex: O Hobbit"
                                {...field}
                            />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                        <FormItem className="min-w-1/8">
                            <FormLabel>Gênero</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Todos" />
                                    </SelectTrigger>
                                    <SelectContent className={`max-h-60 overflow-y-auto ${theme != "light"?"bg-neutral-950" : "bg-white"}`}>
                                        <SelectItem value="Todos">Todos</SelectItem>
                                        {generos.map((genre) => (
                                            <SelectItem key={genre} value={genre}>
                                            {genre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Botão */}
                <Button
                    type="submit"
                    className="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                    Filtrar
                </Button>
                </form>
            </Form>
            </section>

        <section>
            <div className={`${theme != "light" ? "bg-neutral-900" : "bg-white"} p-8 rounded-lg shadow-sm`}>
                <div className="flex flex-wrap justify-center items-center gap-6">
                    {filteredBooks.map((book) => (
                        <BookCard
                            key={book.title}
                            id={book.id}
                            title={book.title}
                            author={book.author}
                            coverUrl={book.cover}
                        />
                    ))}
                    {filteredBooks.length === 0 && (
                        <p className={theme != "light" ? "text-gray-200" : "text-gray-800"}>Nenhum livro encontrado.</p>
                    )}
                </div>
            </div>
        </section>
        </div>
    );
}