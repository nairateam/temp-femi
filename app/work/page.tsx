import type { Metadata } from "next";
import { projects } from "@/lib/data/content";
import WorkPage from "./components/project-client";

export const metadata: Metadata = {
    title: "Work",
    description: "Selected projects — enterprise platforms, marketplaces and commerce built with Next.js, React and WordPress.",
};

export default function Page() {
    return <WorkPage projects={projects} />;
}
