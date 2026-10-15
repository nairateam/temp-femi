"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { site } from "@/lib/data/site";
import { ArrowUpRight, SocialIcon } from "@/components/ui/Icons";
import { Availability, Eyebrow, LocalTime, PillButton } from "@/components/ui/Primitives";

const STEPS = [
    { title: "Say hello", body: "Share what you're building, your timeline and where you're stuck." },
    { title: "Quick call", body: "A short call to scope the work and see if we're a good fit." },
    { title: "Proposal", body: "A clear plan, timeline and quote, so you know exactly what to expect." },
];

export default function ContactPage() {
    const container = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);

    useGSAP(
        () => {
            gsap.set(".js-intro", { visibility: "visible" });

            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            SplitText.create(".contact-heading", {
                type: "lines,words",
                mask: "lines",
                onSplit: (self) => tl.from(self.words, { yPercent: 110, duration: 1.4, stagger: 0.05 }, 0.1),
            });
            tl.from(".contact-fade", { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.07 }, 0.5);
        },
        { scope: container }
    );

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(site.email);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${site.email}`;
        }
    };

    return (
        <main ref={container} className="pb-24 pt-32 lg:pb-32 lg:pt-44">
            <div className="js-intro mx-auto max-w-[1680px] px-5 sm:px-8">
                <div className="contact-fade mb-8 flex flex-wrap items-center justify-between gap-4">
                    <Eyebrow>Contact</Eyebrow>
                    <Availability />
                </div>

                <h1 className="contact-heading max-w-6xl font-heading text-[clamp(3rem,9vw,9rem)] leading-[0.95] tracking-[-0.03em] text-ink">
                    Let&apos;s build something <em className="italic text-ink/45">worth</em> remembering.
                </h1>

                <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
                    <div className="flex flex-col gap-10">
                        <div className="contact-fade">
                            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                                Drop me a line
                            </span>
                            <a
                                href={`mailto:${site.email}`}
                                className="group inline-flex items-center gap-4 break-all font-heading text-[clamp(1.75rem,4.5vw,4rem)] leading-none text-ink"
                            >
                                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-2 transition-[background-size] duration-700 ease-out-expo group-hover:bg-[length:0%_1px]">
                                    {site.email}
                                </span>
                            </a>
                        </div>

                        <div className="contact-fade flex flex-wrap gap-3">
                            <PillButton href={`mailto:${site.email}`} variant="solid" size="lg">
                                Send an email
                            </PillButton>
                            <button
                                type="button"
                                onClick={copyEmail}
                                className="inline-flex h-14 items-center gap-2 rounded-full border border-ink/20 px-7 text-[15px] font-medium text-ink transition-colors duration-300 hover:border-ink"
                                aria-live="polite"
                            >
                                {copied ? "Copied to clipboard ✓" : "Copy address"}
                            </button>
                        </div>

                        <ol className="contact-fade mt-6 grid gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-3">
                            {STEPS.map((step, i) => (
                                <li key={step.title} className="flex flex-col gap-3 bg-paper p-6">
                                    <span className="font-mono text-xs text-ink/35">0{i + 1}</span>
                                    <h2 className="font-heading text-xl text-ink">{step.title}</h2>
                                    <p className="text-sm leading-relaxed text-ink/60">{step.body}</p>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <aside className="flex flex-col gap-10">
                        <div className="contact-fade">
                            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                                Elsewhere
                            </span>
                            <ul className="border-t border-ink/15">
                                {site.socials.map((s) => (
                                    <li key={s.label} className="border-b border-ink/10">
                                        <a
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center justify-between py-5 text-ink"
                                        >
                                            <span className="flex items-center gap-4 text-lg transition-transform duration-700 ease-out-expo group-hover:translate-x-2">
                                                <SocialIcon icon={s.icon} size={18} />
                                                {s.label}
                                            </span>
                                            <ArrowUpRight
                                                size={18}
                                                className="text-ink/40 transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:text-ink"
                                            />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="contact-fade grid grid-cols-2 gap-6">
                            <div>
                                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">Based in</span>
                                <p className="text-[15px] text-ink">{site.location}</p>
                            </div>
                            <div>
                                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/40">Local time</span>
                                <LocalTime className="text-[15px] text-ink" />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
