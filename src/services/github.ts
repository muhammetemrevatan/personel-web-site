import { ProjectMetadata, Repository } from "@/types/github";
import { getCachedData } from "@/utils/cache";

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

async function fetchWithAuth(url: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });
  return response.json();
}

async function getDefaultBranch(repo: string): Promise<string> {
  try {
    const repoInfo = await fetchWithAuth(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}`
    );
    return repoInfo.default_branch || "main";
  } catch (error) {
    console.error(`Error fetching default branch for ${repo}:`, error);
    return "main";
  }
}

async function getRepositoryMetadata(
  repo: string
): Promise<ProjectMetadata | undefined> {
  try {
    const defaultBranch = await getDefaultBranch(repo);

    let response = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo}/${defaultBranch}/README.md`
    );

    if (!response.ok) {
      const branches = ["master", "main", "develop"];
      for (const branch of branches) {
        if (branch === defaultBranch) continue;

        response = await fetch(
          `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo}/${branch}/README.md`
        );

        if (response.ok) break;
      }
    }

    if (!response.ok) return undefined;

    const text = await response.text();

    const metadataMatch = text.match(/---\n([\s\S]*?)\n---/);
    if (!metadataMatch) return undefined;

    const yamlContent = metadataMatch[1];
    const metadata: ProjectMetadata = {
      title: yamlContent.match(/title:\s*"([^"]+)"/)?.[1] || "",
      description: yamlContent.match(/description:\s*"([^"]+)"/)?.[1] || "",
      showcase: yamlContent.includes("showcase: true"),
      order: parseInt(yamlContent.match(/order:\s*(\d+)/)?.[1] || "0"),
      technologies:
        yamlContent
          .match(/technologies:([\s\S]*?)(?=\n\w|$)/)?.[1]
          .split("\n")
          .filter((line) => line.includes("-"))
          .map((line) => line.replace(/\s*-\s*"?([^"]+)"?\s*/, "$1")) || [],
      features:
        yamlContent
          .match(/features:([\s\S]*?)(?=\n\w|$)/)?.[1]
          .split("\n")
          .filter((line) => line.includes("-"))
          .map((line) => line.replace(/\s*-\s*"?([^"]+)"?\s*/, "$1")) || [],
    };

    return metadata;
  } catch (error) {
    console.error(`Error fetching metadata for ${repo}:`, error);
    return undefined;
  }
}

export async function getProjects(): Promise<Repository[]> {
  return getCachedData("projects", async () => {
    try {
      const repos: Repository[] = await fetchWithAuth(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos`
      );

      const reposWithMetadata = await Promise.all(
        repos.map(async (repo) => {
          const metadata = await getRepositoryMetadata(repo.name);
          return { ...repo, metadata };
        })
      );

      const showcaseProjects = reposWithMetadata
        .filter((repo) => repo.metadata && repo.metadata.showcase)
        .sort((a, b) => (a.metadata?.order || 0) - (b.metadata?.order || 0));

      return showcaseProjects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  });
}

export async function getFeaturedProjects(): Promise<Repository[]> {
  const projects = await getProjects();
  return projects.filter(
    (project) => project.metadata?.order && project.metadata.order <= 3
  );
}
