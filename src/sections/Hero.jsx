import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { HiDownload } from "react-icons/hi";
import { FaArrowDown } from "react-icons/fa";
import AnimatedGrid   from "@/components/ui/AnimatedGrid";
import MouseSpotlight from "@/components/ui/MouseSpotlight";
import GradientBlob   from "@/components/ui/GradientBlob";
import FloatingParticles from "@/components/ui/FloatingParticles";
import MagneticButton from "@/components/ui/MagneticButton";
import TiltCard       from "@/components/ui/TiltCard";
import { PERSONAL_INFO, HERO_BADGES } from "@/lib/constants";
import { staggerContainer, heroTextReveal, staggerItem } from "@/lib/animations";
import { gsap, useGSAPReveal } from "@/hooks/useGSAP";
import profileImg from "@/assets/images/Me.jpeg";

// ─── Typewriter ───────────────────────────────────────────────────────────────
function useTypewriter(words, speed = 68, pause = 2100) {
  const [text,    setText]    = useState("");
  const [wIdx,    setWIdx]    = useState(0);
  const [cIdx,    setCIdx]    = useState(0);
  const [del,     setDel]     = useState(false);

  useEffect(() => {
    const word = words[wIdx % words.length];
    let t;
    if (!del && cIdx < word.length)     t = setTimeout(() => setCIdx(c => c + 1), speed);
    else if (!del && cIdx === word.length) t = setTimeout(() => setDel(true), pause);
    else if (del && cIdx > 0)           t = setTimeout(() => setCIdx(c => c - 1), speed / 2.2);
    else { setDel(false); setWIdx(w => (w + 1) % words.length); }
    setText(word.slice(0, cIdx));
    return () => clearTimeout(t);
  }, [cIdx, del, wIdx, words, speed, pause]);

  return text;
}

const ROLES = [
  "Full Stack Developer",
  "Competitive Programmer",
  "MERN Stack Engineer",
  "Backend Systems Builder",
  "Problem Solver",
];

