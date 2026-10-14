export type SocialLink = {
    label: string;
    href: string;
    icon: "x" | "linkedin" | "github" | "dribbble" | "behance";
};

export type HeroData = {
    greeting: string;
    name: string;
    roles: string[];
    bio: string;
    image: string;
    cta: {
        label: string;
        href: string;
    };
    socials: SocialLink[];
};

export type NavLink = {
    label: string;
    href: string;
    external?: boolean;
};

export type SiteConfig = {
    logo: string;
    nav: NavLink[];
    ctaLabel: string;
    ctaHref: string;
};

// Data
export const siteConfig: SiteConfig = {
    logo: "Femi. O",
    nav: [
        { label: "Work", href: "/work" },
        { label: "About", href: "/about" },
        {
            label: "Resume",
            href: "https://drive.google.com/file/d/1uCPrM8g4gWjqp5kfQVWJUtFOqgCXOv_9/view?usp=sharing",
            external: true,
        },
        { label: "Contact", href: "/contact" },
    ],
    ctaLabel: "Let's talk ↗",
    ctaHref: "/contact",
};

export const heroData: HeroData = {
    greeting: "Hello, I'm Femi Onabule",
    name: "Oluwafemi Onabule",
    roles: ["Frontend", "Engineer"],
    bio: `I design and build high-performance websites and web applications using React, Next.js and WordPress — shipping products that make an impact. 6+ years delivering e-commerce stores, fintech dashboards and headless CMS platforms for agencies and businesses. Currently engineering at NativeBrands Digital Agency, Lagos.`,
    image: "/images/oluwafemi.png",
    cta: {
        label: "Let's Talk",
        href: "/contact",
    },
    socials: [
        { label: "X / Twitter", href: "https://twitter.com/yourhandle", icon: "x" },
        { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle", icon: "linkedin" },
        { label: "GitHub", href: "https://github.com/yourhandle", icon: "github" },
    ],
};