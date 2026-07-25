"use client";

/**
 * Single registration point for GSAP + the Club plugins bundled in node_modules.
 * Import from here (never from "gsap" directly in components) so registration
 * is guaranteed to have run before any tween is created.
 */

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Flip } from "gsap/Flip";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    SplitText,
    DrawSVGPlugin,
    MotionPathPlugin,
    Draggable,
    InertiaPlugin,
    Flip,
    Physics2DPlugin,
    CustomEase
  );

  // The house ease. Used for every "settle" motion so the whole site
  // shares one physical character.
  CustomEase.create("settle", "0.16, 1, 0.3, 1");

  gsap.defaults({ ease: "settle", duration: 0.9 });
}

/**
 * Entrance choreography must be *created conditionally*, not sped up.
 *
 * A `.from()` tween writes its start values the moment it is created, so simply
 * shortening durations under reduced motion leaves elements frozen at
 * `yPercent: 105` / `opacity: 0` if the trigger never fires. Wrapping creation
 * in matchMedia means that under `reduce` the tween never exists and the element
 * simply renders where the CSS already put it.
 *
 * Scrub- and pin-driven sections are deliberately created OUTSIDE this guard:
 * there the scroll mapping is the navigation, and removing it would strand
 * content the visitor has no other way to reach.
 */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  SplitText,
  DrawSVGPlugin,
  MotionPathPlugin,
  Draggable,
  InertiaPlugin,
  Flip,
  Physics2DPlugin,
};
