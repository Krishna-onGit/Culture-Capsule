"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, MOTION_OK } from "../../lib/gsap";
import { FIXTURES, CONTENDERS, TIERS, PENALTY_REALITY, MOMENTS } from "../../lib/data";
import { useSession } from "../../lib/session";
import { scrollToEl, scrollToTop } from "../../lib/scroll";

/**
 * 90+' — FULL TIME
 * Doubles as the footer, and reads back what the visitor actually did — so the
 * penalty and the tier list were part of one match rather than two gadgets.
 *
 * No newsletter box, no dead social icons, no invented affiliations.
 */
export default function FullTime() {
  const root = useRef<HTMLElement>(null);
  const { shots, scored, ranking } = useSession();

  const taken = shots.length;
  const rate = taken ? scored / taken : 0;
  const ranked = Object.values(ranking).filter(Boolean).length;
  const immortals = CONTENDERS.filter((c) => ranking[c.id] === TIERS[0].id);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const split = new SplitText(".ft-word", { type: "chars", charsClass: "ft-char" });

        gsap.from(split.chars, {
          yPercent: 115,
          duration: 1.1,
          stagger: 0.04,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });

        gsap.from(".ft-row", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.06,
          scrollTrigger: { trigger: ".ft-index", start: "top 85%" },
        });

        gsap.from(".ft-card", {
          opacity: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: { trigger: ".ft-report", start: "top 85%" },
        });

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <footer
      ref={root}
      id="fulltime"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-[var(--ink)] pt-8 pb-20 text-[var(--concrete)]"
    >
      <div className="shell">
        <div className="rule-invert" />
        <div className="flex items-baseline justify-between pt-3">
          <span className="data text-[var(--signal)]">90+4′ — Full Time</span>
          <span className="data text-[var(--grey-invert)]">The whistle</span>
        </div>
      </div>

      <div className="shell">
        <h2 className="display hero-type m-0 leading-[0.75]">
          <span className="line-mask">
            <span className="ft-word block">Full Time</span>
          </span>
        </h2>
      </div>

      {/* ---- your match report ---- */}
      <div className="shell">
        <div className="ft-report rule-invert grid gap-6 pt-6 md:grid-cols-3">
          <div className="ft-card">
            <span className="data block text-[var(--signal)]">Your penalties</span>
            {taken === 0 ? (
              <p className="mt-3 text-sm leading-relaxed text-[var(--grey-invert)]">
                You never took one. The spot is still there at 61′ if you want it.
              </p>
            ) : (
              <>
                <p className="display mt-2 text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
                  {scored}
                  <span className="text-[var(--grey-invert)]">/{taken}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--grey-invert)]">
                  {Math.round(rate * 100)}% converted, against a real-world rate of{" "}
                  {Math.round(PENALTY_REALITY.conversion * 100)}%.{" "}
                  {rate > PENALTY_REALITY.conversion
                    ? "You would be taking them in a final."
                    : rate === 0
                      ? "Every keeper guessed right. That happens."
                      : "The keeper had the better of it."}
                </p>
              </>
            )}
          </div>

          <div className="ft-card">
            <span className="data block text-[var(--signal)]">Your verdict</span>
            {ranked === 0 ? (
              <p className="mt-3 text-sm leading-relaxed text-[var(--grey-invert)]">
                You ranked nobody. Diplomatic, but the argument at 78′ is unresolved.
              </p>
            ) : (
              <>
                <p className="display mt-2 text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
                  {ranked}
                  <span className="text-[var(--grey-invert)]">/{CONTENDERS.length}</span>
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--grey-invert)]">
                  {immortals.length > 0 ? (
                    <>
                      Immortal, according to you:{" "}
                      <span className="text-[var(--concrete)]">
                        {immortals.map((c) => c.name).join(", ")}
                      </span>
                      .
                    </>
                  ) : (
                    "Nobody made your top tier. A harsh but defensible position."
                  )}
                </p>
              </>
            )}
          </div>

          <div className="ft-card">
            <span className="data block text-[var(--signal)]">The archive</span>
            <p className="display mt-2 text-[clamp(2.5rem,6vw,4.5rem)] leading-none">
              {MOMENTS.length}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--grey-invert)]">
              Matches from {MOMENTS[0].year} to {MOMENTS[MOMENTS.length - 1].year}, each
              one still argued about. Crests and player records load live from
              TheSportsDB.
            </p>
          </div>
        </div>
      </div>

      {/* index of the match */}
      <div className="shell">
        <div className="ft-index rule-invert grid gap-x-8 gap-y-1 pt-4 md:grid-cols-[1fr_auto]">
          <div>
            {FIXTURES.map((f) => (
              <button
                key={f.id}
                onClick={() => scrollToEl(`#${f.id}`)}
                className="ft-row group flex w-full cursor-pointer items-baseline justify-between border-b border-[var(--line-invert)] py-2 text-left"
              >
                <span className="display text-[clamp(1.1rem,2.2vw,2rem)] transition-colors duration-200 group-hover:text-[var(--signal)]">
                  {f.label}
                </span>
                <span className="data-lg text-sm text-[var(--grey-invert)]">
                  {String(f.minute).padStart(2, "0")}′
                </span>
              </button>
            ))}
          </div>

          <div className="ft-row flex flex-col justify-end gap-4 pt-6 md:pt-0">
            <p className="max-w-[34ch] text-sm leading-relaxed text-[var(--grey-invert)]">
              Every moment here is a documented match. No invented quotes, no fabricated
              endorsements, and no photographs standing in for people they are not.
            </p>
            <button onClick={scrollToTop} className="btn cursor-pointer self-start">
              Play it again
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
          <span className="data text-[var(--grey-invert)]">
            Ninety — a frontend piece about football
          </span>
          <span className="data text-[var(--grey-invert)]">
            Data: TheSportsDB · 22 players · 1 ball · 90 minutes
          </span>
        </div>
      </div>
    </footer>
  );
}
