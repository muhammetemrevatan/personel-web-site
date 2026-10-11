import { getContent } from "@/services/content";
import { language } from "@/lib/language";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try { return Response.json(await getContent("projects", language(new URL(request.url).searchParams.get("lang") || undefined))); }
  catch { return Response.json({ error: "Content is unavailable" }, { status: 503 }); }
}
