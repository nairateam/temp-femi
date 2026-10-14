"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { Project } from "@/lib/strapi/types";
import MDContent from "@/components/MarkDown";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function ProjectDetailPage({
    project,
    prevSlug,
    prevTitle,
    nextSlug,
    nextTitle,
}: {
    project: Project;
    prevSlug: string | null;
    prevTitle: string | null;
    nextSlug: string | null;
    nextTitle: string | null;
}) {
    const container = useRef<HTMLDivElement>(null);

    const autoplay = useRef(
        Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "center", skipSnaps: false },
        [autoplay.current]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
        autoplay.current.reset();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
        autoplay.current.reset();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        emblaApi?.scrollTo(index);
        autoplay.current.reset();
    }, [emblaApi]);

    const onInit = useCallback((api: NonNullable<typeof emblaApi>) => {
        setScrollSnaps(api.scrollSnapList());
    }, []);

    const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
        setSelectedIndex(api.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onInit(emblaApi);
        onSelect(emblaApi);
        emblaApi.on("reInit", onInit);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("select", onSelect);
    }, [emblaApi, onInit, onSelect]);

    useGSAP(() => {
        const split = new SplitText(".pd-title", { type: "chars" });
        gsap.set(split.chars, { clipPath: "inset(0 0 100% 0)", willChange: "clip-path" });
        gsap.to(split.chars, {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.02,
            delay: 0.1,
            onComplete: () => gsap.set(split.chars, { willChange: "auto" }),
        });

        gsap.from(".pd-meta", {
            opacity: 0,
            y: 12,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.55,
        });

        gsap.fromTo(
            ".pd-hero",
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.inOut", delay: 0.45 }
        );

        gsap.utils.toArray<HTMLElement>(".pd-reveal").forEach((el) => {
            gsap.from(el, {
                opacity: 0,
                y: 24,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 88%" },
            });
        });

        gsap.fromTo(
            ".pd-carousel",
            { opacity: 0, y: 32 },
            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: ".pd-carousel", start: "top 85%" },
            }
        );

    }, { scope: container });

    return (
        <main ref={container} className="min-h-screen pt-32 lg:pt-40 pb-32">
            <div className="max-w-420 mx-auto px-8">

                {/* Back */}
                <Link
                    href="/work"
                    className="inline-flex items-center gap-2 text-sm text-[#0d1b2a]/40 hover:text-[#0d1b2a] transition-colors duration-200 mb-10 lg:mb-14 group"
                >
                    <span className="group-hover:-translate-x-0.5 transition-transform duration-200">
                        <ArrowLeftIcon />
                    </span>
                    All Projects
                </Link>

                {/* Title */}
                <h1
                    className="pd-title font-[family-name:var(--font-heading)] text-[#0d1b2a] leading-[1.1] mb-8 lg:mb-10"
                    style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
                >
                    {project.title}
                </h1>

                {/* Meta */}
                <div className="pd-meta flex flex-wrap items-center gap-x-10 gap-y-3 mb-14 lg:mb-16 border-t border-b border-[#0d1b2a]/10 py-5">
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#0d1b2a]/30 block mb-0.5">Role</span>
                        <span className="text-sm text-[#0d1b2a]">{project.role}</span>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#0d1b2a]/30 block mb-0.5">Year</span>
                        <span className="text-sm text-[#0d1b2a]">{project.year}</span>
                    </div>
                    {project.url && (
                        <div>
                            <span className="text-[10px] uppercase tracking-widest text-[#0d1b2a]/30 block mb-0.5">Live</span>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[#0d1b2a] hover:opacity-60 transition-opacity duration-200"
                            >
                                Visit Project ↗
                            </a>
                        </div>
                    )}
                    <div className="ml-auto hidden sm:flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs text-[#0d1b2a]/40 border border-[#0d1b2a]/12 rounded-full px-3 py-1"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hero image */}
                {project.hero && (
                    <div
                        className="pd-hero relative w-full overflow-hidden mb-16 lg:mb-24"
                        style={{ aspectRatio: "16/9" }}
                    >
                        <Image
                            src={project.hero}
                            alt={`${project.title} hero`}
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 1400px"
                            unoptimized
                        />
                    </div>
                )}

                {/* Body */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 mb-16 lg:mb-24">
                    <div className="pd-reveal">
                        <h2 className="font-[family-name:var(--font-heading)] text-[#0d1b2a] text-2xl lg:text-3xl mb-4">
                            Overview
                        </h2>
                        <p className="text-[#0d1b2a]/55 leading-[1.9] text-sm">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div className="pd-reveal">
                            <h3 className="text-[10px] uppercase tracking-widest text-[#0d1b2a]/30 mb-4">
                                The Challenge
                            </h3>
                            <MDContent
                                content={project.challenge}
                                className="text-[#0d1b2a]/55 text-[15px] leading-[1.8]"
                            />
                        </div>
                        <div className="pd-reveal">
                            <h3 className="text-[10px] uppercase tracking-widest text-[#0d1b2a]/30 mb-4">
                                The Solution
                            </h3>
                            <MDContent
                                content={project.solution}
                                className="text-[#0d1b2a]/55 text-[15px] leading-[1.8]"
                            />
                        </div>
                    </div>
                </div>

                {/* Media Carousel */}
                {project.media.length > 0 && (
                    <div className="pd-carousel mb-24 lg:mb-32">
                        <div className="relative">

                            {/* Embla viewport */}
                            <div className="overflow-hidden" ref={emblaRef}>
                                <div className="flex gap-4 lg:gap-5">
                                    {project.media.map((src, i) => (
                                        <div
                                            key={i}
                                            className="relative shrink-0 grow-0 basis-full sm:basis-[85%] rounded-2xl border border-[#0d1b2a]/8 bg-[#0d1b2a]/[0.03] p-2.5 lg:p-3"
                                        >
                                            {/* Slide header */}
                                            <div className="flex items-center justify-between mb-2.5 px-0.5">
                                                <span className="text-[9px] uppercase tracking-widest text-[#0d1b2a]/25">
                                                    {project.title}
                                                </span>
                                                <span className="text-[9px] tabular-nums text-[#0d1b2a]/25">
                                                    {String(i + 1).padStart(2, "0")} / {String(project.media.length).padStart(2, "0")}
                                                </span>
                                            </div>

                                            {/* Image */}
                                            <div
                                                className="relative w-full overflow-hidden rounded-xl"
                                                style={{ aspectRatio: "16/9" }}
                                            >
                                                <Image
                                                    src={src}
                                                    alt={`${project.title} screenshot ${i + 1}`}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 640px) 100vw, 85vw"
                                                    unoptimized
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer: dots + arrows */}
                            {project.media.length > 1 && (
                                <div className="flex items-center justify-between mt-4 px-1">

                                    {/* Dots */}
                                    <div className="flex items-center gap-1.5">
                                        {scrollSnaps.map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => scrollTo(i)}
                                                aria-label={`Go to image ${i + 1}`}
                                                className={`h-1 rounded-full transition-all duration-300 ${i === selectedIndex
                                                    ? "w-5 bg-[#0d1b2a]"
                                                    : "w-1 bg-[#0d1b2a]/20 hover:bg-[#0d1b2a]/40"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Arrows */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={scrollPrev}
                                            aria-label="Previous image"
                                            className="flex items-center justify-center w-8 h-8 rounded-full border border-[#0d1b2a]/10 text-[#0d1b2a]/40 hover:text-[#0d1b2a] hover:border-[#0d1b2a]/30 transition-all duration-200"
                                        >
                                            <ChevronLeftIcon size={15} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={scrollNext}
                                            aria-label="Next image"
                                            className="flex items-center justify-center w-8 h-8 rounded-full border border-[#0d1b2a]/10 text-[#0d1b2a]/40 hover:text-[#0d1b2a] hover:border-[#0d1b2a]/30 transition-all duration-200"
                                        >
                                            <ChevronRightIcon size={15} />
                                        </button>
                                    </div>

                                </div>
                            )}

                        </div>
                    </div>
                )}

                {/* Prev / Next */}
                <div className="border-t border-[#0d1b2a]/10 pt-10 grid grid-cols-2 gap-4">
                    {prevSlug ? (
                        <Link href={`/work/${prevSlug}`} className="group flex flex-col gap-1">
                            <span className="text-xs text-[#0d1b2a]/30 uppercase tracking-widest">Previous</span>
                            <span className="font-[family-name:var(--font-heading)] text-[#0d1b2a] text-xl sm:text-2xl group-hover:opacity-60 transition-opacity duration-200">
                                ← {prevTitle}
                            </span>
                        </Link>
                    ) : <div />}

                    {nextSlug ? (
                        <Link href={`/work/${nextSlug}`} className="group flex flex-col gap-1 text-right">
                            <span className="text-xs text-[#0d1b2a]/30 uppercase tracking-widest">Next</span>
                            <span className="font-[family-name:var(--font-heading)] text-[#0d1b2a] text-xl sm:text-2xl group-hover:opacity-60 transition-opacity duration-200">
                                {nextTitle} →
                            </span>
                        </Link>
                    ) : <div />}
                </div>

            </div>
        </main >
    );
}