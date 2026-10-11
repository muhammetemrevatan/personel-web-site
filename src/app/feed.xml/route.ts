import { getContent } from "@/services/content";
export const dynamic = "force-dynamic";
const escapeXML = (v: string) => v.replace(/[<>&"']/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&apos;"}[c]!));
export async function GET() {
  try {
    const posts = await getContent("posts");
    const base = "https://muhammetemrevatan.com";
    const items = posts.map(p => `<item><title>${escapeXML(p.title)}</title><link>${base}/blog/${encodeURIComponent(p.slug)}</link><guid>${base}/blog/${encodeURIComponent(p.slug)}</guid><description>${escapeXML(p.description)}</description><pubDate>${new Date(p.date).toUTCString()}</pubDate></item>`).join("");
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Muhammet Emre Vatan — Writing</title><link>${base}/blog</link><description>Projects, ideas, and development notes.</description>${items}</channel></rss>`, {headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"no-store"}});
  } catch { return new Response("Feed temporarily unavailable", {status:503}); }
}
