import prisma from "./prisma";

export type Genero = {
  id: string;
  name: string;
}

export async function getAllGeneros(): Promise<Genero[]> {
  return prisma.genre.findMany();
}
