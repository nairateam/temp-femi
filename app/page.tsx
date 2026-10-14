import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/Projects";
import {
  getHero,
  getProjects,
  normalizeHero,
  normalizeProject,
} from "@/lib/strapi/app";

export default async function Home() {
  const [heroRaw, projectsRaw] = await Promise.all([
    getHero(),
    getProjects(),
  ]);

  const hero = normalizeHero(heroRaw);
  const projects = projectsRaw.map((p: any) => normalizeProject(p.id, p));

  return (
    <div>
      <Hero heroData={hero} />
      <ProjectsSection projects={projects} />
    </div>
  );
}