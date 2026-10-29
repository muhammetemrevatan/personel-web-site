import Link from "next/link";
import { coverURL, safeExternalURL, type ContentRecord } from "@/services/content";
import { href, text, type Language } from "@/lib/language";
export default function ContentCards({ records, kind, lang }: { records: ContentRecord[]; kind: "projects" | "blog"; lang: Language }) {
  if (!records.length) return <p className="text-[var(--muted)] py-8">{text(lang, "Yeni çalışmalar yakında burada.", "New work will appear here soon.")}</p>;
  return <div className={kind === "blog" ? "divide-y divide-[var(--border)]" : "grid gap-6 md:grid-cols-2"}>{records.map(r => {
    const cover = coverURL(r);
    const source = safeExternalURL(r.source_url);
    return <article key={r.id} className={kind === "blog" ? "py-7 first:pt-0 grid md:grid-cols-[180px_1fr] gap-4 md:gap-10" : "overflow-hidden bg-[var(--surface)] border border-[var(--border)] flex flex-col rounded-lg"}>
      {cover && kind === "projects" && <img src={cover} alt="" loading="lazy" className="w-full aspect-video object-cover" />}
      {kind === "blog" && <p className="text-xs text-[var(--muted)] pt-2">{r.date.slice(0,10)} · {r.language.toUpperCase()}</p>}
      <div className={kind === "blog" ? "" : "p-7 flex flex-col flex-1"}>
        {kind === "projects" && <p className="eyebrow mb-4">{r.category || "Project"}</p>}
        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-[var(--foreground)] mb-3"><Link href={href(`/${kind}/${r.slug}`, lang)}>{r.title}</Link></h3>
        <p className="text-[var(--muted)] leading-relaxed max-w-2xl">{r.description}</p>
        {r.outcome && kind === "projects" && <p className="text-[var(--foreground)] text-sm border-l-2 border-[var(--accent)] pl-4 mt-6">{r.outcome}</p>}
        {kind === "projects" && <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm mt-7"><Link href={href(`/${kind}/${r.slug}`, lang)}>{text(lang, "Çalışmayı incele ↗", "View project ↗")}</Link>{source && <a href={source} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">GitHub ↗</a>}</div>}
      </div>
    </article>;
  })}</div>;
}
