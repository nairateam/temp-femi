export type StrapiImage = {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
    formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
    };
};

export type StrapiMedia = {
    data: StrapiImage | null;
};

export type StrapiMediaMultiple = {
    data: StrapiImage[];
};

export type StrapiRichText = {
    type: string;
    children: { type: string; text: string }[];
}[];

export type StrapiResponse<T> = {
    data: {
        id: number;
        attributes: T;
    };
    meta: Record<string, unknown>;
};

export type StrapiListResponse<T> = {
    data: {
        id: number;
        attributes: T;
    }[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};

export type StrapiProject = {
    title: string;
    slug: string;
    year: number;
    tags: string[];           
    overview: string;         
    description: string;      
    role: string;
    url: string | null;
    stack: string[];       
    challenge: string | null;
    solution: string | null;
    cover: StrapiImage;
    hero: StrapiImage;
    media: StrapiImage[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type StrapiWorkExperience = {
    role: string;
    company: string;
    period: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type StrapiHero = {
    greeting: string;
    name: string;
    role: string;
    bio: string;
    ctaLabel: string;
    ctaHref: string;
    image: StrapiImage;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type StrapiAbout = {
    heading: string;
    bio: string[];
    resumeUrl: string;
    images: StrapiImage[];
    playgroundImages: StrapiMediaMultiple;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export type Project = {
    id: number;
    slug: string;
    title: string;
    year: number;
    tags: string[];
    overview: string;
    description: string;
    cover: string;
    hero: string | null;
    media: string[];
    role: string;
    url: string | null;
    stack: string[];
    challenge: string | null;
    solution: string | null;
};

export type WorkExperience = {
    id: number;
    role: string;
    company: string;
    period: string;
    order: number;
};

export type HeroData = {
    greeting: string;
    name: string;
    roles: string[];
    bio: string;
    image: string;
    cta: { label: string; href: string };
};

export type AboutData = {
    heading: string;
    bio: string[];
    images: string[];
    resumeUrl: string;
    playgroundImages: string[];
    workHistory: WorkExperience[];
};