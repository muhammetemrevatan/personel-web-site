import "server-only";
import { cache } from "react";
import type { Language } from "@/lib/language";
export interface ContentRecord {
  id: string; collectionId: string; collectionName: string; slug: string; title: string; description: string;
  content: string; language: Language; published: boolean; featured: boolean;
  date: string; created: string; category: string; tags: string[]; cover: string;
  demo_url: string; source_url: string; outcome: string; order: number;
}
export class ContentError extends Error {}
export function baseURL() {
  if (!process.env.POCKETBASE_URL) throw new ContentError("POCKETBASE_URL is not configured");
  return process.env.POCKETBASE_URL.replace(/\/$/, "");
}
export const getContent = cache(async (collection: "projects" | "posts", lang?: Language): Promise<ContentRecord[]> => {
  const records: ContentRecord[] = [];
  let page = 1, totalPages = 1;
  do {
    const params = new URLSearchParams({
      filter: `published = true${lang ? ` && language = "${lang}"` : ""}`,
      sort: collection === "projects" ? "order,-date" : "-created,-date,-id",
      perPage: "100", page: String(page),
    });
    let response: Response;
    try {
      response = await fetch(`${baseURL()}/api/collections/${collection}/records?${params}`,
        { cache: "no-store", signal: AbortSignal.timeout(8000) });
    } catch { throw new ContentError("Content service is unavailable"); }
    if (!response.ok) throw new ContentError(`Content service returned ${response.status}`);
    const data = await response.json() as { items: ContentRecord[]; totalPages: number };
    records.push(...data.items); totalPages = data.totalPages; page++;
  } while (page <= totalPages);
  return records;
});
export function coverURL(r: ContentRecord): string | undefined {
  if (r.cover) return `/api/media/${encodeURIComponent(r.collectionName)}/${encodeURIComponent(r.id)}`;
  if (r.collectionName !== "projects") return undefined;

  const projectSlug = r.slug.replace(/-tr$/, "");
  const illustrations: Record<string, string> = {
    "toxifyou-social-platform": "toxifyou-sosyal-platform.svg",
    "courier-tracking-system": "courier-tracking-system.svg",
    "gsm-message-sender": "gsm-message-sender.svg",
    "employee-data-batch-processor": "employee-data-batch-processor.svg",
    "telegram-reminder-assistant": "telegram-reminder-assistant.svg",
    "daily-ai-news-digest": "daily-ai-news-digest.png",
  };

  const illustration = illustrations[projectSlug];
  return illustration ? `/projects/${illustration}` : undefined;
}
export function safeExternalURL(value?: string): string | undefined {
  try { const u = new URL(value || ""); return ["http:", "https:"].includes(u.protocol) ? u.href : undefined; }
  catch { return undefined; }
}
