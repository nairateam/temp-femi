"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import type { HeroData } from "@/lib/strapi/types";
import { site } from "@/lib/data/site";
import { Availability, PillButton } from "@/components/ui/Primitives";
import HeroBackground from "@/components/ui/HeroBackground";
import { useScrollTo } from "@/components/providers/SmoothScroll";

export default function Hero({ heroData }: { heroData: HeroData }) {
    const container = useRef<HTMLElement>(null);
    const scrollTo = useScrollTo();
    const greeting = `${heroData.greeting.trim()} ${heroData.name}`;

    useGSAP(
        () => {
            gsap.set(".js-intro", { visibility: "visible" });

            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

            tl.fromTo(
                ".hero-portrait",
                { clipPath: "inset(100% 0% 0% 0%)", yPercent: 8 },
                { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 1.6, ease: "expo.inOut" },
                0
            );

            SplitText.create(".hero-role", {
                type: "chars",
                mask: "chars",
                onSplit: (self) =>
                    tl.from(self.chars, { yPercent: 110, duration: 1.4, stagger: 0.025 }, 0.45),
            });

            SplitText.create(".hero-greeting", {
                type: "words",
                mask: "words",
                onSplit: (self) =>
                    tl.from(self.words, { yPercent: 110, duration: 1.1, stagger: 0.05 }, 0.75),
            });

            SplitText.create(".hero-bio", {
                type: "lines",
                mask: "lines",
                onSplit: (self) =>
                    tl.from(self.lines, { yPercent: 110, duration: 1.1, stagger: 0.08 }, 0.95),
            });

            tl.from(".hero-fade", { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08 }, 1.1);

            // Gentle depth on scroll (desktop): the portrait drifts slower than the type.
            gsap.matchMedia().add("(min-width: 768px)", () => {
                const scrub = { trigger: container.current, start: "top top", end: "bottom top", scrub: true };
                gsap.to(".hero-portrait", { y: () => window.innerHeight * 0.08, ease: "none", scrollTrigger: { ...scrub } });
                gsap.to(".hero-type", { yPercent: -18, ease: "none", scrollTrigger: { ...scrub } });
            });
        },
        { scope: container }
    );

    return (
        <section
            ref={container}
            className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,var(--paper)_0%,var(--haze)_55%,var(--mist)_100%)]"
        >
            {/* Animated grain + satin-wave atmosphere; the CSS gradient above is its fallback. */}
            <HeroBackground className="-z-10" />
            <div className="js-intro relative mx-auto flex min-h-svh max-w-[1680px] flex-col px-5 pt-28 sm:px-8 md:min-h-[max(100svh,680px)] md:pt-32">
                {/* Top row: availability + location */}
                <div className="hero-fade z-20 flex items-center justify-between gap-4 text-[13px] text-ink/60">
                    <Availability />
                    <span className="hidden sm:inline">Based in {site.location}</span>
                </div>

                {/* Mobile: copy first, portrait below */}
                <div className="hero-type relative z-20 mt-10 flex flex-col md:hidden">
                    <p className="hero-greeting text-[17px] text-ink/70">{greeting}</p>
                    <h1 className="mt-3 font-display text-[clamp(4.5rem,24vw,9rem)] uppercase leading-[0.82] tracking-[-0.01em] text-ink">
                        {heroData.roles.map((role) => (
                            <span key={role} className="hero-role block">
                                {role}
                            </span>
                        ))}
                    </h1>
                    <p className="hero-bio mt-6 max-w-sm text-[15px] leading-relaxed text-ink/75">{heroData.bio}</p>
                    <div className="hero-fade mt-7 flex flex-wrap gap-3">
                        <PillButton href={heroData.cta.href} variant="solid">
                            {heroData.cta.label}
                        </PillButton>
                        <PillButton href="/work">See work</PillButton>
                    </div>
                </div>

                <div className="relative z-10 mx-auto mt-8 aspect-square w-[min(100%,440px)] md:hidden">
                    <div className="hero-portrait absolute inset-0">
                        <Image
                            src={heroData.image}
                            alt={heroData.name}
                            fill
                            priority
                            className="object-contain object-bottom"
                            sizes="(max-width: 480px) 100vw, 440px"
                        />
                    </div>
                </div>

                {/* Desktop composition */}
                <div className="relative hidden flex-1 md:block">
                    <div className="hero-type absolute bottom-[9svh] left-0 z-0">
                        <p className="hero-greeting mb-2 ml-1 text-[clamp(1.25rem,1.9vw,2rem)] tracking-[-0.02em] text-ink/70">
                            {greeting}
                        </p>
                        <h1 style={{ fontSize: "min(11.5vw, 20svh)" }} className="font-display uppercase leading-[0.8] tracking-[-0.01em] text-ink">
                            {heroData.roles.map((role) => (
                                <span key={role} className="hero-role block">
                                    {role}
                                </span>
                            ))}
                        </h1>
                    </div>

                    <div className="absolute bottom-0 left-1/2 z-10 h-[min(82svh,980px)] w-[min(40vw,640px)] -translate-x-[38%] lg:-translate-x-1/2">
                        <div className="hero-portrait absolute inset-0">
                            <Image
                                src={heroData.image}
                                alt={heroData.name}
                                fill
                                priority
                                className="object-contain object-bottom"
                                sizes="(max-width: 1280px) 40vw, 640px"
                            />
                        </div>
                    </div>

                    <div className="absolute bottom-[11svh] right-0 z-20 w-[clamp(240px,24vw,380px)]">
                        <p className="hero-bio text-[clamp(14px,1.05vw,16px)] font-medium leading-relaxed text-ink/80">
                            {heroData.bio}
                        </p>
                        <div className="hero-fade mt-6 flex flex-wrap items-center gap-3">
                            <PillButton href={heroData.cta.href} variant="solid">
                                {heroData.cta.label}
                            </PillButton>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => scrollTo("#selected-work")}
                        className="hero-fade group absolute bottom-6 right-0 z-20 hidden items-center gap-3 text-[12px] font-medium uppercase tracking-[0.2em] text-ink/60 transition-colors hover:text-ink lg:flex"
                    >
                        Scroll
                        <span className="relative block h-10 w-px overflow-hidden bg-ink/15">
                            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.8s_var(--ease-in-out-quart)_infinite] bg-ink" />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
