import { NextResponse } from "next/server";
import { deleteBookById } from "../../../../lib/books";


export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await deleteBookById(params.id);
    return NextResponse.json({ message: "Livro excluído com sucesso" });
  } catch {
    return NextResponse.json({ error: "Erro ao excluir o livro" }, { status: 500 });
  }
}