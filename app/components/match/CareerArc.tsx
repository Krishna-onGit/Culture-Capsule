"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "../../lib/gsap";
import { drawRules, revealLines, revealBatch, parallax, disposeAll } from "../../lib/reveal";
import { CAREERS, CAREER_TOTALS } from "../../lib/data";
import { useNearViewport } from "../../lib/useFootball";
import Crest from "../ui/Crest";

const career = CAREERS[0];
const N = career.nodes.length;
/** The last stop is the career to date, so the rail counts up to the same
 *  total the Numbers section quotes. Never hard-code it in two places. */
const FINAL = CAREER_TOTALS;

/** Clubs on the line, counted rather than typed — it read "4" while the arc
 *  showed three (La Masia and Camp Nou are the same club). */
const CLUBS = new Set(
  career.nodes.filter((n) => n.query && n.query !== "Argentina").map((n) => n.query)
).size;

/** Alternating x positions (percent of width) give the line its meander. */
const X = (i: number) => (i % 2 === 0 ? 30 : 70);

/**
 * Smooth cubic path through the nodes, with vertical control handles so the
 * curve always leaves and enters a node travelling downward.
 * viewBox is 100 wide x (N*100) tall; each node sits at the centre of its row.
 */
function buildPath() {
  let d = `M ${X(0)} 50`;
  for (let i = 1; i < N; i++) {
    const y = i * 100 + 50;
    const py = (i - 1) * 100 + 50;
    d += ` C ${X(i - 1)} ${py + 50}, ${X(i)} ${y - 50}, ${X(i)} ${y}`;
  }
  return d;
}

