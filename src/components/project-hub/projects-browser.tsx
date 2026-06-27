"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { projectCategories } from "@/data/projects";
import { getStoredProjectMetrics, getTechStackOptions, sortProjects, type SortOption } from "@/lib/project-utils";
import type { Project } from "@/types/project";
import { ProjectCard } from "./project-card";

type ProjectsBrowserProps = {
  projects: Project[];
};

export function ProjectsBrowser({ projects }: ProjectsBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof projectCategories)[number]>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [stackFilter, setStackFilter] = useState("All Stacks");
  const [metrics, setMetrics] = useState<Record<string, { likes: number; views: number; liked: boolean }>>({});
  const stackOptions = useMemo(() => getTechStackOptions(projects), [projects]);

  useEffect(() => {
    setMetrics(getStoredProjectMetrics(projects));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const matched = projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const matchesStack = stackFilter === "All Stacks" || project.techStack.includes(stackFilter);
      const haystack = [
        project.title,
        project.description,
        project.author,
        project.category,
        project.techStack.join(" "),
        project.contributors.map((contributor) => contributor.name).join(" ")
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = normalized.length === 0 || haystack.includes(normalized);

      return matchesCategory && matchesStack && matchesQuery;
    });

    return sortProjects(matched, sortBy, metrics);
  }, [category, metrics, projects, query, sortBy, stackFilter]);

  return (
    <section id="browse-projects" className="project-section hub-stack">
      <div className="glass-card rounded-[24px] p-4 md:p-5">
        <div className="mb-4">
          <p className="hub-eyebrow">Explore Projects</p>
        </div>

        <div className="relative min-w-0">
          <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, contributors, tech stacks..."
            className="input-field rounded-[18px] py-3 pl-11 pr-4 text-sm"
          />
        </div>

        <div className="mt-4 flex flex-col items-start gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="filters-row chip-row justify-start">
            {projectCategories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium transition ${
                  category === item ? "neon-button text-white" : "ghost-button text-slate-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid w-full max-w-[420px] gap-3 sm:grid-cols-2">
            <select
              value={stackFilter}
              onChange={(event) => setStackFilter(event.target.value)}
              className="input-field rounded-2xl px-4 py-3 text-sm"
            >
              {stackOptions.map((stack) => (
                <option key={stack} value={stack}>
                  {stack}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="input-field rounded-2xl px-4 py-3 text-sm"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="alphabetical">Sort: A-Z</option>
              <option value="mostLiked">Sort: Most Liked</option>
              <option value="mostViewed">Sort: Most Viewed</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-start gap-1 border-t border-white/6 pt-4 text-left text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} className="text-violet-300" />
            <p>{filteredProjects.length} projects found</p>
          </div>
        </div>
      </div>

      <div className="projects-grid gap-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onMetricsChange={(slug, nextMetrics) =>
              setMetrics((current) => ({
                ...current,
                [slug]: nextMetrics
              }))
            }
          />
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="glass-card rounded-[28px] px-6 py-12 text-left">
          <h3 className="text-lg font-semibold text-slate-100">No matching projects yet</h3>
          <p className="mt-3 text-sm text-slate-400">Try another search, category, or tech stack.</p>
        </div>
      ) : null}
    </section>
  );
}
