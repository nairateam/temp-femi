"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";
import { siteConfig, heroData } from "@/lib/data/homepage";

const SOCIALS = [
    { label: "GitHub", href: "https://github.com/yourhandle", icon: <GitHubIcon /> },
    { label: "LinkedIn", href: "https://linkedin.com/in/yourhandle", icon: <LinkedInIcon /> },
    { label: "X", href: "https://x.com/yourhandle", icon: <XIcon /> },
    { label: "Instagram", href: "https://instagram.com/yourhandle", icon: <InstagramIcon /> },
];

export default function Footer() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const split = new SplitText(".footer-heading", { type: "lines" });

        gsap.from(split.lines, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
                trigger: ".footer-heading",
                start: "top 85%",
            },
        });

        gsap.fromTo(".footer-cta",
            { opacity: 0, y: 16 },
            {
                opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
                scrollTrigger: { trigger: ".footer-cta", start: "top 90%" },
            }
        );

        gsap.fromTo(".footer-bottom",
            { opacity: 0, y: 12 },
            {
                opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
                scrollTrigger: { trigger: ".footer-bottom", start: "top 95%" },
            }
        );
    }, { scope: container });

    return (
        <footer ref={container} className="px-4 sm:px-6 lg:px-8 pb-6">
            <div
                className="max-w-420 mx-auto relative overflow-hidden rounded-2xl"
                style={{ minHeight: "360px" }}
            >
                {/* Background image */}
                <Image
                    src="/images/footer.webp"
                    alt=""
                    fill
                    className="object-cover object-bottom"
                    sizes="100vw"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0d1b2a]/70" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full p-8 sm:p-12 lg:p-14" style={{ minHeight: "360px" }}>

                    {/* TOP — heading */}
                    <h2
                        className="footer-heading font-[family-name:var(--font-heading)] text-white leading-[1.05] max-w-lg"
                        style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
                    >
                        Do you have a project in mind?
                    </h2>

                    {/* BOTTOM — CTA left, nav right */}
                    <div className="footer-bottom flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-12" style={{ opacity: 0 }}>

                        {/* Left: email button + socials */}
                        <div className="footer-cta flex flex-col gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-white/25 text-white text-[14px] font-semibold hover:bg-white/10 transition-colors duration-200 self-start"
                            >
                                Send an Email
                                <EmailIcon />
                            </Link>

                            <div className="flex items-center gap-2">
                                {SOCIALS.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/20 text-white/60 hover:border-white/50 hover:text-white transition-colors duration-200"
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Right: nav links */}
                        <nav className="flex items-center gap-6 flex-wrap">
                            {siteConfig.nav.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-white/60 text-[14px] font-medium hover:text-white transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                    </div>
                </div>
            </div>

            {/* Copyright */}
            <p className="text-center text-[#0d1b2a]/30 text-[12px] font-medium mt-4 tracking-wide">
                © {new Date().getFullYear()} {heroData.name}. All rights reserved.
            </p>
        </footer >
    );
}

function EmailIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

function XIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
        </svg>
    );
}