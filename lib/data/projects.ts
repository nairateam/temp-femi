export type Project = {
    slug: string;
    title: string;
    year: number;
    tags: string[];
    cover: string;
    overview: string;
    description: string;

    role?: string;
    liveUrl?: string;
    stack?: string[];
    summary?: string;
    challenge?: string;
    what?: string[];
    hero?: string;
    images?: string[];
};

export const projects: Project[] = [
    {
        slug: "amaka-jobs",
        title: "Amaka — Job Platform & Hiring Website",
        year: 2025,
        tags: ["Creative Dev", "Agency"],
        cover: "/projects/amaka-jobs.png",
        overview: "Full website rebrand for a leading Lagos digital agency — headless CMS, GSAP animations, sub-2s load time.",
        description: "Full website rebrand for a leading Lagos digital agency — headless CMS, GSAP animations, sub-2s load time.",
        role: "Lead Frontend Developer",
        liveUrl: "https://amakajobs.com",
        stack: ["Next.js", "GSAP", "Sanity CMS", "Tailwind CSS", "TypeScript"],
        summary:
            "Amaka Jobs needed a site that matched their creative reputation — fast, animated, and editable by the internal team. I led the entire frontend, from architecture to deployment.",
        challenge:
            "The agency wanted full CMS control without sacrificing the bespoke animations that define their brand. The challenge was building a system where editors could swap content without breaking carefully timed GSAP sequences.",
        what: [
            "Architected a headless CMS integration with Sanity, enabling non-technical editors to manage all pages.",
            "Implemented scroll-triggered and cursor-reactive GSAP animations throughout.",
            "Achieved a Lighthouse performance score of 97 on desktop.",
            "Shipped the project as sole developer in 6 weeks.",
        ],
        hero: "/projects/amaka.png",
        images: ["/projects/amaka-1.png", "/projects/amaka-2.png"],
    },
    {
        slug: "fintech-dashboard",
        title: "Fintech Dashboard",
        year: 2025,
        tags: ["Product", "Fintech"],
        cover: "/projects/sfa.png",
        overview: "Real-time analytics dashboard for a Lagos-based payments startup — live charts, role-based access, dark mode.",
        description: "Real-time analytics dashboard for a Lagos-based payments startup — live charts, role-based access, dark mode.",
        role: "Frontend Engineer",
        stack: ["React", "Recharts", "React Query", "Tailwind CSS", "TypeScript"],
        summary:
            "A data-dense internal dashboard giving finance and ops teams live visibility into transaction volume, settlement status, and anomaly flags.",
        challenge:
            "Polling-heavy data with a large table of transactions had to remain performant at scale. Role-based views meant the same component tree had to conditionally expose or hide sensitive columns.",
        what: [
            "Built a real-time polling layer with React Query, updating charts every 15 seconds without full re-renders.",
            "Designed a role-based access system — admin, finance, and read-only views from a single codebase.",
            "Implemented a virtualized transaction table handling 10k+ rows without lag.",
            "Delivered dark mode with a single CSS variable swap — zero duplicated styles.",
        ],
        hero: "/projects/fintech-hero.jpg",
        images: ["/projects/fintech-1.jpg", "/projects/fintech-2.jpg"],
    },
    {
        slug: "ecommerce-platform",
        title: "E-commerce Platform",
        year: 2024,
        tags: ["E-commerce", "CMS"],
        cover: "/projects/sfa.jpg",
        overview: "Headless Shopify storefront for a fashion brand — custom PDP, cart drawer, and 98 Lighthouse score.",
        description: "Headless Shopify storefront for a fashion brand — custom PDP, cart drawer, and 98 Lighthouse score.",
        role: "Frontend Developer",
        liveUrl: "https://example-store.com",
        stack: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Framer Motion"],
        summary:
            "A bespoke headless Shopify experience replacing the brand's legacy theme — faster page loads, richer interactions, and full design flexibility without Liquid constraints.",
        challenge:
            "Shopify's Storefront API required careful cart-state management across pages while keeping the experience feel native and instant. The client also needed a custom size-guide modal and product video loop without third-party apps.",
        what: [
            "Built a fully custom headless storefront on Next.js with the Shopify Storefront API.",
            "Implemented optimistic cart updates — items appear instantly before the API confirms.",
            "Wrote a custom video-looping PDP component with autoplay on scroll-into-view.",
            "Achieved a 98 Lighthouse performance score in production.",
        ],
        hero: "/projects/ecommerce-hero.jpg",
        images: ["/projects/ecommerce-1.jpg", "/projects/ecommerce-2.jpg"],
    },
    {
        slug: "wordpress-multisite",
        title: "WordPress Multisite",
        year: 2024,
        tags: ["WordPress", "Enterprise"],
        cover: "/projects/reelfruits.png",
        overview: "Custom WordPress multisite for a media group — 4 brands, 1 codebase, shared user auth.",
        description: "Custom WordPress multisite for a media group — 4 brands, 1 codebase, shared user auth.",
        role: "WordPress Developer",
        liveUrl: "https://example-media.com",
        stack: ["WordPress", "PHP", "Advanced Custom Fields", "GSAP", "SCSS"],
        summary:
            "A media group needed four distinct editorial sites sharing a subscriber base. WordPress Multisite was the right call — one install, one login, four distinct front-end identities.",
        challenge:
            "Each brand had its own design language but shared advertising slots, subscriber accounts, and a central content API. Building truly isolated themes while keeping shared logic DRY was the core architectural challenge.",
        what: [
            "Configured WordPress Multisite with shared user tables and SSO across all four sub-sites.",
            "Built four child themes from a single parent, each with its own design tokens and editorial templates.",
            "Integrated ACF Pro for structured editorial data — no freeform content blobs.",
            "Added GSAP page transitions that work within WordPress's traditional server-rendered architecture.",
        ],
        hero: "/projects/wordpress-hero.jpg",
        images: ["/projects/wordpress-1.jpg", "/projects/wordpress-2.jpg"],
    },
];


export const featuredProjects = projects.slice(0, 4);

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
    prev: Project | null;
    next: Project | null;
} {
    const i = projects.findIndex((p) => p.slug === slug);
    return {
        prev: i > 0 ? projects[i - 1] : null,
        next: i < projects.length - 1 ? projects[i + 1] : null,
    };
}