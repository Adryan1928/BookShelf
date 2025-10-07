"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Book } from "@/lib/books";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Genero } from "@/lib/genero";
import { StarRating } from "@/components/Stars";
import { toast } from "sonner";

// type AddBookClientProps = Omit<Book, "id" | "createdAt" | "updatedAt" | "genre"> & {
//   genreId: string;
// };

interface AddBookClientPageProps {
  generos: Genero[];
  createBookAction: (values: any) => Promise<any>;
}

const schema = yup.object({
  title: yup.string().required("O título é obrigatório"),
  author: yup.string().required("O autor é obrigatório"),
  year: yup
    .number()
    .typeError("Informe um ano válido")
    .max(new Date().getFullYear(), "Ano inválido")
    .nullable(),
  genreId: yup.string().required("O gênero é obrigatório"),
  pages: yup
    .number()
    .typeError("Informe um número válido")
    .min(1, "O número de páginas deve ser pelo menos 1")
    .required("O número de páginas é obrigatório"),
  rating: yup
    .number()
    .typeError("Informe uma nota válida")
    .min(1, "A nota deve ser pelo menos 1")
    .max(5, "A nota deve ser no máximo 5")
    .nullable(),
  synopsis: yup.string().nullable(),
  cover: yup.string().required("A URL da capa é obrigatória"),
  isbn: yup.string().nullable(),
  notes: yup.string().nullable(),
  currentPage: yup
    .number()
    .typeError("Informe um número válido")
    .min(0, "A página atual não pode ser negativa")
    .required("A página atual é obrigatória"),
  status: yup.string().required("O status é obrigatório"),
});

type AddBookClientProps = yup.InferType<typeof schema>;

export default function AddBookPage({ generos, createBookAction }: AddBookClientPageProps) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      author: "",
      year: 0,
      genreId: "",
      pages: undefined,
      rating: undefined,
      synopsis: "",
      cover: "",
      isbn: "",
      notes: "",
      currentPage: 0,
      status: "QUERO_LER",
    },
  });

  const handleSave = async (values: AddBookClientProps) => {
    try {
      setIsLoading(true);
      const response = await createBookAction(values);
      toast.success("📘 Livro adicionado com sucesso!");
      setIsLoading(false);
      router.push(`/book/${response.id}`);
    } catch (error) {
      setIsLoading(false);
      toast.error("Erro ao salvar o livro");
    }
  };

  return (
    <section className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Adicionar Livro
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-5">
          {/* Título */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título*</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: O Hobbit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Autor */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autor*</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: J.R.R. Tolkien" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ano */}
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ex: 1937" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gênero */}
          <FormField
            control={form.control}
            name="genreId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gênero*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um gênero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white max-h-60 overflow-y-auto">
                    {generos.map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Páginas */}
          <FormField
            control={form.control}
            name="pages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Páginas*</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ex: 320" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rating */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nota</FormLabel>
                <FormControl>
                  <StarRating
                    value={field.value || 0}
                    onChange={(v) => field.onChange(v)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sinopse */}
          <FormField
            control={form.control}
            name="synopsis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sinopse</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full border border-gray-300 rounded-md p-2 min-h-[100px]"
                    placeholder="Digite um resumo do livro..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* URL da capa */}
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da Capa*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://exemplo.com/capa.jpg"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setPreview(e.target.value || null);
                    }}
                  />
                </FormControl>
                {preview && (
                  <div className="mt-3 flex justify-center">
                    <img
                      src={preview}
                      alt="Preview da capa"
                      className="w-32 h-48 object-cover rounded-md shadow-md"
                    />
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Página atual */}
          <FormField
            control={form.control}
            name="currentPage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Página Atual*</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ex: 120" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="QUERO_LER">Quero Ler</SelectItem>
                    <SelectItem value="LENDO">Lendo</SelectItem>
                    <SelectItem value="LIDO">Lido</SelectItem>
                    <SelectItem value="PAUSADO">Pausado</SelectItem>
                    <SelectItem value="ABANDONADO">Abandonado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Isbn</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 978-3-16-148410-0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notas pessoais</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Gostei muito" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botões */}
          <div className="flex gap-3 items-center justify-end pt-4">
            <Button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
