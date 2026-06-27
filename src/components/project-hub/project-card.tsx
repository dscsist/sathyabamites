"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowUpRight, Code2, Eye, Github, Heart, Layers3, Sparkles, TerminalSquare } from "lucide-react";
import { getStoredProjectMetrics, getProjectTheme, summarizeContributors, toggleStoredProjectLike } from "@/lib/project-utils";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  onMetricsChange?: (slug: string, metrics: { likes: number; views: number; liked: boolean }) => void;
};

export function ProjectCard({ project, onMetricsChange }: ProjectCardProps) {
  const theme = getProjectTheme(project.category);
  const contributorSummary = useMemo(() => summarizeContributors(project.contributors, 3), [project.contributors]);
  const [likes, setLikes] = useState(project.likes);
  const [views, setViews] = useState(project.views);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const metrics = getStoredProjectMetrics([project])[project.slug];
    setLikes(metrics.likes);
    setViews(metrics.views);
    setLiked(metrics.liked);
  }, [project]);

  function handleLike() {
    const next = toggleStoredProjectLike(project);
    setLikes(next.likes);
    setLiked(next.liked);
    onMetricsChange?.(project.slug, { likes: next.likes, views, liked: next.liked });
  }

  function formatMetric(value: number) {
    return value >= 1000 ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K` : `${value}`;
  }

  const visibleTags = project.techStack.slice(0, 3);
  const hiddenTagCount = Math.max(project.techStack.length - visibleTags.length, 0);
  const contributorNames = contributorSummary.shown.map((contributor) => contributor.name).join(", ");

  return (
    <article className="project-card glass-card group flex h-full min-w-0 flex-col overflow-hidden border border-[var(--border-default)] transition duration-300 hover:-translate-y-1 hover:border-[var(--border-active)] hover:shadow-[var(--shadow-glow-hover)]">
      {project.thumbnail ? (
        <div className="project-thumbnail overflow-hidden border-b border-white/6">
          <img src={project.thumbnail} alt={project.title} className="block h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
        </div>
      ) : (
        <div
          className="project-thumbnail project-stage relative"
          style={
            {
              "--stage-primary": theme.primary,
              "--stage-secondary": theme.secondary,
              "--stage-glow": theme.glow
            } as CSSProperties
          }
        >
          <span className="stage-orb left-8 top-10 h-16 w-16 bg-fuchsia-400/34" />
          <span className="stage-orb right-8 top-8 h-12 w-12 bg-cyan-300/24" />
          <div className="stage-device left-8 top-9 h-[124px] w-[170px] rotate-[-7deg] p-4">
            <div className="flex items-center justify-between text-slate-200">
              <Code2 size={18} />
              <div className="h-2 w-2 rounded-full bg-cyan-300" />
            </div>
            <div className="mt-5 space-y-2">
              <div className="h-2.5 w-24 rounded-full bg-white/15" />
              <div className="h-2.5 w-16 rounded-full bg-white/10" />
              <div className="h-2.5 w-28 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="stage-device right-8 top-14 h-[108px] w-[126px] rotate-[10deg] p-3">
            <div className="flex items-center justify-between text-slate-200">
              <TerminalSquare size={16} />
              <Sparkles size={14} className="text-cyan-300" />
            </div>
            <div className="mt-4 grid gap-2">
              <div className="h-8 rounded-xl bg-gradient-to-r from-[var(--purple-primary)]/40 to-[var(--cyan-primary)]/30" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-7 rounded-lg bg-white/8" />
                <div className="h-7 rounded-lg bg-white/8" />
              </div>
            </div>
          </div>
          <div className="stage-device bottom-9 left-[34%] h-[88px] w-[118px] rotate-[6deg] p-3">
            <div className="flex items-center justify-between text-slate-200">
              <Layers3 size={14} />
              <div className="h-2 w-2 rounded-full bg-[var(--purple-bright)]" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-7 rounded-lg bg-gradient-to-r from-[var(--purple-primary)]/30 to-[var(--purple-soft)]/30" />
              <div className="grid grid-cols-3 gap-1.5">
                <div className="h-5 rounded-md bg-white/8" />
                <div className="h-5 rounded-md bg-white/8" />
                <div className="h-5 rounded-md bg-[var(--cyan-primary)]/20" />
              </div>
            </div>
          </div>
          <div className="stage-mini-card bottom-[84px] left-10 z-10 flex items-center gap-2 px-3 py-2 text-xs text-slate-200">
            <Layers3 size={13} className="text-[var(--cyan-primary)]" />
            {theme.label}
          </div>
          {project.featured ? <div className="stage-mini-card right-10 top-8 z-10 px-3 py-1.5 text-xs font-semibold text-white">Featured</div> : null}
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <div className="mb-3">
          <span className="hub-badge inline-flex px-3 py-1 text-[10px] uppercase tracking-[0.22em]">{project.category}</span>
          <h3 className="project-title mt-3 font-semibold text-white">{project.title}</h3>
        </div>

        <p className="project-description text-[var(--text-secondary)]">{project.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {visibleTags.map((item) => (
            <span key={item} className="hub-badge px-3 py-1.5 text-xs">
              {item}
            </span>
          ))}
          {hiddenTagCount > 0 ? <span className="hub-badge px-3 py-1.5 text-xs">+{hiddenTagCount}</span> : null}
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex -space-x-1.5">
              {contributorSummary.shown.map((contributor) => (
                <Link
                  key={contributor.profileSlug}
                  href={`/profile/${contributor.profileSlug}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[rgba(18,20,42,0.96)] text-[10px] font-semibold text-white transition hover:border-[var(--border-active)]"
                  title={contributor.role ? `${contributor.name} - ${contributor.role}` : contributor.name}
                >
                  {contributor.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </Link>
              ))}
              {contributorSummary.remaining > 0 ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-default)] bg-[rgba(184,77,255,0.14)] text-[10px] font-semibold text-white">
                  +{contributorSummary.remaining}
                </div>
              ) : null}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-white">
                Contributors: {contributorNames}
                {contributorSummary.remaining > 0 ? ` +${contributorSummary.remaining}` : ""}
              </p>
              <p className="text-xs text-[var(--text-muted)]">{project.contributors.length} collaborators</p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/6 pt-3 text-xs text-[var(--text-secondary)]">
          <button
            type="button"
            onClick={handleLike}
            className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 transition ${
              liked ? "border-[var(--purple-primary)] bg-[rgba(184,77,255,0.14)] text-white" : "border-white/8 bg-white/[0.03] text-[var(--text-secondary)]"
            }`}
          >
            <Heart size={15} className={liked ? "fill-current" : ""} />
            {formatMetric(likes)}
          </button>
          <div className="inline-flex items-center gap-2 text-[var(--text-muted)]">
            <Eye size={15} className="text-[var(--cyan-primary)]" />
            {formatMetric(views)}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <Link href={`/projects/${project.slug}`} className="hub-button-primary inline-flex items-center justify-center rounded-xl px-2.5 py-2 text-xs font-semibold">
            View Details
          </Link>
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hub-button-secondary inline-flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-medium">
            <Github size={16} />
            GitHub
          </a>
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="hub-button-secondary inline-flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-medium">
            <ArrowUpRight size={16} />
            Demo
          </a>
        </div>
      </div>
    </article>
  );
}
