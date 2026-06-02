import Navbar from "@/components/navbar/Navbar";
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
  title: "STA Dashboard",
  description: "STA Dashboard",
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
      <body className="min-h-full flex flex-col">
        <header className="flex-none">
          <Navbar />
        </header>
        <div className="flex flex-col flex-1 items-center justify-center">
          <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
