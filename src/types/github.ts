export interface ProjectMetadata {
  title: string;
  description: string;
  showcase: boolean;
  order: number;
  technologies: string[];
  features: string[];
}

export interface Repository {
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  topics?: string[];
  metadata?: ProjectMetadata;
}
