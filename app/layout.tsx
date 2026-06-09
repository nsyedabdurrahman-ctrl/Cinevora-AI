import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinevora AI - AI Video & Ad Generator",
  description:
    "Cinevora AI creates cinematic ads, product videos, and AI-generated scenes instantly.",
  keywords: ["Cinevora AI", "AI video generator", "cinematic ads", "AI ads"],
  verification: {
    google: "j-2j3MEw0TAknCgyc6jH7ur2wOdA6jenWVcFHTGzL10",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
