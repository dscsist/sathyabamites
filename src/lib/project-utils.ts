import type { Project, ProjectCategory, ProjectContributor } from "@/types/project";

export type SortOption = "featured" | "newest" | "alphabetical" | "mostLiked" | "mostViewed";

const RECENCY_WINDOW_DAYS = 14;

function metricKey(slug: string) {
  return `project-hub-metrics:${slug}`;
}

function likeKey(slug: string) {
  return `project-hub-liked:${slug}`;
}

function sessionViewKey(slug: string) {
  return `project-hub-viewed:${slug}`;
}

export function slugifyProfileName(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function sortProjects(list: Project[], sortBy: SortOption, metrics?: Record<string, { likes: number; views: number }>) {
  const items = [...list];

  switch (sortBy) {
    case "newest":
      return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "alphabetical":
      return items.sort((a, b) => a.title.localeCompare(b.title));
    case "mostLiked":
      return items.sort((a, b) => (metrics?.[b.slug]?.likes ?? b.likes) - (metrics?.[a.slug]?.likes ?? a.likes));
    case "mostViewed":
      return items.sort((a, b) => (metrics?.[b.slug]?.views ?? b.views) - (metrics?.[a.slug]?.views ?? a.views));
    case "featured":
    default:
      return items.sort((a, b) => getFeaturedScore(b, metrics?.[b.slug]) - getFeaturedScore(a, metrics?.[a.slug]));
  }
}

export function getFeaturedScore(project: Project, metricOverride?: { likes: number; views: number }) {
  const likes = metricOverride?.likes ?? project.likes;
  const views = metricOverride?.views ?? project.views;
  const ageMs = Date.now() - new Date(project.createdAt).getTime();
  const ageDays = Math.max(0, ageMs / (1000 * 60 * 60 * 24));
  const recencyRatio = Math.max(0, 1 - ageDays / RECENCY_WINDOW_DAYS);
  const recencyBonus = recencyRatio * 60;

  return likes * 2 + views * 0.05 + recencyBonus;
}

export function rankFeaturedProjects(list: Project[], limit = 4, metrics?: Record<string, { likes: number; views: number }>) {
  return [...list]
    .sort((a, b) => getFeaturedScore(b, metrics?.[b.slug]) - getFeaturedScore(a, metrics?.[a.slug]))
    .slice(0, limit);
}

export function getProjectHubStats(list: Project[]) {
  const contributorCount = new Set(list.flatMap((project) => project.contributors.map((contributor) => contributor.profileSlug))).size;
  const techStackCount = new Set(list.flatMap((project) => project.techStack)).size;

  return {
    projectsShared: list.length,
    studentBuilders: contributorCount,
    techStacks: techStackCount
  };
}

export function getTechStackOptions(list: Project[]) {
  return ["All Stacks", ...new Set(list.flatMap((project) => project.techStack).sort((a, b) => a.localeCompare(b)))];
}

export function getProjectTheme(category: ProjectCategory) {
  const themes: Record<ProjectCategory, { primary: string; secondary: string; glow: string; label: string }> = {
    "Web Development": { primary: "#C86BFF", secondary: "#6EE7FF", glow: "rgba(184,77,255,0.36)", label: "Web Interface" },
    "Mobile App": { primary: "#56DFFF", secondary: "#B84DFF", glow: "rgba(62,231,255,0.32)", label: "Mobile Experience" },
    "AI / ML": { primary: "#D783FF", secondary: "#56DFFF", glow: "rgba(184,77,255,0.42)", label: "AI Systems" },
    "Data Science": { primary: "#6EE7FF", secondary: "#C86BFF", glow: "rgba(62,231,255,0.3)", label: "Data Insight" },
    Cybersecurity: { primary: "#D783FF", secondary: "#56DFFF", glow: "rgba(184,77,255,0.4)", label: "Security Layer" },
    IoT: { primary: "#56DFFF", secondary: "#A855F7", glow: "rgba(62,231,255,0.28)", label: "Connected Systems" },
    "UI / UX": { primary: "#D783FF", secondary: "#C86BFF", glow: "rgba(184,77,255,0.34)", label: "Design Craft" },
    Blockchain: { primary: "#B84DFF", secondary: "#6EE7FF", glow: "rgba(184,77,255,0.32)", label: "Chain Network" },
    "Cloud Computing": { primary: "#6EE7FF", secondary: "#B84DFF", glow: "rgba(62,231,255,0.32)", label: "Cloud Infra" },
    Research: { primary: "#C86BFF", secondary: "#6EE7FF", glow: "rgba(184,77,255,0.28)", label: "Research Lab" },
    "Open Source": { primary: "#D783FF", secondary: "#56DFFF", glow: "rgba(184,77,255,0.32)", label: "Open Collaboration" },
    Startup: { primary: "#C86BFF", secondary: "#A855F7", glow: "rgba(184,77,255,0.36)", label: "Startup Launch" },
    "Dev Tools": { primary: "#B84DFF", secondary: "#6EE7FF", glow: "rgba(184,77,255,0.34)", label: "Developer Tools" },
    "Game Development": { primary: "#D783FF", secondary: "#56DFFF", glow: "rgba(184,77,255,0.34)", label: "Game Engine" }
  };

  return themes[category];
}

// Temporary frontend persistence for PR/demo purposes until backend metrics exist.
export function getStoredProjectMetrics(projectsList: Project[]) {
  if (typeof window === "undefined") {
    return Object.fromEntries(projectsList.map((project) => [project.slug, { likes: project.likes, views: project.views, liked: false }]));
  }

  return Object.fromEntries(
    projectsList.map((project) => {
      const storedMetrics = window.localStorage.getItem(metricKey(project.slug));
      const liked = window.localStorage.getItem(likeKey(project.slug)) === "1";
      const parsed = storedMetrics ? JSON.parse(storedMetrics) : { likes: project.likes, views: project.views };
      return [project.slug, { likes: parsed.likes ?? project.likes, views: parsed.views ?? project.views, liked }];
    })
  ) as Record<string, { likes: number; views: number; liked: boolean }>;
}

// Temporary frontend persistence for PR/demo purposes until backend metrics exist.
export function toggleStoredProjectLike(project: Project) {
  const existing = typeof window !== "undefined" ? window.localStorage.getItem(metricKey(project.slug)) : null;
  const parsed = existing ? JSON.parse(existing) : { likes: project.likes, views: project.views };
  const liked = typeof window !== "undefined" && window.localStorage.getItem(likeKey(project.slug)) === "1";
  const nextLiked = !liked;
  const nextLikes = Math.max(0, (parsed.likes ?? 0) + (nextLiked ? 1 : -1));

  if (typeof window !== "undefined") {
    window.localStorage.setItem(metricKey(project.slug), JSON.stringify({ likes: nextLikes, views: parsed.views ?? project.views }));
    window.localStorage.setItem(likeKey(project.slug), nextLiked ? "1" : "0");
  }

  return { likes: nextLikes, liked: nextLiked };
}

// Temporary frontend persistence for PR/demo purposes until backend metrics exist.
export function incrementStoredProjectView(project: Project) {
  if (typeof window === "undefined") return 0;
  if (window.sessionStorage.getItem(sessionViewKey(project.slug)) === "1") {
    const current = window.localStorage.getItem(metricKey(project.slug));
    return current ? (JSON.parse(current).views ?? project.views) : project.views;
  }

  const existing = window.localStorage.getItem(metricKey(project.slug));
  const parsed = existing ? JSON.parse(existing) : { likes: project.likes, views: project.views };
  const nextViews = (parsed.views ?? 0) + 1;
  window.localStorage.setItem(metricKey(project.slug), JSON.stringify({ likes: parsed.likes ?? project.likes, views: nextViews }));
  window.sessionStorage.setItem(sessionViewKey(project.slug), "1");
  return nextViews;
}

export function summarizeContributors(contributors: ProjectContributor[], limit = 3) {
  const shown = contributors.slice(0, limit);
  const remaining = contributors.length - shown.length;
  return { shown, remaining };
}
