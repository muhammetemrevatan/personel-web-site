import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, coverURL, safeExternalURL } from "@/services/content";
import { href, text, type Language } from "@/lib/language";
import Markdown from "./Markdown";
import ContentUnavailable from "./ContentUnavailable";
export default async function ContentDetail({ kind, slug, lang }: { kind: "projects" | "posts"; slug: string; lang: Language }) {
  const records = await getContent(kind).catch(() => null);
  if (!records) return <div className="max-w-4xl mx-auto px-6 py-24"><ContentUnavailable lang={lang} /></div>;
  const record = records.find(r => r.slug === slug);
  if (!record) notFound();
  const contentLang = record.language;
  const path = kind === "posts" ? "/blog" : "/projects";
  const cover = coverURL(record);
  const demo = safeExternalURL(record.demo_url), source = safeExternalURL(record.source_url);
  return <article lang={contentLang} className="max-w-4xl mx-auto px-6 py-24">
    <Link href={href(path, lang)} className="text-[#64ffda]">{text(lang, "← Listeye dön", "← Back to list")}</Link>
    <p className="text-[#8892b0] mt-10 mb-4">{record.category} · {new Date(record.date).toLocaleDateString(contentLang === "tr" ? "tr-TR" : "en-US", { timeZone: "UTC" })}</p>
    <h1 className="text-4xl md:text-6xl font-bold text-[#ccd6f6] mb-6">{record.title}</h1>
    <p className="text-xl text-[#8892b0] leading-relaxed mb-10">{record.description}</p>
    {cover && <img src={cover} alt={record.title} className="w-full rounded-xl mb-10" />}
    {kind === "projects" && record.outcome && <aside className="border-l-2 border-[#64ffda] pl-6 mb-10 text-[#ccd6f6]"><h2 className="font-semibold mb-2">{text(contentLang, "Ortaya çıkan sonuç", "The outcome")}</h2>{record.outcome}</aside>}
    <Markdown>{record.content}</Markdown>
    <div className="flex flex-wrap gap-2 mt-10">{(record.tags || []).map(tag => <span key={tag} className="rounded-full bg-white/5 text-[#8892b0] px-3 py-1 text-sm">{tag}</span>)}</div>
    {kind === "projects" && <div className="flex gap-6 mt-8 text-[#64ffda]">{demo && <a href={demo} target="_blank" rel="noopener noreferrer">{text(contentLang, "Canlı demo ↗", "Live demo ↗")}</a>}{source && <a href={source} target="_blank" rel="noopener noreferrer">{text(contentLang, "Kaynak kod ↗", "Source code ↗")}</a>}</div>}
  </article>;
}
