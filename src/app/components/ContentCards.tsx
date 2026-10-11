import Link from "next/link";
import { coverURL, type ContentRecord } from "@/services/content";
import { href, text, type Language } from "@/lib/language";
export default function ContentCards({ records, kind, lang }: { records: ContentRecord[]; kind: "projects" | "blog"; lang: Language }) {
  if (!records.length) return <p className="text-[#8892b0] py-8">{text(lang, "Henüz yayınlanmış içerik yok. Yeni çalışmalar yakında burada.", "Nothing published yet. New work will appear here soon.")}</p>;
  return <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{records.map(r => {
    const cover = coverURL(r);
    return <article key={r.id} className="rounded-2xl overflow-hidden bg-[#112240] border border-white/10 flex flex-col">
      {cover && <img src={cover} alt="" loading="lazy" className="w-full aspect-video object-cover" />}
      <div className="p-7 flex flex-col flex-1">
        <p className="text-sm text-[#64ffda] mb-3">{r.category || text(lang, kind === "projects" ? "Çalışma" : "Yazı", kind === "projects" ? "Project" : "Article")}</p>
        <h2 className="text-2xl font-semibold text-[#ccd6f6] mb-3"><Link href={href(`/${kind}/${r.slug}`, lang)}>{r.title}</Link></h2>
        <p className="text-[#8892b0] mb-5 leading-relaxed">{r.description}</p>
        {r.outcome && kind === "projects" && <p className="text-[#ccd6f6] text-sm border-l-2 border-[#64ffda] pl-4 mb-6">{r.outcome}</p>}
        <Link className="text-[#64ffda] mt-auto" href={href(`/${kind}/${r.slug}`, lang)}>{text(lang, kind === "projects" ? "Çalışmayı incele →" : "Yazıyı oku →", kind === "projects" ? "Explore the project →" : "Read the article →")}</Link>
      </div>
    </article>;
  })}</div>;
}
