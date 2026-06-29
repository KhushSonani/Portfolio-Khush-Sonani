import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "./useLenis";

gsap.registerPlugin(ScrollTrigger);

// Respect prefers-reduced-motion globally
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Helper — if reduced motion is preferred, skip GSAP animations entirely
const shouldAnimate = () => !prefersReducedMotion;

/**
 * Sync GSAP ScrollTrigger with Lenis so both use the same scroll position.
 * Call once at the app root level.
 */
export function useSyncGSAPLenis() {
  useEffect(() => {
    // Poll until Lenis is ready (it initialises slightly after mount)
    let rafId;
    const sync = () => {
      const lenis = getLenis();
      if (lenis) {
        // Tell ScrollTrigger to use Lenis's scroll position
        ScrollTrigger.scrollerProxy(document.documentElement, {
          scrollTop(value) {
            if (arguments.length) {
              lenis.scrollTo(value, { immediate: true });
            }
            return lenis.scroll;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          pinType: document.documentElement.style.transform ? "transform" : "fixed",
        });

        lenis.on("scroll", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", () => lenis.resize());
        ScrollTrigger.refresh();
        return;
      }
      rafId = requestAnimationFrame(sync);
    };
    rafId = requestAnimationFrame(sync);

    return () => {
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ScrollTrigger.clearScrollMemory();
    };
  }, []);
}

/**
 * useGSAPReveal — attaches a GSAP ScrollTrigger fade-up reveal to a container ref.
 * Children with [data-reveal] attribute get staggered in.
 */
export function useGSAPReveal(containerRef, options = {}) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Make elements visible immediately if user prefers reduced motion
    const targets = el.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    if (!shouldAnimate()) {
      targets.forEach((t) => { t.style.opacity = "1"; t.style.transform = "none"; });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: options.y ?? 36,
          scale: options.scale ?? 1,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: options.duration ?? 0.75,
          ease: options.ease ?? "power3.out",
          stagger: options.stagger ?? 0.1,
          scrollTrigger: {
            trigger: el,
            start: options.start ?? "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [containerRef]);
}

/**
 * useGSAPTextSplit — splits text chars/words for GSAP reveal.
 */
export function useGSAPTextReveal(ref, options = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!shouldAnimate()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: options.y ?? 50, skewY: options.skewY ?? 3 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: options.duration ?? 0.9,
          ease: "power4.out",
          delay: options.delay ?? 0,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref]);
}

/**
 * useGSAPParallax — vertical parallax on a target element based on scroll.
 */
export function useGSAPParallax(ref, speed = 0.15) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [ref, speed]);
}

/**
 * useGSAPCounter — animates a number counter on scroll entry.
 */
export function useGSAPCounter(ref, end, duration = 2) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numEnd  = parseFloat(String(end).replace(/[^0-9.]/g, ""));
    const hasDot  = String(end).includes(".");
    const suffix  = String(end).replace(/[0-9.]/g, "");

    // If reduced motion — just show the final value immediately
    if (!shouldAnimate()) {
      el.textContent = hasDot ? numEnd.toFixed(2) + suffix : numEnd + suffix;
      return;
    }

    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: numEnd,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate() {
          el.textContent = hasDot
            ? obj.val.toFixed(2) + suffix
            : Math.floor(obj.val) + suffix;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [ref, end, duration]);
}

export { gsap, ScrollTrigger };
