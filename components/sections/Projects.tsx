"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, hasFinePointer } from "@/lib/gsap";
import type { Project } from "@/lib/strapi/types";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Eyebrow, PillButton } from "@/components/ui/Primitives";

/** Cover image that follows the cursor with a "View" badge and drifts on scroll. */
export function ProjectCard({ project, index, className = "" }: { project: Project; index: number; className?: string }) {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const card = cardRef.current;
            const badge = badgeRef.current;
            if (!card || !badge) return;

            gsap.fromTo(
                ".pc-media",
                { clipPath: "inset(14% 6% 14% 6% round 20px)" },
                {
                    clipPath: "inset(0% 0% 0% 0% round 16px)",
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: { trigger: card, start: "top 88%" },
                }
            );
            gsap.from(".pc-text > *", {
                y: 28,
                autoAlpha: 0,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.07,
                scrollTrigger: { trigger: card, start: "top 80%" },
            });

            if (!hasFinePointer()) return;

            const xTo = gsap.quickTo(badge, "x", { duration: 0.5, ease: "power3.out" });
            const yTo = gsap.quickTo(badge, "y", { duration: 0.5, ease: "power3.out" });
            const media = card.querySelector<HTMLElement>(".pc-media")!;

            const move = (e: PointerEvent) => {
                const r = media.getBoundingClientRect();
                xTo(e.clientX - r.left);
                yTo(e.clientY - r.top);
            };
            const enter = (e: PointerEvent) => {
                const r = media.getBoundingClientRect();
                gsap.set(badge, { x: e.clientX - r.left, y: e.clientY - r.top });
                gsap.to(badge, { scale: 1, autoAlpha: 1, duration: 0.5, ease: "expo.out" });
            };
            const leave = () => gsap.to(badge, { scale: 0.4, autoAlpha: 0, duration: 0.35, ease: "power3.out" });

            media.addEventListener("pointermove", move);
            media.addEventListener("pointerenter", enter);
            media.addEventListener("pointerleave", leave);
            return () => {
                media.removeEventListener("pointermove", move);
                media.removeEventListener("pointerenter", enter);
                media.removeEventListener("pointerleave", leave);
            };
        },
        { scope: cardRef }
    );

    return (
        <Link ref={cardRef} href={`/work/${project.slug}`} className={`group flex flex-col gap-6 ${className}`}>
            <div className="pc-media relative overflow-hidden rounded-2xl bg-ink/5 transition-[translate,box-shadow] duration-700 ease-out-expo group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_60px_-30px_rgba(13,27,42,0.45)] md:cursor-none">
                {/* Natural aspect ratio so the whole cover is visible, uncropped. */}
                <Image
                    src={project.cover}
                    alt={project.title}
                    width={1920}
                    height={1280}
                    className="block h-auto w-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/5" />

                <div
                    ref={badgeRef}
                    aria-hidden="true"
                    className="pointer-events-none invisible absolute left-0 top-0 z-20 -ml-12 -mt-12 flex h-24 w-24 scale-50 items-center justify-center rounded-full bg-paper/95 text-[13px] font-semibold text-ink opacity-0 shadow-[0_10px_40px_-10px_rgba(13,27,42,0.4)] backdrop-blur"
                >
                    <span className="flex items-center gap-1">
                        View <ArrowUpRight size={14} />
                    </span>
                </div>
            </div>

            <div className="pc-text flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink/45">
                    <span className="font-mono tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    <span className="h-px w-6 bg-ink/20" />
                    <span>{project.tags.slice(0, 3).join("  ·  ")}</span>
                    <span className="ml-auto font-mono tabular-nums">{project.year}</span>
                </div>
                <h3 className="flex items-center justify-between gap-6 font-heading text-[clamp(1.75rem,2.6vw,2.6rem)] leading-[1.05] text-ink">
                    {project.title}
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                        <ArrowUpRight size={16} />
                    </span>
                </h3>
                <p className="max-w-xl text-[15px] leading-relaxed text-ink/55">{project.overview}</p>
            </div>
        </Link>
    );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
    const container = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.from(".ps-header > *", {
                y: 30,
                autoAlpha: 0,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.08,
                scrollTrigger: { trigger: ".ps-header", start: "top 88%" },
            });
        },
        { scope: container }
    );

    return (
        <section id="selected-work" ref={container} className="scroll-mt-24 px-5 pb-28 pt-28 sm:px-8 lg:pb-40 lg:pt-36">
            <div className="mx-auto max-w-[1680px]">
                <div className="ps-header mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:mb-20">
                    <div className="flex flex-col gap-5">
                        <Eyebrow>Selected work</Eyebrow>
                        <h2 className="font-heading text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] text-ink">
                            Recent <em className="italic text-ink/50">launches</em>
                            <sup className="ml-2 align-super font-sans text-sm font-medium not-italic text-ink/35">
                                ({String(projects.length).padStart(2, "0")})
                            </sup>
                        </h2>
                    </div>
                    <PillButton href="/work">All projects</PillButton>
                </div>

                <div className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 lg:gap-x-16 lg:gap-y-28">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.slug}
                            project={project}
                            index={i}
                            className={i % 2 === 1 ? "md:mt-32" : ""}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
