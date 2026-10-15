"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, hasFinePointer } from "@/lib/gsap";
import { site } from "@/lib/data/site";
import { ArrowUpRight, SocialIcon } from "./Icons";

/** Text that rolls up to a duplicate of itself on hover. Needs a `group` ancestor. */
export function RollText({ children }: { children: string }) {
    return (
        <span className="relative inline-flex overflow-hidden align-top">
            <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
                {children}
            </span>
            <span
                aria-hidden="true"
                className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
            >
                {children}
            </span>
        </span>
    );
}

/** Wraps a child and pulls it gently toward the cursor (fine pointers only). */
export function Magnetic({
    children,
    strength = 0.3,
    className,
}: {
    children: React.ReactNode;
    strength?: number;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || !hasFinePointer()) return;

        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });

        const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * strength);
            yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const leave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
        };
    }, [strength]);

    return (
        <span ref={ref} className={`inline-block will-change-transform ${className ?? ""}`}>
            {children}
        </span>
    );
}

type PillProps = {
    href: string;
    children: string;
    external?: boolean;
    variant?: "solid" | "outline" | "light";
    size?: "sm" | "md" | "lg";
    className?: string;
    onClick?: () => void;
};

/** Rounded call-to-action with a fill that rises from the bottom on hover. */
export function PillButton({
    href,
    children,
    external,
    variant = "outline",
    size = "md",
    className = "",
    onClick,
}: PillProps) {
    const sizes = {
        sm: "h-10 px-5 text-[13px]",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-[15px]",
    };
    const variants = {
        solid: "bg-ink text-paper before:bg-[#1f3a57]",
        outline: "border border-ink/20 text-ink before:bg-ink hover:text-paper hover:border-ink",
        light: "border border-white/25 text-white before:bg-white hover:text-ink hover:border-white",
    };

    const cls = `group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-[color,border-color] duration-500 ease-out-expo before:absolute before:inset-0 before:-z-10 before:translate-y-full before:rounded-[inherit] before:transition-transform before:duration-500 before:ease-out-expo hover:before:translate-y-0 ${sizes[size]} ${variants[variant]} ${className}`;

    const inner = (
        <>
            <RollText>{children}</RollText>
            <ArrowUpRight
                size={size === "sm" ? 14 : 16}
                className="transition-transform duration-500 ease-out-expo group-hover:rotate-45"
            />
        </>
    );

    const isExternal = external || href.startsWith("http") || href.startsWith("mailto:");

    return (
        <Magnetic strength={0.25}>
            {isExternal ? (
                <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className={cls} onClick={onClick}>
                    {inner}
                </a>
            ) : (
                <Link href={href} className={cls} onClick={onClick}>
                    {inner}
                </Link>
            )}
        </Magnetic>
    );
}

export function SocialLinks({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
    const cls =
        tone === "dark"
            ? "border-ink/15 text-ink/60 hover:bg-ink hover:text-paper hover:border-ink"
            : "border-white/20 text-white/70 hover:bg-white hover:text-ink hover:border-white";

    return (
        <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
            {site.socials.map((s) => (
                <li key={s.label}>
                    <a
                        href={s.href}
                        aria-label={s.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 ${cls}`}
                    >
                        <SocialIcon icon={s.icon} />
                    </a>
                </li>
            ))}
        </ul>
    );
}

export function Availability({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
    if (!site.available) return null;
    return (
        <span
            className={`inline-flex items-center gap-2.5 text-[13px] font-medium ${tone === "dark" ? "text-ink/70" : "text-white/75"} ${className}`}
        >
            <span className="pulse-dot relative h-2 w-2 rounded-full bg-emerald-500 text-emerald-500" />
            Available for new projects
        </span>
    );
}

/** Current time in the site owner's timezone, updated every 30 seconds. */
export function LocalTime({ className = "" }: { className?: string }) {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const fmt = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: site.timeZone,
        });
        const update = () => setTime(fmt.format(new Date()));
        update();
        const id = window.setInterval(update, 30_000);
        return () => window.clearInterval(id);
    }, []);

    return (
        <span className={`tabular-nums ${className}`} suppressHydrationWarning>
            {time ?? "--:--"} WAT
        </span>
    );
}

/** Small uppercase label used above section headings. */
export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={`inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45 ${className}`}>
            <span className="h-px w-6 bg-current" />
            {children}
        </span>
    );
}
