// /app/layout.tsx
"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";

const menu = [
  { label: "Home", href: "/home" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Adicionar Livro", href: "/add-book" },
  { label: "Editar Livro", href: "/edit-book" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen bg-gray-100">
        <aside className="w-60 bg-red-800 text-white flex flex-col p-4">
          <h1 className="text-2xl font-bold mb-12 mt-4">BookShelf</h1>
          <nav className="flex flex-col space-y-2">
            {menu.map((item) => {
              const ativo = isClient && pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-md font-medium text-lg transition-colors duration-200 ${
                    ativo ? "bg-white text-red-800" : "hover:bg-red-700 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}
