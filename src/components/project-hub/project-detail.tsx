"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowUpRight, CalendarDays, Eye, Github, Heart, Layers3, Sparkles, Users2 } from "lucide-react";
import { getStoredProjectMetrics, getProjectTheme, incrementStoredProjectView, toggleStoredProjectLike } from "@/lib/project-utils";
import type { Project } from "@/types/project";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const theme = getProjectTheme(project.category);
  const [likes, setLikes] = useState(project.likes);
  const [views, setViews] = useState(project.views);
  const [liked, setLiked] = useState(false);
  const contributors = useMemo(
    () =>
      project.contributors.map((contributor) => ({
        ...contributor,
        initials: contributor.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
      })),
    [project.contributors]
  );

  useEffect(() => {
    const metrics = getStoredProjectMetrics([project])[project.slug];
    setLikes(metrics.likes);
    setLiked(metrics.liked);
    setViews(incrementStoredProjectView(project));
  }, [project]);

  return (
    <section className="hub-stack">
      <div className="flex items-center justify-between gap-4">
        <Link href="/projects" className="hub-button-secondary inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium">
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
        <div className="hub-eyebrow flex items-center gap-2">
          <Sparkles size={13} className="text-[var(--purple-bright)]" />
          Project Details
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.14fr_0.86fr]">
        <div className="hub-panel overflow-hidden">
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={project.title} className="block aspect-[1.72/1] w-full object-cover" />
          ) : (
            <div
              className="project-stage relative aspect-[1.72/1]"
              style={
                {
                  "--stage-primary": theme.primary,
                  "--stage-secondary": theme.secondary,
                  "--stage-glow": theme.glow
                } as CSSProperties
              }
            />
          )}

          <div className="p-6 md:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="hub-badge px-3 py-1.5 text-xs">{project.category}</span>
              {project.techStack.map((item) => (
                <span key={item} className="hub-badge px-3 py-1.5 text-xs">
                  {item}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white md:text-[2.65rem]">{project.title}</h1>
            <p className="mt-4 text-[15px] leading-8 text-[var(--text-secondary)]">{project.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/6 pt-6">
              <button
                type="button"
                onClick={() => {
                  const next = toggleStoredProjectLike(project);
                  setLikes(next.likes);
                  setLiked(next.liked);
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition ${
                  liked ? "border-[var(--purple-primary)] bg-[rgba(184,77,255,0.14)] text-white" : "border-white/8 bg-white/[0.03] text-[var(--text-secondary)]"
                }`}
              >
                <Heart size={15} className={liked ? "fill-current" : ""} />
                {likes} likes
              </button>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2.5 text-sm text-[var(--text-secondary)]">
                <Eye size={15} className="text-[var(--cyan-primary)]" />
                {views} views
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2.5 text-sm text-[var(--text-secondary)]">
                <CalendarDays size={15} className="text-[var(--purple-bright)]" />
                {new Date(project.createdAt).toLocaleDateString("en-IN")}
              </div>
            </div>
          </div>
        </div>

        <aside className="hub-stack">
          <div className="hub-panel p-5">
            <h2 className="text-lg font-semibold text-white">Links</h2>
            <div className="mt-4 grid gap-3">
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hub-button-secondary inline-flex items-center justify-center gap-2 rounded-[18px] px-4 py-3 text-sm font-medium">
                <Github size={16} />
                GitHub
              </a>
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="hub-button-primary inline-flex items-center justify-center gap-2 rounded-[18px] px-4 py-3 text-sm font-semibold">
                <ArrowUpRight size={16} />
                Live Demo
              </a>
            </div>
          </div>

          <div className="hub-panel p-5">
            <h2 className="text-lg font-semibold text-white">Metadata</h2>
            <div className="mt-4 grid gap-3">
              <div className="hub-subpanel p-4">
                <div className="inline-flex rounded-2xl bg-[rgba(184,77,255,0.12)] p-3 text-[var(--purple-bright)]">
                  <Layers3 size={16} />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Category</p>
                <p className="mt-1 text-sm font-semibold text-white">{project.category}</p>
              </div>
              <div className="hub-subpanel p-4">
                <div className="inline-flex rounded-2xl bg-[rgba(62,231,255,0.12)] p-3 text-[var(--cyan-primary)]">
                  <Users2 size={16} />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Contributors</p>
                <p className="mt-1 text-sm font-semibold text-white">{project.contributors.length}</p>
              </div>
            </div>
          </div>

          <div className="hub-panel p-5">
            <h2 className="text-lg font-semibold text-white">Contributors</h2>
            <div className="mt-4 grid gap-3">
              {contributors.map((contributor) => (
                <Link key={contributor.profileSlug} href={`/profile/${contributor.profileSlug}`} className="hub-subpanel flex items-center gap-4 p-4 transition hover:border-[var(--border-active)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-default)] bg-[rgba(184,77,255,0.12)] text-sm font-semibold text-white">
                    {contributor.initials}
                  </div>
                  <div>
                    <p className="font-medium text-white">{contributor.name}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{contributor.role || "Contributor"}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
