import { prisma } from "@/lib/prisma";

export async function getBookById(id: string) {
  return prisma.book.findUnique({
    where: { id },
    include: { genre: true },
  });
}
