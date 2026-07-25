"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { FIXTURES } from "../../lib/data";

/**
 * The spine of the whole site: scroll position IS the match clock.
 *
 * The minute is derived from where each section actually sits, not from linear
 * page progress — the sections are wildly uneven in height (two of them are
 * pinned), so a linear mapping put the clock at 77' while the visitor was
 * looking at the 34' section. One ScrollTrigger per section interpolates
 * between that section's minute and the next one's, and because ScrollTrigger
 * owns the pin spacing, pinned sections are measured correctly for free.
 *
 * Text is written straight to the DOM: this updates every scroll frame, and a
 * setState per frame would re-render the tree sixty times a second.
 */
export default function MatchClock() {
  const root = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const minuteEl = minuteRef.current!;
      const labelEl = labelRef.current!;
      const setBar = gsap.quickSetter(barRef.current!, "scaleX");

      let lastMinute = -1;
      let lastLabel = "";

      const render = (minute: number, label: string) => {
        const m = Math.round(minute);
        if (m !== lastMinute) {
          lastMinute = m;
          minuteEl.textContent = m > 90 ? `90+${m - 90}` : String(m).padStart(2, "0");
        }
        if (label !== lastLabel) {
          lastLabel = label;
          labelEl.textContent = label;
          gsap.fromTo(
            labelEl,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.45, overwrite: true }
          );
        }
      };

      const sections = FIXTURES.map((f) => ({ ...f, el: document.getElementById(f.id) })).filter(
        (s): s is (typeof FIXTURES)[number] & { el: HTMLElement } => !!s.el
      );

      /**
       * Driven straight off scroll position on the ticker, deliberately NOT via
       * a ScrollTrigger of its own.
       *
       * MatchClock mounts before Archive and HalfTime install their pins, so a
       * trigger created here caches a start/end from a document that is ~16,000px
       * shorter than the final one. That made the clock freeze at 40' for the
       * entire second half. Measuring the document and the sections live on each
       * frame is immune to pin-setup ordering and to refresh timing.
       */
      let lastY = -1;

      const update = () => {
        const y = window.scrollY;
        if (y === lastY) return; // nothing moved; skip the layout reads
        lastY = y;

        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        setBar(gsap.utils.clamp(0, 1, y / max));

        // the last section whose top edge has passed the top of the viewport
        let idx = 0;
        for (let i = 0; i < sections.length; i++) {
          if (sections[i].el.getBoundingClientRect().top <= 1) idx = i;
        }

        const cur = sections[idx];
        const rect = cur.el.getBoundingClientRect();
        const progress = gsap.utils.clamp(0, 1, -rect.top / Math.max(rect.height, 1));
        const to = sections[idx + 1]?.minute ?? 94; // stoppage runs out over the footer

        render(cur.minute + (to - cur.minute) * progress, cur.label);
      };

      gsap.ticker.add(update);

      // the HUD appears once the hero has been scrolled past
      gsap.fromTo(
        root.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top+=80 top",
            toggleActions: "play none none reverse",
          },
        }
      );

      return () => gsap.ticker.remove(update);
    },
    { scope: root }
  );

  return (
    <>
      {/* hairline progress across the top of the viewport */}
      <div aria-hidden className="fixed inset-x-0 top-0 z-[150] h-px bg-[var(--line)]">
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-[var(--signal)]" />
      </div>

      {/*
        mix-blend-difference lets one HUD sit legibly over both the concrete and
        the inverted sections. Everything in here must therefore be pure white —
        a coloured glyph inverts to an unrelated colour (the signal yellow was
        rendering blue over concrete).
      */}
      <div
        ref={root}
        className="pointer-events-none fixed bottom-0 left-0 z-[150] flex items-baseline gap-3 px-[var(--gut)] pb-5 text-white opacity-0 mix-blend-difference"
      >
        <span
          ref={minuteRef}
          data-clock="minute"
          className="data-lg text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-none"
        >
          00
        </span>
        <span aria-hidden className="data-lg text-[clamp(1.5rem,3vw,2.5rem)] leading-none">
          ′
        </span>
        <span className="block overflow-hidden">
          <span ref={labelRef} data-clock="label" className="data block">
            KICK OFF
          </span>
        </span>
      </div>
    </>
  );
}
