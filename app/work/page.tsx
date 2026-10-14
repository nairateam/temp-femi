import { projects } from "@/lib/data/content";
import WorkPage from "./components/project-client";

export default function Page() {
    return <WorkPage projects={projects} />;
}
