"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText, ScrollTrigger } from "@/lib/gsap";

import { Bebas_Neue } from "next/font/google";
import { ArrowDownRight, ArrowRightIcon } from "lucide-react";
import { HeroData } from "@/lib/strapi/types";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" });

export default function Hero({ heroData }: { heroData: HeroData }) {
    const container = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const greetingSplit = new SplitText(".hero-greeting", { type: "words" });

        gsap.from(greetingSplit.words, {
            opacity: 0,
            y: 12,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.1,
        });

        const roleSplit = new SplitText(".hero-role", { type: "lines", linesClass: "hero-role-line" });

        gsap.set(".hero-role-line", { overflow: "hidden" });

        const roleChars = new SplitText(".hero-role-line", { type: "chars" });

        gsap.set(roleChars.chars, {
            clipPath: "inset(100% 0 0 0)",
            willChange: "clip-path",
        });

        gsap.to(roleChars.chars, {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.02,
            delay: 0.3,
            onComplete: () => gsap.set(roleChars.chars, { willChange: "auto" }),
        });

        const bioSplit = new SplitText(".hero-bio-text", { type: "lines" });

        gsap.from(bioSplit.lines, {
            opacity: 0,
            y: 16,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            delay: 0.85,
        });

        gsap.fromTo(".hero-cta",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 1.1 }
        );

        gsap.set(imageRef.current, {
            clipPath: "inset(100% 0% 0% 0%)",
            scale: 0.95,
            transformOrigin: "bottom center",
            willChange: "clip-path, transform",
        });

        gsap.to(imageRef.current, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 1.1,
            ease: "expo.inOut",
            delay: 0.15,
            onComplete: () => {
                gsap.set(imageRef.current, { willChange: "auto", clearProps: "clipPath,scale" });
            },
        });

        gsap.to(imageRef.current, {
            y: 40,
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

    }, { scope: container });

    return (
        <section
            ref={container}
            className="relative w-full overflow-hidden"
            style={{
                minHeight: "100svh",
                background: "linear-gradient(to bottom, #e8e8e8 0%, #a8c2df 100%, #bdcbdb 100%)",
            }}
        >
            <div
                className="max-w-420 mx-auto relative w-full h-full"
                style={{ minHeight: "100svh", paddingTop: "80px" }}
            >
                <div
                    className="flex flex-col items-center gap-5 md:hidden h-full"
                    style={{ minHeight: "calc(100svh - 80px)" }}
                >
                    <div className="text-center pt-8 px-6" style={{ lineHeight: 0.88 }}>
                        <span
                            className="hero-greeting block text-3xl text-[#0d1b2a]/80 mb-2"
                        >
                            {heroData.greeting} {heroData.name}
                        </span>
                        <span
                            className="hero-role block text-[#0d1b2a] font-semibold text-2xl"
                        >
                            Frontend Engineer
                        </span>
                    </div>

                    <div className="px-6 pb-12 text-center max-w-sm">
                        <p className="hero-bio-text text-[#0d1b2a] font-medium leading-relaxed text-[14px]">
                            {heroData.bio}
                        </p>
                        {/* <Link
                            href={heroData.cta.href}
                            style={{ opacity: 0 }} className="hero-cta mt-5 inline-flex items-center gap-2 text-[#0d1b2a] font-bold text-xs uppercase tracking-widest hover:opacity-50 transition-opacity"
                        >
                            {heroData.cta.label}
                            <ArrowIcon />
                        </Link> */}
                    </div>

                    <div
                        ref={imageRef}
                        className="absolute bottom-0 flex-shrink-0"
                        style={{ width: "min(80vw, 340px)", height: "min(60vw, 420px)" }}
                    >
                        <Image
                            src={heroData.image}
                            alt={heroData.name}
                            fill
                            // priority
                            className="object-contain object-bottom opacity-80"
                            sizes="80vw"
                            unoptimized
                        />
                    </div>
                </div>

                <div
                    className="hidden md:flex absolute inset-0 items-end justify-between px-8 pb-0"
                    style={{ top: "80px" }}
                >
                    <div className="relative self-end pb-16" style={{ lineHeight: 0.88 }}>
                        <span
                            className="hero-greeting block text-4xl text-[#0d1b2a]/70 ml-2"
                            style={{ letterSpacing: "-0.04em" }}
                        >
                            {heroData.greeting} {heroData.name}
                        </span>
                        {heroData.roles.map((role) => (
                            <span
                                key={role}
                                className="hero-role block text-[#0d1b2a] uppercase"
                                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(4.5rem, 12vw, 13rem)", letterSpacing: "-0.02em" }}
                            >
                                {role}
                            </span>
                        ))}
                    </div>

                    <div
                        ref={imageRef}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
                        style={{
                            width: "clamp(280px, 34vw, 600px)",
                            height: "clamp(420px, 78vh, 900px)",
                        }}
                    >
                        <Image
                            src={heroData.image}
                            alt={heroData.name}
                            fill
                            priority
                            className="object-contain object-bottom"
                            sizes="(max-width: 1024px) 34vw, 600px"
                            unoptimized
                        />
                    </div>

                    <div className="relative z-20 self-end pb-20 max-w-[260px] lg:max-w-[360px]">
                        {/* <div className="mb-3 text-[#0d1b2a]/70 text-2xl">
                            <ArrowDownRight />
                        </div> */}
                        <p
                            className="hero-bio-text text-[#0d1b2a] font-medium leading-relaxed"
                            style={{ fontSize: "clamp(13px, 1.1vw, 15px)" }}
                        >
                            {heroData.bio}
                        </p>
                        <Link
                            href=''
                            style={{ opacity: 0 }} className="hero-cta mt-5 inline-flex items-center gap-2 text-[#0d1b2a] font-bold text-sm uppercase tracking-widest hover:opacity-50 transition-opacity"
                        >
                            Let's Talk
                            <ArrowRightIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}