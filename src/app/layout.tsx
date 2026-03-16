import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Minnesota Vikings BR | A Maior Comunidade Vikings do Brasil",
  description:
    "A principal comunidade dos fãs do Minnesota Vikings no Brasil. Notícias, podcast, fantasy football e muito mais em português.",
  openGraph: {
    title: "Minnesota Vikings BR",
    description: "A principal comunidade dos fãs do Minnesota Vikings no Brasil.",
    url: "https://minnesotavikingsbr.com",
    siteName: "Minnesota Vikings BR",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
