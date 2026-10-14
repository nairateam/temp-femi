import { getProjects, normalizeProject } from "@/lib/strapi/app";
import WorkPage from "./components/project-client";

export default async function Page() {
    const raw = await getProjects();
    const projects = raw.map((p: any) => normalizeProject(p.id, p));

    return <WorkPage projects={projects} />;
}