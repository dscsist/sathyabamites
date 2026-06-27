import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, FolderKanban, Layers3, Sparkles, Users2 } from "lucide-react";
import { getFeaturedProjects, projects } from "@/data/projects";
import { getProjectHubStats, getProjectTheme } from "@/lib/project-utils";
import { ProjectsBrowser } from "./projects-browser";

export function ProjectHub() {
  const featuredProjects = getFeaturedProjects();
  const statsSummary = getProjectHubStats(projects);
  const stats = [
    { label: "Projects Shared", value: `${statsSummary.projectsShared}`, icon: FolderKanban, tone: "text-[var(--purple-bright)]" },
    { label: "Featured Builds", value: `${featuredProjects.length}`, icon: Sparkles, tone: "text-[var(--cyan-primary)]" },
    { label: "Student Builders", value: `${statsSummary.studentBuilders}`, icon: Users2, tone: "text-[var(--purple-primary)]" },
    { label: "Tech Stacks", value: `${statsSummary.techStacks}`, icon: Layers3, tone: "text-[var(--purple-soft)]" }
  ];

  return (
    <main className="project-page">
      <div className="project-container hub-stack">
        <header className="project-section hub-header hub-panel">
          <div>
            <p className="hub-eyebrow">Sathyabamites</p>
            <h1 className="mt-1 text-[1.55rem] font-semibold tracking-[-0.03em] text-white">Project Hub</h1>
          </div>
          <Link href="/projects/add" className="hub-button-primary inline-flex items-center gap-2 rounded-[16px] px-4 py-2.5 text-sm font-semibold">
            Add Project
            <ArrowRight size={16} />
          </Link>
        </header>

        <section className="project-section hero-section hub-panel">
          <div className="hero-copy">
            <p className="hero-label">Project Hub</p>
            <h2 className="hero-title">
              <span className="hero-title-line">
                <span className="hero-title-word hero-title-build">Build.</span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-word hero-title-collaborate">Collaborate.</span>
              </span>
              <span className="hero-title-line">
                <span className="hero-title-word hero-title-showcase">Showcase.</span>
              </span>
            </h2>
            <p className="hero-description">
              Discover student-built projects, find teammates, and bring campus ideas into the spotlight.
            </p>
            <div className="hero-actions mt-5 flex flex-wrap gap-2.5">
              <Link href="/projects/add" className="hub-button-primary inline-flex items-center gap-2 rounded-[16px] px-5 py-3 text-sm font-semibold">
                Publish Your Project
                <ArrowRight size={16} />
              </Link>
              <Link href="#browse-projects" className="hub-button-secondary inline-flex items-center rounded-[16px] px-5 py-3 text-sm font-medium">
                Explore Projects
              </Link>
            </div>
          </div>

          <div className="hero-media-shell">
            <div className="hero-visual">
              <div className="hero-image-frame">
                <img src="/projects/ProjectHubHero.jpeg" alt="Project Hub hero illustration" className="hero-image hero-image-asset" />
              </div>
            </div>
          </div>
        </section>

        <div className="project-section stats-section hero-stats project-stats">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="hero-stat project-stat">
                <div className={`hero-stat-icon ${stat.tone}`}>
                  <Icon size={19} />
                </div>
                <div>
                  <p className="text-[1.15rem] font-semibold leading-none text-white md:text-[1.35rem]">{stat.value}</p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)] md:text-sm">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {featuredProjects.length > 0 ? (
          <section className="project-section featured-section hub-panel p-4 md:p-5">
            <div className="mb-4 flex flex-col items-start justify-start gap-2 text-left">
              <p className="hub-eyebrow">Featured Projects</p>
              <p className="text-sm text-[var(--text-secondary)]">Projects gaining attention from the Sathyabamites community.</p>
              <Link href="#browse-projects" className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-white">
                View all featured
              </Link>
            </div>

            <div className="featured-grid">
              {featuredProjects.map((project) => {
                const theme = getProjectTheme(project.category);

                return (
                  <Link key={project.id} href={`/projects/${project.slug}`} className="featured-card-shell">
                    <div
                      className="featured-card-thumb project-stage"
                      style={
                        {
                          "--stage-primary": theme.primary,
                          "--stage-secondary": theme.secondary,
                          "--stage-glow": theme.glow
                        } as CSSProperties
                      }
                    >
                      {project.thumbnail ? <img src={project.thumbnail} alt={project.title} className="absolute inset-0 h-full w-full object-cover" /> : null}
                      <div className="stage-mini-card right-4 top-4 z-10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">{project.category}</div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="project-title mt-1 font-semibold text-white">{project.title}</h3>
                      <div className="mt-3 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <div className="flex -space-x-1.5">
                          {project.contributors.slice(0, 3).map((contributor) => (
                            <span key={contributor.profileSlug} className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[rgba(12,18,38,0.94)] font-semibold text-white">
                              {contributor.name
                                .split(" ")
                                .map((part) => part[0])
                                .join("")
                                .slice(0, 2)}
                            </span>
                          ))}
                        </div>
                        <span>
                          Contributors: {project.contributors.slice(0, 2).map((contributor) => contributor.name).join(", ")}
                          {project.contributors.length > 2 ? ` +${project.contributors.length - 2}` : ""}
                        </span>
                      </div>
                      <p className="project-description mt-3 text-[var(--text-secondary)]">{project.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ) : null}

        <ProjectsBrowser projects={projects} />
      </div>
    </main>
  );
}
