import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Crimson_Pro, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Header";
import Footer from "@/components/layout/footer";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { site } from "@/lib/data/site";

const crimsonPro = Crimson_Pro({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const description =
  "Frontend Engineer specializing in React, Next.js and WordPress. Building fast, considered web experiences for agencies and businesses.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.role}`,
    description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f3",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${dmSans.variable} ${bebasNeue.variable} antialiased`}
    >
      <body className="flex min-h-svh flex-col">
        <noscript>
          <style>{`.js-intro{visibility:visible!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <div id="main" className="flex-1">
            {children}
          </div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
