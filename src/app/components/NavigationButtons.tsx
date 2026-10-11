"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { language, text, href } from "@/lib/language";
export default function NavigationButtons() {
  const path = usePathname(), search = useSearchParams();
  const lang = language(search.get("lang") || undefined);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const routes = [["/", text(lang, "Ana sayfa", "Home")], ["/projects", text(lang, "Projeler", "Projects")], ["/blog", "Blog"], ["/contact", text(lang, "İletişim", "Contact")]];
  const switched = new URLSearchParams(search.toString());
  switched.set("lang", lang === "tr" ? "en" : "tr");
  // Detail slugs belong to a single language; switch back to that content's list.
  const switchPath = path.startsWith("/projects/") ? "/projects" : path.startsWith("/blog/") ? "/blog" : path;
  return <header className="border-b border-white/10 bg-[#0a192f]"><nav aria-label={text(lang, "Ana menü", "Main navigation")} className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-5">
    <Link href={href("/", lang)} className="font-semibold text-[#ccd6f6]">MEV<span className="text-[#64ffda]">.</span></Link>
    <div className="flex flex-wrap items-center gap-4 text-sm">{routes.map(([route, label]) => <Link key={route} href={href(route, lang)} aria-current={path === route ? "page" : undefined} className={path === route ? "text-[#64ffda]" : "text-[#8892b0] hover:text-[#ccd6f6]"}>{label}</Link>)}
      <Link href={`${switchPath}?${switched}`} aria-label={lang === "tr" ? "Switch to English" : "Türkçeye geç"} className="rounded border border-white/20 px-3 py-1 text-[#ccd6f6]">{lang === "tr" ? "EN" : "TR"}</Link>
    </div>
  </nav></header>;
}
