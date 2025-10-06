import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ModeToggle } from "./toggle-theme";

const menu = [
  { label: "Home", href: "/home" },
  { label: "Dashboard", href: "/" },
  { label: "Adicionar Livro", href: "/book/adicionar" },
];


export function LayoutComponent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setIsClient(true);
    }, []);

    
    return (
        <section className={`flex min-h-screen transition-colors duration-300 ${theme == "dark" ? "bg-neutral-800" : "bg-gray-100"}`}>
          <aside className={`w-60 ${theme == "dark" ? "bg-red-950" : "bg-red-700"} text-white flex flex-col p-4`}>
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

          <main className="flex-1 p-8">
            <div>
              <ModeToggle />
            </div>
            {children}
          </main>
        </section>
    )
}