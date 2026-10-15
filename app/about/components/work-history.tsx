"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { aboutData } from "@/lib/data/about";
import { site } from "@/lib/data/site";
import { gsap } from "@/lib/gsap";
import { Eyebrow, PillButton } from "@/components/ui/Primitives";

const SERVICES = [
    {
        title: "Frontend engineering",
        body: "Production-grade React and Next.js applications — typed, accessible and fast on every device.",
    },
    {
        title: "Headless CMS",
        body: "Strapi and WordPress back ends that let teams publish in any language without touching code.",
    },
    {
        title: "Commerce & WordPress",
        body: "WooCommerce builds and rebuilds, custom themes and performance tuning for stores that convert.",
    },
    {
        title: "Motion & interaction",
        body: "Scroll-driven storytelling and micro-interactions with GSAP that feel considered, never gimmicky.",
    },
];

export default function WorkHistory() {
    const container = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.utils.toArray<HTMLElement>(".wh-block").forEach((block) => {
                gsap.from(block.querySelectorAll(".wh-item"), {
                    y: 36,
                    autoAlpha: 0,
                    duration: 1.1,
                    ease: "expo.out",
                    stagger: 0.08,
                    scrollTrigger: { trigger: block, start: "top 82%" },
                });
            });
        },
        { scope: container }
    );

    return (
        <section ref={container} className="pb-28 pt-24 lg:pb-40 lg:pt-40">
            <div className="mx-auto flex max-w-[1680px] flex-col gap-28 px-5 sm:px-8 lg:gap-40">
                {/* Services */}
                <div className="wh-block grid gap-10 lg:grid-cols-[1fr_3fr] lg:gap-16">
                    <div className="wh-item">
                        <Eyebrow>What I do</Eyebrow>
                    </div>
                    <ul className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-2">
                        {SERVICES.map((s, i) => (
                            <li key={s.title} className="wh-item flex flex-col gap-4 bg-paper p-7 sm:p-9">
                                <span className="font-mono text-xs text-ink/35">0{i + 1}</span>
                                <h3 className="font-heading text-[clamp(1.6rem,2.2vw,2.1rem)] leading-tight text-ink">{s.title}</h3>
                                <p className="text-[15px] leading-relaxed text-ink/60">{s.body}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Experience */}
                <div className="wh-block grid gap-10 lg:grid-cols-[1fr_3fr] lg:gap-16">
                    <div className="wh-item flex flex-col items-start gap-8">
                        <Eyebrow>Experience</Eyebrow>
                        <div className="hidden lg:block">
                            <PillButton href={aboutData.resumeUrl} external>
                                Full resume
                            </PillButton>
                        </div>
                    </div>

                    <ul className="border-t border-ink/15">
                        {aboutData.workHistory.map((item) => (
                            <li
                                key={`${item.company}-${item.period}`}
                                className="wh-item group grid gap-2 border-b border-ink/10 py-7 sm:grid-cols-[1.4fr_1fr_auto] sm:items-baseline sm:gap-8 lg:py-9"
                            >
                                <span className="font-heading text-[clamp(1.6rem,2.6vw,2.5rem)] leading-tight text-ink transition-transform duration-700 ease-out-expo sm:group-hover:translate-x-2">
                                    {item.company}
                                </span>
                                <span className="text-[15px] text-ink/60">{item.role}</span>
                                <span className="font-mono text-sm tabular-nums text-ink/45">{item.period}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="wh-item lg:hidden">
                        <PillButton href={aboutData.resumeUrl} external>
                            Full resume
                        </PillButton>
                    </div>
                </div>

                {/* Stack */}
                <div className="wh-block grid gap-10 lg:grid-cols-[1fr_3fr] lg:gap-16">
                    <div className="wh-item">
                        <Eyebrow>Toolkit</Eyebrow>
                    </div>
                    <ul className="flex flex-wrap gap-2.5">
                        {site.stack.map((tech) => (
                            <li
                                key={tech}
                                className="wh-item rounded-full border border-ink/15 px-5 py-2.5 text-[15px] text-ink/75 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
