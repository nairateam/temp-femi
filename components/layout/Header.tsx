"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, type NavItem } from "@/lib/data/site";
import { useLenis } from "@/components/providers/SmoothScroll";
import { Availability, LocalTime, PillButton, RollText, SocialLinks } from "@/components/ui/Primitives";

function isActive(pathname: string, href: string) {
    return href !== "/" && (pathname === href || pathname.startsWith(`${href}/`));
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
    const className = `group relative inline-flex items-center gap-1 py-1 text-[14px] font-medium tracking-tight transition-colors duration-300 ${
        active ? "text-ink" : "text-ink/60 hover:text-ink"
    }`;

    const content = (
        <>
            <RollText>{item.label}</RollText>
            {item.external && <span aria-hidden="true" className="text-[11px] opacity-60">↗</span>}
            <span
                aria-hidden="true"
                className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-ink transition-transform duration-500 ease-out-expo ${
                    active ? "scale-x-100" : "scale-x-0"
                }`}
            />
        </>
    );

    return item.external ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
            {content}
        </a>
    ) : (
        <Link href={item.href} className={className} aria-current={active ? "page" : undefined}>
            {content}
        </Link>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const lenis = useLenis();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);

    // Shrink into a floating pill once scrolled; tuck away while scrolling down.
    useEffect(() => {
        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 24);
            if (Math.abs(y - lastY) > 6) {
                setHidden(y > lastY && y > 320);
                lastY = y;
            }
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close the menu whenever the route changes.
    const [prevPath, setPrevPath] = useState(pathname);
    if (prevPath !== pathname) {
        setPrevPath(pathname);
        setMenuOpen(false);
    }

    useEffect(() => {
        if (!menuOpen) return;
        lenis?.stop();
        document.documentElement.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            lenis?.start();
            document.documentElement.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [menuOpen, lenis]);

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 px-3 sm:px-4 transition-transform duration-700 ease-out-expo ${
                    hidden && !menuOpen ? "-translate-y-[130%]" : "translate-y-0"
                }`}
            >
                <nav
                    aria-label="Primary"
                    className={`mx-auto flex max-w-[1680px] items-center justify-between rounded-full transition-all duration-700 ease-out-expo ${
                        scrolled && !menuOpen
                            ? "mt-3 bg-paper/75 px-5 py-2.5 shadow-[0_1px_0_rgba(13,27,42,0.06),0_12px_40px_-12px_rgba(13,27,42,0.18)] ring-1 ring-ink/5 backdrop-blur-xl md:px-6 lg:max-w-5xl"
                            : "mt-0 bg-transparent px-2 py-5 sm:px-4 md:py-6"
                    }`}
                >
                    <Link
                        href="/"
                        className="relative z-50 font-heading text-[1.35rem] tracking-[0.04em] text-ink transition-opacity hover:opacity-70 md:text-[1.6rem]"
                        aria-label={`${site.name} — home`}
                    >
                        {site.logo}
                    </Link>

                    <ul className="hidden items-center gap-8 md:flex">
                        {site.nav.map((item) => (
                            <li key={item.label}>
                                <NavLink item={item} active={isActive(pathname, item.href)} />
                            </li>
                        ))}
                    </ul>

                    <div className="hidden md:block">
                        <PillButton href={site.cta.href} size="sm" variant="solid">
                            {site.cta.label}
                        </PillButton>
                    </div>

                    <button
                        type="button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMenuOpen((v) => !v)}
                        className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper md:hidden"
                    >
                        <span className="relative block h-3 w-5">
                            <span
                                className={`absolute left-0 top-0 h-[1.5px] w-full rounded bg-current transition-transform duration-500 ease-out-expo ${
                                    menuOpen ? "translate-y-[5.25px] rotate-45" : ""
                                }`}
                            />
                            <span
                                className={`absolute bottom-0 left-0 h-[1.5px] w-full rounded bg-current transition-transform duration-500 ease-out-expo ${
                                    menuOpen ? "-translate-y-[5.25px] -rotate-45" : ""
                                }`}
                            />
                        </span>
                    </button>
                </nav>
            </header>

            {/* Mobile menu */}
            <div
                id="mobile-menu"
                aria-hidden={!menuOpen}
                inert={!menuOpen}
                className={`fixed inset-0 z-40 flex flex-col bg-paper transition-[clip-path] duration-[900ms] ease-in-out-quart md:hidden ${
                    menuOpen ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
                }`}
            >
                <div className="flex h-full flex-col justify-between px-6 pb-8 pt-28 sm:px-10">
                    <ul className="flex flex-col">
                        {site.nav.map((item, i) => {
                            const linkClass =
                                "flex items-baseline justify-between border-b border-ink/10 py-4 font-heading text-[clamp(2.6rem,11vw,4.5rem)] leading-none tracking-tight text-ink";
                            const label = (
                                <>
                                    <span>{item.label}</span>
                                    <span className="font-sans text-xs tabular-nums text-ink/35">
                                        {item.external ? "↗" : String(i + 1).padStart(2, "0")}
                                    </span>
                                </>
                            );
                            return (
                                <li key={item.label} className="overflow-hidden">
                                    <div
                                        className={`transition-transform duration-[900ms] ease-out-expo ${
                                            menuOpen ? "translate-y-0" : "translate-y-full"
                                        }`}
                                        style={{ transitionDelay: menuOpen ? `${250 + i * 70}ms` : "0ms" }}
                                    >
                                        {item.external ? (
                                            <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                                {label}
                                            </a>
                                        ) : (
                                            <Link href={item.href} className={linkClass} onClick={() => setMenuOpen(false)}>
                                                {label}
                                            </Link>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <div
                        className={`flex flex-col gap-6 transition-all duration-700 ease-out-expo ${
                            menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        }`}
                        style={{ transitionDelay: menuOpen ? "550ms" : "0ms" }}
                    >
                        <a href={`mailto:${site.email}`} className="text-lg font-medium text-ink underline decoration-ink/20 underline-offset-4">
                            {site.email}
                        </a>
                        <SocialLinks />
                        <div className="flex items-center justify-between text-xs text-ink/45">
                            <Availability />
                            <LocalTime />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
