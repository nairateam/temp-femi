import type { HeroData, Project } from "@/lib/strapi/types";
import content from "./content.json";

// Site content exported from the Strapi CMS (femi-cms), served locally.
export const hero: HeroData = content.hero;
export const projects: Project[] = content.projects;

export function getProjectBySlug(slug: string): Project | null {
    return projects.find((p) => p.slug === slug) ?? null;
}
