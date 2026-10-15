"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { site } from "@/lib/data/site";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { Availability, LocalTime, PillButton, RollText, SocialLinks } from "@/components/ui/Primitives";

export default function Footer() {
    const container = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const scrollTo = useScrollTo();

    useGSAP(
        () => {
            SplitText.create(".footer-heading", {
                type: "lines",
                mask: "lines",
                onSplit: (self) =>
                    gsap.from(self.lines, {
                        yPercent: 110,
                        duration: 1.3,
                        ease: "expo.out",
                        stagger: 0.1,
                        scrollTrigger: { trigger: ".footer-heading", start: "top 88%" },
                    }),
            });

            gsap.from(".footer-reveal", {
                y: 24,
                autoAlpha: 0,
                duration: 1,
                ease: "expo.out",
                stagger: 0.08,
                scrollTrigger: { trigger: ".footer-heading", start: "top 80%" },
            });

            gsap.fromTo(
                ".footer-bg",
                { yPercent: -12, scale: 1.1 },
                {
                    yPercent: 0,
                    scale: 1,
                    ease: "none",
                    scrollTrigger: { trigger: container.current, start: "top bottom", end: "bottom bottom", scrub: true },
                }
            );
        },
        // Re-run per route so triggers measure against the new page height.
        { scope: container, dependencies: [pathname], revertOnUpdate: true }
    );

    const onContact = pathname === "/contact";

    return (
        <footer ref={container} className="px-3 pb-3 sm:px-4 sm:pb-4">
            <div className="relative isolate mx-auto max-w-[1680px] overflow-hidden rounded-[28px] bg-ink text-white">
                <div className="footer-bg absolute inset-0 -z-10">
                    <Image src="/images/footer.webp" alt="" fill className="object-cover object-bottom" sizes="100vw" />
                </div>
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(13,27,42,0.55)_0%,rgba(13,27,42,0.85)_100%)]" />

                <div className="flex min-h-[560px] flex-col justify-between gap-16 px-6 py-12 sm:px-10 sm:py-14 lg:min-h-[640px] lg:px-14 lg:py-16">
                    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-4xl">
                            <Availability tone="light" className="footer-reveal mb-8" />
                            <h2 key={pathname} className="footer-heading font-heading text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98] tracking-[-0.02em]">
                                {onContact ? "Thanks for stopping by." : "Have a project in mind? Let's make it real."}
                            </h2>
                        </div>
                        {!onContact && (
                            <div className="footer-reveal flex flex-wrap gap-3 lg:pt-20">
                                <PillButton href="/contact" variant="light" size="lg">
                                    Start a project
                                </PillButton>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-12">
                        <a
                            href={`mailto:${site.email}`}
                            className="footer-reveal group self-start font-heading text-[clamp(1.6rem,4vw,3.25rem)] leading-none text-white/90 transition-colors hover:text-white"
                        >
                            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-out-expo group-hover:bg-[length:100%_1px]">
                                {site.email}
                            </span>
                        </a>

                        <div className="footer-reveal grid gap-10 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex flex-col gap-3">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Socials</span>
                                <SocialLinks tone="light" />
                            </div>

                            <nav aria-label="Footer" className="flex flex-col gap-3">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Menu</span>
                                <ul className="flex flex-col gap-1.5">
                                    {[{ label: "Home", href: "/" }, ...site.nav].map((item) => (
                                        <li key={item.label}>
                                            {"external" in item && item.external ? (
                                                <a href={item.href} target="_blank" rel="noopener noreferrer" className="group text-[15px] text-white/75 hover:text-white">
                                                    <RollText>{`${item.label} ↗`}</RollText>
                                                </a>
                                            ) : (
                                                <Link href={item.href} className="group text-[15px] text-white/75 hover:text-white">
                                                    <RollText>{item.label}</RollText>
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="flex flex-col gap-3">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Location</span>
                                <p className="text-[15px] leading-relaxed text-white/75">
                                    {site.location}
                                    <br />
                                    <LocalTime className="text-white/50" />
                                </p>
                            </div>

                            <div className="flex flex-col items-start gap-3 lg:items-end">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Back to top</span>
                                <button
                                    type="button"
                                    onClick={() => scrollTo(0)}
                                    aria-label="Back to top"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-white hover:bg-white hover:text-ink"
                                >
                                    ↑
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex max-w-[1680px] flex-col items-center justify-between gap-2 px-3 pt-4 text-[12px] text-ink/40 sm:flex-row">
                <p>
                    © {new Date().getFullYear()} {site.name}. All rights reserved.
                </p>
                <p>Designed & built in Lagos.</p>
            </div>
        </footer>
    );
}
