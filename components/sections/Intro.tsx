"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { site } from "@/lib/data/site";
import { aboutData } from "@/lib/data/about";
import { projects } from "@/lib/data/content";
import { Eyebrow, PillButton } from "@/components/ui/Primitives";

const STATEMENT =
    "I turn complex problems into fast, considered web products — from a designer's Figma file to a launch people actually use.";

const STATS = [
    { value: "4+", label: "Years shipping production web" },
    { value: String(aboutData.workHistory.length), label: "Agencies & product teams" },
    { value: String(projects.length).padStart(2, "0"), label: "Featured case studies" },
];

export default function Intro() {
    const container = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            // Words brighten as the statement scrolls through the viewport.
            SplitText.create(".intro-statement", {
                type: "words",
                onSplit: (self) =>
                    gsap.fromTo(
                        self.words,
                        { opacity: 0.14 },
                        {
                            opacity: 1,
                            stagger: 0.1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: ".intro-statement",
                                start: "top 80%",
                                end: "bottom 45%",
                                scrub: 0.6,
                            },
                        }
                    ),
            });

            gsap.from(".intro-stat", {
                y: 40,
                autoAlpha: 0,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.1,
                scrollTrigger: { trigger: ".intro-stats", start: "top 85%" },
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} className="relative py-28 lg:py-40">
            <div className="mx-auto max-w-[1680px] px-5 sm:px-8">
                <div className="grid gap-10 lg:grid-cols-[minmax(200px,1fr)_3fr] lg:gap-16">
                    <div className="flex flex-col items-start gap-6">
                        <Eyebrow>About</Eyebrow>
                    </div>
                    <div>
                        <p className="intro-statement font-heading text-[clamp(2rem,4.4vw,4.4rem)] leading-[1.08] tracking-[-0.015em] text-ink">
                            {STATEMENT}
                        </p>
                        <div className="mt-10">
                            <PillButton href="/about">More about me</PillButton>
                        </div>

                        <dl className="intro-stats mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-3 lg:mt-28">
                            {STATS.map((s) => (
                                <div key={s.label} className="intro-stat flex flex-col gap-2 bg-paper p-6 sm:p-8">
                                    <dt className="order-2 text-sm text-ink/55">{s.label}</dt>
                                    <dd className="order-1 font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-none text-ink">
                                        {s.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Stack marquee */}
            <div className="marquee mt-24 overflow-hidden border-y border-ink/10 py-6 lg:mt-32 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
                <div className="marquee-track flex w-max items-center" style={{ "--marquee-duration": "45s" } as React.CSSProperties}>
                    {[0, 1].map((copy) => (
                        <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
                            {site.stack.map((tech) => (
                                <li
                                    key={tech}
                                    className="flex items-center gap-10 pr-10 font-heading text-[clamp(1.75rem,3vw,2.75rem)] italic text-ink/80"
                                >
                                    {tech}
                                    <span className="text-[0.5em] not-italic text-ink/25">✦</span>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
}
