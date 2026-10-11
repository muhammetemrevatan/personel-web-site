import ContentDetail from "@/app/components/ContentDetail";
import { language } from "@/lib/language";
export const dynamic = "force-dynamic";
export default async function Project({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> }) {
  return await ContentDetail({ kind: "projects", slug: (await params).slug, lang: language((await searchParams).lang) });
}
