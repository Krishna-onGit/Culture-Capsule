"use client";

import { useRef, useState, useEffect, useCallback, memo } from "react";
import { gsap, useGSAP, Draggable, Flip, MOTION_OK } from "../../lib/gsap";
import { CONTENDERS, TIERS, type Contender } from "../../lib/data";
import { usePlayer, useNearViewport } from "../../lib/useFootball";
import { session } from "../../lib/session";

type TierId = (typeof TIERS)[number]["id"];
type Placement = Record<string, TierId | null>;

const EMPTY: Placement = Object.fromEntries(CONTENDERS.map((c) => [c.id, null]));
const byId = new Map(CONTENDERS.map((c) => [c.id, c]));

/* ------------------------------------------------------------------ */

/**
 * Declared at module scope, NOT inside TierList.
 *
 * When this lived in the component body it was a new component *type* on every
 * render, so React threw away and rebuilt every card's DOM node each time the
 * dossier changed on hover. The Draggable instances were then bound to detached
 * elements and the whole section went dead — no drag, no click, nothing.
 */
const Card = memo(function Card({
  contender,
  tier,
  onCycle,
  onFocus,
}: {
  contender: Contender;
  tier: TierId | null;
  onCycle: (id: string) => void;
  onFocus: (c: Contender) => void;
}) {
  return (
    <button
      data-flip-id={contender.id}
      onClick={() => onCycle(contender.id)}
      onMouseEnter={() => onFocus(contender)}
      onFocus={() => onFocus(contender)}
      aria-label={`${contender.name}, ${contender.country}, ${contender.era}. ${
        tier ? `Ranked ${TIERS.find((t) => t.id === tier)?.label}` : "Unranked"
      }. Activate to move to the next tier.`}
      className="group cursor-grab touch-none select-none border border-[var(--ink)] bg-[var(--concrete)] px-3 py-2 text-left transition-colors duration-200 hover:bg-[var(--signal)] active:cursor-grabbing"
    >
      <span className="display block text-[clamp(1rem,1.7vw,1.5rem)] leading-none">
        {contender.name}
      </span>
      <span className="data mt-1 block text-[10px] text-[var(--grey)] group-hover:text-[var(--ink)]">
        {contender.era} · {contender.figures.goals} goals
      </span>
    </button>
  );
});

