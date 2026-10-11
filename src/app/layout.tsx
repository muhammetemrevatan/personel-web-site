import type { Metadata } from "next";
import { Suspense } from "react";

import "./globals.css";
import NavigationButtons from "./components/NavigationButtons";
const themeScript = "try{document.documentElement.dataset.theme=localStorage.getItem('portfolio-theme')==='light'?'light':'dark'}catch{}";

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammetemrevatan.com"),
  title: { default: "Muhammet Emre Vatan", template: "%s · Muhammet Emre Vatan" },
  description: "The personal portfolio of Muhammet Emre Vatan. Software projects, ideas, and development notes.",
  authors: [{ name: "Muhammet Emre Vatan" }],
  alternates: { types: { "application/rss+xml": "/feed.xml" } },
  icons: { icon: [{ url: "/favicon.svg?v=2", type: "image/svg+xml" }, { url: "/favicon.ico?v=2", sizes: "any" }], apple: "/apple-touch-icon.png" },
  openGraph: { title: "Muhammet Emre Vatan", siteName: "Muhammet Emre Vatan", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body className="bg-[var(--background)] font-sans"><Suspense fallback={<div className="h-20" />}><NavigationButtons /></Suspense><main>{children}</main><footer className="max-w-6xl mx-auto px-6 md:px-10 py-8 border-t border-[var(--border)] text-xs text-[var(--muted)] flex flex-wrap justify-between gap-5"><span>© {new Date().getFullYear()} Muhammet Emre Vatan</span><div className="flex flex-wrap gap-6"><a href="mailto:muhammetemrevatan@gmail.com">Email ↗</a><a href="https://github.com/muhammetemrevatan" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/muhammetemrevatan/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></footer></body></html>;
}
