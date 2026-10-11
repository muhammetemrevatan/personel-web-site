"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPost } from "@/utils/blog";
import { href, text, type Language } from "@/lib/language";
export default function BlogList({ initialPosts, categories, tags, lang }: { initialPosts: BlogPost[]; categories: string[]; tags: string[]; lang: Language }) {
  const [query, setQuery] = useState(""), [category, setCategory] = useState(""), [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  const [contentLanguage, setContentLanguage] = useState("");
  const filtered = useMemo(() => initialPosts.filter(p =>
    `${p.title} ${p.description}`.toLocaleLowerCase(lang).includes(query.toLocaleLowerCase(lang)) &&
    (!category || p.category === category) && (!tag || p.tags.includes(tag)) && (!contentLanguage || p.language === contentLanguage)
  ), [initialPosts, query, category, tag, lang, contentLanguage]);
  const pages = Math.max(1, Math.ceil(filtered.length / 6));
  const currentPage = Math.min(page, pages);
  const controls = "bg-[var(--surface)] rounded-lg border border-[var(--border)] p-3 text-[var(--foreground)]";
  return <div className="max-w-5xl mx-auto px-6 py-24" lang={lang}>
    <p className="eyebrow mb-6">{text(lang, "Notlar ve fikirler", "Notes & ideas")}</p>
    <h1 className="text-5xl md:text-7xl tracking-tighter font-medium text-[var(--foreground)] mb-6">{text(lang, "Yazılarım", "Writing")}</h1>
    <p className="text-xl text-[var(--muted)] mb-10">{text(lang, "Geliştirme notları, deneyimler ve öğrendiklerim.", "Development notes, experiences, and things I have learned.")}</p>
    <div className="flex flex-wrap gap-3 mb-10">
      <select aria-label="Article language" className={controls} value={contentLanguage} onChange={e => { setContentLanguage(e.target.value); setPage(1); }}><option value="">{text(lang, "Tüm diller", "All languages")}</option><option value="en">English</option><option value="tr">Türkçe</option></select>
      <input aria-label={text(lang, "Yazılarda ara", "Search articles")} placeholder={text(lang, "Yazılarda ara…", "Search articles…")} className={`${controls} flex-1 min-w-48`} value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} />
      <select aria-label={text(lang, "Kategori", "Category")} className={controls} value={category} onChange={e => { setCategory(e.target.value); setPage(1); }}><option value="">{text(lang, "Tüm kategoriler", "All categories")}</option>{categories.map(c => <option key={c}>{c}</option>)}</select>
      <select aria-label={text(lang, "Etiket", "Tag")} className={controls} value={tag} onChange={e => { setTag(e.target.value); setPage(1); }}><option value="">{text(lang, "Tüm etiketler", "All tags")}</option>{tags.map(t => <option key={t}>{t}</option>)}</select>
    </div>
    {!filtered.length && <p role="status" className="text-[var(--muted)]">{text(lang, initialPosts.length ? "Aramana uygun yazı bulunamadı." : "Bu dilde henüz yayınlanmış yazı yok.", initialPosts.length ? "No articles match your search." : "No articles published in this language yet.")}</p>}
    <p className="text-xs text-[var(--muted)] mb-6" role="status">{filtered.length} {text(lang, "yazı", "articles")}</p>
    <div className="divide-y divide-[var(--border)]">{filtered.slice((currentPage - 1) * 6, currentPage * 6).map(p => <article key={p.slug} lang={p.language} className="py-8 first:pt-0">
      <p className="text-xs text-[var(--muted)] mb-4">{p.date} · {p.readTime} · {p.language === "en" ? "English" : "Türkçe"} · {p.category}</p>
      <h2 className="text-2xl text-[var(--foreground)] font-semibold mb-3"><Link href={href(`/blog/${p.slug}`, lang)}>{p.title}</Link></h2>
      <p className="text-[var(--muted)] mb-5">{p.description}</p>
      <Link href={href(`/blog/${p.slug}`, lang)} className="text-[var(--accent)]">{text(lang, "Yazıyı oku →", "Read the article →")}</Link>
    </article>)}</div>
    {pages > 1 && <div className="flex items-center justify-center gap-5 mt-10 text-[var(--foreground)]"><button className={controls} disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>{text(lang, "Önceki", "Previous")}</button><span>{currentPage} / {pages}</span><button className={controls} disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}>{text(lang, "Sonraki", "Next")}</button></div>}
  </div>;
}
