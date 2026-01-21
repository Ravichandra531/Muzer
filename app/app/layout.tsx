import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import Appbar from "./components/Appbar";
import { Footer } from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muzer - Let Fans Choose the Music",
  description: "The ultimate music streaming platform for creators and fans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <Providers>
          <Appbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>

      </body>
    </html>
  );
}
