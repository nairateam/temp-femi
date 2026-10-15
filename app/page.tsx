import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import ProjectsSection from "@/components/sections/Projects";
import { hero, projects } from "@/lib/data/content";

export default function Home() {
  return (
    <main>
      <Hero heroData={hero} />
      <ProjectsSection projects={projects} />
      <Intro />
    </main>
  );
}
