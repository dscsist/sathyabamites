import type { Project } from "@/types/project";
import { rankFeaturedProjects } from "@/lib/project-utils";

export const projectCategories = [
  "All",
  "Web Development",
  "Mobile App",
  "AI / ML",
  "Data Science",
  "Cybersecurity",
  "IoT",
  "UI / UX",
  "Blockchain",
  "Cloud Computing",
  "Research",
  "Open Source",
  "Startup",
  "Dev Tools",
  "Game Development"
] as const;

export const projects: Project[] = [
  {
    id: "proj-001",
    slug: "smart-pdf-detection-system",
    title: "Smart PDF Detection System",
    description: "AI-assisted research scanner with topic extraction, preview pipelines, and semantic grouping.",
    category: "AI / ML",
    author: "Pavithra E",
    contributors: [
      { name: "Pavithra E", role: "Lead Developer", profileSlug: "pavithra-e" },
      { name: "Arjun K", role: "ML Engineer", profileSlug: "arjun-k" },
      { name: "Nivetha S", role: "UI Developer", profileSlug: "nivetha-s" }
    ],
    techStack: ["Next.js", "Python", "FastAPI", "OpenCV", "Tailwind"],
    githubUrl: "https://github.com/sathyabamites/smart-pdf-detection",
    demoUrl: "https://demo.sathyabamites.dev/smart-pdf",
    thumbnail: null,
    featured: true,
    likes: 342,
    views: 4200,
    createdAt: "2026-06-22T10:30:00.000Z"
  },
  {
    id: "proj-002",
    slug: "campus-navigator-app",
    title: "Campus Navigator App",
    description: "A mobile-first route planner for events, departments, and first-year campus onboarding.",
    category: "Mobile App",
    author: "Dharshini M",
    contributors: [
      { name: "Dharshini M", role: "Mobile Lead", profileSlug: "dharshini-m" },
      { name: "Hari V", role: "Maps Integration", profileSlug: "hari-v" },
      { name: "Monika R", role: "UX Designer", profileSlug: "monika-r" }
    ],
    techStack: ["React Native", "Expo", "Firebase", "Maps SDK"],
    githubUrl: "https://github.com/sathyabamites/campus-navigator",
    demoUrl: "https://demo.sathyabamites.dev/campus-navigator",
    thumbnail: null,
    featured: true,
    likes: 287,
    views: 3100,
    createdAt: "2026-06-20T08:45:00.000Z"
  },
  {
    id: "proj-003",
    slug: "secure-soc-lab",
    title: "Secure SOC Lab",
    description: "Student-built threat monitoring dashboard with log aggregation, alert clustering, and playbooks.",
    category: "Cybersecurity",
    author: "Nithish K",
    contributors: [
      { name: "Nithish K", role: "Security Lead", profileSlug: "nithish-k" },
      { name: "Priya S", role: "Threat Analyst", profileSlug: "priya-s" }
    ],
    techStack: ["TypeScript", "Node.js", "Elastic", "Tailwind"],
    githubUrl: "https://github.com/sathyabamites/secure-soc-lab",
    demoUrl: "https://demo.sathyabamites.dev/secure-soc-lab",
    thumbnail: null,
    featured: false,
    likes: 198,
    views: 2400,
    createdAt: "2026-06-19T14:00:00.000Z"
  },
  {
    id: "proj-004",
    slug: "greenhouse-iot-monitor",
    title: "Greenhouse IoT Monitor",
    description: "Smart agriculture panel with moisture sensors, telemetry trends, and predictive crop alerts.",
    category: "IoT",
    author: "Vignesh S",
    contributors: [
      { name: "Vignesh S", role: "IoT Lead", profileSlug: "vignesh-s" },
      { name: "Aparna J", role: "Sensor Systems", profileSlug: "aparna-j" },
      { name: "Sanjay T", role: "Dashboard Engineer", profileSlug: "sanjay-t" }
    ],
    techStack: ["Arduino", "MQTT", "Next.js", "Charts"],
    githubUrl: "https://github.com/sathyabamites/greenhouse-monitor",
    demoUrl: "https://demo.sathyabamites.dev/greenhouse-monitor",
    thumbnail: null,
    featured: false,
    likes: 164,
    views: 1890,
    createdAt: "2026-06-18T09:10:00.000Z"
  },
  {
    id: "proj-005",
    slug: "opensource-launchpad",
    title: "OpenSource Launchpad",
    description: "Contributor onboarding hub with issue ladders, repo etiquette, and starter-friendly workflows.",
    category: "Open Source",
    author: "Keerthana D",
    contributors: [
      { name: "Keerthana D", role: "Community Lead", profileSlug: "keerthana-d" },
      { name: "Rohit N", role: "Docs Maintainer", profileSlug: "rohit-n" }
    ],
    techStack: ["Next.js", "MDX", "GitHub API", "Tailwind"],
    githubUrl: "https://github.com/sathyabamites/opensource-launchpad",
    demoUrl: "https://demo.sathyabamites.dev/opensource-launchpad",
    thumbnail: null,
    featured: false,
    likes: 176,
    views: 2120,
    createdAt: "2026-06-16T11:15:00.000Z"
  },
  {
    id: "proj-006",
    slug: "creator-profile-studio",
    title: "Creator Profile Studio",
    description: "Premium profile and portfolio builder for developers, researchers, and student founders.",
    category: "UI / UX",
    author: "Nandhini L",
    contributors: [
      { name: "Nandhini L", role: "Product Designer", profileSlug: "nandhini-l" },
      { name: "Abinaya V", role: "Design Systems", profileSlug: "abinaya-v" },
      { name: "Pranav K", role: "Frontend Engineer", profileSlug: "pranav-k" }
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    githubUrl: "https://github.com/sathyabamites/creator-profile-studio",
    demoUrl: "https://demo.sathyabamites.dev/creator-profile-studio",
    thumbnail: null,
    featured: true,
    likes: 264,
    views: 2980,
    createdAt: "2026-06-15T16:20:00.000Z"
  },
  {
    id: "proj-007",
    slug: "predictive-placements-lab",
    title: "Predictive Placements Lab",
    description: "Data science dashboard forecasting placement patterns using historical and skill trend analysis.",
    category: "Data Science",
    author: "Shreya P",
    contributors: [
      { name: "Shreya P", role: "Data Lead", profileSlug: "shreya-p" },
      { name: "Madhan R", role: "Visualization", profileSlug: "madhan-r" }
    ],
    techStack: ["Python", "Pandas", "Plotly", "Next.js"],
    githubUrl: "https://github.com/sathyabamites/predictive-placements-lab",
    demoUrl: "https://demo.sathyabamites.dev/predictive-placements-lab",
    thumbnail: null,
    featured: false,
    likes: 153,
    views: 1710,
    createdAt: "2026-06-14T13:40:00.000Z"
  },
  {
    id: "proj-008",
    slug: "chain-campus-wallet",
    title: "Chain Campus Wallet",
    description: "Blockchain rewards prototype for events, club milestones, and verified student participation.",
    category: "Blockchain",
    author: "Karthik P",
    contributors: [
      { name: "Karthik P", role: "Blockchain Engineer", profileSlug: "karthik-p" },
      { name: "Varsha N", role: "Protocol Research", profileSlug: "varsha-n" }
    ],
    techStack: ["Solidity", "Next.js", "Ethers", "Tailwind"],
    githubUrl: "https://github.com/sathyabamites/chain-campus-wallet",
    demoUrl: "https://demo.sathyabamites.dev/chain-campus-wallet",
    thumbnail: null,
    featured: false,
    likes: 142,
    views: 1590,
    createdAt: "2026-06-12T15:00:00.000Z"
  },
  {
    id: "proj-009",
    slug: "indie-game-arena",
    title: "Indie Game Arena",
    description: "A stylized campus game prototype with matchmaking, scoreboards, and motion-driven UI.",
    category: "Game Development",
    author: "Akhil V",
    contributors: [
      { name: "Akhil V", role: "Gameplay Engineer", profileSlug: "akhil-v" },
      { name: "Sneha M", role: "UI Motion", profileSlug: "sneha-m" }
    ],
    techStack: ["Unity", "C#", "Blender"],
    githubUrl: "https://github.com/sathyabamites/indie-game-arena",
    demoUrl: "https://demo.sathyabamites.dev/indie-game-arena",
    thumbnail: null,
    featured: false,
    likes: 231,
    views: 2760,
    createdAt: "2026-06-11T12:25:00.000Z"
  },
  {
    id: "proj-010",
    slug: "startup-ops-board",
    title: "Startup Ops Board",
    description: "A founder workflow dashboard for team tasks, customer feedback, and product shipping cadence.",
    category: "Startup",
    author: "Monish R",
    contributors: [
      { name: "Monish R", role: "Product Lead", profileSlug: "monish-r" },
      { name: "Anu P", role: "Operations", profileSlug: "anu-p" },
      { name: "Joel S", role: "Frontend Engineer", profileSlug: "joel-s" }
    ],
    techStack: ["Next.js", "Prisma", "Tailwind", "PostgreSQL"],
    githubUrl: "https://github.com/sathyabamites/startup-ops-board",
    demoUrl: "https://demo.sathyabamites.dev/startup-ops-board",
    thumbnail: null,
    featured: true,
    likes: 208,
    views: 2675,
    createdAt: "2026-06-10T09:00:00.000Z"
  }
];

export function getFeaturedProjects() {
  return rankFeaturedProjects(projects, 4);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
