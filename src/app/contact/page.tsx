import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact - Muhammet Emre Vatan",
  description:
    "Get in touch with me for any questions or collaboration opportunities.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
