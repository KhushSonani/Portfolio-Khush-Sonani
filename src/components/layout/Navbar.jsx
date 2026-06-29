import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import { gsap } from "@/hooks/useGSAP";

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [hidden,      setHidden]      = useState(false);
  const [active,      setActive]      = useState("hero");
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();
  const navRef = useRef(null);

  // Hide/show on scroll direction
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 50);
    if (y < 60) { setHidden(false); lastY.current = y; return; }
    const direction = y > lastY.current ? "down" : "up";
    if (direction === "down" && y - lastY.current > 8)  setHidden(true);
    if (direction === "up"   && lastY.current - y > 4)  setHidden(false);
    lastY.current = y;
  });

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = ["hero", ...NAV_LINKS.map((l) => l.href.slice(1))];
    const obs = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      o.observe(el);
      return o;
    });
    return () => obs.forEach((o) => o?.disconnect());
  }, []);

  // GSAP shimmer sweep on logo hover
  const logoRef = useRef(null);
  const onLogoHover = () => {
    gsap.fromTo(
      logoRef.current,
      { backgroundPosition: "-200% center" },
      { backgroundPosition: "200% center", duration: 0.8, ease: "power2.inOut" }
    );
  };

  const scrollTo = (href) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "py-3 glass border-b border-white/5" : "py-5 bg-transparent"
        }`}
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container-custom flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            onMouseEnter={onLogoHover}
            className="text-xl font-black tracking-tight"
          >
            <span
              ref={logoRef}
              className="gradient-text"
              style={{ backgroundSize: "200% auto" }}
            >
              KS
            </span>
            <span className="text-white/30 ml-1 text-sm font-normal tracking-normal">
              .dev
            </span>
          </button>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive ? "text-white" : "text-gray-500 hover:text-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: "rgba(139,92,246,0.14)",
                        border: "1px solid rgba(139,92,246,0.22)",
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Resume CTA */}
          <div className="hidden lg:block">
            <MagneticButton strength={22}>
              <motion.a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg,#8b5cf6,#6366f1)",
                  boxShadow: "0 0 22px rgba(139,92,246,0.35)",
                }}
                whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(139,92,246,0.55)" }}
                whileTap={{ scale: 0.96 }}
              >
                <span>Resume</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </motion.a>
            </MagneticButton>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <motion.span className="block h-px bg-current origin-center rounded-full"
                animate={mobileOpen ? { rotate: 45, y: 6 }   : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }} />
              <motion.span className="block h-px bg-current rounded-full"
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.18 }} />
              <motion.span className="block h-px bg-current origin-center rounded-full"
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }} />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(24px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Close area (tap outside) */}
            <button
              className="absolute inset-0 w-full h-full"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            />

            <nav className="relative z-10 flex flex-col justify-center h-full px-8 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-4 text-2xl font-bold text-gray-300 hover:text-white transition-colors"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <span className="text-purple-500/40 text-sm font-mono mr-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </motion.button>
              ))}

              <motion.a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 py-4 px-6 rounded-2xl text-center font-bold text-white text-lg"
                style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.055 + 0.05 }}
              >
                Download Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
