"use client";

import { useRef, useState, useMemo } from "react";
import { gsap, useGSAP, MOTION_OK } from "../../lib/gsap";
import { drawRules, revealLines, revealBatch, disposeAll } from "../../lib/reveal";
import { SEASONS, SPELLS, RECORDS, SEASON_COVERAGE, type Spell } from "../../lib/data";
import { useNearViewport } from "../../lib/useFootball";
import Crest from "../ui/Crest";

const CLUB_LABEL: Record<string, string> = { BAR: "Barcelona", PSG: "Paris", MIA: "Inter Miami" };

/**
 * 48' — THE NUMBERS
 *
 * The bridge between the Archive and the Arc: the Archive is history that
 * happened to everybody, the Arc is one career, and this is the evidence that
 * connects them.
 *
 * Deliberately interaction-led rather than animation-led — filter the spell,
 * scrub the seasons, pin a season open. Entrance motion comes from the shared
 * vocabulary in lib/reveal so this section arrives in the same accent as every
 * other one; the only bespoke tween is the bars growing out of the axis.
 */
export default function TheNumbers() {
  const root = useRef<HTMLElement>(null);
  const near = useNearViewport(root, "700px");

  const [spellId, setSpellId] = useState<Spell["id"]>("ALL");
  /** Season the pointer is over. */
  const [hover, setHover] = useState<number | null>(null);
  /** Season clicked open — survives the pointer leaving. */
  const [pinned, setPinned] = useState<number | null>(null);

  const spell = SPELLS.find((s) => s.id === spellId)!;
  const active = hover ?? pinned;

  /**
   * What the chart can honestly show for the selected spell.
   *   own       — that spell's own seasons
   *   club-run  — every season we hold, i.e. the whole club career
   *   none      — no per-season rows exist (Miami and Argentina)
   *
   * Previously all three cases fell through to "show everything", so picking
   * Inter Miami swapped the headline figures but left the Barcelona and Paris
   * bars underneath a heading that now said Inter Miami. The chart said nothing
   * about it, which is the one thing it could not afford to do.
   */
  const coverage = SEASON_COVERAGE[spellId];

  const seasons = useMemo(
    () => (coverage === "own" ? SEASONS.filter((s) => s.club === spellId) : SEASONS),
    [coverage, spellId]
  );

  /** What the bars actually cover, said out loud above the chart. */
  const chartScope =
    coverage === "own"
      ? `${spell.name}, season by season`
      : coverage === "club-run"
        ? "Every club season on record — Barcelona and Paris"
        : `No season breakdown for ${spell.name} — showing the club career instead`;

  const peak = Math.max(...seasons.map((s) => s.goals));
  const shown = active !== null ? seasons[active] : null;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // The bars sweep up from the baseline as the chart arrives. Kept as a
        // bespoke tween rather than a shared reveal: it is the one entrance on
        // the page that has to read as *measurement*, growing out of the axis.
        gsap.from(".n-bar", {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 0.6,
          stagger: 0.02,
          ease: "power3.out",
          scrollTrigger: { trigger: ".n-chart", start: "top 85%" },
        });

        // One reveal per element, never nested — `.n-panel` already covers the
        // figure grid and the records, and batching their children as well
        // would fade a fading parent.
        return disposeAll(
          drawRules(root.current),
          revealLines([".n-head h2", ".n-head .prose-tight"]),
          revealBatch(".n-panel", { y: 28 })
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  // The meta rail belongs to this section, so it sits close to the top edge and
  // the generous space goes between the rail and the headline. It used to have a
  // big gap on BOTH sides — 7svh of section padding and another 7svh under the
  // rail — which read as a dead band rather than a beat. Same pattern in the
  // Arc, the Spot and the Argument.
  return (
    <section ref={root} id="numbers" className="relative bg-[var(--concrete)] pt-block pb-lede">
      <div className="shell">
        <div className="rule" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-3">
          <span className="data">48′ — The Numbers</span>
          <span className="data text-[var(--grey)]">
            Between what happened to everyone and what happened to one player
          </span>
        </div>

        <header className="n-head mt-lede grid items-end gap-x-10 gap-y-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <h2 className="display overflow-hidden text-[clamp(2.75rem,9vw,9rem)] leading-[0.8]">
            <span className="block">The Evidence</span>
          </h2>
          <div className="pb-2">
            <p className="prose-tight block">
              Every match in the archive belongs to everybody. What follows belongs to one
              player. This is the case for why he gets a section to himself — pick a
              spell, then go season by season.
            </p>
          </div>
        </header>

        {/* ---------- controls ---------- */}
        <div className="n-body mt-block">
          <div
            className="n-panel flex flex-wrap gap-px border border-[var(--ink)] bg-[var(--ink)]"
            role="tablist"
            aria-label="Career spell"
          >
            {SPELLS.map((s) => {
              const on = s.id === spellId;
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setSpellId(s.id);
                    setPinned(null);
                    setHover(null);
                  }}
                  className={`data flex flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-3 transition-colors duration-200 ${
                    on
                      ? "bg-[var(--signal)] text-[var(--ink)]"
                      : "bg-[var(--concrete)] text-[var(--grey)] hover:bg-[var(--concrete-dim)] hover:text-[var(--ink)]"
                  }`}
                >
                  {s.query && (
                    <span className="hidden sm:inline">
                      <Crest query={s.query} code={s.code} size="sm" active={near} />
                    </span>
                  )}
                  {s.name}
                </button>
              );
            })}
          </div>

          {/* ---------- headline figures ---------- */}
          <dl className="n-panel mt-6 grid grid-cols-2 border-t border-[var(--line)] md:grid-cols-4">
            {(
              [
                ["Appearances", spell.apps],
                ["Goals", spell.goals],
                ["Trophies", spell.trophies],
                ["Goals per game", (spell.goals / spell.apps).toFixed(2)],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="stat border-b border-r border-[var(--line)] p-4">
                <dt>{label}</dt>
                <dd className="text-[clamp(1.75rem,4vw,3rem)]">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="n-panel mt-3 text-sm leading-relaxed text-[var(--ink)]/70">
            <span className="data mr-2 text-[var(--grey)]">{spell.years}</span>
            {spell.note}
          </p>

          {/* ---------- season chart ---------- */}
          <div className="n-chart mt-lede">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-none">
                Season by season
              </h3>
              <span className="data text-[var(--grey)]">
                {shown
                  ? `${shown.label} · ${CLUB_LABEL[shown.club]}`
                  : "Hover a season · click to keep it open"}
              </span>
            </div>

            {/* What these bars are. Load-bearing: the tabs above change the
                headline figures, and without this line the chart looks like it
                changed with them when it did not. */}
            <p
              className={`data mt-2 ${
                coverage === "none"
                  ? "border-l-2 border-[var(--signal)] pl-3 text-[var(--ink)]"
                  : "text-[var(--grey)]"
              }`}
            >
              {chartScope}
            </p>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_16rem] lg:items-end">
              {/* Bars and axis share one column — the axis previously sat outside
                  the grid and spanned the full width, so every label drifted
                  right of the bar it belonged to. */}
              <div>
                <div className="flex h-[16rem] items-end gap-[2px]">
                {seasons.map((s, i) => {
                  const on = active === i;
                  return (
                    <button
                      key={s.label}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(null)}
                      onClick={() => setPinned(pinned === i ? null : i)}
                      aria-label={`${s.label}, ${CLUB_LABEL[s.club]}: ${s.goals} goals in ${s.apps} appearances`}
                      aria-pressed={pinned === i}
                      className="group relative flex h-full flex-1 cursor-pointer flex-col justify-end"
                    >
                      <span className="data mb-1 text-center text-[9px] leading-none text-[var(--ink)] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        {s.goals}
                      </span>
                      <span
                        className={`n-bar w-full border-t transition-colors duration-150 ${
                          on
                            ? "border-[var(--ink)] bg-[var(--signal)]"
                            : s.club === "BAR"
                              ? "border-transparent bg-[var(--ink)] group-hover:bg-[var(--signal)]"
                              : "border-transparent bg-[var(--grey)] group-hover:bg-[var(--signal)]"
                        }`}
                        style={{ height: `${(s.goals / peak) * 100}%` }}
                      />
                    </button>
                  );
                })}
                </div>

                {/* axis */}
                <div className="mt-2 flex gap-[2px]">
                  {seasons.map((s, i) => (
                    <span
                      key={s.label}
                      className={`data flex-1 text-center text-[8px] leading-none transition-colors duration-150 ${
                        active === i ? "text-[var(--ink)]" : "text-[var(--grey)]"
                      }`}
                    >
                      {i % 2 === 0 || seasons.length < 8 ? s.label : ""}
                    </span>
                  ))}
                </div>
              </div>

              {/* readout */}
              <div className="border border-[var(--ink)] p-4">
                {shown ? (
                  <>
                    <span className="data block text-[var(--grey)]">{CLUB_LABEL[shown.club]}</span>
                    <p className="display mt-1 text-[clamp(2rem,4vw,3rem)] leading-none">
                      {shown.label}
                    </p>
                    <dl className="mt-4">
                      <div className="kv">
                        <dt>Goals</dt>
                        <dd>{shown.goals}</dd>
                      </div>
                      <div className="kv">
                        <dt>Appearances</dt>
                        <dd>{shown.apps}</dd>
                      </div>
                      <div className="kv">
                        <dt>Per game</dt>
                        <dd>{(shown.goals / shown.apps).toFixed(2)}</dd>
                      </div>
                      <div className="kv border-b-0">
                        <dt>vs. best season</dt>
                        <dd>
                          {shown.goals === peak ? "the peak" : `−${peak - shown.goals}`}
                        </dd>
                      </div>
                    </dl>
                  </>
                ) : (
                  <p className="text-sm leading-relaxed text-[var(--grey)]">
                    {coverage === "own"
                      ? `${seasons.length} seasons at ${spell.name}. Pick one and the numbers appear here.`
                      : "Seventeen seasons at one club, then two at another. Pick one and the numbers appear here."}
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* ---------- records ---------- */}
          <dl className="n-panel mt-lede grid gap-px border border-[var(--ink)] bg-[var(--ink)] sm:grid-cols-2 lg:grid-cols-4">
            {RECORDS.map((r) => (
              <div
                key={r.label}
                className="group bg-[var(--concrete)] p-5 transition-colors duration-200 hover:bg-[var(--signal)]"
              >
                <dd className="display text-[clamp(2.25rem,5vw,3.5rem)] leading-none">{r.value}</dd>
                <dt className="data mt-2 text-[var(--grey)] group-hover:text-[var(--ink)]">
                  {r.label}
                </dt>
                <p className="mt-2 text-xs leading-relaxed text-[var(--ink)]/70">{r.detail}</p>
              </div>
            ))}
          </dl>

          <p className="data mt-block max-w-[80ch] leading-relaxed text-[var(--grey)]">
            All senior competitions. “Everything” is the four spells added together, so
            the tabs always reconcile. Barcelona and Paris are closed records; Inter
            Miami and Argentina are ongoing and rounded. Season-level figures exist for
            the club years only.
          </p>
        </div>
      </div>
    </section>
  );
}
