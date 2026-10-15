"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
    return useContext(LenisContext);
}

/** Scrolls to a target using Lenis when available, falling back to native scrolling. */
export function useScrollTo() {
    const lenis = useLenis();
    return (target: number | string | HTMLElement) => {
        if (lenis) {
            lenis.scrollTo(target, { duration: 1.4 });
            return;
        }
        if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
        else (typeof target === "string" ? document.querySelector(target) : target)?.scrollIntoView({ behavior: "smooth" });
    };
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const instance = new Lenis({
            lerp: 0.1,
            wheelMultiplier: 1,
            touchMultiplier: 1.2,
        });

        instance.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => instance.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        // eslint-disable-next-line react-hooks/set-state-in-effect -- expose the instance to consumers once created
        setLenis(instance);

        return () => {
            gsap.ticker.remove(tick);
            instance.destroy();
            setLenis(null);
        };
    }, []);

    // Start every route at the top and recalculate trigger positions for the new layout.
    useEffect(() => {
        if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
        else window.scrollTo(0, 0);

        const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
        return () => window.clearTimeout(id);
    }, [pathname, lenis]);

    // Images and web fonts shift layout after load; keep trigger positions accurate.
    useEffect(() => {
        const refresh = () => ScrollTrigger.refresh();
        document.fonts?.ready.then(refresh);
        window.addEventListener("load", refresh);
        return () => window.removeEventListener("load", refresh);
    }, []);

    return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
