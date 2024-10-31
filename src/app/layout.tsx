import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Football Stats - Resultados e Estatísticas de Jogos",
  description: "Acompanhe os últimos resultados, estatísticas detalhadas, classificação e dados completos das partidas de futebol do Brasileirão e outras ligas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client = {queryClient}>
          {children}
        </QueryClientProvider>

      </body>
    </html>
  );
}
