"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { aboutData } from "@/lib/data/about";
import { gsap, SplitText } from "@/lib/gsap";

const SOCIALS = [
    { label: "GitHub", href: "https://github.com/yourhandle", icon: <GitHubIcon /> },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle", icon: <LinkedInIcon /> },
    { label: "X", href: "https://x.com/yourhandle", icon: <XIcon /> },
    { label: "Instagram", href: "https://instagram.com/yourhandle", icon: <InstagramIcon /> },
];

export default function AboutHero() {
    const container = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const headingSplit = new SplitText(".about-heading", { type: "chars" });

        gsap.set(headingSplit.chars, { clipPath: "inset(0 0 100% 0)", willChange: "clip-path" });
        gsap.to(headingSplit.chars, {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.03,
            delay: 0.2,
            onComplete: () => gsap.set(headingSplit.chars, { willChange: "auto" }),
        });

        aboutData.bio.forEach((_, i) => {
            const split = new SplitText(`.about-bio-${i}`, { type: "lines" });
            gsap.from(split.lines, {
                opacity: 0,
                y: 20,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.08,
                delay: 0.5 + i * 0.18,
            });
        });

        gsap.fromTo(".about-socials",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.95 }
        );

        const track = trackRef.current;
        if (!track) return;

        const totalWidth = track.scrollWidth / 2;

        gsap.to(track, {
            x: -totalWidth,
            duration: 22,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
            },
        });
    }, { scope: container });

    return (
        <section ref={container} className="pt-32 lg:pt-40 pb-8">
            <div className="max-w-420 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-48 px-8 items-start">

                {/* LEFT — heading, bio, socials */}
                <div className="flex flex-col gap-8">
                    <h1
                        className="text-2xl md:text-5xl about-heading font-[family-name:var(--font-heading)] text-[#0d1b2a] leading-[1]"
                    >
                        {aboutData.heading}
                    </h1>

                    <div className="flex flex-col gap-5">
                        {aboutData.bio.map((paragraph, i) => (
                            <p
                                key={i}
                                className={`about-bio-${i} text-[#0d1b2a] text-[15px] sm:text-base leading-[1.8]`}
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div
                        className="about-socials flex items-center gap-2 flex-wrap"
                        style={{ opacity: 0 }}
                    >
                        {SOCIALS.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-11 h-11 rounded-lg border border-[#0d1b2a]/20 text-[#0d1b2a]/60 hover:border-[#0d1b2a]/50 hover:text-[#0d1b2a] transition-colors duration-200"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* RIGHT — masked marquee, left to right */}
                <div className="relative overflow-hidden h-[280px] lg:h-[420px] -mx-8 sm:-mx-12 lg:mx-0">
                    <div className="absolute inset-0 z-10 pointer-events-none" />
                    <div
                        ref={trackRef}
                        className="flex gap-3 lg:gap-5 h-full"
                        style={{ width: "max-content" }}
                    >
                        {[...aboutData.images, ...aboutData.images].map((src, i) => (
                            <div
                                key={i}
                                className="relative flex-shrink-0 overflow-hidden h-full"
                                style={{ width: "clamp(140px, 16vw, 240px)" }}
                            >
                                <Image
                                    src={src}
                                    alt={`About image ${(i % aboutData.images.length) + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 140px, 16vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section >
    );
}

function GitHubIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

function XIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
    );
}