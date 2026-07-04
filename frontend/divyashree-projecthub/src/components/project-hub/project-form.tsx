"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { CheckCircle2, Eye, ImagePlus, LoaderCircle, Plus, Sparkles, Trash2, Users2 } from "lucide-react";
import { projectCategories } from "@/data/projects";
import { getProjectTheme, slugifyProfileName } from "@/lib/project-utils";
import type { ProjectContributor } from "@/types/project";

const initialForm = {
  title: "",
  description: "",
  category: "Web Development",
  techStack: "",
  githubUrl: "",
  demoUrl: ""
};

const initialContributor = {
  name: "",
  role: ""
};

const validImageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const maxImageBytes = 5 * 1024 * 1024;

export function ProjectForm() {
  const [form, setForm] = useState(initialForm);
  const [contributors, setContributors] = useState([initialContributor]);
  const [thumbnailName, setThumbnailName] = useState("No file selected");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const preparedContributors = useMemo<ProjectContributor[]>(
    () =>
      contributors
        .filter((contributor) => contributor.name.trim())
        .map((contributor) => ({
          name: contributor.name.trim(),
          role: contributor.role.trim() || undefined,
          profileSlug: slugifyProfileName(contributor.name)
        })),
    [contributors]
  );

  const previewTags = form.techStack
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);
  const previewTheme = getProjectTheme(form.category as Parameters<typeof getProjectTheme>[0]);

  useEffect(() => {
    return () => {
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    };
  }, [thumbnailPreview]);

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (!form.title.trim()) nextErrors.title = "Project title is required";
    if (!form.description.trim()) nextErrors.description = "Description is required";
    if (!form.techStack.trim()) nextErrors.techStack = "Tech stack is required";
    if (!form.githubUrl.trim()) nextErrors.githubUrl = "GitHub URL is required";
    if (!form.demoUrl.trim()) nextErrors.demoUrl = "Live demo URL is required";
    if (preparedContributors.length === 0) nextErrors.contributors = "Add at least one contributor";
    if (!thumbnailPreview) nextErrors.thumbnail = "Thumbnail is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        author: preparedContributors[0]?.name ?? "Project Contributor",
        contributors: preparedContributors,
        techStack: form.techStack.split(",").map((item) => item.trim()).filter(Boolean),
        thumbnail: thumbnailPreview,
        likes: 0,
        views: 0,
        featured: false,
        createdAt: new Date().toISOString()
      })
    });

    setStatus("success");
    setForm(initialForm);
    setContributors([initialContributor]);
    setThumbnailName("No file selected");
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    setThumbnailPreview(null);
    setErrors({});
  }

  function updateField(key: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleThumbnailChange(file: File | null) {
    if (!file) return;

    if (!validImageTypes.includes(file.type)) {
      setErrors((current) => ({ ...current, thumbnail: "Use PNG, JPG, JPEG, or WEBP" }));
      return;
    }

    if (file.size > maxImageBytes) {
      setErrors((current) => ({ ...current, thumbnail: "Image must be 5MB or smaller" }));
      return;
    }

    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    const objectUrl = URL.createObjectURL(file);
    setThumbnailPreview(objectUrl);
    setThumbnailName(file.name);
  }

  function updateContributor(index: number, key: "name" | "role", value: string) {
    setContributors((current) => current.map((contributor, contributorIndex) => (contributorIndex === index ? { ...contributor, [key]: value } : contributor)));
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
      <form onSubmit={handleSubmit} className="hub-panel glow-purple p-5 md:p-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[var(--cyan-primary)]">
          <Sparkles size={13} />
          Project Submission
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label>
            <span className="hub-label">Project Title</span>
            <input value={form.title} onChange={(event) => updateField("title", event.target.value)} className="hub-input px-4 py-3 text-sm" placeholder="Enter your project title" />
            {errors.title ? <span className="hub-error">{errors.title}</span> : null}
          </label>

          <label>
            <span className="hub-label">Category</span>
            <select value={form.category} onChange={(event) => updateField("category", event.target.value)} className="hub-input px-4 py-3 text-sm">
              {projectCategories.filter((category) => category !== "All").map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 block">
          <span className="hub-label">Description</span>
          <textarea
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            rows={4}
            className="hub-input px-4 py-3 text-sm"
            placeholder="Describe what the project does and why it matters."
          />
          {errors.description ? <span className="hub-error">{errors.description}</span> : null}
        </label>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label>
            <span className="hub-label">Tech Stack</span>
            <input value={form.techStack} onChange={(event) => updateField("techStack", event.target.value)} className="hub-input px-4 py-3 text-sm" placeholder="Next.js, Tailwind, FastAPI" />
            {errors.techStack ? <span className="hub-error">{errors.techStack}</span> : null}
          </label>

          <label>
            <span className="hub-label">GitHub URL</span>
            <input value={form.githubUrl} onChange={(event) => updateField("githubUrl", event.target.value)} className="hub-input px-4 py-3 text-sm" placeholder="https://github.com/your-project" />
            {errors.githubUrl ? <span className="hub-error">{errors.githubUrl}</span> : null}
          </label>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label>
            <span className="hub-label">Live Demo URL</span>
            <input value={form.demoUrl} onChange={(event) => updateField("demoUrl", event.target.value)} className="hub-input px-4 py-3 text-sm" placeholder="https://your-demo.live" />
            {errors.demoUrl ? <span className="hub-error">{errors.demoUrl}</span> : null}
          </label>

          <div>
            <span className="hub-label">Thumbnail Upload</span>
            <label className="hub-upload">
              <span className="inline-flex min-w-0 items-center gap-2 truncate text-sm text-[var(--text-secondary)]">
                <ImagePlus size={15} className="shrink-0 text-[var(--purple-bright)]" />
                <span className="truncate">{thumbnailName}</span>
              </span>
              <span className="hub-button-secondary rounded-full px-3 py-1 text-xs font-semibold">Choose File</span>
              <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.webp" onChange={(event) => handleThumbnailChange(event.target.files?.[0] ?? null)} />
            </label>
            {errors.thumbnail ? <span className="hub-error">{errors.thumbnail}</span> : null}
          </div>
        </div>

        <div className="hub-subpanel mt-4 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-white">Contributors</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">Add collaborators and optional roles.</p>
            </div>
            <button type="button" onClick={() => setContributors((current) => [...current, initialContributor])} className="hub-button-secondary inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold">
              <Plus size={14} />
              Add Contributor
            </button>
          </div>

          <div className="mt-4 grid gap-3">
            {contributors.map((contributor, index) => (
              <div key={`${index}-${contributor.name}`} className="hub-subpanel p-3">
                <div className="grid gap-3 md:grid-cols-[1fr_0.8fr_auto]">
                  <input value={contributor.name} onChange={(event) => updateContributor(index, "name", event.target.value)} className="hub-input px-4 py-3 text-sm" placeholder="Contributor name" />
                  <input value={contributor.role} onChange={(event) => updateContributor(index, "role", event.target.value)} className="hub-input px-4 py-3 text-sm" placeholder="Role (optional)" />
                  <button
                    type="button"
                    onClick={() => setContributors((current) => (current.length === 1 ? current : current.filter((_, contributorIndex) => contributorIndex !== index)))}
                    className="hub-button-secondary inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm"
                    disabled={contributors.length === 1}
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>
                </div>
                {contributor.name.trim() ? <p className="mt-2 text-xs text-[var(--text-muted)]">Future profile route: /profile/{slugifyProfileName(contributor.name)}</p> : null}
              </div>
            ))}
          </div>
          {errors.contributors ? <span className="hub-error">{errors.contributors}</span> : null}
        </div>

        <div className="mt-5 flex items-center justify-end border-t border-white/8 pt-5">
          <button type="submit" disabled={status === "submitting"} className="hub-button-primary inline-flex items-center justify-center gap-2 rounded-[18px] px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50">
            {status === "submitting" ? <LoaderCircle size={16} className="animate-spin" /> : null}
            {status === "submitting" ? "Submitting..." : "Publish Project"}
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <span>Project submitted successfully</span>
          </div>
        ) : null}
      </form>

      <aside className="hub-panel p-5 md:p-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[var(--cyan-primary)]">
          <Eye size={13} />
          Live Preview
        </div>

        {thumbnailPreview ? (
          <div className="mt-5 overflow-hidden rounded-[24px] border border-[var(--border-default)]">
            <img src={thumbnailPreview} alt="Project thumbnail preview" className="block aspect-[1.28/1] w-full object-cover" />
          </div>
        ) : (
          <div
            className="project-stage relative mt-5 aspect-[1.28/1] rounded-[24px]"
            style={
              {
                "--stage-primary": previewTheme.primary,
                "--stage-secondary": previewTheme.secondary,
                "--stage-glow": previewTheme.glow
              } as CSSProperties
            }
          >
            <div className="no-thumbnail">No thumbnail available</div>
          </div>
        )}

        <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)]">{form.description || "Your project summary will appear here as you type."}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(previewTags.length > 0 ? previewTags : ["Next.js", "Tailwind", "FastAPI"]).map((tag) => (
            <span key={tag} className="hub-badge px-3 py-1.5 text-xs">
              {tag}
            </span>
          ))}
        </div>

        <div className="hub-subpanel mt-5 p-4">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Users2 size={16} className="text-[var(--cyan-primary)]" />
            Contributors
          </div>
          <div className="mt-3 grid gap-3">
            {(preparedContributors.length > 0 ? preparedContributors : [{ name: "Contributor Name", role: "Role", profileSlug: "contributor-name" }]).map((contributor) => (
              <div key={contributor.profileSlug} className="flex items-center justify-between rounded-[18px] border border-white/6 bg-[rgba(15,22,40,0.9)] px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">{contributor.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{contributor.role || "Contributor"}</p>
                </div>
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">/{contributor.profileSlug}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
