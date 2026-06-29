import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useMotionValue } from "framer-motion";

let lenisInstance = null;

// Returns the global Lenis instance so GSAP ScrollTrigger can sync to it
export function getLenis() {
  return lenisInstance;
}

/**
 * useLenis — initialises Lenis smooth scrolling.
 * • Syncs with Framer Motion scroll motion values so useScroll() stays accurate.
 * • Exposes the scrollY progress as a motion value for other consumers.
 */
export default function useLenis() {
  const scrollY = useMotionValue(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      normalizeWheel: true,
      infinite: false,
    });

    lenisInstance = lenis;

    // Feed scroll position to our motion value
    lenis.on("scroll", ({ scroll }) => {
      scrollY.set(scroll);
    });

    let raf;
    const tick = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return { scrollY };
}
