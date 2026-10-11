"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { language, text, href } from "@/lib/language";
export default function NavigationButtons() {
  const path = usePathname(), search = useSearchParams();
  const lang = language(search.get("lang") || undefined);
  const [theme, setTheme] = useState("dark");
  useEffect(() => { const saved = localStorage.getItem("portfolio-theme"); if (saved === "light") { setTheme(saved); document.documentElement.dataset.theme = saved; } }, []);
  const toggleTheme = () => { const next = theme === "dark" ? "light" : "dark"; setTheme(next); document.documentElement.dataset.theme = next; localStorage.setItem("portfolio-theme", next); };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const routes = [["/projects", text(lang, "Projeler", "Projects")], ["/blog", "Blog"], ["/about", text(lang, "Hakkımda", "About")], ["/contact", text(lang, "İletişim", "Contact")]];
  const switched = new URLSearchParams(search.toString());
  switched.set("lang", lang === "tr" ? "en" : "tr");
  // Detail slugs belong to a single language; switch back to that content's list.
  const switchPath = path.startsWith("/projects/") ? "/projects" : path.startsWith("/blog/") ? "/blog" : path;
  return <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--background)]"><nav aria-label={text(lang, "Ana menü", "Main navigation")} className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-4">
    <Link href={href("/", lang)} className="font-editorial text-lg sm:text-xl text-[var(--foreground)]">Muhammet Emre Vatan</Link>
    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">{routes.map(([route, label]) => <Link key={route} href={href(route, lang)} aria-current={path === route ? "page" : undefined} className={path === route ? "text-[var(--accent)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"}>{label}</Link>)}
      <Link href={`${switchPath}?${switched}`} aria-label={lang === "tr" ? "Switch to English" : "Türkçeye geç"} className="rounded border border-[var(--border)] px-2 py-1 text-[var(--foreground)]">{lang === "tr" ? "EN" : "TR"}</Link>
      <button onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} className="border border-[var(--border)] rounded px-2 py-1 text-[var(--muted)]"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg></button>
    </div>
  </nav></header>;
}
