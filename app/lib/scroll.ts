"use client";

import type Lenis from "@studio-freight/lenis";

/**
 * Programmatic scrolling has to go through Lenis, not window.scrollTo.
 *
 * Lenis owns the scroll position: a native scrollTo (or scrollIntoView) sets
 * the browser's scrollTop while Lenis still believes it is somewhere else, and
 * the two then fight for a second or so. During that fight every scroll-driven
 * measurement on the page — the match clock, the pinned sections — reads a
 * position the user is not actually at.
 */

let instance: Lenis | null = null;

export function registerLenis(l: Lenis | null) {
  instance = l;
}

export function scrollToY(y: number, opts: { immediate?: boolean } = {}) {
  if (instance) {
    instance.scrollTo(y, { duration: opts.immediate ? 0 : 1.1 });
  } else {
    window.scrollTo({ top: y, behavior: opts.immediate ? "auto" : "smooth" });
  }
}

export function scrollToEl(el: Element | string) {
  const target = typeof el === "string" ? document.querySelector(el) : el;
  if (!target) return;

  if (instance) {
    instance.scrollTo(target as HTMLElement, { duration: 1.1 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToTop() {
  scrollToY(0);
}
