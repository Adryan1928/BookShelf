"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";

const menu = [
  { label: "Home", href: "/home" },
  { label: "Dashboard", href: "/" },
  { label: "Adicionar Livro", href: "/add-book" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="flex min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <aside className="w-60 bg-red-800 text-white flex flex-col p-4">
            <div className="flex-grow">
              <h1 className="text-2xl font-bold mb-12 mt-4 text-white">BookShelf</h1>
              <nav className="flex flex-col space-y-2">
                {menu.map((item) => {
                  const ativo = isClient && pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-4 py-2 rounded-md font-medium text-lg transition-colors duration-200 ${
                        ativo
                          ? "bg-white text-red-800"
                          : "hover:bg-red-700 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="flex-1 p-8 bg-background">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}