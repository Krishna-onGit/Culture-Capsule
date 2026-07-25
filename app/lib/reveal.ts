"use client";

import { gsap, ScrollTrigger, SplitText } from "./gsap";

/**
 * One entrance vocabulary for the whole page.
 *
 * Before this, every section hand-rolled its own reveal — yPercent 105 here, y
 * 24 there, opacity 0 with a different duration in a third — so the page moved
 * in eight slightly different accents. These are the four moves the site is
 * allowed to make, with the timings and the house ease baked in, and each one
 * returns a cleanup so it can live inside a `gsap.matchMedia()` block.
 *
 * Everything here animates transform and opacity only: both stay on the
 * compositor, so a page carrying two pinned sections and a horizontal track
 * still has frames to spare.
 *
 * NOTHING in this file should be called outside `mm.add(MOTION_OK, ...)`.
 * Several of these write a hidden start state, and an element that is hidden by
 * a reveal that is never allowed to run is an element nobody can read.
 */

/** Every entrance fires at the same depth in the viewport. One number, one feel. */
export const ENTER = "top 82%";

export type Cleanup = () => void;

const NOOP: Cleanup = () => {};

/** Fold several cleanups into the single function matchMedia expects back. */
export const disposeAll =
  (...fns: Cleanup[]): Cleanup =>
  () =>
    fns.forEach((fn) => fn());

/** Kill a tween and the ScrollTrigger it created, which is not implied. */
const killTween = (t: gsap.core.Tween) => {
  t.scrollTrigger?.kill();
  t.kill();
};

/* ------------------------------------------------------------------ */

/**
 * Masked, line-by-line text reveal — the site's primary entrance.
 *
 * `mask: "lines"` makes SplitText build the overflow-hidden wrapper per line,
 * so the type rises out of its own edge instead of fading in place.
 *
 * `autoSplit` is what makes this safe to use on a page with three webfonts:
 * SplitText re-splits when the fonts land and on resize, so lines never stay
 * broken at the widths they happened to have during first paint. The `played`
 * latch is the necessary companion — without it every resize past the reveal
 * point would replay the animation on text the visitor is already reading.
 */
export function revealLines(
  targets: gsap.DOMTarget,
  opts: {
    trigger?: Element | null;
    start?: string;
    stagger?: number;
    duration?: number;
  } = {}
): Cleanup {
  const { trigger, start = ENTER, stagger = 0.085, duration = 1 } = opts;

  const els = gsap.utils.toArray<HTMLElement>(targets);
  if (!els.length) return NOOP;

  const splits = els.map((el) => {
    let played = false;

    return SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      linesClass: "reveal-line",
      onSplit(self) {
        // After the reveal has run, a re-split is only re-flowing text.
        if (played) return;

        return gsap.from(self.lines, {
          yPercent: 108,
          duration,
          stagger,
          ease: "settle",
          scrollTrigger: {
            trigger: trigger ?? el,
            start,
            once: true,
            onEnter: () => {
              played = true;
            },
          },
        });
      },
    });
  });

  return () => splits.forEach((s) => s.revert());
}

/* ------------------------------------------------------------------ */

/**
 * Entrance for repeated items — stat cells, key/value rows, cards, tier rows.
 *
 * `ScrollTrigger.batch` collects everything that crosses the line within one
 * interval and staggers them as a group, so a grid of eight figures reads as
 * one gesture. The alternative — one ScrollTrigger per item — fires them in
 * whatever order layout happens to produce and costs eight triggers to do it.
 *
 * `once` lets each trigger kill itself on the way past. On a page this long
 * that is most of the scroll listeners gone by the time you reach Full Time.
 */
