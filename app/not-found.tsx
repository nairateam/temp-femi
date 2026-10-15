import type { Metadata } from "next";
import { PillButton } from "@/components/ui/Primitives";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
    return (
        <main className="flex min-h-[80svh] items-center px-5 pb-20 pt-32 sm:px-8">
            <div className="mx-auto flex w-full max-w-[1680px] flex-col items-start gap-8">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">Error 404</span>
                <h1 className="font-display text-[clamp(7rem,28vw,22rem)] leading-[0.8] text-ink">Lost?</h1>
                <p className="max-w-md text-base leading-relaxed text-ink/60">
                    The page you&apos;re looking for has moved or never existed. Let&apos;s get you back on track.
                </p>
                <div className="flex flex-wrap gap-3">
                    <PillButton href="/" variant="solid">
                        Back home
                    </PillButton>
                    <PillButton href="/work">See work</PillButton>
                </div>
            </div>
        </main>
    );
}
