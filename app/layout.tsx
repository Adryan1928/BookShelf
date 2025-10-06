// /app/layout.tsx
"use client";

import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider"
import { LayoutComponent } from "@/components/layoutComponent";



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          value={{ light: "light", dark: "dark", system: "system" }}
        >
          <LayoutComponent>{children}</LayoutComponent>
        </ThemeProvider>
      </body>
    </html>
  );
}