export function revealBatch(
  targets: gsap.DOMTarget,
  opts: {
    start?: string;
    y?: number;
    duration?: number;
    stagger?: number;
    batchMax?: number;
  } = {}
): Cleanup {
  const { start = ENTER, y = 24, duration = 0.85, stagger = 0.07, batchMax = 6 } = opts;

  const els = gsap.utils.toArray<HTMLElement>(targets);
  if (!els.length) return NOOP;

  gsap.set(els, { opacity: 0, y });

  const triggers = ScrollTrigger.batch(els, {
    start,
    once: true,
    interval: 0.08,
    batchMax,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "settle",
        overwrite: true,
      }),
  });

  return () => {
    triggers.forEach((t) => t.kill());
    // The hidden start state was ours; do not leave it behind on revert.
    gsap.set(els, { clearProps: "opacity,transform" });
  };
}

/* ------------------------------------------------------------------ */

/**
 * Depth, declared in markup: `data-parallax="0.14"` drifts an element by ±14%
 * of its own height across its parent's pass through the viewport.
 *
 * Reading the amount off the element keeps the tuning next to the thing being
 * tuned, and means a new decorative layer needs no new JavaScript.
 *
 * yPercent rather than y: percentage of the element's own height survives a
 * responsive type scale that changes that height at every breakpoint.
 */
export function parallax(root: Element | null, selector = "[data-parallax]"): Cleanup {
  const els = gsap.utils.toArray<HTMLElement>(selector, root);
  if (!els.length) return NOOP;

  const tweens = els.map((el) => {
    const depth = parseFloat(el.dataset.parallax ?? "") || 0.12;
    return gsap.fromTo(
      el,
      { yPercent: -depth * 100 },
      {
        yPercent: depth * 100,
        ease: "none", // scrubbed: any other ease breaks the 1:1 with scroll
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  return () => tweens.forEach(killTween);
}

/* ------------------------------------------------------------------ */

/**
 * The hairline above each section header draws itself in from the left, like a
 * groundsman marking the pitch. It is the smallest move on the page and the one
 * that does the most to make a section feel like it *arrived* rather than
 * simply being scrolled to.
 *
 * Fires slightly earlier than ENTER so the rule is already drawn by the time
 * the type beneath it starts to rise.
 */
export function drawRules(root: Element | null, selector = ".rule, .rule-invert"): Cleanup {
  // A hairline is always an empty element. The same class is also used as a
  // plain border-top on layout containers — Full Time hangs its match report
  // and its fixture index off one — and scaling those on the x axis would
  // squash the whole grid in from the left. If it has children, it is a border,
  // not a rule.
  const els = gsap.utils
    .toArray<HTMLElement>(selector, root)
    .filter((el) => !el.firstElementChild);
  if (!els.length) return NOOP;

  const tweens = els.map((el) =>
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.1,
      ease: "settle",
      scrollTrigger: { trigger: el, start: "top 94%", once: true },
    })
  );

  return () => tweens.forEach(killTween);
}

/* ------------------------------------------------------------------ */

/**
 * Couples a continuously looping tween to the scroll wheel: it accelerates with
 * scroll speed and runs backwards when the page does, then eases back to its
 * resting pace. The half-time results ticker stops being wallpaper and becomes
 * something the visitor is visibly driving.
 *
 * The loop's timeScale is tweened rather than assigned so the recovery is
 * smooth, and `overwrite` keeps successive scroll events from stacking up.
 */
export function scrollDrivenLoop(
  loop: gsap.core.Tween,
  opts: { max?: number; sensitivity?: number; recover?: number } = {}
): Cleanup {
  const { max = 14, sensitivity = 0.006, recover = 0.7 } = opts;
  const clamp = gsap.utils.clamp(-max, max);

  const st = ScrollTrigger.create({
    onUpdate: (self) => {
      const v = self.getVelocity() * sensitivity;
      if (Math.abs(v) < 0.15) return; // idle scroll: leave the resting pace alone

      loop.timeScale(clamp(v));
      // settle back to normal speed, in whichever direction we are travelling
      gsap.to(loop, { timeScale: self.direction, duration: recover, overwrite: true });
    },
  });

  return () => {
    st.kill();
    gsap.killTweensOf(loop);
    loop.timeScale(1);
  };
}
