"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from './../../lib/data/nav';

interface NavModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NavModal({ isOpen, onClose }: NavModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on Escape
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    // Move focus into modal when it opens
    useEffect(() => {
        if (isOpen) {
            const first = modalRef.current?.querySelector<HTMLElement>(
                "a, button, [tabindex]:not([tabindex='-1'])"
            );
            first?.focus();
        }
    }, [isOpen]);

    return (
        <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={[
                "fixed inset-0 z-40",
                "flex flex-col",
                "bg-[#111] text-white",
                "px-6 sm:px-10 pt-8 pb-6",
                "overflow-y-auto",
                "transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)]",
                isOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none",
            ].join(" ")}
        >
            <button
                onClick={onClose}
                aria-label="Close navigation"
                className="absolute top-6 right-6 sm:top-7 sm:right-8 flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-colors"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            <div className="flex items-start gap-2 mb-8 sm:mb-10">
                <span aria-hidden="true" className="text-base leading-relaxed">{siteConfig.tagline.icon}</span>
                <p className="flex flex-col text-[13px] text-white/50 leading-relaxed m-0">
                    <span>{siteConfig.tagline.line1}</span>
                    <span>{siteConfig.tagline.line2}</span>
                </p>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                {/* Nav links */}
                <nav aria-label="Site navigation">
                    <ul className="list-none m-0 p-0 divide-y divide-white/7">
                        {siteConfig.navLinks.map((link, index) => (
                            <li
                                key={link.href}
                                className={[
                                    "transition-all duration-400",
                                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
                                ].join(" ")}
                                style={{ transitionDelay: isOpen ? `${index * 55}ms` : "0ms" }}
                            >
                                {link.external ? (
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={onClose}
                                        className="group flex items-center justify-between py-3 sm:py-3.5 text-white no-underline hover:text-white/60 transition-colors"
                                    >
                                        <span className="text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold tracking-[-0.03em] leading-none">
                                            {link.label}
                                        </span>

                                        <span
                                            aria-hidden="true"
                                            className="text-white/40 group-hover:text-white/70 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path
                                                    d="M9 1L9.8 7.2L15 9L9.8 10.8L9 17L8.2 10.8L3 9L8.2 7.2L9 1Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    </a>
                                ) : (
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="group flex items-center justify-between py-3 sm:py-3.5 text-white no-underline hover:text-white/60 transition-colors"
                                    >
                                        <span className="text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold tracking-[-0.03em] leading-none">
                                            {link.label}
                                        </span>

                                        <span
                                            aria-hidden="true"
                                            className="text-white/40 group-hover:text-white/70 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                                <path
                                                    d="M9 1L9.8 7.2L15 9L9.8 10.8L9 17L8.2 10.8L3 9L8.2 7.2L9 1Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                <aside
                    className={[
                        "hidden lg:flex flex-col gap-5 items-end",
                        "transition-all duration-500",
                        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                    ].join(" ")}
                    style={{ transitionDelay: isOpen ? "200ms" : "0ms" }}
                >
                    <p className="text-right text-[13px] text-white/60 leading-relaxed m-0 max-w-xs">
                        <span aria-hidden="true">{siteConfig.menuAnnouncement.icon}</span>{" "}
                        {siteConfig.menuAnnouncement.text}
                    </p>

                    <div className="w-full max-w-[440px] aspect-[16/10] rounded-2xl overflow-hidden bg-[#d4d0ca] flex items-center justify-center">
                        <AbstractShape />
                    </div>
                </aside>
            </div>

            <footer className="flex flex-col sm:flex-row items-center justify-between gap-1.5 mt-8 pt-5 border-t border-white/7 text-[11px] text-white/30">
                <p className="m-0">
                    {siteConfig.footer.credit}{" "}
                    <a
                        href={siteConfig.footer.creditHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 underline underline-offset-2 hover:text-white transition-colors"
                    >
                        {siteConfig.footer.creditLink}
                    </a>
                </p>
                <p className="m-0">{siteConfig.footer.year}</p>
            </footer>
        </div>
    );
}

function AbstractShape() {
    return (
        <svg viewBox="0 0 220 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
                <radialGradient id="rg1" cx="50%" cy="38%" r="60%">
                    <stop offset="0%" stopColor="#666" />
                    <stop offset="100%" stopColor="#1a1a1a" />
                </radialGradient>
                <radialGradient id="rg2" cx="50%" cy="65%" r="52%">
                    <stop offset="0%" stopColor="#555" />
                    <stop offset="100%" stopColor="#111" />
                </radialGradient>
            </defs>
            <ellipse cx="110" cy="52" rx="52" ry="30" fill="url(#rg1)" />
            <ellipse cx="110" cy="90" rx="38" ry="24" fill="url(#rg2)" />
            <ellipse cx="110" cy="122" rx="48" ry="26" fill="url(#rg1)" />
            <ellipse cx="110" cy="88" rx="11" ry="11" fill="#fff" fillOpacity="0.07" />
        </svg>
    );
}