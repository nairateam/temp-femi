import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug, normalizeProject } from "@/lib/strapi/app";
import ProjectDetailPage from "../components/project-details";

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((p: any) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const raw = await getProjectBySlug(slug);
    if (!raw) notFound();

    const project = normalizeProject(raw.id, raw);

    const all = await getProjects();
    const idx = all.findIndex((p: any) => p.slug === slug);
    const prev = all[idx - 1] ?? null;
    const next = all[idx + 1] ?? null;

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