export const metadata = { title: "Writing", description: "Development notes, ideas, and experiences by Muhammet Emre Vatan." };
import { getAllPosts } from "@/utils/blog";
import { language } from "@/lib/language";
import BlogList from "./BlogList";
import ContentUnavailable from "../components/ContentUnavailable";
export const dynamic = "force-dynamic";
export default async function Blog({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const lang = language((await searchParams).lang);
  const posts = await getAllPosts().catch(() => null);
  if (!posts) return <div className="max-w-6xl mx-auto px-6 py-24"><ContentUnavailable lang={lang} /></div>;
  const selected = posts.filter(p => p.language === lang);
  return <BlogList initialPosts={selected} categories={Array.from(new Set(selected.map(p => p.category)))} tags={Array.from(new Set(selected.flatMap(p => p.tags)))} lang={lang} />;
}
