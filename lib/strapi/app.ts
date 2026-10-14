import type {
    StrapiImage,
    StrapiProject,
    StrapiHero,
    StrapiAbout,
    StrapiWorkExperience,
    Project,
    HeroData,
    AboutData,
    WorkExperience,
} from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

async function strapiGet(path: string) {
    const res = await fetch(`${STRAPI_URL}/api/${path}`, {
        next: { revalidate: 30 },
    });
    const { data } = await res.json();
    return data;
}

export const getProjects = () => strapiGet("projects?populate=*");
export const getHero = () => strapiGet("hero?populate=*");
export const getAbout = () => strapiGet("about?populate=*");

export async function getProjectBySlug(slug: string) {
    const data = await strapiGet(
        `projects?filters[slug][$eq]=${slug}&populate=*`
    );
    return data[0] ?? null;
}

export function strapiImageUrl(img: StrapiImage | null | undefined): string {
    if (!img?.url) return "";
    return img.url.startsWith("http") ? img.url : `${STRAPI_URL}${img.url}`;
}

export function normalizeProject(id: number, attrs: StrapiProject): Project {
    return {
        id,
        slug: attrs.slug,
        title: attrs.title,
        year: attrs.year,
        tags: attrs.tags ?? [],
        overview: attrs.overview ?? "",
        description: attrs.description ?? "",
        cover: strapiImageUrl(attrs.cover),
        hero: strapiImageUrl(attrs.hero) || null,
        media: (attrs.media ?? []).map(strapiImageUrl),
        role: attrs.role ?? "",
        url: attrs.url ?? null,
        stack: attrs.stack ?? [],
        challenge: attrs.challenge ?? null,
        solution: attrs.solution ?? null,
    };
}

export function normalizeHero(attrs: StrapiHero): HeroData {
    return {
        greeting: attrs.greeting,
        name: attrs.name,
        roles: attrs.role
            ? attrs.role
                .trim()
                .split(/\s+/)
                .filter(Boolean)
            : [],
        bio: attrs.bio,
        image: strapiImageUrl(attrs.image),
        cta: { label: attrs.ctaLabel, href: attrs.ctaHref },
    };
}

export function normalizeAbout(
    attrs: StrapiAbout,
    workHistory: WorkExperience[]
): AboutData {
    return {
        heading: attrs.heading,
        bio: attrs.bio ?? [],
        images: (attrs.images ?? []).map(strapiImageUrl),
        resumeUrl: attrs.resumeUrl,
        playgroundImages: (attrs.playgroundImages?.data ?? []).map(strapiImageUrl),
        workHistory,
    };
}

export function normalizeWorkExperience(
    id: number,
    attrs: StrapiWorkExperience
): WorkExperience {
    return {
        id,
        role: attrs.role,
        company: attrs.company,
        period: attrs.period,
        order: attrs.order,
    };
}