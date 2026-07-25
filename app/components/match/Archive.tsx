"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, MOTION_OK } from "../../lib/gsap";
import { MOMENTS } from "../../lib/data";
import { useNearViewport } from "../../lib/useFootball";
import { scrollToY, scrollToEl } from "../../lib/scroll";
import PlayDiagram from "./PlayDiagram";
import Crest from "../ui/Crest";

/**
 * 12' — THE ARCHIVE
 * Vertical scroll is converted into horizontal travel across eight moments.
 * Each panel's play diagram draws itself as that panel crosses the centre,
 * driven by `containerAnimation` off the horizontal tween.
 *
 * Horizontal journeys hide their own extent, so the progress rail and the
 * NN/08 counter are load-bearing, not decoration.
 */
export default function Archive() {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

  const [index, setIndex] = useState(0);
  // Crests are only requested once the section is within ~2 screens.
  const near = useNearViewport(root, "900px");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /** Reveals for one panel. Shared by both layouts; only the trigger differs. */
      const panelTimeline = (panel: HTMLElement, vars: gsap.TweenVars) =>
        gsap
          .timeline({ scrollTrigger: vars as ScrollTrigger.Vars })
          .from(panel.querySelectorAll(".m-line"), { yPercent: 105, duration: 1, stagger: 0.07 })
          .from(panel.querySelector(".play-path"), { drawSVG: "0%", duration: 1.4, ease: "power2.inOut" }, 0.15)
          .from(panel.querySelectorAll(".play-node"), { scale: 0, transformOrigin: "center", duration: 0.4, stagger: 0.09 }, 0.35)
          .from(panel.querySelector(".play-end"), { scale: 0, transformOrigin: "center", duration: 0.6, ease: "back.out(3)" }, 1.2)
          .from(panel.querySelectorAll(".m-crest"), { scale: 0.5, opacity: 0, duration: 0.6, stagger: 0.12, ease: "back.out(2)" }, 0.5)
          .from(panel.querySelectorAll(".m-kv"), { opacity: 0, x: -16, duration: 0.5, stagger: 0.07 }, 0.7);

      /**
       * DESKTOP — vertical scroll drives horizontal travel across the track.
       * MOBILE — the same panels simply stack and reveal on scroll. A pinned
       * horizontal track on a 390px screen showed two half-panels at once with
       * the copy clipped on both edges; a phone has no room for the conceit.
       */
      mm.add(
        {
          horizontal: "(min-width: 768px)",
          stacked: "(max-width: 767px)",
          motion: MOTION_OK,
        },
        (ctx) => {
          const { horizontal, motion } = ctx.conditions as Record<string, boolean>;

          if (horizontal) {
            const track = trackRef.current!;
            const setProgress = gsap.quickSetter(progressRef.current!, "scaleX");

            /**
             * Measured from the last panel's own box rather than the track's
             * scrollWidth, which does not reliably include a trailing flex item.
             *
             * DWELL is scroll that continues after the final panel has reached
             * centre. Without it the track finished at the exact moment 2022
             * arrived, so the last moment got no time on screen at all and the
             * following section appeared to barge in over the top of it.
             */
            const DWELL = () => window.innerWidth * 0.42;
            const distance = () => {
              const panels = track.querySelectorAll<HTMLElement>(".moment");
              const last = panels[panels.length - 1];
              if (!last) return 0;
              return Math.max(0, last.offsetLeft + last.offsetWidth + DWELL() - window.innerWidth);
            };

            const scrollTween = gsap.to(track, {
              x: () => -distance(),
              ease: "none", // required: keeps scroll and horizontal position 1:1
              scrollTrigger: {
                trigger: root.current,
                pin: pinRef.current,
                start: "top top",
                end: () => "+=" + distance(),
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                  setProgress(self.progress);
                  // Read the panel under the viewport centre rather than mapping
                  // progress linearly: the track now carries a trailing spacer,
                  // so progress and panel index are no longer proportional.
                  const cx = window.innerWidth / 2;
                  const panels = track.querySelectorAll<HTMLElement>(".moment");
                  for (let i = 0; i < panels.length; i++) {
                    const b = panels[i].getBoundingClientRect();
                    if (b.left <= cx && b.right >= cx) {
                      setIndex(i);
                      break;
                    }
                  }
                },
              },
            });
            scrollTweenRef.current = scrollTween;

            if (motion) {
              gsap.utils.toArray<HTMLElement>(".moment").forEach((panel) =>
                panelTimeline(panel, {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 78%",
                  end: "right 30%",
                  toggleActions: "play none none reverse",
                })
              );

              // parallax the oversized year so the panels have depth
              gsap.utils.toArray<HTMLElement>(".m-year").forEach((year) => {
                gsap.to(year, {
                  xPercent: -18,
                  ease: "none",
                  scrollTrigger: {
                    trigger: year.closest(".moment") as HTMLElement,
                    containerAnimation: scrollTween,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  },
                });
              });

              // the plate drifts the other way, slower — depth against the type
              gsap.utils.toArray<HTMLElement>(".m-plate").forEach((plate) => {
                gsap.fromTo(
                  plate,
                  { xPercent: 6 },
                  {
                    xPercent: -6,
                    ease: "none",
                    scrollTrigger: {
                      trigger: plate.closest(".moment") as HTMLElement,
                      containerAnimation: scrollTween,
                      start: "left right",
                      end: "right left",
                      scrub: true,
                    },
                  }
                );
              });
            }
          } else {
            scrollTweenRef.current = null;
            gsap.utils.toArray<HTMLElement>(".moment").forEach((panel, i) => {
              ScrollTrigger.create({
                trigger: panel,
                start: "top 60%",
                end: "bottom 40%",
                onToggle: (self) => self.isActive && setIndex(i),
              });
              if (motion) {
                panelTimeline(panel, {
                  trigger: panel,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                });
              }
            });
          }
        }
      );

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: root }
  );

  /** Jump the page scroll so a given panel lands centre-stage. */
  const goTo = (i: number) => {
    const st = scrollTweenRef.current?.scrollTrigger;
    if (!st) {
      // stacked (mobile) layout — no horizontal track to map onto
      scrollToEl(document.querySelectorAll(".moment")[i]);
      return;
    }
    // Solve for the scroll position that puts this panel's centre at the
    // viewport centre, from its real offset inside the track.
    const track = trackRef.current;
    const panels = track?.querySelectorAll<HTMLElement>(".moment");
    const panel = panels?.[i];
    const last = panels?.[panels.length - 1];
    if (!track || !panel || !last) return;

    // must match the DWELL used when the tween was built
    const distance =
      last.offsetLeft + last.offsetWidth + window.innerWidth * 0.42 - window.innerWidth;
    if (distance <= 0) return;

    const wanted = panel.offsetLeft + panel.offsetWidth / 2 - window.innerWidth / 2;
    const p = gsap.utils.clamp(0, 1, wanted / distance);
    scrollToY(st.start + (st.end - st.start) * p);
  };

  return (
    <section ref={root} id="archive" className="relative bg-[var(--concrete)]">
      <div ref={pinRef} className="md:h-svh md:overflow-hidden">
        {/* header + progress rail. Static on mobile, floating over the track on desktop. */}
        <div className="shell relative z-20 pt-8 md:absolute md:inset-x-0 md:top-0">
          <div className="rule" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-3">
            <span className="data">12′ — The Archive</span>
            <span className="data hidden text-[var(--grey)] lg:block">
              Eight matches that changed what came after
            </span>
            <span className="data-lg text-sm">
              {String(index + 1).padStart(2, "0")}
              <span className="text-[var(--grey)]">/{String(MOMENTS.length).padStart(2, "0")}</span>
            </span>
          </div>

          {/* segmented rail — also the navigation. Too cramped to be usable on a phone. */}
          <div className="mt-3 hidden gap-1 md:flex">
            {MOMENTS.map((m, i) => (
              <button
                key={m.id}
                onClick={() => goTo(i)}
                aria-label={`Go to ${m.year}, ${m.title}`}
                aria-current={i === index}
                className="group relative h-6 flex-1 cursor-pointer"
              >
                <span
                  className={`absolute inset-x-0 top-0 h-px transition-colors duration-200 ${
                    i <= index ? "bg-[var(--ink)]" : "bg-[var(--line)]"
                  } group-hover:bg-[var(--ink)]`}
                />
                <span
                  className={`data absolute left-0 top-1.5 text-[9px] transition-colors duration-200 ${
                    i === index ? "text-[var(--ink)]" : "text-[var(--grey)]"
                  }`}
                >
                  {m.year}
                </span>
              </button>
            ))}
          </div>
          <div className="relative mt-1 hidden h-px w-full bg-[var(--line)] md:block">
            <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-[var(--signal)]" />
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex flex-col md:h-full md:flex-row md:items-center md:will-change-transform"
        >
          {MOMENTS.map((m, i) => (
            <article
              key={m.id}
              data-panel={i}
              /* pb-28 on desktop keeps the last line of copy clear of the fixed
                 match clock in the bottom-left corner — on a short viewport the
                 closing paragraph was running underneath it. */
              className="moment relative flex w-full shrink-0 flex-col justify-center overflow-hidden border-b border-[var(--line)] px-[var(--gut)] py-16 md:h-full md:w-[76vw] md:border-b-0 md:border-r md:py-0 md:pt-28 md:pb-28 lg:w-[66vw]"
            >
              {/* Atmosphere plate. Duotoned down to the concrete palette and kept
                  well under the type — the source images are small, and at this
                  weight their softness reads as grain rather than blur. */}
              {m.image && (
                <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="m-plate h-full w-full scale-110 object-cover opacity-[0.34] grayscale contrast-[1.15]"
                  />
                  {/* tint the greyscale back toward the page colour */}
                  <span className="absolute inset-0 bg-[var(--concrete)] mix-blend-color" />
                  {/* Scrim fades in at top and bottom only, so the plate stays
                      readable through the middle band where the type sits. An
                      earlier left-to-right gradient buried it under the diagram
                      and fact table on the right. */}
                  <span className="absolute inset-0 bg-gradient-to-b from-[var(--concrete)] via-[var(--concrete)]/15 to-[var(--concrete)]" />
                </span>
              )}

              {/* oversized ghost year — quieter now the plate carries the depth */}
              <span
                aria-hidden
                className="m-year display pointer-events-none absolute right-[-2%] top-1/2 -translate-y-1/2 text-[24vw] leading-none text-[var(--ink)] opacity-[0.05]"
              >
                {m.year}
              </span>

              {/* generous inset so the spread never runs into the panel rule */}
              <div className="relative grid gap-x-14 gap-y-8 md:grid-cols-[1.05fr_0.95fr] md:items-start md:px-[5vw]">
                <div>
                  <div className="flex items-baseline gap-4 overflow-hidden">
                    <span className="m-line data-lg block text-[clamp(2.25rem,4.5vw,3.75rem)] leading-none">
                      {m.year}
                    </span>
                    <span className="m-line data block text-[var(--grey)]">{m.minute}</span>
                  </div>

                  <h3 className="display mt-3 overflow-hidden text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.82]">
                    <span className="m-line block">{m.title}</span>
                  </h3>

                  {/* scoreline with real crests */}
                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-[var(--line)] py-4">
                    <span className="m-crest">
                      <Crest query={m.teams[0].query} code={m.teams[0].code} size="md" active={near} showName />
                    </span>
                    <span className="data-lg text-[clamp(1.5rem,2.6vw,2.25rem)] leading-none">
                      {m.score}
                    </span>
                    <span className="m-crest">
                      <Crest query={m.teams[1].query} code={m.teams[1].code} size="md" active={near} showName />
                    </span>
                    <span className="data ml-auto text-right text-[var(--grey)]">{m.venue}</span>
                  </div>

                  <div className="mt-5 overflow-hidden">
                    <p className="m-line prose-tight block font-medium">{m.line}</p>
                  </div>

                  <div className="mt-4 max-w-[48ch] overflow-hidden">
                    <p className="m-line block text-sm leading-relaxed text-[var(--ink)]/75">
                      {m.detail}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <PlayDiagram moment={m} />
                  <span className="data mt-2 block text-[var(--grey)]">
                    Fig. {String(i + 1).padStart(2, "0")} — the move
                  </span>

                  {/* the facts */}
                  <dl className="mt-6">
                    <div className="m-kv kv">
                      <dt>Competition</dt>
                      <dd>{m.facts.competition}</dd>
                    </div>
                    <div className="m-kv kv">
                      <dt>Stage</dt>
                      <dd>{m.facts.round}</dd>
                    </div>
                    <div className="m-kv kv">
                      <dt>Attendance</dt>
                      <dd>{m.facts.attendance}</dd>
                    </div>
                  </dl>

                  <div className="m-kv mt-5 border-l-2 border-[var(--signal)] pl-4">
                    <span className="data block text-[var(--grey)]">What it changed</span>
                    <p className="mt-1.5 text-sm leading-relaxed">{m.facts.consequence}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}
