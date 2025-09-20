"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useRouter } from "next/router"; // se estiver usando pages/
import { toast } from "sonner";

export function DeleteBookDialog({
  open,
  bookId,
  onClose,
}: {
  open: boolean;
  bookId: string;
  onClose: () => void;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await fetch(`/api/books/${bookId}`, { method: "DELETE" });
      toast.success("Livro excluído com sucesso!");
      router.push("/bookshelf"); // ou router.reload() se quiser atualizar
    } catch {
      toast.error("Erro ao excluir o livro.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Excluir livro</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Tem certeza que deseja excluir este livro? Essa ação não pode ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="error" onClick={handleDelete}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