// ─── Profile Image ────────────────────────────────────────────────────────────
function HeroProfileImage() {
  return (
    <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
      {/* Outer glow rings */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-2xl opacity-30 -z-10"
        style={{ background: "linear-gradient(135deg, #8b5cf6, #ec4899)" }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Floating Image Container */}
      <TiltCard maxTilt={8} perspective={1000} className="w-[75%] h-[75%] rounded-full z-10">
        <motion.div 
          className="w-full h-full rounded-full p-[3px] overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.8), rgba(236,72,153,0.8))" }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139,92,246,0.5)" }}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-black/40 backdrop-blur-md">
            <img 
              src={profileImg} 
              alt="Khush Sonani" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </motion.div>
      </TiltCard>

      {/* Floating Stat Badges */}
      <motion.div
        className="absolute top-[12%] -left-[5%] glass border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-3 z-20 shadow-xl shadow-purple-900/20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">⭐</span>
        <div className="flex flex-col">
          <span className="text-white font-bold text-[13px]">2600+</span>
          <span className="text-gray-400 text-[11px]">Problems Solved</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[18%] -left-[2%] glass border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-3 z-20 shadow-xl shadow-blue-900/20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">🏆</span>
        <div className="flex flex-col">
          <span className="text-white font-bold text-[13px]">2082 Rating</span>
          <span className="text-yellow-400 text-[11px]">LeetCode Knight</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[25%] -right-[5%] glass border border-white/10 px-4 py-2.5 rounded-2xl flex items-center gap-3 z-20 shadow-xl shadow-pink-900/20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">🥇</span>
        <div className="flex flex-col">
          <span className="text-white font-bold text-[13px]">Winner</span>
          <span className="text-pink-400 font-medium text-[11px]">CPL 2026 Champion</span>
        </div>
      </motion.div>

    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const roleText  = useTypewriter(ROLES);
  const badgesRef = useRef(null);
  useGSAPReveal(badgesRef, { y: 16, stagger: 0.07, start: "top 95%" });

  return (
    <section
      id="hero"
      aria-label="Hero — introduction"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Layers ── */}
      <AnimatedGrid opacity={0.5} />
      <MouseSpotlight color="rgba(139,92,246,0.09)" size={800} stiffness={100} damping={20} />
      <GradientBlob className="-top-52 -left-52"   color1="#8b5cf6" color2="#6366f1" size={820} opacity={0.13} blur={150} />
      <GradientBlob className="-bottom-40 -right-32" color1="#6366f1" color2="#ec4899" size={620} opacity={0.09} blur={120} />
      <FloatingParticles count={24} color="#8b5cf6" />

      {/* ── Content ── */}
      <div className="container-custom relative z-10 w-full pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* LEFT */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            {/* Status badge */}
            <motion.div variants={staggerItem} className="mb-7">
              <motion.div
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-purple-500/25 text-sm text-gray-300"
                whileHover={{ borderColor: "rgba(139,92,246,0.5)", scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inset-0 rounded-full bg-green-400 opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-green-400" />
                </span>
                Available for SDE internships &amp; full-time
              </motion.div>
            </motion.div>

            {/* Name — perspective reveal */}
            <motion.h1
              variants={heroTextReveal}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-black tracking-tight leading-[0.9] mb-5"
              style={{ perspective: 600, transformStyle: "preserve-3d" }}
            >
              <span className="block text-white">KHUSH</span>
              <span className="block gradient-text pb-2">SONANI</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={staggerItem}
              className="flex items-center gap-3 mb-6 h-7"
            >
              <motion.span
                className="block w-5 h-px rounded-full"
                style={{ background: "linear-gradient(90deg,#8b5cf6,transparent)" }}
                animate={{ scaleX: [0, 1] }}
                transition={{ delay: 1, duration: 0.4 }}
              />
              <span className="text-gray-300 text-base sm:text-lg font-medium font-mono">
                {roleText}
                <motion.span
                  className="inline-block w-[2px] h-[1.1em] bg-purple-400 ml-0.5 align-middle rounded-full"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={staggerItem}
              className="text-gray-400 text-base leading-relaxed max-w-lg mb-8"
            >
              CS undergrad at{" "}
              <span className="text-purple-400 font-medium">Nirma University</span> · LeetCode{" "}
              <span className="text-yellow-400 font-medium">Knight (2082, Top 1.67%)</span>{" "}
              · 2600+ problems solved · Building scalable backends &amp; real-time systems.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-3 mb-10">
              <MagneticButton strength={26}>
                <motion.button
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white group"
                  style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)", boxShadow: "0 0 30px rgba(139,92,246,0.45)" }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 42px rgba(139,92,246,0.65)" }}
                  whileTap={{ scale: 0.96 }}
                >
                  View Projects
                  <motion.svg
                    className="w-3.5 h-3.5"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.button>
              </MagneticButton>

              <MagneticButton strength={22}>
                <motion.a
                  href={PERSONAL_INFO.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white glass border border-white/12 hover:border-purple-500/45 transition-colors"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <HiDownload className="w-4 h-4" />
                  Resume
                </motion.a>
              </MagneticButton>

              <MagneticButton strength={18}>
                <motion.button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-gray-400 glass border border-white/10 hover:border-white/20 hover:text-white transition-colors"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Contact Me
                </motion.button>
              </MagneticButton>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              ref={badgesRef}
              variants={staggerItem}
              className="flex flex-wrap gap-2"
            >
              {HERO_BADGES.map((badge, i) => (
                <motion.span
                  key={badge.label}
                  data-reveal
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-gray-400 glass border border-white/8"
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + i * 0.07, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.07, borderColor: "rgba(139,92,246,0.45)", color: "#d1d5db" }}
                  style={{ animation: `float ${5.8 + i * 0.32}s ease-in-out ${i * 0.25}s infinite` }}
                >
                  <span>{badge.icon}</span>
                  <span>{badge.label}</span>
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — profile image */}
          <div className="hidden lg:flex justify-center items-center">
            <HeroProfileImage />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 hover:text-purple-400 transition-colors z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        aria-label="Scroll to about"
      >
        <span className="text-[9px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}>
          <FaArrowDown size={11} />
        </motion.div>
      </motion.button>
    </section>
  );
}
