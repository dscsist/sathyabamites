"use client";

import { ArrowRight, Eye, Github, Heart, MonitorUp, X } from "lucide-react";
import type { Project } from "@/lib/dashboard/types";
import { EmptyState } from "./EmptyState";

interface FeaturedProjectsProps {
  projects: Project[];
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onProjectOpen: (project: Project) => void;
  onLike: (projectId: string) => void;
}

export function FeaturedProjects({
  projects,
  categories,
  selectedCategory,
  onCategoryChange,
  onProjectOpen,
  onLike
}: FeaturedProjectsProps) {
  return (
    <section className="glass-panel rounded-[1rem] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-white">Featured Projects</h2>
        <button type="button" className="rounded-lg bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-200">
          View All
        </button>
      </div>
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
              selectedCategory === category
                ? "border-violet-300/60 bg-violet-600 text-white shadow-glow"
                : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      {projects.length > 0 ? (
        <div className="space-y-2">
          {projects.map((project) => (
            <ProjectListItem key={project.id} project={project} onOpen={onProjectOpen} onLike={onLike} />
          ))}
        </div>
      ) : (
        <EmptyState title="No projects found" description="Try a different search term or category." />
      )}
    </section>
  );
}

function ProjectListItem({
  project,
  onOpen,
  onLike
}: {
  project: Project;
  onOpen: (project: Project) => void;
  onLike: (projectId: string) => void;
}) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.025] p-2 transition hover:border-violet-300/40 hover:bg-white/[0.045]">
      <div className="grid gap-3 sm:grid-cols-[9rem_minmax(0,1fr)_5.5rem_2.75rem] sm:items-center">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="h-24 overflow-hidden rounded-lg bg-slate-900 text-left"
          aria-label={`Open ${project.title}`}
        >
          {project.imageUrl ? (
            <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className={`project-art h-full bg-gradient-to-br ${project.imageTone}`} />
          )}
        </button>
        <button type="button" onClick={() => onOpen(project)} className="min-w-0 text-left">
          <h3 className="truncate text-base font-bold text-white">{project.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <AvatarStack names={project.contributors} />
            <span className="truncate">{formatContributors(project.contributors)}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-md bg-violet-500/12 px-2 py-1 text-xs text-violet-100">
                {tech}
              </span>
            ))}
          </div>
        </button>
        <div className="flex items-center gap-4 text-sm text-slate-300 sm:block sm:space-y-2">
          <button
            type="button"
            onClick={() => onLike(project.id)}
            className="inline-flex items-center gap-2 text-pink-300 transition hover:text-pink-100"
            aria-label={`Like ${project.title}`}
          >
            <Heart className="h-4 w-4 fill-current" /> {project.likes}
          </button>
          <span className="inline-flex items-center gap-2">
            <Eye className="h-4 w-4 text-slate-300" /> {formatCompact(project.views)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.04] text-slate-200 transition hover:bg-violet-500/20 hover:text-white"
          aria-label={`Open ${project.title} details`}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
}

export function ProjectDetailsModal({
  project,
  onClose,
  onLike
}: {
  project: Project | null;
  onClose: () => void;
  onLike: (projectId: string) => void;
}) {
  if (!project) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/70 p-3 backdrop-blur-sm sm:place-items-center">
      <button type="button" className="absolute inset-0" aria-label="Close project details" onClick={onClose} />
      <div className="glass-panel custom-scrollbar relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[1.25rem] p-5">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-slate-200"
          aria-label="Close project details"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mb-5 h-48 overflow-hidden rounded-lg bg-slate-900">
          {project.imageUrl ? (
            <img src={project.imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className={`project-art h-full bg-gradient-to-br ${project.imageTone}`} />
          )}
        </div>
        <p className="text-sm font-medium text-violet-200">{project.category}</p>
        <h2 className="mt-1 text-2xl font-bold text-white">{project.title}</h2>
        <p className="mt-3 leading-7 text-slate-300">{project.description}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Detail label="Contributors" value={project.contributors.join(", ")} />
          <Detail label="Tech stack" value={project.techStack.join(", ")} />
          <Detail label="Likes" value={String(project.likes)} />
          <Detail label="Views" value={String(project.views)} />
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => onLike(project.id)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-pink-500/20 px-4 py-3 text-sm font-semibold text-pink-100 ring-1 ring-pink-300/20"
          >
            <Heart className="h-4 w-4" /> Like
          </button>
          <a href={project.githubUrl} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href={project.demoUrl} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-glow">
            <MonitorUp className="h-4 w-4" /> Demo
          </a>
        </div>
      </div>
    </div>
  );
}

function AvatarStack({ names }: { names: string[] }) {
  return (
    <span className="flex -space-x-1">
      {names.slice(0, 3).map((name) => (
        <span
          key={name}
          className="grid h-5 w-5 place-items-center rounded-full border border-slate-950 bg-gradient-to-br from-violet-500 to-blue-500 text-[9px] font-bold text-white"
        >
          {name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
        </span>
      ))}
    </span>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm text-white">{value}</p>
    </div>
  );
}

function formatContributors(contributors: string[]) {
  if (contributors.length <= 2) {
    return contributors.join(", ");
  }

  return `${contributors[0]} + ${contributors.length - 1} others`;
}

function formatCompact(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
  }

  return String(value);
}
