export type ProjectCategory =
  | "Web Development"
  | "Mobile App"
  | "AI / ML"
  | "Cybersecurity"
  | "Data Science"
  | "IoT"
  | "UI / UX"
  | "Blockchain"
  | "Cloud Computing"
  | "Research"
  | "Open Source"
  | "Startup"
  | "Dev Tools"
  | "Game Development";

export type ProjectContributor = {
  name: string;
  role?: string;
  profileSlug: string;
  avatar?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  author: string;
  contributors: ProjectContributor[];
  githubUrl: string;
  demoUrl: string;
  thumbnail: string | null;
  featured: boolean;
  likes: number;
  views: number;
  createdAt: string;
};
