import type { Metadata } from "next";
import Link from "next/link";
import { language, text, href } from "@/lib/language";
type Props = { searchParams: Promise<{ lang?: string }> };
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
 const lang=language((await searchParams).lang);
 return { title:text(lang,"Hakkımda","About"), description:text(lang,"Muhammet Emre Vatan ve kişisel portföyündeki çalışmalar hakkında.","About Muhammet Emre Vatan and the work behind this personal portfolio.") };
}
export default async function About({ searchParams }: Props) {
 const lang=language((await searchParams).lang);
 return <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 md:py-24"><p className="eyebrow mb-6">{text(lang,"Hakkımda","About me")}</p><h1 className="text-5xl md:text-7xl font-medium tracking-tighter mb-10">{text(lang,"İşlerin ardındaki","The person")}<br />{text(lang,"kişi.","behind the work.")}</h1><div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 border-t border-[var(--border)] pt-10"><p className="text-sm text-[var(--muted)]">Muhammet Emre Vatan<br />{text(lang,"Yazılım mühendisi","Software engineer")}</p><div className="max-w-[65ch] space-y-6 text-lg leading-relaxed text-[var(--muted)]"><p>{text(lang,"Fikirleri çalışan yazılımlara dönüştürmekten keyif alıyorum. Bu portföy, geliştirdiğim işleri ve onları yaparken öğrendiklerimi bir araya getiriyor.","I enjoy turning ideas into working software. This portfolio brings together the things I build and the lessons I take from building them.")}</p><p>{text(lang,"Yaptığım işi anlatmayı önemsiyorum: bir projenin çözdüğü problem, süreç boyunca yapılan tercihler ve ortaya çıkan sonuç. Yazılarımda geliştirme notlarımı paylaşıyor ve fikirleri daha ayrıntılı ele alıyorum.","I care about explaining the work: the problem a project addresses, the choices made along the way, and the outcome. My writing is a place to share development notes and explore ideas in more detail.")}</p><div className="flex flex-wrap gap-6 pt-4 text-sm text-[var(--foreground)]"><Link href={href("/projects",lang)}>{text(lang,"Çalışmalarımı keşfet ↗","Explore my work ↗")}</Link><Link href={href("/blog",lang)}>{text(lang,"Yazılarımı oku ↗","Read my writing ↗")}</Link><a href="mailto:muhammetemrevatan@gmail.com">{text(lang,"Merhaba de ↗","Say hello ↗")}</a></div></div></div></div>;
}
