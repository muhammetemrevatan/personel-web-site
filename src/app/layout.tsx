import type { Metadata } from "next";
import { Suspense } from "react";

import "./globals.css";
import NavigationButtons from "./components/NavigationButtons";

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammetemrevatan.com"),
  title: { default: "Muhammet Emre Vatan", template: "%s · Muhammet Emre Vatan" },
  description: "Geliştirdiğim projeler, çözdüğüm problemler ve yazılım geliştirme notlarım. Projects, solutions, and development notes.",
  authors: [{ name: "Muhammet Emre Vatan" }],
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "Muhammet Emre Vatan", siteName: "Muhammet Emre Vatan", type: "website" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="tr"><body className="bg-[#0a192f] font-sans"><Suspense fallback={<div className="h-20" />}><NavigationButtons /></Suspense><main>{children}</main><footer className="max-w-6xl mx-auto px-6 py-10 border-t border-white/10 text-sm text-[#8892b0]">© {new Date().getFullYear()} Muhammet Emre Vatan</footer></body></html>;
}
