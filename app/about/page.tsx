import AboutHero from "./components/about-hero";
import WorkHistory from "./components/work-history";

export const metadata = {
    title: "About — Oluwafemi Onabule",
    description: "Frontend engineer with 6+ years building high-performance web experiences.",
};

export default function AboutPage() {
    return (
        <main className="bg-white">
            <AboutHero />
            <WorkHistory />
            {/* <Playground />
            <AboutCta /> */}
        </main>
    );
}