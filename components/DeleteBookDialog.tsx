"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { deleteBook } from "@/lib/books";

interface DeleteBookDialogProps {
  open: boolean;
  bookId: string;
  onClose: () => void;
  deleteBook: (id: string) => Promise<void>;
}

export function DeleteBookDialog({ open, bookId, onClose, deleteBook }: DeleteBookDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        setIsLoading(true);
        await deleteBook(bookId);
        toast.success("📘 Livro excluído com sucesso!");
        onClose();
        setIsLoading(false);
        router.push("/");
      } catch {
        setIsLoading(false);
        toast.error("Erro ao excluir o livro.");
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-neutral-950 border-border text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir livro</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir este livro? Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} disabled={isPending || isLoading}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending || isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isPending || isLoading ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
