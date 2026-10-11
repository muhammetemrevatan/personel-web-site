import type { Metadata } from "next";
import ContactClient from "./ContactClient";
export const metadata: Metadata = { title: "Contact", description: "Get in touch with Muhammet Emre Vatan about projects, software, and collaboration." };
export default function Contact() { return <ContactClient />; }
