import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ScrollReveal } from "./ScrollReveal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A1 Outdoor | Billboard Advertising Tanzania",
  description:
    "A1 Outdoor is a market leader in outdoor advertising in Tanzania with footprint in Kenya and Zambia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
