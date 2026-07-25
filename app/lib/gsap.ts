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
/**
 * Written as "not reduce" rather than "is no-preference", and the difference is
 * not cosmetic.
 *
 * `(prefers-reduced-motion: no-preference)` is FALSE in three situations: the
 * visitor asked for reduced motion, the browser does not support the feature at
 * all, and any engine that reports the feature as an unset/empty value. Only the
 * first of those is a request for less motion — in the other two the old query
 * silently deleted every entrance animation, every DrawSVG reveal and every
 * parallax on the page, because a `.from()` that is never created is a section
 * that never moves. Negating `reduce` fails open instead: motion is suppressed
 * only when it has actually been asked for.
 *
 * If you are testing and the page looks completely static, check the OS setting
 * first — Windows: Settings › Accessibility › Visual effects › Animation
 * effects; macOS: System Settings › Accessibility › Display › Reduce motion.
 * DevTools can force it too: Rendering panel › Emulate prefers-reduced-motion.
 */
export const MOTION_OK = "not all and (prefers-reduced-motion: reduce)";

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
