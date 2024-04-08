import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./providers/theme-provider";
import { ModeToggle } from "./_components/toggle-theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Renomeie Contratos",
  description: "Utilize o site para gerar um padrão específico de nomes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            
            {children}
          </ThemeProvider>
      <Toaster position="top-left" /></body>
    </html>
  );
}
