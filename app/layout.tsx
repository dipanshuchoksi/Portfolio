import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import { siteConfig } from "@/config";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { Download } from "lucide-react";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  authors: [
    {
      name: siteConfig.name,
    },
  ],
  creator: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Tailwind",
    "Server Components",
    "JavaScript",
    "TypeScript",
    "JSX",
    "TSX",
    "JS",
    "Node.js",
  ],
  openGraph: {
    description: siteConfig.description,
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.name,
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased relative">
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
        <Analytics />
        <div className="fixed z-50 bottom-6 right-6">
          <a
            href="/api/resume"
            download
            className="group relative flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary/80 backdrop-blur-xl border border-white/10 text-sm font-medium text-foreground transition-all duration-500 hover:bg-primary/10 hover:border-primary/30 hover:scale-105 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="relative z-10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Find My Resume
            </span>
          </a>
        </div>
      </body>
    </html>
  );
}
