import { baseURL, type ContentRecord } from "@/services/content";
export const dynamic = "force-dynamic";
export async function GET(_request: Request, { params }: { params: Promise<{ collection: string; id: string }> }) {
  const { collection, id } = await params;
  if (!["projects", "posts"].includes(collection) || !/^[a-z0-9]{15}$/.test(id)) return new Response(null, { status: 404 });
  try {
    const options = { cache: "no-store" as const, signal: AbortSignal.timeout(8000) };
    const result = await fetch(`${baseURL()}/api/collections/${collection}/records/${id}`, options);
    if (result.status === 404 || result.status === 403) return new Response(null, { status: 404 });
    if (!result.ok) return new Response(null, { status: 503 });
    const record = await result.json() as ContentRecord;
    if (!record.published || !record.cover) return new Response(null, { status: 404 });
    const file = await fetch(`${baseURL()}/api/files/${encodeURIComponent(record.collectionId)}/${id}/${encodeURIComponent(record.cover)}`, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!file.ok) return new Response(null, { status: 404 });
    const type = file.headers.get("content-type")?.split(";")[0];
    if (!type || !["image/jpeg", "image/png", "image/webp"].includes(type)) return new Response(null, { status: 404 });
    return new Response(file.body, { headers: { "Content-Type": type, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
  } catch { return new Response(null, { status: 503 }); }
}
