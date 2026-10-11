import type { Metadata } from "next";
import { getContent } from "@/services/content";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const record = (await getContent("posts").catch(() => [])).find(r => r.slug === slug);
  return record ? { title: record.title, description: record.description, openGraph: { title: record.title, description: record.description } } : { title: "Not found" };
}
import ContentDetail from "@/app/components/ContentDetail";
import { language } from "@/lib/language";
export const dynamic = "force-dynamic";
export default async function BlogPost({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  return await ContentDetail({ kind: "posts", slug: (await params).slug, lang: language((await searchParams).lang) });
}
