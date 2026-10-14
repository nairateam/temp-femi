import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/Projects";
import { hero, projects } from "@/lib/data/content";

export default function Home() {
  return (
    <div>
      <Hero heroData={hero} />
      <ProjectsSection projects={projects} />
    </div>
  );
}
