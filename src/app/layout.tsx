import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import NavigationButtons from "./components/NavigationButtons";

const inter = Inter({ subsets: ["latin"] });
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing-script",
});

export const metadata: Metadata = {
  title: "Muhammet Emre Vatan - Software Engineer",
  description:
    "Software Engineer with expertise in Java, Spring Boot, and cloud technologies. Specialized in building scalable backend solutions, microservices architecture, and full-stack development with React and Next.js. View my portfolio and projects.",
  keywords:
    "Software Engineer, Java Developer, Spring Boot, React, Next.js, Full Stack Developer, Backend Developer, Cloud Technologies, Microservices, Istanbul, Turkey",
  authors: [{ name: "Muhammet Emre Vatan" }],
  creator: "Muhammet Emre Vatan",
  publisher: "Muhammet Emre Vatan",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "https://muhammetemrevatan.com",
    languages: {
      "en-US": "https://muhammetemrevatan.com",
      "tr-TR": "https://muhammetemrevatan.com/tr",
    },
  },
  openGraph: {
    title: "Muhammet Emre Vatan - Software Engineer",
    description:
      "Software Engineer specializing in Java, Spring Boot, microservices, and cloud technologies. Building scalable backend solutions and modern web applications.",
    url: "https://muhammetemrevatan.com",
    siteName: "Muhammet Emre Vatan",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 600,
        alt: "Muhammet Emre Vatan - Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Turkey",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 200,
      noimageindex: false,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammet Emre Vatan - Software Engineer",
    description:
      "Building scalable backend solutions and modern web applications with Java, Spring Boot, and cloud technologies.",
    creator: "@memrevatan",
    images: ["/profile.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
  category: "technology",
  classification: "Software Development, Web Development, Backend Development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${dancingScript.variable} bg-[#0a192f]`}
      >
        <main>{children}</main>
        <NavigationButtons />
      </body>
    </html>
  );
}
