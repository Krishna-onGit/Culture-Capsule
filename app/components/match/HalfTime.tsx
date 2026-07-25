"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap";

/**
 * 45' — HALF TIME
 *
 * The only inverted section. Pinned and scrubbed so the type travels past you
 * like walking down the tunnel. It exists to reset the eye between the first
 * half (The Archive) and everything that follows.
 */
export default function HalfTime() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          // 180% left roughly a thousand pixels of near-empty black after the
          // choreography had finished, which read as a huge gap between the
          // sections either side. The pin is only as long as the animation.
          end: "+=110%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // Starts visible, not at opacity 0: the section pins as soon as its top
      // hits the viewport, so a zero-opacity start meant the first screen of
      // Half Time was an entirely blank black rectangle.
      tl.fromTo(
        ".ht-word",
        { scale: 0.72, opacity: 0.55 },
        { scale: 1, opacity: 1, ease: "none", duration: 1 }
      )
        .to(".ht-word", { scale: 2.2, opacity: 0, ease: "none", duration: 1 }, ">0.15")
        .fromTo(
          ".ht-note > *",
          { opacity: 0, yPercent: 60 },
          { opacity: 1, yPercent: 0, stagger: 0.12, ease: "none", duration: 0.7 },
          ">-0.45"
        )
        // the interval clock runs for the whole pin, so nothing is ever static
        .fromTo(
          ".ht-bar",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", duration: 3.1, transformOrigin: "left center" },
          0
        );

      // The ticker runs continuously and independent of scroll, so it is pure
      // decoration — the one thing that must not run under reduced motion.
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(".ht-ticker-inner", { xPercent: -50, repeat: -1, duration: 26, ease: "none" });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="halftime"
      className="relative flex h-svh flex-col justify-center overflow-hidden bg-[var(--ink)] text-[var(--concrete)]"
    >
      <div className="shell absolute inset-x-0 top-0 pt-8">
        <div className="rule-invert" />
        <div className="flex items-baseline justify-between pt-3">
          <span className="data text-[var(--signal)]">45′ — Half Time</span>
          <span className="data text-[var(--grey-invert)]">Fifteen minutes</span>
        </div>
        {/* the interval running down, driven by the pinned timeline */}
        <div className="mt-3 h-px w-full bg-[var(--line-invert)]">
          <div className="ht-bar h-full w-full origin-left scale-x-0 bg-[var(--signal)]" />
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        <h2 className="ht-word display m-0 whitespace-nowrap text-[13vw] leading-none">
          Half<span className="text-[var(--signal)]">·</span>Time
        </h2>

        <div className="ht-note shell absolute inset-x-0 mx-auto max-w-[52ch] text-center">
          <p className="prose-tight mx-auto">
            Everything so far already happened. Nothing in the second half has.
          </p>
          <p className="data mt-6 text-[var(--signal)]">The rest of this one is yours</p>
        </div>
      </div>

      {/* Ticker, lifted clear of the fixed match clock in the bottom-left corner. */}
      <div className="ht-ticker relative mb-14 overflow-hidden border-y border-[var(--line-invert)] py-4">
        <div className="ht-ticker-inner flex w-max">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {[
                "1950 BRA 1–2 URU",
                "1970 BRA 4–1 ITA",
                "1986 ARG 2–1 ENG",
                "1999 MUN 2–1 BAY",
                "2005 LIV 3–3 MIL",
                "2012 MCI 3–2 QPR",
                "2014 BRA 1–7 GER",
                "2022 ARG 3–3 FRA",
              ].map((s) => (
                <span key={s} className="data mx-8 whitespace-nowrap text-[var(--grey-invert)]">
                  {s}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
