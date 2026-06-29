import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { NAV_LINKS, PERSONAL_INFO } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import ksLogo from "@/assets/images/KS_LOGO.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  // Hide/show on scroll direction
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
    if (y < 60) { setHidden(false); lastY.current = y; return; }
    const direction = y > lastY.current ? "down" : "up";
    if (direction === "down" && y - lastY.current > 15) setHidden(true);
    if (direction === "up" && lastY.current - y > 10) setHidden(false);
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

  const scrollTo = (href) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.header
      className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
    >
      <div 
        className={`pointer-events-auto relative flex items-center justify-between w-full max-w-5xl rounded-full transition-all duration-500 ease-out ${
          scrolled 
            ? "py-2.5 px-3 bg-[#08080c]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
            : "py-4 px-4 bg-transparent border border-transparent shadow-none"
        }`}
      >
        {/* Glow behind navbar on scroll */}
        <div 
          className={`absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 -z-10 blur-xl transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} 
        />

        {/* Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-3 group px-2"
          aria-label="Home"
        >
          <div className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(139,92,246,0.15)] group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-shadow duration-300">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_280deg,#8b5cf6_360deg)] opacity-40 group-hover:opacity-100 animate-[spin_3s_linear_infinite]" />
            <div className="absolute inset-[1.5px] bg-[#050505] rounded-full flex items-center justify-center z-10 overflow-hidden">
              <img 
                src={ksLogo} 
                alt="KS Logo" 
                className="w-[85%] h-[85%] object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          <span className={`font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 hidden sm:block transition-all duration-300 ${scrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
            Khush Sonani
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-4 py-2 text-[13px] font-semibold rounded-full transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/5"
                    style={{ backdropFilter: "blur(8px)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action (Resume + Mobile Toggle) */}
        <div className="flex items-center gap-2">
          {/* Resume Button */}
          <div className="hidden lg:block">
            <MagneticButton strength={25}>
              <motion.a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-bold text-white overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.2))",
                  border: "1px solid rgba(139,92,246,0.3)",
                  boxShadow: "0 0 20px rgba(139,92,246,0.15)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,92,246,0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:drop-shadow-md">Resume</span>
                <svg className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </motion.a>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="lg:hidden relative p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <div className="w-4 h-4 flex flex-col justify-center items-center">
              <motion.span 
                className="block w-full h-[1.5px] bg-current absolute"
                animate={mobileOpen ? { rotate: 45 } : { y: -5, rotate: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span 
                className="block w-full h-[1.5px] bg-current absolute"
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
              <motion.span 
                className="block w-full h-[1.5px] bg-current absolute"
                animate={mobileOpen ? { rotate: -45 } : { y: 5, rotate: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </div>
          </button>
        </div>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 top-[4.5rem] bg-black/60 backdrop-blur-sm z-40 lg:hidden rounded-b-[2.5rem]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
              />
              
              {/* Menu Card */}
              <motion.div
                className="absolute top-[calc(100%+0.5rem)] left-0 right-0 p-2 z-50 lg:hidden overflow-hidden origin-top"
                initial={{ opacity: 0, scaleY: 0, y: -10 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                exit={{ opacity: 0, scaleY: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bg-[#12121a]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-4 flex flex-col gap-1">
                  {NAV_LINKS.map((link, i) => {
                    const id = link.href.slice(1);
                    const isActive = active === id;
                    return (
                      <motion.button
                        key={link.href}
                        onClick={() => scrollTo(link.href)}
                        className={`text-left px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all flex items-center gap-4 ${
                          isActive ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      >
                        {isActive && (
                          <motion.div 
                            layoutId="mobile-indicator"
                            className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                          />
                        )}
                        <span className={isActive ? "" : "pl-5"}>{link.label}</span>
                      </motion.button>
                    );
                  })}
                  
                  <motion.a
                    href={PERSONAL_INFO.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: NAV_LINKS.length * 0.05 + 0.1 }}
                  >
                    Download Resume
                  </motion.a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
