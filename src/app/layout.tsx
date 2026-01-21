import type React from "react";

import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import { Providers } from "./providers";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "@/styles/globals.css";

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Royal Mail Barcode Validator",
  description: "Validate Royal Mail barcode format",
  generator: "Next.js",
  applicationName: "Next.js",
  authors: [{ name: "Ify", url: "https://github.com/IfyNdu" }],
};

export const viewport: Viewport = {
  themeColor: "#da202a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-rm antialiased">
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
