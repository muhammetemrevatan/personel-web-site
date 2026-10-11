import { text, type Language } from "@/lib/language";
export default function ContentUnavailable({ lang }: { lang: Language }) {
  return <p role="status" className="rounded-xl border border-white/10 p-6 text-[#8892b0]">{text(lang, "İçerikler şu anda yüklenemiyor. Lütfen biraz sonra tekrar deneyin.", "Content is currently unavailable. Please try again shortly.")}</p>;
}
