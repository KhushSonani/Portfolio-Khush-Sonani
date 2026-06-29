import { useRef } from "react";
import { useGSAPCounter } from "@/hooks/useGSAP";

/**
 * AnimatedCounter — GSAP-powered scroll-triggered numeric counter.
 * Supports "2600+" and "8.52" formats.
 */
export default function AnimatedCounter({ end, duration = 1.8 }) {
  const ref = useRef(null);
  useGSAPCounter(ref, end, duration);

  // Pre-fill with 0 so no CLS on first render
  const suffix = String(end).replace(/[0-9.]/g, "");
  return <span ref={ref}>0{suffix}</span>;
}
