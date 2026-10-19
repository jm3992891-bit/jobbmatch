import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Labora",
  description: "Sube tu CV y encuentra el trabajo ideal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-institutional-light">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
