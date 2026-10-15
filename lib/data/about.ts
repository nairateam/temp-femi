import { site } from "./site";

export type WorkExperience = {
    role: string;
    company: string;
    period: string;
};

export type AboutData = {
    heading: string;
    bio: string[];
    images: string[];
    workHistory: WorkExperience[];
    playgroundImages: string[];
    resumeUrl: string;
};

export const aboutData: AboutData = {
    heading: "About Me",
    bio: [
        "Hi, I'm Femi — a Front-End Engineer and WordPress Developer with a passion for building websites and web applications that are fast, functional and visually compelling. Over the past 4+ years, I've worked across agencies and businesses — delivering everything from WooCommerce rebuilds and Elementor sites to full Next.js applications with headless CMS integrations. I enjoy the full journey, from interpreting a designer's Figma file to shipping a product people actually use.",
        "Outside of work, you'll find me writing rap lyrics, grinding mobile games, or at church on Sunday morning.",
    ],
    images: [
        "/images/workspace.jpg",
        "/images/bully.jpg",
        "/images/church.jpg",
        "/images/studio.jpg",
    ],
    workHistory: [
        {
            role: "Front-End Developer",
            company: "NativeBrands Digital Agency",
            period: "2024 – Present",
        },
        {
            role: "Front-End Developer (Contract)",
            company: "Acedboard",
            period: "2024 – 2025",
        },
        {
            role: "WordPress Developer",
            company: "WC Digital Services",
            period: "2023 – 2025",
        },
    ],
    playgroundImages: [
        "/images/workspace.jpg",
        "/images/workspace.jpg",
    ],
    resumeUrl: site.resumeUrl,
};