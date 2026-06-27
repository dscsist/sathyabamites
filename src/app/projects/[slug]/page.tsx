import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectDetail } from "@/components/project-hub/project-detail";
import { getProjectBySlug, projects } from "@/data/projects";

type ProjectDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug
  }));
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="project-page">
      <div className="project-container hub-stack">
        <header className="hub-header hub-panel">
          <div>
            <p className="hub-eyebrow">Sathyabamites</p>
            <h1 className="mt-1 text-[1.55rem] font-semibold tracking-[-0.03em] text-white">Project Hub</h1>
          </div>
          <Link href="/projects" className="hub-button-secondary inline-flex items-center gap-2 rounded-[18px] px-4 py-3 text-sm font-medium">
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </header>
        <ProjectDetail project={project} />
      </div>
    </main>
  );
}
