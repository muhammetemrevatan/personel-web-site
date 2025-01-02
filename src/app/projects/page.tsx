import { getProjects } from "@/services/github";
import ProjectList from "./ProjectList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Muhammet Emre Vatan",
  description:
    "Check out my latest projects and contributions in software development.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectList projects={projects} />;
}
