import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

gsap.defaults({ ease: "power3.out", duration: 0.8 });

export const EASE = {
    out: "expo.out",
    inOut: "expo.inOut",
    soft: "power3.out",
};

export function prefersReducedMotion() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function hasFinePointer() {
    return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export { gsap, ScrollTrigger, SplitText };
