"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPost } from "@/utils/blog";
import { href, text, type Language } from "@/lib/language";
export default function BlogList({ initialPosts, categories, tags, lang }: { initialPosts: BlogPost[]; categories: string[]; tags: string[]; lang: Language }) {
  const [query, setQuery] = useState(""), [category, setCategory] = useState(""), [tag, setTag] = useState("");
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => initialPosts.filter(p =>
    `${p.title} ${p.description}`.toLocaleLowerCase(lang).includes(query.toLocaleLowerCase(lang)) &&
    (!category || p.category === category) && (!tag || p.tags.includes(tag))
  ), [initialPosts, query, category, tag, lang]);
  const pages = Math.max(1, Math.ceil(filtered.length / 6));
  const currentPage = Math.min(page, pages);
  const controls = "bg-[#112240] rounded-lg border border-white/10 p-3 text-[#ccd6f6]";
  return <div className="max-w-5xl mx-auto px-6 py-24" lang={lang}>
    <h1 className="text-5xl font-bold text-[#ccd6f6] mb-6">Blog</h1>
    <p className="text-xl text-[#8892b0] mb-10">{text(lang, "Geliştirme notları, deneyimler ve öğrendiklerim.", "Development notes, experiences, and things I have learned.")}</p>
    <div className="flex flex-wrap gap-3 mb-10">
      <input aria-label={text(lang, "Yazılarda ara", "Search articles")} placeholder={text(lang, "Yazılarda ara…", "Search articles…")} className={`${controls} flex-1 min-w-48`} value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} />
      <select aria-label={text(lang, "Kategori", "Category")} className={controls} value={category} onChange={e => { setCategory(e.target.value); setPage(1); }}><option value="">{text(lang, "Tüm kategoriler", "All categories")}</option>{categories.map(c => <option key={c}>{c}</option>)}</select>
      <select aria-label={text(lang, "Etiket", "Tag")} className={controls} value={tag} onChange={e => { setTag(e.target.value); setPage(1); }}><option value="">{text(lang, "Tüm etiketler", "All tags")}</option>{tags.map(t => <option key={t}>{t}</option>)}</select>
    </div>
    {!filtered.length && <p role="status" className="text-[#8892b0]">{text(lang, initialPosts.length ? "Aramana uygun yazı bulunamadı." : "Bu dilde henüz yayınlanmış yazı yok.", initialPosts.length ? "No articles match your search." : "No articles published in this language yet.")}</p>}
    <div className="space-y-6">{filtered.slice((currentPage - 1) * 6, currentPage * 6).map(p => <article key={p.slug} className="rounded-xl bg-[#112240] p-7 border border-white/10">
      <p className="text-sm text-[#8892b0] mb-4">{p.date} · {p.readTime} · {p.category}</p>
      <h2 className="text-2xl text-[#ccd6f6] font-semibold mb-3"><Link href={href(`/blog/${p.slug}`, lang)}>{p.title}</Link></h2>
      <p className="text-[#8892b0] mb-5">{p.description}</p>
      <Link href={href(`/blog/${p.slug}`, lang)} className="text-[#64ffda]">{text(lang, "Yazıyı oku →", "Read the article →")}</Link>
    </article>)}</div>
    {pages > 1 && <div className="flex items-center justify-center gap-5 mt-10 text-[#ccd6f6]"><button className={controls} disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>{text(lang, "Önceki", "Previous")}</button><span>{currentPage} / {pages}</span><button className={controls} disabled={currentPage === pages} onClick={() => setPage(currentPage + 1)}>{text(lang, "Sonraki", "Next")}</button></div>}
  </div>;
}
