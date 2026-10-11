import "server-only";
import { getContent } from "@/services/content";
export interface BlogPost {
  slug: string; title: string; date: string; category: string; readTime: string;
  description: string; tags: string[]; content: string; language: "en" | "tr";
}
export async function getAllPosts(): Promise<BlogPost[]> {
  return (await getContent("posts")).map(r => ({ ...r, tags: r.tags || [],
    date: r.date.slice(0, 10), readTime: `${Math.max(1, Math.ceil(r.content.split(/\s+/).length / 200))} min` }));
}
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return (await getAllPosts()).find(p => p.slug === slug) || null;
}
export async function getAllCategories() { return Array.from(new Set((await getAllPosts()).map(p => p.category))); }
export async function getAllTags() { return Array.from(new Set((await getAllPosts()).flatMap(p => p.tags))); }
