"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/data/homepage";

function MagneticCta({ href, label }: { href: string; label: string }) {
    const ref = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    };

    const handleMouseLeave = () => {
        if (ref.current) ref.current.style.transform = "translate(0, 0)";
    };

    return (
        <Link
            ref={ref}
            href={href}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="px-5 py-2 rounded-full border border-[#0d1b2a]/30 text-[#0d1b2a] text-[13px] font-semibold transition-colors duration-200 hover:bg-[#0d1b2a] hover:text-[#f5f0e8]"
            style={{ transition: "transform 0.15s ease, background-color 0.2s, color 0.2s" }}
        >
            {label}
        </Link>
    );
}

function NavLink({
    href,
    label,
    external,
}: {
    href: string;
    label: string;
    external?: boolean;
}) {
    const className =
        "group relative font-semibold text-[14px] text-[#0d1b2a] tracking-wide overflow-hidden inline-block";

    const content = (
        <>
            <span className="block transition-transform duration-300 ease-[cubic-bezier(.76,0,.24,1)] group-hover:-translate-y-full">
                {label}
            </span>
            <span
                className="absolute inset-0 translate-y-full transition-transform duration-300 ease-[cubic-bezier(.76,0,.24,1)] group-hover:translate-y-0"
                aria-hidden="true"
            >
                {label}
            </span>
        </>
    );

    return external ? (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
        >
            {content}
        </a>
    ) : (
        <Link href={href} className={className}>
            {content}
        </Link>
    );
}

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <nav
                className={` max-w-420 mx-auto
                    fixed top-0 left-0 right-0 z-50
                    flex items-center justify-between
                    px-5 md:px-8
                    transition-all duration-300
                    ${scrolled
                        ? "py-4 bg-[#FFF]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(13,27,42,0.08)] rounded-full top-5 mx-5! md:mx-auto!"
                        : "py-6 bg-transparent"
                    }
                `}
            >
                <Link
                    href="/"
                    className="relative z-50 font-[family-name:var(--font-heading)] text-[1.4rem] md:text-[1.8rem] tracking-[0.08em] text-[#0d1b2a] hover:opacity-70 transition-opacity"
                    onClick={() => setMenuOpen(false)}
                >
                    {siteConfig.logo}
                </Link>

                <ul className="hidden md:flex items-center gap-8">
                    {siteConfig.nav.map((item) => (
                        <li key={item.label}>
                            <NavLink
                                href={item.href}
                                label={item.label}
                                external={item.external}
                            />
                        </li>
                    ))}
                    <li>
                        <MagneticCta href={siteConfig.ctaHref} label={siteConfig.ctaLabel} />
                    </li>
                </ul>

                <button
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((v) => !v)}
                    className="relative z-50 flex md:hidden items-center justify-center w-8 h-8 focus:outline-none"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        {/* Top line → upper diagonal */}
                        <line
                            x1="0" y1="0" x2="18" y2="0"
                            stroke="#0d1b2a"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="origin-center transition-all duration-300"
                            style={{
                                transform: menuOpen
                                    ? "translateY(9px) rotate(45deg)"
                                    : "translateY(0px) rotate(0deg)",
                                transformOrigin: "9px 0px",
                            }}
                        />
                        {/* Middle line → fades out */}
                        <line
                            x1="0" y1="6" x2="12" y2="6"
                            stroke="#0d1b2a"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="transition-all duration-200"
                            style={{
                                opacity: menuOpen ? 0 : 1,
                                transform: menuOpen ? "scaleX(0)" : "scaleX(1)",
                                transformOrigin: "0px 6px",
                            }}
                        />
                        {/* Bottom line → lower diagonal */}
                        <line
                            x1="0" y1="12" x2="18" y2="12"
                            stroke="#0d1b2a"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            className="origin-center transition-all duration-300"
                            style={{
                                transform: menuOpen
                                    ? "translateY(-3px) rotate(-45deg)"
                                    : "translateY(0px) rotate(0deg)",
                                transformOrigin: "9px 12px",
                            }}
                        />
                    </svg>
                </button>
            </nav>

            <div
                className={`
                    fixed inset-0 z-40 flex flex-col bg-[#f5f0e8]
                    transition-all duration-500 ease-in-out md:hidden
                    ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                `}
            >
                <div className="flex flex-col justify-center h-full px-8 sm:px-12 pb-24">
                    <ul className="flex flex-col gap-2">
                        {siteConfig.nav.map((item, i) => (
                            <li
                                key={item.label}
                                style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : "0ms" }}
                                className={`group relative overflow-hidden transition-all duration-500 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                            >
                                <span
                                    className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#0d1b2a] transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)] group-hover:w-full"
                                />
                                <Link
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="block font-[family-name:var(--font-heading)] text-[clamp(3rem,12vw,5.5rem)] tracking-[0.04em] leading-[1.05] text-[#0d1b2a] transition-opacity duration-300 group-hover:opacity-60"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div
                        style={{ transitionDelay: menuOpen ? `${80 + siteConfig.nav.length * 60}ms` : "0ms" }}
                        className={`mt-12 transition-all duration-500 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                        <Link
                            href={siteConfig.ctaHref}
                            onClick={() => setMenuOpen(false)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0d1b2a]/30 text-[#0d1b2a] text-[14px] font-semibold hover:bg-[#0d1b2a] hover:text-[#f5f0e8] transition-colors duration-200"
                        >
                            {siteConfig.ctaLabel}
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-12 left-8 sm:left-12 right-8 sm:right-12 h-[1px] bg-[#0d1b2a]/10" />
            </div>
        </>
    );
}