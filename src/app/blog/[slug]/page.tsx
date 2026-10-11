import ContentDetail from "@/app/components/ContentDetail";
import { language } from "@/lib/language";
export const dynamic = "force-dynamic";
export default async function BlogPost({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  return await ContentDetail({ kind: "posts", slug: (await params).slug, lang: language((await searchParams).lang) });
}
