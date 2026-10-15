import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/data/content";
import ProjectDetailPage from "../components/project-details";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProjectBySlug((await params).slug);
    if (!project) return {};
    return {
        title: project.title,
        description: project.overview,
        openGraph: { title: project.title, description: project.overview, images: [project.cover] },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;

    const project = getProjectBySlug(slug);
    if (!project) notFound();

    // Wrap around so every case study ends with a next project.
    const idx = projects.findIndex((p) => p.slug === slug);
    const nextProject = projects.length > 1 ? projects[(idx + 1) % projects.length] : null;

    return (
        <ProjectDetailPage
            project={project}
            next={nextProject && { slug: nextProject.slug, title: nextProject.title, cover: nextProject.cover }}
        />
    );
}
