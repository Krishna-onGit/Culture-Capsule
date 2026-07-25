"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap";
import { scrollDrivenLoop, disposeAll } from "../../lib/reveal";
import { MOMENTS } from "../../lib/data";

/** Half-time results service — read off the archive rather than retyped, so a
 *  moment can never be edited upstairs and still scroll past here unchanged. */
const RESULTS = MOMENTS.map(
  (m) => `${m.year} ${m.teams[0].code} ${m.score} ${m.teams[1].code}`
);

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

      // The ticker runs continuously, so it is pure decoration — the one thing
      // that must not run under reduced motion.
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const loop = gsap.to(".ht-ticker-inner", {
          xPercent: -50,
          repeat: -1,
          duration: 26,
          ease: "none",
        });

        // ...but it is no longer *independent* of scroll. It accelerates with
        // the wheel and runs backwards when the page does, then eases back to
        // its resting pace — so the one section with nothing to read still
        // responds to the visitor, and the interval feels driven rather than
        // merely waited out.
        return disposeAll(scrollDrivenLoop(loop), () => loop.kill());
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

        {/* The team talk. It has to describe the half that actually follows —
            two more evidence sections before anything is handed over, not an
            immediate free-for-all. */}
        <div className="ht-note shell absolute inset-x-0 mx-auto max-w-[52ch] text-center">
          <p className="prose-tight mx-auto">
            The first half belonged to everybody. The second narrows to one career,
            then hands you the ball.
          </p>
          <p className="data mt-6 text-[var(--signal)]">
            The evidence, then the arc, then your turn
          </p>
        </div>
      </div>

      {/* Ticker, lifted clear of the fixed match clock in the bottom-left corner. */}
      <div className="ht-ticker relative mb-14 overflow-hidden border-y border-[var(--line-invert)] py-4">
        <div className="ht-ticker-inner flex w-max">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {RESULTS.map((s) => (
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