export default function CareerArc() {
  const root = useRef<HTMLElement>(null);
  const appsRef = useRef<HTMLElement>(null);
  const goalsRef = useRef<HTMLElement>(null);
  const trophiesRef = useRef<HTMLElement>(null);
  const near = useNearViewport(root, "900px");
  const d = buildPath();

  useGSAP(
    () => {
      // The line reveals top-to-bottom by clipping its wrapper rather than with
      // DrawSVG: the path uses vector-effect="non-scaling-stroke" inside a
      // preserveAspectRatio="none" viewBox, and SVG path length cannot be
      // measured under those conditions (Chrome warns and DrawSVG no-ops).
      // Clipping is visually identical here because the arc only travels down.
      gsap.fromTo(
        ".arc-clip",
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: ".arc-body", start: "top 72%", end: "bottom 78%", scrub: 0.6 },
        }
      );

      // running totals in the sticky rail — the arc gains a quantity, not just a shape
      const counters = [
        { el: appsRef.current!, key: "apps" as const },
        { el: goalsRef.current!, key: "goals" as const },
        { el: trophiesRef.current!, key: "trophies" as const },
      ];
      const shown = { apps: 0, goals: 0, trophies: 0 };

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".arc-row").forEach((row) => {
          gsap
            .timeline({
              scrollTrigger: { trigger: row, start: "top 70%", toggleActions: "play none none reverse" },
            })
            .from(row.querySelector(".arc-dot"), { scale: 0, duration: 0.5, ease: "back.out(3)" })
            .from(row.querySelector(".arc-crest"), { scale: 0.4, opacity: 0, duration: 0.55, ease: "back.out(2)" }, 0.05)
            .from(row.querySelector(".arc-card"), { opacity: 0, y: 26, duration: 0.8 }, 0.1)
            .from(row.querySelectorAll(".arc-fig"), { opacity: 0, y: 12, duration: 0.5, stagger: 0.06 }, 0.3)
            .from(row.querySelector(".arc-stat"), { opacity: 0, duration: 0.6 }, 0.25);
        });

        return disposeAll(
          drawRules(root.current),
          revealLines([".arc-head h2", ".arc-head .prose-tight"]),
          revealBatch(".arc-head .stat", { y: 18, stagger: 0.06, batchMax: 3 }),
          // the oversized ghost figures drift against the cards they sit behind
          parallax(root.current)
        );
      });

      // Counters are information, not decoration — they run in every motion mode.
      gsap.utils.toArray<HTMLElement>(".arc-row").forEach((row, i) => {
        const totals = career.nodes[i].totals!;

        // Counters roll to this stop's totals, in both scroll directions.
        // One tween for all three figures: three tweens on the same target with
        // overwrite:true kill each other, which left apps and goals stuck at 0
        // while trophies counted correctly.
        const rollTo = () =>
          gsap.to(shown, {
            apps: totals.apps,
            goals: totals.goals,
            trophies: totals.trophies,
            duration: 0.8,
            ease: "power2.out",
            overwrite: true,
            onUpdate: () => {
              counters.forEach(({ el, key }) => {
                el.textContent = Math.round(shown[key]).toLocaleString("en-GB");
              });
            },
          });

        ScrollTrigger.create({ trigger: row, start: "top 60%", onEnter: rollTo, onEnterBack: rollTo });
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="arc" className="relative bg-[var(--concrete)] pt-block pb-lede">
      <div className="shell">
        <div className="rule" />
        <div className="flex items-baseline justify-between pt-3">
          <span className="data">52′ — The Arc</span>
          <span className="data text-[var(--grey)]">{career.born}</span>
        </div>

        {/* Header fills the full measure: the title alone left a two-thirds-empty
            band across anything wider than about 1400px. */}
        <header className="arc-head mt-lede grid items-end gap-x-10 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <h2 className="display overflow-hidden text-[clamp(2.75rem,9vw,9rem)] leading-[0.8]">
            <span className="block">{career.name}</span>
          </h2>
          <div className="pb-2">
            <p className="prose-tight block">{career.tagline}</p>
            <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-4">
              <div className="stat">
                <dt>Clubs</dt>
                <dd>{CLUBS}</dd>
              </div>
              <div className="stat">
                {/* derived from the data, not from Date.now(), so server and
                    client always render the same string */}
                <dt>Years spanned</dt>
                <dd>{career.nodes[N - 1].year - career.nodes[0].year}</dd>
              </div>
              <div className="stat">
                <dt>Stops mapped</dt>
                <dd>{N}</dd>
              </div>
            </dl>
          </div>
        </header>

        {/* sticky running totals */}
        <div className="sticky top-0 z-20 -mx-[var(--gut)] mt-block border-y border-[var(--line)] bg-[var(--concrete)]/92 px-[var(--gut)] py-3 backdrop-blur-sm">
          <dl className="flex items-end justify-between gap-4">
            <div className="stat">
              <dt>Appearances</dt>
              <dd>
                <span ref={appsRef}>0</span>
                <span className="text-[var(--grey)]">/{FINAL.apps.toLocaleString("en-GB")}</span>
              </dd>
            </div>
            <div className="stat">
              <dt>Goals</dt>
              <dd>
                <span ref={goalsRef}>0</span>
                <span className="text-[var(--grey)]">/{FINAL.goals.toLocaleString("en-GB")}</span>
              </dd>
            </div>
            <div className="stat">
              <dt>Trophies</dt>
              <dd>
                <span ref={trophiesRef}>0</span>
                <span className="text-[var(--grey)]">/{FINAL.trophies}</span>
              </dd>
            </div>
          </dl>
        </div>

        {/* ---- the arc ---- */}
        <div className="arc-body relative mt-block">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox={`0 0 100 ${N * 100}`}
            preserveAspectRatio="none"
          >
            <path d={d} fill="none" stroke="var(--ink)" strokeOpacity="0.14" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* the travelled portion, revealed by clipping this wrapper */}
          <div className="arc-clip pointer-events-none absolute inset-0">
            <svg
              aria-hidden
              className="h-full w-full"
              viewBox={`0 0 100 ${N * 100}`}
              preserveAspectRatio="none"
            >
              <path d={d} fill="none" stroke="var(--ink)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          {career.nodes.map((node, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={node.year}
                className="arc-row relative grid min-h-[clamp(18rem,30svh,26rem)] grid-cols-2 items-center"
              >
                {/* node marker + crest, aligned to the svg row centre */}
                <span
                  aria-hidden
                  className="arc-dot absolute top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--ink)] bg-[var(--signal)]"
                  style={{ left: `${X(i)}%` }}
                />
                {node.query && (
                  <span
                    className="arc-crest absolute top-1/2 z-10 -translate-y-1/2 translate-x-4"
                    style={{ left: `${X(i)}%` }}
                  >
                    <Crest query={node.query} code={node.code ?? ""} size="sm" active={near} />
                  </span>
                )}

                {/* Big ghost stat on the empty side.
                    Two elements, deliberately: the outer one owns the centring
                    and the inner one owns the transform. Parallax writes an
                    inline `transform`, which would otherwise replace the
                    -translate-y-1/2 that was doing the centring and drop the
                    figure half a row. Position on the parent, motion on the
                    child — always. */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-y-0 flex items-center ${
                    left ? "right-0" : "left-0"
                  }`}
                >
                  <span
                    data-parallax="0.16"
                    className="arc-stat display block text-[12vw] leading-none text-[var(--ink)] opacity-[0.07]"
                  >
                    {node.stat}
                  </span>
                </span>

                <div
                  className={`arc-card relative z-10 max-w-[46ch] ${
                    left ? "col-start-2 justify-self-start pl-[6%]" : "col-start-1 row-start-1 justify-self-end pr-[6%] text-right"
                  }`}
                >
                  <div className={`flex items-baseline gap-3 ${left ? "" : "justify-end"}`}>
                    <span className="data-lg text-2xl">{node.year}</span>
                    <span className="data text-[var(--grey)]">{node.place}</span>
                  </div>
                  <h3 className="display mt-2 text-[clamp(1.75rem,3.4vw,3rem)]">{node.club}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink)]/75">{node.note}</p>

                  {node.totals && (
                    <div
                      className={`mt-4 flex gap-6 border-t border-[var(--line)] pt-3 ${
                        left ? "" : "justify-end"
                      }`}
                    >
                      <span className="arc-fig data-lg text-sm">
                        {node.totals.apps}
                        <span className="data ml-1 text-[var(--grey)]">apps</span>
                      </span>
                      <span className="arc-fig data-lg text-sm">
                        {node.totals.goals}
                        <span className="data ml-1 text-[var(--grey)]">goals</span>
                      </span>
                      <span className="arc-fig data-lg text-sm">
                        {node.totals.trophies}
                        <span className="data ml-1 text-[var(--grey)]">cups</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="data mt-block max-w-[70ch] leading-relaxed text-[var(--grey)]">
          Totals are running career figures at each stop — senior club and country
          combined, so they include the season table at 48′. The closed spells are
          exact; the stops in between are rounded, and the last one is the career to
          date.
        </p>
      </div>
    </section>
  );
}
