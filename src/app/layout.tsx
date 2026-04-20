import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { SITE_INFO } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nederlandstaligebusinessclub.nl"),
  title: {
    default: `${SITE_INFO.fullName} | ${SITE_INFO.name}`,
    template: `%s | ${SITE_INFO.name}`,
  },
  description:
    "Het netwerk voor Nederlandstalige ondernemers op Mallorca. Samen netwerken, kennis delen en groeien tijdens warme, informele bijeenkomsten op de Balearen.",
  openGraph: {
    title: `${SITE_INFO.fullName} | ${SITE_INFO.name}`,
    description:
      "Het netwerk voor Nederlandstalige ondernemers op Mallorca.",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-ink text-pearl">
        {children}
      </body>
    </html>
  );
}
