"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, MOTION_OK } from "../../lib/gsap";
import { MOMENTS, FIXTURES } from "../../lib/data";

const META = [
  ["EST.", "1863"],
  ["PLAYERS", "22"],
  ["BALL", "01"],
  ["MINUTES", String(FIXTURES[FIXTURES.length - 1].minute)],
];

/** The contents figures are counted from the archive, not typed next to it. */
const FIRST = MOMENTS[0].year;
const LAST = MOMENTS[MOMENTS.length - 1].year;

const CONTENTS: [string, string, string][] = [
  ["Moments", String(MOMENTS.length).padStart(2, "0"), `${FIRST}—${LAST}`],
  ["Years covered", String(LAST - FIRST), "Maracanã to Lusail"],
  ["Penalties", "∞", "you take them"],
  ["Verdicts", "00", "we give none"],
];

export default function Kickoff() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      let split: SplitText | null = null;

      /**
       * Outside the motion guard, deliberately. The section carries `.gsap-pre`
       * (visibility: hidden) to stop a flash of unstyled type, and this is what
       * takes it back off. While it lived inside mm.add() the entire hero — the
       * first screen of the site — stayed invisible on any browser where the
       * motion query did not match. Visibility must never depend on whether an
       * animation is allowed to run.
       */
      gsap.set(root.current, { autoAlpha: 1 });

      mm.add(MOTION_OK, () => {
        split = new SplitText(".hero-word", { type: "chars", charsClass: "hero-char" });

        const tl = gsap.timeline({ delay: 0.15 });

        // the centre circle draws itself, like a groundsman marking the pitch
        tl.from(".mark", { drawSVG: "0%", duration: 1.6, ease: "power2.inOut" }, 0)
          .from(split.chars, { yPercent: 115, duration: 1.25, stagger: 0.045, ease: "settle" }, 0.15)
          .from(".hero-rule", { scaleX: 0, duration: 1.1, stagger: 0.08 }, 0.4)
          .from(".hero-meta", { yPercent: 60, opacity: 0, duration: 0.8, stagger: 0.06 }, 0.7)
          .from(".hero-sub", { opacity: 0, y: 18, duration: 0.9 }, 0.85)
          .from(".hero-cue", { opacity: 0, duration: 0.8 }, 1.1);

        // the whole hero recedes as you scroll into the match
        gsap.to(".hero-inner", {
          yPercent: -14,
          scale: 0.94,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => split?.revert();
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="kickoff"
      className="gsap-pre relative flex min-h-svh flex-col justify-between overflow-hidden bg-[var(--concrete)] pt-step pb-block"
    >
      {/* centre circle + halfway line, drawn on load */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <g fill="none" stroke="var(--ink)" strokeOpacity="0.13" strokeWidth="0.18">
          <circle className="mark" cx="50" cy="50" r="26" />
          <line className="mark" x1="0" y1="50" x2="100" y2="50" />
          <circle className="mark" cx="50" cy="50" r="0.9" />
        </g>
      </svg>

      <div className="hero-inner relative flex flex-1 flex-col justify-between">
        {/* top meta rail */}
        <div className="shell">
          <div className="hero-rule origin-left rule" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 pt-3">
            <span className="hero-meta data">The Beautiful Game</span>
            <div className="flex gap-x-8">
              {META.map(([k, v]) => (
                <span key={k} className="hero-meta data text-[var(--grey)]">
                  {k} <span className="text-[var(--ink)]">{v}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* the word */}
        <div className="shell">
          <h1 className="display hero-type m-0 leading-[0.75]">
            <span className="line-mask">
              <span className="hero-word block">Ninety</span>
            </span>
          </h1>
        </div>

        {/* bottom rail */}
        <div className="shell">
          <div className="hero-rule origin-left rule" />
          <div className="field pt-4">
            {/* This is the contents page. It has to name every section the
                visitor will hit, in order — it previously promised the moments,
                the penalty and the argument, and said nothing about the two
                career sections that make up the middle third of the page. */}
            <p className="hero-sub prose-tight col-span-12 md:col-span-5">
              Scroll is the clock. Ninety minutes: eight moments the sport is actually
              made of, then one career taken apart and drawn as a line, then a penalty
              you take yourself and an argument you get to settle.
            </p>

            {/* what is actually in here */}
            <dl className="hero-sub col-span-12 grid grid-cols-2 gap-x-6 gap-y-4 self-end sm:grid-cols-4 md:col-span-5 md:col-start-7">
              {CONTENTS.map(([label, value, note]) => (
                <div key={label} className="stat">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                  <dd className="stat-note">{note}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-cue mt-6 flex items-center justify-between">
            <span className="data text-[var(--grey)]">
              Crests and player records load live from TheSportsDB
            </span>
            <span className="data flex items-center gap-3 text-[var(--grey)]">
              Scroll to start the match
              <span className="inline-block h-8 w-px animate-pulse bg-[var(--ink)]" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
