import { useRef } from "react";
import { motion } from "framer-motion";
import {
  fadeInLeft, fadeInUp,
  staggerContainer, staggerItem, viewportConfig,
} from "@/lib/animations";
import SectionLabel    from "@/components/ui/SectionLabel";
import GradientBlob    from "@/components/ui/GradientBlob";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TiltCard        from "@/components/ui/TiltCard";
import { useGSAPReveal } from "@/hooks/useGSAP";
import { EDUCATION }   from "@/lib/constants";
import profileImg      from "@/assets/images/Me.jpeg";

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Problems Solved", value: "2600+", sub: "LeetCode · CF · CodeChef", color: "#8b5cf6", icon: "⚡" },
  { label: "LeetCode Rating", value: "2082",  sub: "Knight · Top 1.67%",        color: "#f59e0b", icon: "🥇" },
  { label: "Codeforces",      value: "1454",  sub: "Specialist rank",            color: "#06b6d4", icon: "📊" },
  { label: "CPL 2026 Champion", value: "Winner", sub: "CodeAdda Premier League", color: "#ec4899", icon: "🏆" },
];

const TRAITS = [
  "Backend Engineering", "Distributed Systems", "Real-time Apps",
  "REST API Design", "Competitive Programming", "System Architecture",
];

const FOCUS = [
  { icon: "🧠", title: "Algorithm Design",    body: "Solved 2600+ problems across difficulty levels. Strong in DP, graphs, segment trees, and system-level reasoning." },
  { icon: "🔧", title: "Backend Engineering", body: "Built production REST APIs, real-time Socket.IO systems, JWT auth flows, and MongoDB data layers." },
  { icon: "🚀", title: "Modern Frontend",     body: "React, React Native, Tailwind CSS — delivering fast, accessible, and visually polished interfaces." },
];

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ stat }) {
  return (
    <motion.div
      variants={staggerItem}
      className="relative p-5 rounded-2xl overflow-hidden group cursor-default h-full"
      style={{ background: "rgba(255,255,255,0.025)", border: `1px solid ${stat.color}22` }}
      whileHover={{ scale: 1.03, borderColor: `${stat.color}55` }}
      transition={{ duration: 0.22 }}
    >
      {/* Radial glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 120%, ${stat.color}1a, transparent 65%)` }} />
      {/* Top accent */}
      <div className="absolute top-0 left-4 right-4 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}80, transparent)` }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <motion.span
            className="text-xl"
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >{stat.icon}</motion.span>
        </div>
        <div className="text-3xl font-black mb-0.5 tabular-nums" style={{ color: stat.color }}>
          {isNaN(parseInt(stat.value)) ? stat.value : <AnimatedCounter end={stat.value} />}
        </div>
        <div className="text-white text-xs font-semibold mb-1">{stat.label}</div>
        <div className="text-gray-600 text-xs">{stat.sub}</div>
      </div>
    </motion.div>
  );
}

