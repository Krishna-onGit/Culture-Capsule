"use client";

import { useRef, useState, useCallback } from "react";
import { gsap, useGSAP, Draggable, MOTION_OK } from "../../lib/gsap";
import { PENALTY_REALITY } from "../../lib/data";
import { session, useSession } from "../../lib/session";

const ZONES = [
  "top left", "top centre", "top right",
  "bottom left", "bottom centre", "bottom right",
] as const;

type Result = { kind: "goal" | "saved"; zone: number } | null;

const pct = (n: number) => `${Math.round(n * 100)}%`;

/** A shootout is five kicks. */
const ROUND = 5;

/**
 * The keeper remembers where you have already put the ball and leans that way.
 * It never reads the current kick — it only weights its guess by your history,
 * so repeatedly picking one favourite corner stops working, exactly as it would
 * against a keeper who has watched you.
 */
function keeperGuess(history: number[]): number {
  const weights = new Array(6).fill(1);
  history.slice(-6).forEach((z) => {
    weights[z] += 1.6;
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < 6; i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return 5;
}

/**
 * 61' — THE SPOT
 * Drag the ball to aim and release, or pick a corner. The keeper guesses
 * independently, so the outcome is honestly random rather than scripted.
 *
 * Every shot is also plotted against where penalties actually go in real
 * matches — the toy is the way into the data, not a substitute for it.
 */
export default function PenaltyBox() {
  const root = useRef<HTMLElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const keeperRef = useRef<HTMLDivElement>(null);
  const netRef = useRef<HTMLDivElement>(null);
  const verdictRef = useRef<HTMLSpanElement>(null);
  const zoneRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lineRef = useRef<SVGLineElement>(null);
  const busy = useRef(false);
  const aimRef = useRef<number | null>(null);
  /** A kick requested while another was still animating. */
  const queued = useRef<number | null>(null);
  /** Lets the end-of-kick callback re-enter shoot() without a circular dep. */
  const shootRef = useRef<((zone: number) => void) | null>(null);

  const [result, setResult] = useState<Result>(null);
  const [aim, setAim] = useState<number | null>(null);
  /** Mirrors `busy.current` for rendering, so the goal can show it is mid-kick. */
  const [busyUI, setBusyUI] = useState(false);
  const { shots, outcomes, scored } = useSession();
  const taken = shots.length;
  /** Read inside GSAP callbacks, which close over the first render's values. */
  const shotsRef = useRef<number[]>([]);
  shotsRef.current = shots;

  // where we are in the current five-kick shootout
  const kicksThisRound = taken === 0 ? 0 : ((taken - 1) % ROUND) + 1;
  const roundOutcomes = outcomes.slice(taken - kicksThisRound);
  const roundScored = roundOutcomes.filter(Boolean).length;
  const roundOver = kicksThisRound === ROUND;

  /** How often the visitor picked each zone, for the comparison chart. */
  const mine = ZONES.map((_, i) => (taken ? shots.filter((s) => s === i).length / taken : 0));

  /** The zone the visitor over-uses — what the keeper's memory is weighting against. */
  const favourite = (() => {
    if (taken < 3) return null;
    const counts = ZONES.map((_, i) => shots.filter((s) => s === i).length);
    const top = Math.max(...counts);
    return top / taken > 0.4 ? counts.indexOf(top) : null;
  })();

  const offsetToZone = useCallback((i: number) => {
    const ball = ballRef.current!;
    const zone = zoneRefs.current[i];
    if (!zone) return { x: 0, y: 0 };
    const b = ball.getBoundingClientRect();
    const z = zone.getBoundingClientRect();
    const cur = {
      x: gsap.getProperty(ball, "x") as number,
      y: gsap.getProperty(ball, "y") as number,
    };
    return {
      x: cur.x + (z.left + z.width / 2 - (b.left + b.width / 2)),
      y: cur.y + (z.top + z.height / 2 - (b.top + b.height / 2)),
    };
  }, []);

  const shoot = useCallback(
    (target: number) => {
      // A kick arriving mid-animation is remembered rather than dropped. The
      // guard alone meant a visitor tapping through a shootout lost roughly
      // two of every five clicks with no feedback at all.
      if (busy.current) {
        queued.current = target;
        return;
      }
      busy.current = true;
      setBusyUI(true);
      setAim(null);
      setResult(null);

      const ball = ballRef.current!;
      const keeper = keeperRef.current!;
      const dest = offsetToZone(target);
      const start = {
        x: gsap.getProperty(ball, "x") as number,
        y: gsap.getProperty(ball, "y") as number,
      };

      const guess = keeperGuess(shotsRef.current);
      const saved = guess === target;

      gsap.set(lineRef.current, { autoAlpha: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          session.recordShot(target, !saved);
          setResult({ kind: saved ? "saved" : "goal", zone: target });

          gsap.fromTo(
            verdictRef.current,
            { scale: 0.75, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }
          );

          // Kept deliberately short: the previous 2.5–3.1s cycle meant rapid
          // kicks were silently swallowed by the `busy` guard, and a shootout
          // where three of your five clicks do nothing feels broken.
          gsap.delayedCall(0.85, () => {
            gsap.to(verdictRef.current, { opacity: 0, duration: 0.25 });
            gsap.to(ball, { x: 0, y: 0, scale: 1, rotate: 0, duration: 0.4 });
            gsap.to(keeper, { x: 0, y: 0, rotate: 0, duration: 0.4 });
            gsap.delayedCall(0.18, () => {
              setResult(null);
              setBusyUI(false);
              busy.current = false;

              // fire whatever was clicked while this kick was still playing
              const next = queued.current;
              queued.current = null;
              if (next !== null) shootRef.current?.(next);
            });
          });
        },
      });

      tl.to(ball, {
        motionPath: {
          path: [
            { x: start.x, y: start.y },
            { x: (start.x + dest.x) / 2, y: start.y - Math.abs(dest.y - start.y) * 0.55 - 40 },
            { x: dest.x, y: dest.y },
          ],
          curviness: 1.4,
        },
        scale: 0.55,
        duration: 0.62,
        ease: "power2.in",
      })
        .to(ball, { rotate: "+=540", duration: 0.62, ease: "none" }, 0)
        .to(
          keeper,
          {
            x: guess % 3 === 0 ? "-115%" : guess % 3 === 2 ? "115%" : 0,
            y: guess < 3 ? "-38%" : "8%",
            rotate: guess % 3 === 0 ? -32 : guess % 3 === 2 ? 32 : 0,
            duration: 0.45,
            ease: "power3.out",
          },
          0.06
        );

      if (saved) {
        tl.to(ball, { x: start.x * 0.4, y: start.y - 60, scale: 0.8, duration: 0.5, ease: "power2.out" });
      } else {
        // the net takes the shot
        tl.fromTo(
          netRef.current,
          { scaleY: 1 },
          { scaleY: 1.05, duration: 0.14, yoyo: true, repeat: 1, transformOrigin: "top center", ease: "power2.out" },
          "-=0.06"
        );
      }
    },
    [offsetToZone]
  );

  shootRef.current = shoot;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".pk-head > *", {
          yPercent: 105,
          duration: 1,
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        });
        gsap.from(".pk-stage", {
          opacity: 0,
          y: 40,
          duration: 1.1,
          scrollTrigger: { trigger: ".pk-stage", start: "top 82%" },
        });
        // the reality bars grow from the baseline
        gsap.from(".pk-bar", {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pk-chart", start: "top 85%" },
        });
      });

      const [drag] = Draggable.create(ballRef.current, {
        type: "x,y",
        onPress() {
          if (busy.current) return;
          gsap.to(ballRef.current, { scale: 1.12, duration: 0.25 });
        },
        onDrag() {
          if (busy.current) return;
          const b = ballRef.current!.getBoundingClientRect();
          const stage = root.current!.querySelector(".pk-stage")!.getBoundingClientRect();
          gsap.set(lineRef.current, {
            attr: {
              x2: ((b.left + b.width / 2 - stage.left) / stage.width) * 100,
              y2: ((b.top + b.height / 2 - stage.top) / stage.height) * 100,
            },
            autoAlpha: 1,
          });

          let best = 0;
          let min = Infinity;
          zoneRefs.current.forEach((z, i) => {
            if (!z) return;
            const r = z.getBoundingClientRect();
            const dx = r.left + r.width / 2 - (b.left + b.width / 2);
            const dy = r.top + r.height / 2 - (b.top + b.height / 2);
            const dist = dx * dx + dy * dy;
            if (dist < min) {
              min = dist;
              best = i;
            }
          });
          setAim(best);
        },
        onRelease() {
          if (busy.current) return;
          gsap.to(ballRef.current, { scale: 1, duration: 0.2 });
          gsap.set(lineRef.current, { autoAlpha: 0 });
          const moved = Math.abs(this.x) + Math.abs(this.y) > 24;
          if (moved && aimRef.current !== null) shoot(aimRef.current);
          else gsap.to(ballRef.current, { x: 0, y: 0, duration: 0.5 });
          setAim(null);
        },
      });

      return () => {
        drag.kill();
        mm.revert();
      };
    },
    { scope: root }
  );

  aimRef.current = aim;

  const myRate = taken ? scored / taken : 0;

  return (
    <section ref={root} id="penalty" className="relative bg-[var(--concrete)] py-[12svh]">
      <div className="shell">
        <div className="rule" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-3">
          <span className="data">66′ — The Spot</span>

          {/* shootout scorecard: five kicks, filled as you take them */}
          <span className="flex items-center gap-3">
            <span className="data text-[var(--grey)]">Shootout</span>
            <span className="flex gap-1.5" role="img" aria-label={`${roundScored} scored from ${kicksThisRound} of ${ROUND}`}>
              {Array.from({ length: ROUND }, (_, i) => {
                const done = i < kicksThisRound;
                const ok = done && roundOutcomes[i];
                return (
                  <span
                    key={i}
                    className={`h-3.5 w-3.5 border border-[var(--ink)] transition-colors duration-300 ${
                      !done ? "bg-transparent" : ok ? "bg-[var(--signal)]" : "bg-[var(--ink)]"
                    }`}
                  />
                );
              })}
            </span>
            <span className="data-lg text-sm">
              {roundScored}
              <span className="text-[var(--grey)]">/{ROUND}</span>
            </span>
          </span>

          <span className="data-lg text-sm text-[var(--grey)]">
            <span className="text-[var(--ink)]">{scored}</span> / {taken} all time
            {taken > 0 && <span className="ml-2">({pct(myRate)})</span>}
          </span>
        </div>

        <header className="pk-head mt-[7svh] grid items-end gap-x-10 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <h2 className="display overflow-hidden text-[clamp(2.75rem,9vw,9rem)] leading-[0.8]">
            <span className="block">Twelve Yards</span>
          </h2>
          <div className="overflow-hidden pb-2">
            <p className="prose-tight block">
              Drag the ball where you want it and let go, or just pick a corner. The
              keeper guesses at the same instant you strike it — and it remembers where
              you have been putting them.
            </p>
            <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-4">
              <div className="stat">
                <dt>Distance</dt>
                <dd>12yd</dd>
              </div>
              <div className="stat">
                <dt>Ball in flight</dt>
                <dd>0.4s</dd>
              </div>
              <div className="stat">
                <dt>Keeper needs</dt>
                <dd>0.6s</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="mt-[8svh] grid gap-x-12 gap-y-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* ---- stage ---- capped so the goal keeps sane proportions on ultrawide */}
          <div className="pk-stage relative w-full max-w-[46rem] select-none justify-self-center">
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 z-20 h-full w-full"
            >
              <line
                ref={lineRef}
                x1="50" y1="88" x2="50" y2="88"
                stroke="var(--ink)" strokeWidth="1" strokeDasharray="2 2"
                vectorEffect="non-scaling-stroke" opacity="0"
              />
            </svg>

            <div className="relative">
              <div ref={netRef} className="relative aspect-[16/7] w-full border-x-2 border-t-2 border-[var(--ink)]">
                <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.15]">
                  <defs>
                    <pattern id="net" width="14" height="14" patternUnits="userSpaceOnUse">
                      <path d="M14 0 L0 14 M0 0 L14 14" stroke="var(--ink)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#net)" />
                </svg>

                <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
                  {ZONES.map((z, i) => (
                    <button
                      key={z}
                      ref={(el) => {
                        zoneRefs.current[i] = el;
                      }}
                      onClick={() => shoot(i)}
                      disabled={busyUI}
                      aria-label={`Shoot ${z}. Scored ${pct(PENALTY_REALITY.scoreRate[i])} of the time in real matches.`}
                      className={`group relative border border-dashed border-[var(--ink)]/15 transition-colors duration-200 ${
                        busyUI
                          ? "cursor-wait"
                          : aim === i
                            ? "cursor-pointer bg-[var(--signal)]/35"
                            : "cursor-pointer hover:bg-[var(--signal)]/20"
                      }`}
                    >
                      <span className="data absolute bottom-2 left-2 text-[9px] leading-tight text-transparent transition-colors duration-200 group-hover:text-[var(--grey)]">
                        {pct(PENALTY_REALITY.scoreRate[i])} scored
                      </span>
                    </button>
                  ))}
                </div>

                {/* pointer-events-none is load-bearing: the keeper sits over the
                    two centre zones and was swallowing every click aimed down
                    the middle, making those targets unreachable by mouse. */}
                <div
                  ref={keeperRef}
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-[54%] w-[4.5%] -translate-x-1/2 bg-[var(--ink)]"
                >
                  {/* head */}
                  <span className="absolute -top-[26%] left-1/2 block aspect-square w-[150%] -translate-x-1/2 rounded-full bg-[var(--ink)]" />
                  {/* arms, out and ready */}
                  <span className="absolute top-[14%] left-1/2 block h-[9%] w-[420%] -translate-x-1/2 bg-[var(--ink)]" />
                </div>
              </div>

              <div className="relative h-[20svh] border-x border-b border-[var(--line)]">
                <div className="absolute left-1/2 top-[62%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--ink)]" />
                <div
                  ref={ballRef}
                  role="button"
                  tabIndex={0}
                  aria-label="Drag the ball to aim, or use the six goal buttons above"
                  className="absolute left-1/2 top-[62%] z-30 h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-[var(--ink)] bg-[var(--concrete)] active:cursor-grabbing"
                >
                  <span className="absolute inset-[22%] rounded-full border border-[var(--ink)]/40" />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
              <span
                ref={verdictRef}
                className="display text-[clamp(3rem,11vw,9rem)] leading-none opacity-0"
                style={{ color: result?.kind === "saved" ? "var(--grey)" : "var(--ink)" }}
              >
                {result?.kind === "goal" ? "Goal" : result?.kind === "saved" ? "Saved" : ""}
              </span>
            </div>
          </div>

          {/* ---- the data ---- */}
          <div className="pk-chart">
            {/* end-of-shootout verdict, measured against the real-world rate */}
            {roundOver && (
              <div className="mb-8 border border-[var(--ink)] bg-[var(--concrete-dim)] p-4">
                <span className="data block text-[var(--grey)]">Shootout complete</span>
                <p className="display mt-1 text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none">
                  {roundScored} of {ROUND}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/75">
                  A real taker converting at {pct(PENALTY_REALITY.conversion)} would expect{" "}
                  {(PENALTY_REALITY.conversion * ROUND).toFixed(1)}.{" "}
                  {roundScored / ROUND > PENALTY_REALITY.conversion
                    ? "You are above the professional rate."
                    : roundScored / ROUND === PENALTY_REALITY.conversion
                      ? "Exactly the professional rate."
                      : "The keeper had the better of that one."}
                </p>
                <button onClick={() => session.resetShots()} className="btn mt-4 cursor-pointer">
                  Take five more
                </button>
              </div>
            )}

            {favourite !== null && taken >= 3 && (
              <p className="data mb-6 border-l-2 border-[var(--signal)] pl-3 leading-relaxed text-[var(--grey)]">
                The keeper has noticed you favour{" "}
                <span className="text-[var(--ink)]">{ZONES[favourite]}</span> — it will start
                going there.
              </p>
            )}

            <h3 className="display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-none">
              Where they actually go
            </h3>
            <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-[var(--ink)]/75">
              Roughly {pct(PENALTY_REALITY.conversion)} of penalties are scored at the top level.
              Takers overwhelmingly favour the bottom corners — and the middle of the goal
              is the worst place to put it, despite the keeper usually leaving.
            </p>

            <div className="mt-8 grid grid-cols-6 items-end gap-2" style={{ height: "10rem" }}>
              {PENALTY_REALITY.distribution.map((share, i) => (
                <div key={i} className="flex h-full flex-col justify-end gap-1">
                  {/* the visitor's own distribution, overlaid */}
                  {taken > 0 && (
                    <div
                      className="w-full border border-[var(--ink)] bg-[var(--signal)]"
                      style={{ height: `${Math.max(mine[i] * 220, mine[i] ? 3 : 0)}px` }}
                      title={`You: ${pct(mine[i])}`}
                    />
                  )}
                  <div
                    className="pk-bar w-full bg-[var(--ink)]"
                    style={{ height: `${share * 220}px` }}
                    title={`All penalties: ${pct(share)}`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-6 gap-2">
              {PENALTY_REALITY.labels.map((l) => (
                <span key={l} className="data text-center text-[9px] text-[var(--grey)]">
                  {l}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="data flex items-center gap-2 text-[var(--grey)]">
                <span className="inline-block h-2.5 w-2.5 bg-[var(--ink)]" /> All penalties
              </span>
              <span className="data flex items-center gap-2 text-[var(--grey)]">
                <span className="inline-block h-2.5 w-2.5 border border-[var(--ink)] bg-[var(--signal)]" /> Your shots
              </span>
            </div>

            <dl className="mt-8">
              <div className="kv">
                <dt>Real conversion</dt>
                <dd>{pct(PENALTY_REALITY.conversion)}</dd>
              </div>
              <div className="kv">
                <dt>Your conversion</dt>
                <dd>{taken ? pct(myRate) : "—"}</dd>
              </div>
              <div className="kv">
                <dt>Safest corner</dt>
                <dd>Top left · {pct(PENALTY_REALITY.scoreRate[0])}</dd>
              </div>
              <div className="kv">
                <dt>Worst choice</dt>
                <dd>Low centre · {pct(PENALTY_REALITY.scoreRate[4])}</dd>
              </div>
            </dl>

            <p className="data mt-4 text-[var(--grey)]">
              Hover a corner in the goal to see its real scoring rate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
