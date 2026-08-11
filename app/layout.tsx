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
      </body>
    </html>
  );
}
