import { useEffect, useRef } from "react";
import { gsap } from "@/hooks/useGSAP";

/**
 * CursorGlow — custom cursor dot that follows the mouse with GSAP spring lag.
 * Renders a small glowing dot + larger trailing ring.
 * Only shows on non-touch devices.
 */
export default function CursorGlow() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: "none" });
      // Ring follows with spring lag
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.5, ease: "power3.out" });
    };

    const onDown = () => {
      gsap.to(dot,  { scale: 0.6, duration: 0.12 });
      gsap.to(ring, { scale: 1.6, opacity: 0.5, duration: 0.15 });
    };
    const onUp = () => {
      gsap.to(dot,  { scale: 1, duration: 0.2 });
      gsap.to(ring, { scale: 1, opacity: 1,   duration: 0.2 });
    };

    // Grow ring on interactive elements
    const onEnterLink = () => gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.25 });
    const onLeaveLink = () => gsap.to(ring, { scale: 1,   opacity: 1,   duration: 0.25 });

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);

    const links = document.querySelectorAll("a, button, [role='button']");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed z-[9998] pointer-events-none hidden md:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#8b5cf6",
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
          willChange: "transform",
          boxShadow: "0 0 6px 2px rgba(139,92,246,0.6)",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed z-[9997] pointer-events-none hidden md:block"
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid rgba(139,92,246,0.45)",
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
      />
    </>
  );
}
