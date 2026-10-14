"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRightIcon } from "lucide-react";
import { Project } from "@/lib/strapi/types";

function ProjectCard({
    project,
    index,
}: {
    project: Project;
    index: number;
}) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const capsuleRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setHovered(true);
        gsap.to(capsuleRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(1.4)",
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHovered(false);
        gsap.to(capsuleRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.25,
            ease: "power2.in",
        });
    }, []);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (!cardRef.current || !capsuleRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(capsuleRef.current, {
                x: x - capsuleRef.current.offsetWidth / 2,
                y: y - capsuleRef.current.offsetHeight / 2,
                duration: 0.45,
                ease: "power2.out",
            });
        },
        []
    );

    return (
        <Link
            ref={cardRef}
            href={`/work/${project.slug}`}
            className="ps-block group flex flex-col gap-5 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <div
                className="ps-img-wrap relative overflow-hidden rounded-xl"
                style={{ aspectRatio: "4/3" }}
            >
                <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                />
                <div className="absolute inset-0 bg-[#0d1b2a]/0 group-hover:bg-[#0d1b2a]/10 transition-colors duration-500" />

                {/* Floating capsule — pointer-events:none so it never blocks hover */}
                <div
                    ref={capsuleRef}
                    className="absolute top-0 left-0 pointer-events-none z-20 opacity-0 scale-75"
                    style={{ willChange: "transform, opacity" }}
                >
                    <div className="flex items-center gap-2 text-xs md:text-base bg-white/95 backdrop-blur-sm text-[#0d1b2a] font-medium tracking-wide px-4 py-2.5 rounded-full shadow-[0_8px_32px_rgba(13,27,42,0.18)] border border-white/60 whitespace-nowrap select-none">
                        View project
                        <span className="inline-block transition-transform duration-300">
                            <ArrowUpRightIcon size={20} />
                        </span>
                    </div>
                </div>
            </div>

            <div className="ps-text flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-[#0d1b2a]/20 font-mono text-xs">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="w-8 h-px bg-[#0d1b2a]/15" />
                    <div className="flex items-center gap-2 flex-wrap">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs text-[#0d1b2a]/40 border border-[#0d1b2a]/12 rounded-full px-2.5 py-0.5"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <h3
                    className="font-[family-name:var(--font-heading)] text-[#0d1b2a] leading-[1.05] lg:max-w-[70%]"
                    style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)" }}
                >
                    {project.title}
                </h3>

                <p className="text-[#0d1b2a]/50 leading-relaxed text-[14px] md:max-w-[80%]">
                    {project.overview}
                </p>
            </div>
        </Link>
    );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".ps-header", {
            opacity: 0,
            y: 16,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: ".ps-header", start: "top 88%" },
        });

        gsap.utils.toArray<HTMLElement>(".ps-block").forEach((block) => {
            const img = block.querySelector<HTMLElement>(".ps-img-wrap");
            if (img) {
                gsap.fromTo(
                    img,
                    { clipPath: "inset(100% 0 0 0)" },
                    {
                        clipPath: "inset(0% 0 0 0)",
                        duration: 1,
                        ease: "power4.inOut",
                        scrollTrigger: { trigger: block, start: "top 82%" },
                    }
                );
            }

            const text = block.querySelector<HTMLElement>(".ps-text");
            if (text) {
                gsap.from(text, {
                    opacity: 0,
                    y: 24,
                    duration: 0.7,
                    ease: "power3.out",
                    delay: 0.2,
                    scrollTrigger: { trigger: block, start: "top 82%" },
                });
            }
        });
    }, { scope: container });

    return (
        <section ref={container} className="px-8 sm:px-12 lg:px-16 py-28 lg:py-36">
            <div className="max-w-[1600px] mx-auto">

                <div className="ps-header flex items-end justify-between mb-14 lg:mb-20">
                    <div className="flex items-baseline gap-3">
                        <h2
                            className="font-[family-name:var(--font-heading)] text-[#0d1b2a] leading-none uppercase"
                            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
                        >
                            Selected Work
                        </h2>
                        <span className="text-[#0d1b2a]/25 font-mono text-sm">
                            {String(projects.length).padStart(2, "0")}
                        </span>
                    </div>
                    <Link
                        href="/work"
                        className="hidden sm:flex items-center gap-1.5 text-sm text-[#0d1b2a]/45 hover:text-[#0d1b2a] transition-colors duration-200 group"
                    >
                        View all
                        <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 inline-block">↗</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.slug} project={project} index={i} />
                    ))}
                </div>

                <div className="sm:hidden mt-14">
                    <Link
                        href="/work"
                        className="flex items-center gap-2 text-sm text-[#0d1b2a]/50 hover:text-[#0d1b2a] transition-colors duration-200"
                    >
                        View all projects ↗
                    </Link>
                </div>

            </div>
        </section>
    );
}