"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { Project } from "@/lib/strapi/types";

export default function WorkPage({ projects }: { projects: Project[] }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const split = new SplitText(".work-heading", { type: "chars" });
        gsap.set(split.chars, { clipPath: "inset(0 0 100% 0)", willChange: "clip-path" });
        gsap.to(split.chars, {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.75,
            ease: "power4.out",
            stagger: 0.025,
            delay: 0.15,
            onComplete: () => gsap.set(split.chars, { willChange: "auto" }),
        });

        gsap.from([".work-counter", ".work-caption"], {
            opacity: 0,
            y: 10,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.5,
        });

        gsap.fromTo(".work-divider",
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 0.9, ease: "power3.inOut", delay: 0.55 }
        );

        gsap.utils.toArray<HTMLElement>(".work-card").forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 40,
                duration: 0.75,
                ease: "power3.out",
                delay: 0.6 + i * 0.1,
            });
        });
    }, { scope: container });

    return (
        <main ref={container} className="min-h-screen pt-32 lg:pt-40 pb-32">
            <div className="max-w-420 mx-auto px-8">
                <div className="mb-16 lg:mb-20">
                    <div className="flex items-end gap-4 mb-4">
                        <h1
                            className="work-heading font-[family-name:var(--font-heading)] text-[#0d1b2a] leading-[0.95]"
                            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
                        >
                            Work
                        </h1>
                        <span
                            className="work-counter font-[family-name:var(--font-heading)] text-[#0d1b2a]/20 leading-none pb-2"
                            style={{ fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)" }}
                        >
                            {String(projects.length).padStart(2, "0")}
                        </span>
                    </div>
                    <p
                        className="work-caption text-[#0d1b2a]/45 max-w-md"
                        style={{ fontSize: "clamp(14px, 1.1vw, 16px)" }}
                    >
                        A selection of projects I've designed and built — spanning product, creative development, and enterprise work.
                    </p>
                </div>

                <div className="work-divider w-full h-px bg-[#0d1b2a]/10 mb-0" />

                <ul className="divide-y divide-[#0d1b2a]/10">
                    {projects.map((project, i) => (
                        <WorkCard key={project.slug} project={project} index={i} />
                    ))}
                </ul>

            </div>
        </main>
    );
}

function WorkCard({ project, index }: { project: Project; index: number }) {
    const cardRef = useRef<HTMLLIElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const card = cardRef.current;
        const img = imgRef.current;
        if (!card || !img) return;

        card.addEventListener("mouseenter", () => {
            gsap.to(img, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(img, { opacity: 0, scale: 0.94, duration: 0.3, ease: "power3.in" });
        });
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            gsap.to(img, {
                x: e.clientX - rect.left - 140,
                y: e.clientY - rect.top - 100,
                duration: 0.5,
                ease: "power2.out",
            });
        });
    }, { scope: cardRef });

    return (
        <li ref={cardRef} className="work-card relative group">
            <Link
                href={`/work/${project.slug}`}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-8 sm:py-10"
            >
                <span className="text-[#0d1b2a]/20 text-xs font-mono w-8 shrink-0 hidden md:block">
                    {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative w-full h-48 sm:hidden overflow-hidden rounded-sm">
                    <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw"
                        unoptimized
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-5 mb-2 sm:mb-1.5">
                        <h2
                            className="font-[family-name:var(--font-heading)] text-[#0d1b2a] leading-none transition-opacity duration-200 group-hover:opacity-55"
                            style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)" }}
                        >
                            {project.title}
                        </h2>
                        <span className="text-[#0d1b2a]/30 text-sm font-mono">{project.year}</span>
                    </div>
                    <p
                        className="text-[#0d1b2a]/45 hidden sm:block max-w-lg"
                        style={{ fontSize: "clamp(13px, 1vw, 15px)" }}
                    >
                        {project.overview}
                    </p>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <div className="hidden lg:flex items-center gap-2 flex-wrap justify-end">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs text-[#0d1b2a]/40 border border-[#0d1b2a]/12 rounded-full px-3 py-1 whitespace-nowrap"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="text-[#0d1b2a]/25 group-hover:text-[#0d1b2a] text-xl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                        ↗
                    </span>
                </div>
            </Link>

            <div
                ref={imgRef}
                className="pointer-events-none absolute z-20 hidden lg:block top-0 left-0"
                style={{ width: 280, height: 200, opacity: 0, scale: "0.94" }}
            >
                <div className="relative w-full h-full overflow-hidden shadow-2xl">
                    <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="280px"
                        unoptimized
                    />
                </div>
            </div>
        </li>
    );
}