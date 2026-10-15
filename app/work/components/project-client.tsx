"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, hasFinePointer } from "@/lib/gsap";
import type { Project } from "@/lib/strapi/types";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Primitives";

export default function WorkPage({ projects }: { projects: Project[] }) {
    const container = useRef<HTMLElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<number | null>(null);
    // Keep the last hovered cover in flow so the preview keeps its size while fading out.
    const [shown, setShown] = useState(0);
    if (active !== null && active !== shown) setShown(active);

    useGSAP(
        () => {
            gsap.set(".js-intro", { visibility: "visible" });

            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            SplitText.create(".work-heading", {
                type: "chars",
                mask: "chars",
                onSplit: (self) => tl.from(self.chars, { yPercent: 110, duration: 1.4, stagger: 0.04 }, 0.1),
            });
            tl.from(".work-fade", { y: 16, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.5)
                .from(".work-divider", { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "expo.inOut" }, 0.4)
                .from(".work-row", { y: 40, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.7);

            const preview = previewRef.current;
            if (!preview || !hasFinePointer()) return;

            // The floating preview follows the cursor with a little lag and tilt.
            // Centre it on the cursor whatever the active cover's height.
            gsap.set(preview, { xPercent: -50, yPercent: -50 });
            const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3.out" });
            const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3.out" });
            const rTo = gsap.quickTo(preview, "rotation", { duration: 0.9, ease: "power3.out" });
            let lastX = 0;
            let settle = 0;

            const move = (e: PointerEvent) => {
                xTo(e.clientX);
                yTo(e.clientY);
                rTo(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.4));
                lastX = e.clientX;
                window.clearTimeout(settle);
                settle = window.setTimeout(() => rTo(0), 90);
            };
            window.addEventListener("pointermove", move);
            return () => {
                window.clearTimeout(settle);
                window.removeEventListener("pointermove", move);
            };
        },
        { scope: container }
    );

    useGSAP(
        () => {
            gsap.to(previewRef.current, {
                autoAlpha: active === null ? 0 : 1,
                scale: active === null ? 0.85 : 1,
                duration: 0.6,
                ease: "expo.out",
            });
        },
        { dependencies: [active] }
    );

    return (
        <main ref={container} className="min-h-svh pb-28 pt-32 lg:pb-40 lg:pt-44">
            <div className="js-intro mx-auto max-w-[1680px] px-5 sm:px-8">
                <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <Eyebrow className="work-fade mb-6">Portfolio</Eyebrow>
                        <h1 className="flex items-start gap-3 font-display text-[clamp(5rem,17vw,15rem)] uppercase leading-[0.82] text-ink">
                            <span className="work-heading">Work</span>
                            <span className="work-fade mt-[0.12em] font-sans text-[clamp(0.9rem,1.4vw,1.25rem)] font-medium text-ink/35">
                                ({String(projects.length).padStart(2, "0")})
                            </span>
                        </h1>
                    </div>
                    <p className="work-fade max-w-sm text-[15px] leading-relaxed text-ink/55 lg:pb-4">
                        A selection of products I&apos;ve engineered — enterprise platforms, marketplaces and commerce, built to be fast and to last.
                    </p>
                </div>

                <div className="work-divider h-px w-full bg-ink/15" />

                <ul onPointerLeave={() => setActive(null)}>
                    {projects.map((project, i) => (
                        <li key={project.slug} className="work-row border-b border-ink/10">
                            <Link
                                href={`/work/${project.slug}`}
                                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                                className={`group grid grid-cols-1 gap-5 py-8 transition-opacity duration-500 sm:py-10 md:grid-cols-[3rem_1fr_auto] md:items-center md:gap-8 ${
                                    active !== null && active !== i ? "md:opacity-35" : ""
                                }`}
                            >
                                <span className="hidden font-mono text-xs tabular-nums text-ink/35 md:block">
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                <div className="overflow-hidden rounded-xl bg-ink/5 md:hidden">
                                    <Image src={project.cover} alt={project.title} width={1920} height={1280} className="block h-auto w-full" sizes="100vw" />
                                </div>

                                <div className="min-w-0">
                                    <div className="flex items-baseline justify-between gap-4 md:justify-start md:gap-6">
                                        <h2 className="font-heading text-[clamp(2rem,4.2vw,3.75rem)] leading-none tracking-[-0.015em] text-ink transition-transform duration-700 ease-out-expo md:group-hover:translate-x-3">
                                            {project.title}
                                        </h2>
                                        <span className="font-mono text-xs tabular-nums text-ink/40">{project.year}</span>
                                    </div>
                                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink/55 lg:hidden">{project.overview}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <ul className="flex flex-wrap gap-2 md:hidden md:justify-end lg:flex">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <li key={tag} className="whitespace-nowrap rounded-full border border-ink/12 px-3 py-1 text-xs text-ink/55">
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                    <span className="ml-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                                        <ArrowUpRight size={18} />
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cursor-following preview (desktop with a mouse) */}
            <div
                ref={previewRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-30 hidden w-[360px] overflow-hidden rounded-xl opacity-0 shadow-[0_30px_80px_-20px_rgba(13,27,42,0.45)] md:block"
                style={{ visibility: "hidden" }}
            >
                {projects.map((project, i) => (
                    <div
                        key={project.slug}
                        className={`transition-[clip-path] duration-700 ease-out-expo ${
                            shown === i
                                ? "relative [clip-path:inset(0_0_0_0)]"
                                : "absolute inset-x-0 top-0 [clip-path:inset(100%_0_0_0)]"
                        }`}
                        style={{ zIndex: shown === i ? 2 : 1 }}
                    >
                        <Image src={project.cover} alt="" width={1920} height={1280} className="block h-auto w-full" sizes="360px" />
                    </div>
                ))}
            </div>
        </main>
    );
}
