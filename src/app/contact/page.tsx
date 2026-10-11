import { language, text } from "@/lib/language";
export default async function Contact({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang = language((await searchParams).lang);
  return <div className="max-w-4xl mx-auto px-6 py-24"><h1 className="text-5xl text-[#ccd6f6] font-bold mb-8">{text(lang, "Birlikte bir şeyler üretelim.", "Let's build something together.")}</h1><p className="text-xl text-[#8892b0] mb-10">{text(lang, "Bir proje fikrin veya paylaşmak istediğin bir şey varsa bana yazabilirsin.", "Have a project idea or something you would like to share? Get in touch.")}</p><a className="inline-block rounded-lg bg-[#64ffda] text-[#0a192f] px-6 py-3" href="mailto:muhammetemrevatan@gmail.com">{text(lang, "E-posta gönder", "Send an email")}</a></div>;
}
