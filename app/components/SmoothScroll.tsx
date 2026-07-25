"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { registerLenis } from "../lib/scroll";

/**
 * Lenis drives the real window scroll, so ScrollTrigger needs no scrollerProxy —
 * it only needs updating on every Lenis frame, and Lenis must be stepped from
 * exactly ONE raf source.
 *
 * (The previous version ran both a bare requestAnimationFrame loop and
 * gsap.ticker, stepping Lenis twice per frame, and its cleanup removed a
 * function that had never been added to the ticker.)
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    registerLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Two separate reasons the first measurement is wrong:
    //  - fonts land after first paint and shift layout;
    //  - the pinned sections each add thousands of pixels of pin spacing as
    //    their own effects run, and every trigger created before that point
    //    cached start/end values from a much shorter document.
    // A refresh once everything has mounted and settled fixes both.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const settle = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

    return () => {
      window.clearTimeout(settle);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
