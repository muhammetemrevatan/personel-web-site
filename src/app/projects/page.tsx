export const metadata = { title: "Projects", description: "Selected software projects by Muhammet Emre Vatan: problems, decisions, and outcomes." };
import { getContent } from "@/services/content";
import { language, text } from "@/lib/language";
import ContentCards from "../components/ContentCards";
import ContentUnavailable from "../components/ContentUnavailable";
export const dynamic = "force-dynamic";
export default async function Projects({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang = language((await searchParams).lang);
  const result = await getContent("projects", lang).then(records => ({ records })).catch(() => null);
  return <div className="max-w-6xl mx-auto px-6 py-24"><h1 className="text-5xl md:text-7xl tracking-tighter font-medium text-[var(--foreground)] mb-6">{text(lang, "Çalışmalarım", "My work")}</h1><p className="text-xl text-[var(--muted)] mb-12">{text(lang, "Fikirler, çözümler ve ortaya çıkan ürünler.", "Ideas, solutions, and the products that came out of them.")}</p>{result ? <ContentCards records={result.records} kind="projects" lang={lang} /> : <ContentUnavailable lang={lang} />}</div>;
}
