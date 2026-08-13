import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nguyen Ngoc Thanh — AI Engineer Portfolio",
  description:
    "AI Engineer portfolio featuring machine learning, LLM, RAG and AI software engineering projects.",
  keywords: [
    "Nguyen Ngoc Thanh",
    "AI Engineer",
    "Machine Learning",
    "LLM",
    "RAG",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Nguyen Ngoc Thanh" }],
  creator: "Nguyen Ngoc Thanh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Nguyen Ngoc Thanh — AI Engineer Portfolio",
    description:
      "An interactive AI Engineer portfolio built around an evolving neural processor.",
    siteName: "AI CORE — Nguyen Ngoc Thanh",
    images: [
      {
        url: "/og.png",
        width: 1730,
        height: 909,
        alt: "AI CORE — Nguyen Ngoc Thanh, Aspiring AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyen Ngoc Thanh — AI Engineer Portfolio",
    description:
      "Machine learning, LLM, RAG and AI software engineering projects.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050608",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
