import type { Metadata } from "next";
import AboutHero from "./components/about-hero";
import WorkHistory from "./components/work-history";

export const metadata: Metadata = {
    title: "About",
    description: "Frontend engineer with 4+ years building fast, considered web experiences with React, Next.js and WordPress.",
};

export default function AboutPage() {
    return (
        <main>
            <AboutHero />
            <WorkHistory />
        </main>
    );
}
