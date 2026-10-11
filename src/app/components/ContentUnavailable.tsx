import { text, type Language } from "@/lib/language";
export default function ContentUnavailable({ lang }: { lang: Language }) {
  return <p role="status" className="rounded-xl border border-[var(--border)] p-6 text-[var(--muted)]">{text(lang, "İçerikler şu anda yüklenemiyor. Lütfen biraz sonra tekrar deneyin.", "Content is currently unavailable. Please try again shortly.")}</p>;
}
