import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { language, text } from "@/lib/language";
type Props = { searchParams: Promise<{ lang?: string }> };
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
 const lang=language((await searchParams).lang);
 return { title:text(lang,"İletişim","Contact"), description:text(lang,"Projeler, yazılım ve iş birliği için Muhammet Emre Vatan ile iletişime geçin.","Get in touch with Muhammet Emre Vatan about projects, software, and collaboration.") };
}
export default async function Contact({ searchParams }: Props) { return <ContactClient lang={language((await searchParams).lang)} />; }
