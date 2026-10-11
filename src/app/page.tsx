import Link from "next/link";
import { getContent } from "@/services/content";
import { language, href, text } from "@/lib/language";
import ContentCards from "./components/ContentCards";
import ContentUnavailable from "./components/ContentUnavailable";
export const dynamic = "force-dynamic";
export default async function Home({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang = language((await searchParams).lang);
  const [projects, posts] = await Promise.allSettled([getContent("projects", lang), getContent("posts", lang)]);
  return <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">
    <section className="max-w-4xl mb-28">
      <p className="text-[#64ffda] mb-6">Muhammet Emre Vatan · {text(lang, "Yazılım Mühendisi", "Software Engineer")}</p>
      <h1 className="text-5xl md:text-7xl font-bold text-[#ccd6f6] tracking-tight leading-tight mb-8">{text(lang, "Fikirleri çalışan ürünlere dönüştürüyorum.", "Turning ideas into working products.")}</h1>
      <p className="text-xl leading-relaxed text-[#8892b0] max-w-2xl mb-10">{text(lang, "Burada geliştirdiğim projeleri, çözdüğüm problemleri ve yol boyunca öğrendiklerimi paylaşıyorum.", "A collection of projects I have built, problems I have solved, and things I have learned along the way.")}</p>
      <div className="flex flex-wrap gap-5"><Link href={href("/projects", lang)} className="rounded-lg bg-[#64ffda] text-[#0a192f] px-6 py-3 font-semibold">{text(lang, "Çalışmalarımı keşfet", "Explore my work")}</Link><Link href={href("/blog", lang)} className="rounded-lg border border-white/20 text-[#ccd6f6] px-6 py-3">{text(lang, "Yazılarımı oku", "Read my writing")}</Link></div>
    </section>
    <section className="mb-24"><div className="flex flex-wrap justify-between items-center gap-4 mb-8"><h2 className="text-3xl font-semibold text-[#ccd6f6]">{text(lang, "Seçili çalışmalar", "Selected work")}</h2><Link href={href("/projects", lang)} className="text-[#64ffda]">{text(lang, "Tüm projeler →", "All projects →")}</Link></div>
      {projects.status === "fulfilled" ? <ContentCards records={projects.value.filter(p => p.featured).slice(0, 3)} kind="projects" lang={lang} /> : <ContentUnavailable lang={lang} />}
    </section>
    <section><div className="flex flex-wrap justify-between items-center gap-4 mb-8"><h2 className="text-3xl font-semibold text-[#ccd6f6]">{text(lang, "Son yazılar", "Recent writing")}</h2><Link href={href("/blog", lang)} className="text-[#64ffda]">{text(lang, "Tüm yazılar →", "All articles →")}</Link></div>
      {posts.status === "fulfilled" ? <ContentCards records={posts.value.slice(0, 3)} kind="blog" lang={lang} /> : <ContentUnavailable lang={lang} />}
    </section>
  </div>;
}
