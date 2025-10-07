-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "year" INTEGER,
    "pages" INTEGER NOT NULL,
    "rating" INTEGER,
    "synopsis" TEXT,
    "cover" TEXT NOT NULL,
    "isbn" TEXT,
    "notes" TEXT,
    "currentPage" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'QUERO_LER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "genreId" TEXT NOT NULL,
    CONSTRAINT "Book_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");
