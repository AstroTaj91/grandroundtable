import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use Inter as 'display' font equivalent
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Grand Round Table",
  description: "AI-Powered Expert Board Room for Idea Validation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased bg-background-dark text-white`}
      >
        {children}
      </body>
    </html>
  );
}

