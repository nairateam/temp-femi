export type NavItem = {
    label: string;
    href: string;
    external?: boolean;
};

export type Social = {
    label: string;
    href: string;
    icon: "github" | "linkedin" | "x" | "instagram";
};

const RESUME_URL =
    "https://drive.google.com/file/d/1uCPrM8g4gWjqp5kfQVWJUtFOqgCXOv_9/view?usp=sharing";

// Single source of truth for site-wide identity, navigation and contact details.
export const site = {
    name: "Oluwafemi Onabule",
    shortName: "Femi Onabule",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://oluwafemi-dev.com",
    logo: "Femi. O",
    role: "Frontend Engineer",
    location: "Lagos, Nigeria",
    timeZone: "Africa/Lagos",
    email: "onabulefemi@gmail.com",
    resumeUrl: RESUME_URL,
    available: true,
    nav: [
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        { label: "Resume", href: RESUME_URL, external: true },
        { label: "Contact", href: "/contact" },
    ] satisfies NavItem[],
    cta: { label: "Let's talk", href: "/contact" },
    socials: [
        // TODO: replace with your real profile URLs.
        { label: "GitHub", href: "https://github.com/yourhandle", icon: "github" },
        { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle", icon: "linkedin" },
        { label: "X", href: "https://x.com/yourhandle", icon: "x" },
        { label: "Instagram", href: "https://instagram.com/yourhandle", icon: "instagram" },
    ] satisfies Social[],
    stack: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "GSAP",
        "WordPress",
        "WooCommerce",
        "Strapi",
        "Headless CMS",
        "Node.js",
    ],
};