/** Dossier for whichever name was last touched — keeps the facts one glance away. */
const Dossier = memo(function Dossier({
  contender,
  active,
}: {
  contender: Contender;
  active: boolean;
}) {
  const { data, loading } = usePlayer(contender.query, active);

  return (
    <div className="border border-[var(--ink)]">
      <div className="grid grid-cols-[auto_1fr] items-stretch">
        <div className="relative h-28 w-24 shrink-0 border-r border-[var(--ink)] bg-[var(--concrete-dim)]">
          {loading && <div className="skeleton absolute inset-0" />}
          {data?.cutout && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={data.cutout}
              src={data.cutout}
              alt={data.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          )}
          {!loading && !data?.cutout && (
            <span className="data absolute inset-0 grid place-items-center text-[var(--grey)]">
              {contender.name.slice(0, 3)}
            </span>
          )}
        </div>

        <div className="p-3">
          <span className="display block text-[clamp(1.25rem,2vw,1.75rem)] leading-none">
            {contender.name}
          </span>
          <span className="data mt-1 block text-[var(--grey)]">
            {contender.country} · {contender.era}
          </span>
          <p className="mt-2 text-xs leading-relaxed text-[var(--ink)]/75">{contender.claim}</p>
        </div>
      </div>

      <dl className="grid grid-cols-4 divide-x divide-[var(--line)] border-t border-[var(--ink)]">
        {(
          [
            ["Goals", contender.figures.goals],
            ["World Cups", contender.figures.worldCups],
            ["Euro Cups", contender.figures.europeanCups],
            ["Ballon d'Or", contender.figures.ballonDOr],
          ] as const
        ).map(([label, val]) => (
          <div key={label} className="stat p-3">
            <dt className="text-[9px]">{label}</dt>
            <dd className="text-base">{val}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
});

/* ------------------------------------------------------------------ */

/**
 * 78' — THE ARGUMENT
 * Drag a name into a tier, or click it to cycle. The site holds no opinion;
 * the ranking is the visitor's, and Full Time reads it back.
 */
export default function TierList() {
  const root = useRef<HTMLElement>(null);
  const tierRefs = useRef<(HTMLDivElement | null)[]>([]);
  const benchRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  /** Set while a drag is in progress so the click that follows it is ignored. */
  const dragged = useRef(false);

  const [placement, setPlacement] = useState<Placement>(EMPTY);
  const [focus, setFocus] = useState<Contender>(CONTENDERS[3]);
  const near = useNearViewport(root, "700px");

  useEffect(() => {
    session.setRanking(placement);
  }, [placement]);

  const move = useCallback((id: string, tier: TierId | null, target?: Element) => {
    flipState.current = Flip.getState("[data-flip-id]");
    if (target) gsap.set(target, { x: 0, y: 0, zIndex: "" });
    setPlacement((p) => ({ ...p, [id]: tier }));
  }, []);

  const cycle = useCallback(
    (id: string) => {
      // a click always follows a drag release; ignore that one
      if (dragged.current) {
        dragged.current = false;
        return;
      }
      setPlacement((p) => {
        flipState.current = Flip.getState("[data-flip-id]");
        const order: (TierId | null)[] = [...TIERS.map((t) => t.id), null];
        const idx = order.indexOf(p[id]);
        return { ...p, [id]: order[(idx + 1) % order.length] };
      });
    },
    []
  );

  const reset = useCallback(() => {
    flipState.current = Flip.getState("[data-flip-id]");
    setPlacement(EMPTY);
  }, []);

  // Reflow + rebind draggables on every placement change: moving a card between
  // tiers re-parents it in React, which necessarily creates a new DOM node.
  useGSAP(
    () => {
      if (flipState.current) {
        Flip.from(flipState.current, {
          duration: 0.5,
          ease: "settle",
          absolute: true,
          onEnter: (els) => {
            gsap.from(els, { opacity: 0, scale: 0.9, duration: 0.35 });
          },
        });
        flipState.current = null;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-flip-id]");
      const draggables = Draggable.create(cards, {
        type: "x,y",
        zIndexBoost: false,
        // let a plain click through to onClick instead of swallowing it
        minimumMovement: 6,
        onPress() {
          dragged.current = false;
          gsap.set(this.target, { zIndex: 50 });
          gsap.to(this.target, { scale: 1.04, duration: 0.2 });
          const c = byId.get((this.target as HTMLElement).dataset.flipId!);
          if (c) setFocus(c);
        },
        onDragStart() {
          dragged.current = true;
        },
        onRelease() {
          const el = this.target as HTMLElement;
          gsap.to(el, { scale: 1, duration: 0.2 });
          if (!dragged.current) {
            gsap.set(el, { zIndex: "" });
            return; // it was a click; onClick handles it
          }

          const id = el.dataset.flipId!;
          const hitTier = TIERS.findIndex(
            (_, i) => tierRefs.current[i] && Draggable.hitTest(el, tierRefs.current[i]!, "35%")
          );

          if (hitTier >= 0) {
            move(id, TIERS[hitTier].id, el);
          } else if (benchRef.current && Draggable.hitTest(el, benchRef.current, "35%")) {
            move(id, null, el);
          } else {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.4,
              onComplete: () => {
                gsap.set(el, { zIndex: "" });
              },
            });
          }
        },
      });

      return () => draggables.forEach((d) => d.kill());
    },
    { dependencies: [placement], scope: root }
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".tl-head > *", {
          yPercent: 105,
          duration: 1,
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        });
        gsap.from(".tl-tier", {
          opacity: 0,
          x: -30,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: { trigger: ".tl-board", start: "top 80%" },
        });
        gsap.from(".tl-dossier", {
          opacity: 0,
          y: 24,
          duration: 0.8,
          scrollTrigger: { trigger: ".tl-board", start: "top 80%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const ranked = Object.values(placement).filter(Boolean).length;

  return (
    <section ref={root} id="tierlist" className="relative bg-[var(--concrete)] py-[12svh]">
      <div className="shell">
        <div className="rule" />
        <div className="flex items-baseline justify-between pt-3">
          <span className="data">78′ — The Argument</span>
          <span className="data-lg text-sm text-[var(--grey)]">
            <span className="text-[var(--ink)]">{ranked}</span> / {CONTENDERS.length} ranked
          </span>
        </div>

        <header className="tl-head mt-[8svh] flex flex-wrap items-end justify-between gap-6">
          <h2 className="display type-xl overflow-hidden">
            <span className="block">Settle It</span>
          </h2>
          <p className="max-w-[44ch] overflow-hidden">
            <span className="prose-tight block">
              We are not going to tell you who the best is. Drag a name into a tier, or
              click it to cycle through them. The figures are there to argue with.
            </span>
          </p>
        </header>

        <div className="tl-board mt-[8svh] grid gap-x-10 gap-y-8 lg:grid-cols-[1fr_20rem] lg:items-start">
          <div>
            <div className="border-t border-[var(--ink)]">
              {TIERS.map((tier, i) => (
                <div
                  key={tier.id}
                  ref={(el) => {
                    tierRefs.current[i] = el;
                  }}
                  className="tl-tier grid grid-cols-[auto_1fr] items-stretch border-b border-[var(--ink)]"
                >
                  <div className="flex w-[clamp(6rem,14vw,11rem)] flex-col justify-center border-r border-[var(--ink)] bg-[var(--ink)] px-4 py-5 text-[var(--concrete)]">
                    <span className="display text-[clamp(1.1rem,2vw,1.9rem)] leading-none">
                      {tier.label}
                    </span>
                    <span className="data mt-1 text-[10px] text-[var(--grey-invert)]">
                      {tier.hint}
                    </span>
                  </div>
                  <div className="flex min-h-[7.5rem] flex-wrap content-start items-start gap-2 p-3">
                    {CONTENDERS.filter((c) => placement[c.id] === tier.id).map((c) => (
                      <Card
                        key={c.id}
                        contender={c}
                        tier={placement[c.id]}
                        onCycle={cycle}
                        onFocus={setFocus}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* bench */}
            <div ref={benchRef} className="mt-6">
              <div className="flex items-baseline justify-between">
                <span className="data text-[var(--grey)]">Unranked</span>
                {ranked > 0 && (
                  <button className="data link-underline cursor-pointer text-[var(--grey)]" onClick={reset}>
                    Reset
                  </button>
                )}
              </div>
              <div className="mt-3 flex min-h-[6rem] flex-wrap content-start gap-2 border border-dashed border-[var(--line)] p-3">
                {CONTENDERS.filter((c) => placement[c.id] === null).map((c) => (
                  <Card
                    key={c.id}
                    contender={c}
                    tier={null}
                    onCycle={cycle}
                    onFocus={setFocus}
                  />
                ))}
                {ranked === CONTENDERS.length && (
                  <span className="data self-center px-2 text-[var(--grey)]">
                    That is your list. Somebody, somewhere, is already furious about it.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* dossier */}
          <aside className="tl-dossier lg:sticky lg:top-8">
            <span className="data mb-3 block text-[var(--grey)]">Dossier</span>
            <Dossier contender={focus} active={near} />
            <p className="data mt-3 leading-relaxed text-[var(--grey)]">
              Goals are senior career totals, club and country. Hover any name to load
              its record.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
