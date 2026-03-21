import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", weight: ["400", "500", "600", "700"] });

const BASE_URL = "https://minnesotavikingsbr.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Minnesota Vikings BR | A Maior Comunidade Vikings do Brasil",
    template: "%s | Minnesota Vikings BR",
  },
  description:
    "A principal comunidade de fãs do Minnesota Vikings no Brasil. Notícias, podcast, Fantasy MVB e muito mais em português. #SKOL 🇧🇷",
  keywords: [
    "Minnesota Vikings",
    "Minnesota Vikings Brasil",
    "Vikings BR",
    "NFL Brasil",
    "Fantasy Football Brasil",
    "Podcast NFL",
    "Futebol Americano Brasil",
    "SKOL",
    "MVB",
  ],
  authors: [{ name: "Minnesota Vikings BR" }],
  creator: "Minnesota Vikings BR",
  publisher: "Minnesota Vikings BR",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Minnesota Vikings BR | A Maior Comunidade Vikings do Brasil",
    description:
      "A principal comunidade de fãs do Minnesota Vikings no Brasil. Notícias, podcast, Fantasy MVB e muito mais em português.",
    url: BASE_URL,
    siteName: "Minnesota Vikings BR",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minnesota Vikings BR",
    description:
      "A principal comunidade de fãs do Minnesota Vikings no Brasil. #SKOL 🇧🇷",
    site: "@VikingsBrasil_",
    creator: "@VikingsBrasil_",
  },
  alternates: {
    canonical: BASE_URL,
  },
  manifest: "/manifest.json",
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
