"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { aboutData } from "@/lib/data/about";
import { site } from "@/lib/data/site";
import { gsap, SplitText } from "@/lib/gsap";
import { Availability, Eyebrow, PillButton, SocialLinks } from "@/components/ui/Primitives";

export default function AboutHero() {
    const container = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            gsap.set(".js-intro", { visibility: "visible" });

            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
            SplitText.create(".about-heading", {
                type: "chars",
                mask: "chars",
                onSplit: (self) => tl.from(self.chars, { yPercent: 110, duration: 1.4, stagger: 0.035 }, 0.1),
            });
            SplitText.create(".about-lead", {
                type: "lines",
                mask: "lines",
                onSplit: (self) => tl.from(self.lines, { yPercent: 110, duration: 1.2, stagger: 0.07 }, 0.45),
            });
            tl.from(".about-fade", { y: 18, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.8).from(
                ".about-photo",
                { clipPath: "inset(100% 0% 0% 0% round 16px)", duration: 1.5, stagger: 0.08, ease: "expo.inOut" },
                0.3
            );

            gsap.utils.toArray<HTMLElement>(".about-photo-img").forEach((img, i) => {
                gsap.fromTo(
                    img,
                    { yPercent: -8 },
                    {
                        yPercent: 8,
                        ease: "none",
                        scrollTrigger: {
                            trigger: img.parentElement,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.5 + i * 0.15,
                        },
                    }
                );
            });
        },
        { scope: container }
    );

    const [lead, ...rest] = aboutData.bio;

    return (
        <section ref={container} className="pb-12 pt-32 lg:pt-44">
            <div className="js-intro mx-auto max-w-[1680px] px-5 sm:px-8">
                <Eyebrow className="about-fade mb-6">About</Eyebrow>
                <h1 className="about-heading font-display text-[clamp(5rem,17vw,15rem)] uppercase leading-[0.82] text-ink">
                    {aboutData.heading}
                </h1>

                <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
                    <div className="flex flex-col gap-8">
                        <p className="about-lead font-heading text-[clamp(1.3rem,1.8vw,1.7rem)] leading-[1.45] tracking-[-0.01em] text-ink">
                            {lead}
                        </p>
                        {rest.map((paragraph, i) => (
                            <p key={i} className="about-fade max-w-xl text-base leading-[1.8] text-ink/65">
                                {paragraph}
                            </p>
                        ))}

                        <div className="about-fade mt-2 flex flex-col gap-6 sm:flex-row sm:items-center">
                            <PillButton href={site.resumeUrl} external variant="solid">
                                View resume
                            </PillButton>
                            <SocialLinks />
                        </div>
                        <Availability className="about-fade" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {aboutData.images.map((src, i) => (
                            <div
                                key={src}
                                className={`about-photo relative overflow-hidden rounded-2xl bg-ink/5 ${
                                    i % 2 === 1 ? "translate-y-10 lg:translate-y-16" : ""
                                } aspect-[3/4]`}
                            >
                                <div className="about-photo-img absolute -inset-y-[10%] inset-x-0">
                                    <Image
                                        src={src}
                                        alt=""
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 50vw, 25vw"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
