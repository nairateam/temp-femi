import type { Metadata } from "next";
import { Crimson_Pro, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/footer";

const crimsonPro = Crimson_Pro({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Oluwafemi Onabule — Frontend Engineer",
  description:
    "Frontend Engineer specializing in React, Next.js and WordPress. Building high-performance web experiences for agencies and businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}