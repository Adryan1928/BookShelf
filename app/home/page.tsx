"use client";
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
import { books as Books, Generos } from "@/data/books";



const formSchema = yup.object({
  search: yup.string().optional(),
  genre: yup.string().optional(),
});

export default function HomePage() {
    const [filteredBooks, setFilteredBooks] = useState(Books);

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            search: "",
            genre: "",
        },
    });

    const onSubmit = (values: any) => {
        const { search, genre } = values;

        const filtered = Books.filter((book) => {
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
                    className="flex gap-4 items-end justify-center w-full"
                >
                    <FormField
                        control={form.control}
                        name="search"
                        render={({ field }) => (
                            <FormItem className="flex-1 max-w-2/3">
                                <FormLabel>Buscar por título ou autor</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: O Hobbit" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Gênero</FormLabel>

                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todos" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-60 overflow-y-auto bg-white">
                                        <SelectItem value="Todos">
                                            Todos
                                        </SelectItem>
                                        {Generos.map((genre) => (
                                            <SelectItem key={genre} value={genre}>
                                                {genre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="bg-blue-500 text-white">
                        Filtrar
                    </Button>
                </form>
            </Form>
        </section>

        <section>
            <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="flex flex-wrap justify-center items-center gap-6">
                {filteredBooks.map((book) => (
                    <BookCard
                        key={book.title}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        coverUrl={book.coverUrl}
                    />
                ))}
            </div>
            </div>
        </section>
        </div>
    );
}