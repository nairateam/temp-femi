import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/data/content";
import ProjectDetailPage from "../components/project-details";

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const project = getProjectBySlug(slug);
    if (!project) notFound();

    const idx = projects.findIndex((p) => p.slug === slug);
    const prev = projects[idx - 1] ?? null;
    const next = projects[idx + 1] ?? null;

    return (
        <ProjectDetailPage
            project={project}
            prevSlug={prev?.slug ?? null}
            prevTitle={prev?.title ?? null}
            nextSlug={next?.slug ?? null}
            nextTitle={next?.title ?? null}
        />
    );
}
