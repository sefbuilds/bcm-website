import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import { SITE_INFO } from "@/lib/constants";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nbcmallorca.com"),
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
      className={`${outfit.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-text">
        {children}
      </body>
    </html>
  );
}