// ─── Trait pill ───────────────────────────────────────────────────────────────
function TraitPill({ label, i }) {
  return (
    <motion.span
      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-gray-400 border border-white/8"
      style={{ background: "rgba(255,255,255,0.03)" }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportConfig}
      transition={{ delay: i * 0.055, type: "spring", stiffness: 280 }}
      whileHover={{ color: "#a78bfa", borderColor: "rgba(139,92,246,0.4)", background: "rgba(139,92,246,0.09)", scale: 1.05 }}
    >
      {label}
    </motion.span>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function About() {
  const statsRef = useRef(null);
  const focusRef = useRef(null);
  // GSAP staggered reveal for stat cards and focus panels
  useGSAPReveal(statsRef, { y: 28, stagger: 0.1, start: "top 82%" });
  useGSAPReveal(focusRef, { y: 22, stagger: 0.13, start: "top 85%" });

  return (
    <section id="about" aria-label="About me" className="relative section-padding overflow-hidden">
      <GradientBlob className="-top-10 right-0"  color1="#6366f1" color2="#8b5cf6" size={550} opacity={0.09} />
      <GradientBlob className="bottom-0 left-0"  color1="#8b5cf6" color2="#06b6d4" size={400} opacity={0.06} />

      <div className="container-custom">
        <SectionLabel
          eyebrow="About Me"
          title={<>The Story So Far</>}
          description="A developer who lives at the intersection of algorithms and architecture."
        />

        {/* ── Bio + Stats grid ── */}
        <div className="grid lg:grid-cols-12 gap-8 xl:gap-12 items-start mb-16">

          {/* Image */}
          <motion.div
            className="lg:col-span-3 lg:order-1 order-1 flex justify-center w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-[240px] max-w-full aspect-[4/5] rounded-3xl overflow-hidden glass border border-white/10 group">
              <motion.div
                className="absolute inset-0 z-0"
                style={{ background: "linear-gradient(180deg, transparent, rgba(139,92,246,0.15))" }}
              />
              <motion.img
                src={profileImg}
                alt="Khush Sonani"
                className="relative z-10 w-full h-full object-cover"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-20 pointer-events-none" />
            </div>
          </motion.div>

          {/* Left — bio */}
          <motion.div
            className="lg:col-span-5 lg:order-2 order-2 space-y-5"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a Computer Science undergraduate at{" "}
              <span className="text-purple-400 font-medium">Nirma University</span> (Class of 2027),
              deeply passionate about building systems that scale and problems that challenge.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My journey bridges two worlds — competitive programming, where I've earned the{" "}
              <span className="text-yellow-400 font-medium">LeetCode Knight</span> badge (rating 2082,
              Top&nbsp;1.67%) and <span className="text-cyan-400 font-medium">Codeforces Specialist</span> —
              and full-stack engineering: production REST APIs, Socket.IO realtime systems, JWT auth, MongoDB.
            </p>
            <p className="text-gray-400 leading-relaxed">
              I care about clean architecture, performance under load, and shipping things that actually work.
            </p>

            {/* Trait pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {TRAITS.map((t, i) => <TraitPill key={t} label={t} i={i} />)}
            </div>

            {/* Education card */}
            <motion.div
              className="relative mt-4 p-5 rounded-2xl overflow-hidden group border border-white/8"
              style={{ background: "rgba(255,255,255,0.025)" }}
              whileHover={{ borderColor: "rgba(139,92,246,0.38)", scale: 1.01 }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at 0 50%, rgba(139,92,246,0.08), transparent 65%)" }} />
              <div className="relative z-10 flex items-start gap-4">
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(139,92,246,0.14)", border: "1px solid rgba(139,92,246,0.25)" }}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >🎓</motion.div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm leading-snug">{EDUCATION[0].degree}</p>
                  <p className="text-purple-400 text-xs font-medium mt-0.5">{EDUCATION[0].institution}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                    <span className="text-gray-500 text-xs font-mono">{EDUCATION[0].period}</span>
                    <span className="text-green-400 text-xs font-semibold">CGPA {EDUCATION[0].cgpa}</span>
                    <span className="text-gray-500 text-xs">{EDUCATION[0].location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — tilt stats */}
          <motion.div
            ref={statsRef}
            className="lg:col-span-4 lg:order-3 order-3 grid grid-cols-2 gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {STATS.map((stat) => (
              <TiltCard key={stat.label} maxTilt={8} perspective={800} glare>
                <StatCard stat={stat} />
              </TiltCard>
            ))}
          </motion.div>
        </div>

        {/* ── Focus areas ── */}
        <div
          ref={focusRef}
          className="relative rounded-2xl overflow-hidden p-6 md:p-8 border border-white/8"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(139,92,246,0.07), transparent)" }} />

          <div className="relative z-10 grid sm:grid-cols-3 gap-6 text-center sm:text-left">
            {FOCUS.map(({ icon, title, body }) => (
              <motion.div
                key={title}
                data-reveal
                className="space-y-2"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="text-2xl inline-block"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  transition={{ duration: 0.2 }}
                >{icon}</motion.div>
                <h4 className="text-white font-semibold text-sm">{title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
