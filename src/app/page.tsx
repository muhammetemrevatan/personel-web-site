import Link from "next/link";
import { getContent } from "@/services/content";
import { language, href, text } from "@/lib/language";
import ContentCards from "./components/ContentCards";
import ContentUnavailable from "./components/ContentUnavailable";
export const dynamic = "force-dynamic";
export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang = language((await searchParams).lang);
  const [projects, posts] = await Promise.allSettled([getContent("projects"), getContent("posts")]);
  const selected = projects.status === "fulfilled" ? projects.value.filter(p => p.featured) : [];
  return <div className="max-w-6xl mx-auto px-6 md:px-10">
    <section className="pt-20 md:pt-28 pb-20 md:pb-28 border-b border-[var(--border)]">
      <p className="eyebrow mb-9">{text(lang, "Kişisel portföy / Yazılım mühendisi", "Personal portfolio / Software engineer")}</p>
      <h1 className="portfolio-title mb-10">Muhammet<br />Emre Vatan<span className="text-[var(--accent)]">.</span></h1>
      <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-end">
        <p className="text-lg md:text-xl leading-relaxed text-[var(--muted)] max-w-lg">{text(lang, "Fikirleri çalışan yazılımlara dönüştürüyorum. Burada yaptığım işleri, çözüm süreçlerini ve öğrendiklerimi paylaşıyorum.", "I build software that turns ideas into something useful. This is where I share my work, the decisions behind it, and what I learn along the way.")}</p>
        <div className="flex flex-wrap gap-7 md:justify-end text-sm"><Link href={href("/projects", lang)} className="border-b border-[var(--accent)] pb-2">{text(lang, "Çalışmalarımı keşfet ↗", "Explore my work ↗")}</Link><a href="mailto:muhammetemrevatan@gmail.com" className="text-[var(--muted)] border-b border-[var(--border)] pb-2">{text(lang, "İletişime geç ↗", "Get in touch ↗")}</a></div>
      </div>
    </section>
    <section className="py-16 md:py-20 border-b border-[var(--border)]">
      <div className="flex justify-between items-baseline gap-4 mb-9"><h2 className="section-heading">{text(lang, "Seçili çalışmalar", "Selected work")}</h2><Link href={href("/projects", lang)} className="text-sm text-[var(--muted)]">{text(lang, "Tüm çalışmalar ↗", "All work ↗")}</Link></div>
      {projects.status === "fulfilled" ? (projects.value.length ? <ContentCards records={(selected.length ? selected : projects.value).slice(0, 3)} kind="projects" lang={lang} /> : <div className="max-w-xl"><p className="text-[var(--muted)] leading-relaxed">{text(lang, "Proje hikayelerimi hazırlıyorum. Bu sırada geliştirme notlarıma göz atabilir veya GitHub üzerinden çalışmalarımı inceleyebilirsin.", "I am putting together the stories behind my projects. In the meantime, explore my development notes or visit my GitHub.")}</p><a href="https://github.com/muhammetemrevatan" target="_blank" rel="noopener noreferrer" className="inline-block mt-5 text-sm">GitHub ↗</a></div>) : <ContentUnavailable lang={lang} />}
    </section>
    <section className="py-16 md:py-20"><div className="flex justify-between items-baseline gap-4 mb-9"><h2 className="section-heading">{text(lang, "Notlar ve yazılar", "Notes & writing")}</h2><Link href={href("/blog", lang)} className="text-sm text-[var(--muted)]">{text(lang, "Tüm yazılar ↗", "All writing ↗")}</Link></div>
      {posts.status === "fulfilled" ? <ContentCards records={posts.value.filter(p => p.language === lang).slice(0, 3)} kind="blog" lang={lang} /> : <ContentUnavailable lang={lang} />}
    </section>
    <section className="border-t border-[var(--border)] py-16 flex flex-wrap justify-between items-center gap-6"><div><p className="eyebrow mb-3">{text(lang, "Bir fikrin mi var?", "Have something in mind?")}</p><h2 className="text-3xl tracking-tight">{text(lang, "Birlikte konuşalım.", "Let's talk about it.")}</h2></div><a href="mailto:muhammetemrevatan@gmail.com" className="text-sm border-b border-[var(--accent)] pb-2">muhammetemrevatan@gmail.com ↗</a></section>
  </div>;
}
