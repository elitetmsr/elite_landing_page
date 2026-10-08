import type { Transition, Variants } from "framer-motion";

/**
 * Shared Framer Motion presets. Optimized for hardware acceleration (60fps/120fps smooth).
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user"> in Providers.
 */

const EASE_SMOOTH: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE_SMOOTH } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.65, ease: EASE_SMOOTH } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 14 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: EASE_SMOOTH } },
};

/** Image reveal: starts slightly zoomed and settles smoothly. */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.85, ease: EASE_SMOOTH } },
};

/** Slide in from Left (hardware accelerated). */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -44, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, ease: EASE_SMOOTH } },
};

/** Slide in from Right (hardware accelerated). */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 44, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, ease: EASE_SMOOTH } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

/** Orchestrated hero entrance: children reveal one after another. */
export const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export const heroTextReveal: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE_SMOOTH },
  },
};

/** Horizontal slide that mirrors in RTL (Start side). */
export const slideInFromStart = (isRtl: boolean): Variants => ({
  hidden: { opacity: 0, x: isRtl ? 44 : -44, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, ease: EASE_SMOOTH } },
});

/** Horizontal slide that mirrors in RTL (End side). */
export const slideInFromEnd = (isRtl: boolean): Variants => ({
  hidden: { opacity: 0, x: isRtl ? -44 : 44, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, ease: EASE_SMOOTH } },
});

/**
 * Gentle looping float for decorative cards. Loops must use easeInOut: an ease-out curve
 * makes velocity jump at each turnaround, which reads as a stutter.
 */
export const floatLoop: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

/** Moves opposite to floatLoop (down), so stacked cards drift apart rather than into each other. */
export const floatLoopOffset: Variants = {
  animate: {
    y: [0, 8, 0],
    transition: { duration: 7, delay: 0.8, repeat: Infinity, ease: "easeInOut" },
  },
};

export const viewportOnce = { once: true, margin: "-40px" } as const;

/** Returns a copy of a preset whose "visible" state starts after `delay` seconds. */
export const withDelay = (variants: Variants, delay: number): Variants => {
  const visible = variants.visible;
  if (!delay || !visible || typeof visible === "function") return variants;
  return { ...variants, visible: { ...visible, transition: { ...visible.transition, delay } } };
};


