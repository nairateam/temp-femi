"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { aboutData } from "@/lib/data/about";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function WorkHistory() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".wh-heading", {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".wh-heading",
                start: "top 85%",
            },
        });

        gsap.from(".wh-row", {
            opacity: 0,
            y: 24,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".wh-list",
                start: "top 80%",
            },
        });

        gsap.fromTo(".wh-cta",
            { opacity: 0, y: 12 },
            {
                opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
                scrollTrigger: { trigger: ".wh-cta", start: "top 90%" },
            }
        );
    }, { scope: container });

    return (
        <section ref={container} className="py-24 lg:pb-32">
            <div className="max-w-420 mx-auto px-8">

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
                    <h2
                        className="text-2xl md:text-5xl wh-heading text-[#0d1b2a] leading-none"
                    >
                        Work History
                    </h2>

                    <Link
                        href={aboutData.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="wh-cta self-start sm:self-auto inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0d1b2a]/25 text-[#0d1b2a] text-[13px] font-semibold hover:bg-[#0d1b2a] hover:text-white transition-colors duration-200"
                        style={{ opacity: 0 }}
                    >
                        Download Resume ↗
                    </Link>
                </div>

                <ul className="wh-list divide-y divide-[#0d1b2a]/10">
                    {aboutData.workHistory.map((item, i) => (
                        <li
                            key={i}
                            className="wh-row group flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 gap-2 cursor-default"
                        >
                            <span
                                className="text-2xl md:text-3xl text-[#0d1b2a] group-hover:opacity-50 transition-opacity duration-300"
                            >
                                {item.role}
                            </span>

                            <div className="flex items-center gap-6 sm:gap-12">
                                <span className="text-[#0d1b2a]/60 font-medium text-[14px] md:text-xl tracking-wide">
                                    {item.company}
                                </span>
                                <span className="text-[#0d1b2a]/40 font-medium text-[13px] md:text-lg tabular-nums">
                                    {item.period}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    );
}