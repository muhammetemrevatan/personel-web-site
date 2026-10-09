import { getFeaturedProjects } from "@/services/github";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getFeaturedProjects());
}
