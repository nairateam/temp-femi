"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import type { Project } from "@/lib/strapi/types";
import MDContent from "@/components/MarkDown";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Eyebrow, PillButton, RollText } from "@/components/ui/Primitives";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Neighbour = { slug: string; title: string; cover: string } | null;

export default function ProjectDetailPage({ project, next }: { project: Project; next: Neighbour }) {
    const container = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.set(".js-intro", { visibility: "visible" });

            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            SplitText.create(".pd-title", {
                type: "lines,words",
                mask: "lines",
                onSplit: (self) => tl.from(self.words, { yPercent: 110, duration: 1.4, stagger: 0.06 }, 0.1),
            });
            tl.from(".pd-fade", { y: 18, autoAlpha: 0, duration: 1, stagger: 0.07 }, 0.45).fromTo(
                ".pd-hero",
                { clipPath: "inset(12% 8% 0% 8% round 24px)" },
                { clipPath: "inset(0% 0% 0% 0% round 20px)", duration: 1.6, ease: "expo.inOut" },
                0.35
            );

            gsap.fromTo(
                ".pd-hero-img",
                { yPercent: -6, scale: 1.12 },
                {
                    yPercent: 6,
                    scale: 1.04,
                    ease: "none",
                    scrollTrigger: { trigger: ".pd-hero", start: "top bottom", end: "bottom top", scrub: true },
                }
            );

            gsap.utils.toArray<HTMLElement>(".pd-reveal").forEach((el) => {
                gsap.from(el, {
                    y: 40,
                    autoAlpha: 0,
                    duration: 1.2,
                    ease: "expo.out",
                    scrollTrigger: { trigger: el, start: "top 88%" },
                });
            });
        },
        { scope: container }
    );

    return (
        <main ref={container} className="pb-28 pt-32 lg:pb-36 lg:pt-44">
            <div className="js-intro mx-auto max-w-[1680px] px-5 sm:px-8">
                <Link
                    href="/work"
                    className="pd-fade group mb-10 inline-flex items-center gap-2 text-sm font-medium text-ink/50 transition-colors hover:text-ink lg:mb-14"
                >
                    <span className="transition-transform duration-500 ease-out-expo group-hover:-translate-x-1">←</span>
                    <RollText>All projects</RollText>
                </Link>

                <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                    <h1 className="pd-title font-heading text-[clamp(3rem,8.5vw,8.5rem)] leading-[0.95] tracking-[-0.025em] text-ink">
                        {project.title}
                    </h1>
                    {project.url && (
                        <div className="pd-fade lg:pb-4">
                            <PillButton href={project.url} external variant="solid" size="lg">
                                Visit live site
                            </PillButton>
                        </div>
                    )}
                </div>

                <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-ink/10 py-6 md:grid-cols-[2fr_1fr_2fr] lg:mt-16">
                    <div className="pd-fade col-span-2 md:col-span-1">
                        <dt className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">Role</dt>
                        <dd className="text-[15px] text-ink">{project.role}</dd>
                    </div>
                    <div className="pd-fade">
                        <dt className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">Year</dt>
                        <dd className="text-[15px] tabular-nums text-ink">{project.year}</dd>
                    </div>
                    <div className="pd-fade">
                        <dt className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">Focus</dt>
                        <dd className="text-[15px] text-ink">{project.tags.slice(0, 3).join(", ")}</dd>
                    </div>
                </dl>

                {project.hero && (
                    <div className="pd-hero relative mt-12 aspect-[4/3] overflow-hidden rounded-[20px] bg-ink/5 sm:aspect-[16/9] lg:mt-16">
                        <div className="pd-hero-img absolute inset-0">
                            <Image
                                src={project.hero}
                                alt={`${project.title} — homepage`}
                                fill
                                priority
                                className="object-cover object-top"
                                sizes="(max-width: 1680px) 100vw, 1680px"
                            />
                        </div>
                    </div>
                )}

                <section className="mt-24 grid gap-12 lg:mt-36 lg:grid-cols-[1fr_2fr] lg:gap-20">
                    <div className="pd-reveal flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
                        <Eyebrow>Overview</Eyebrow>
                        <div>
                            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">Stack</h2>
                            <ul className="flex flex-wrap gap-2">
                                {project.stack.map((tech) => (
                                    <li key={tech} className="rounded-full border border-ink/12 px-3 py-1.5 text-[13px] text-ink/70">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col gap-16">
                        <p className="pd-reveal font-heading text-[clamp(1.35rem,2vw,1.9rem)] leading-[1.35] tracking-[-0.01em] text-ink">
                            {project.description}
                        </p>
                        <div className="grid gap-12 md:grid-cols-2">
                            {project.challenge && (
                                <div className="pd-reveal">
                                    <h3 className="mb-4 flex items-center gap-3 font-heading text-2xl text-ink">
                                        <span className="font-mono text-xs text-ink/35">01</span> The challenge
                                    </h3>
                                    <MDContent content={project.challenge} className="text-[15px] leading-[1.8] text-ink/65" />
                                </div>
                            )}
                            {project.solution && (
                                <div className="pd-reveal">
                                    <h3 className="mb-4 flex items-center gap-3 font-heading text-2xl text-ink">
                                        <span className="font-mono text-xs text-ink/35">02</span> The solution
                                    </h3>
                                    <MDContent content={project.solution} className="text-[15px] leading-[1.8] text-ink/65" />
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {project.media.length > 0 && <Gallery project={project} />}

                {next && (
                    <Link
                        href={`/work/${next.slug}`}
                        className="pd-reveal group relative mt-28 block overflow-hidden rounded-[24px] bg-ink text-white lg:mt-40"
                    >
                        <Image
                            src={next.cover}
                            alt=""
                            fill
                            className="object-cover opacity-40 transition-all duration-[1.4s] ease-out-expo group-hover:scale-105 group-hover:opacity-55"
                            sizes="100vw"
                        />
                        <div className="relative flex min-h-[320px] flex-col justify-between gap-10 p-8 sm:p-12 lg:min-h-[420px] lg:p-16">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Next project</span>
                            <div className="flex items-end justify-between gap-6">
                                <h2 className="font-heading text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
                                    {next.title}
                                </h2>
                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-transform duration-700 ease-out-expo group-hover:rotate-45 lg:h-20 lg:w-20">
                                    <ArrowUpRight size={22} />
                                </span>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </main>
    );
}

function Gallery({ project }: { project: Project }) {
    const [autoplay] = useState(() => Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }));
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [autoplay]);
    const [selected, setSelected] = useState(0);

    const go = useCallback(
        (fn: "scrollPrev" | "scrollNext") => {
            emblaApi?.[fn]();
            autoplay.reset();
        },
        [emblaApi, autoplay]
    );

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
        onSelect();
        emblaApi.on("select", onSelect).on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect).off("reInit", onSelect);
        };
    }, [emblaApi]);

    const total = project.media.length;

    return (
        <section className="pd-reveal mt-28 lg:mt-40" aria-roledescription="carousel" aria-label={`${project.title} screenshots`}>
            <div className="mb-8 flex items-end justify-between gap-6">
                <Eyebrow>Gallery</Eyebrow>
                {total > 1 && (
                    <div className="flex items-center gap-4">
                        <span className="font-mono text-xs tabular-nums text-ink/45">
                            {String(selected + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                        </span>
                        <div className="flex gap-2">
                            {(["scrollPrev", "scrollNext"] as const).map((fn) => (
                                <button
                                    key={fn}
                                    type="button"
                                    onClick={() => go(fn)}
                                    aria-label={fn === "scrollPrev" ? "Previous image" : "Next image"}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                                >
                                    {fn === "scrollPrev" ? "←" : "→"}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="-mx-5 overflow-hidden sm:-mx-8" ref={emblaRef}>
                <div className="flex touch-pan-y">
                    {project.media.map((src, i) => (
                        <div key={src} className="min-w-0 shrink-0 grow-0 basis-[88%] pl-4 sm:basis-[78%] lg:basis-[68%] lg:pl-6">
                            <div
                                className={`relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink/8 bg-white transition-all duration-700 ease-out-expo ${
                                    i === selected ? "opacity-100" : "scale-[0.94] opacity-50"
                                }`}
                            >
                                <Image
                                    src={src}
                                    alt={`${project.title} screenshot ${i + 1}`}
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 640px) 88vw, 68vw"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {total > 1 && (
                <div className="mt-6 flex justify-center gap-1.5">
                    {project.media.map((src, i) => (
                        <button
                            key={src}
                            type="button"
                            onClick={() => {
                                emblaApi?.scrollTo(i);
                                autoplay.reset();
                            }}
                            aria-label={`Go to image ${i + 1}`}
                            aria-current={i === selected}
                            className="group flex h-6 items-center"
                        >
                            <span
                                className={`block h-1 rounded-full transition-all duration-500 ease-out-expo ${
                                    i === selected ? "w-8 bg-ink" : "w-2 bg-ink/20 group-hover:bg-ink/40"
                                }`}
                            />
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}
