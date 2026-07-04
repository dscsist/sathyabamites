import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/project-hub/project-form";

export default function AddProjectPage() {
  return (
    <main className="project-page">
      <div className="project-container hub-stack">
        <header className="hub-header hub-panel">
          <div>
            <p className="hub-eyebrow">Sathyabamites</p>
            <h1 className="mt-1 text-[1.55rem] font-semibold tracking-[-0.03em] text-white">Add Project</h1>
          </div>
          <Link href="/projects" className="hub-button-secondary inline-flex items-center gap-2 rounded-[18px] px-4 py-3 text-sm font-medium">
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </header>

        <section className="hub-stack">
          <div className="hub-panel px-5 py-5 md:px-6">
            <p className="hub-eyebrow">Project Submission</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-[2.25rem]">Share your project with a polished first impression.</h2>
            <p className="mt-3 max-w-[760px] text-sm leading-7 text-[var(--text-secondary)] md:text-[15px]">
              Add the core details, contributors, and thumbnail so your project is ready for the showcase.
            </p>
          </div>
          <ProjectForm />
        </section>
      </div>
    </main>
  );
}
