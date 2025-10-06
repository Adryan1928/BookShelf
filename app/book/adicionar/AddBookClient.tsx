"use client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Book } from "@/data/books";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";

type AddBookClientProps = Omit<Book, "id">;


const schema = yup.object({
  title: yup.string().required("O título é obrigatório"),
  author: yup.string().required("O autor é obrigatório"),
  publisher: yup.string().required("A editora é obrigatória"),
  year: yup
    .number()
    .typeError("Informe um ano válido")
    .max(new Date().getFullYear(), "Ano inválido")
    .required("O ano é obrigatório"),
  genre: yup.string().required("O gênero é obrigatório"),
  coverUrl: yup.string().required("A URL da capa é obrigatória"),
  status: yup.string().required("O status é obrigatório"),
  description: yup.string().required("A descrição é obrigatória"),
});

export default function AddBookPage() {
  const router = useRouter();
  const form = useForm<AddBookClientProps>({
    resolver: yupResolver(schema),
    defaultValues: {
        title: "",
        author: "",
        publisher: "",
        year: new Date().getFullYear(),
        genre: "",
        coverUrl: "",
        status: "",
        description: "",
    },
  });

  const handleSave = async (values: AddBookClientProps) => {
    const newId = 1
    router.push(`/book/${newId}`);
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
                <FormLabel>Título</FormLabel>
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
                <FormLabel>Autor</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: J.R.R. Tolkien" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Editora */}
          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Editora</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: HarperCollins" {...field} />
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
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gênero</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Fantasia" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* URL da capa */}
          <FormField
            control={form.control}
            name="coverUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da Capa</FormLabel>
                <FormControl>
                  <Input placeholder="https://exemplo.com/capa.jpg" {...field} />
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
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60 overflow-y-auto bg-white">
                    <SelectItem value="Disponível">Disponível</SelectItem>
                    <SelectItem value="Indisponível">Indisponível</SelectItem>
                    <SelectItem value="Favorito">Favorito</SelectItem>
                    <SelectItem value="Não Lido">Não Lido</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botões */}
          <div className="flex gap-3 items-center justify-end pt-4">
            <Button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer">
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
