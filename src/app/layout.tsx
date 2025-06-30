import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema de Recomendación de Propiedades - Alt94",
  description: "Aplicación moderna para visualizar propiedades y obtener recomendaciones inteligentes basadas en similitudes",
  keywords: "propiedades, recomendaciones, inmobiliaria, Next.js, React",
  authors: [{ name: "Alt94 Strategy & Development" }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased font-sans bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
