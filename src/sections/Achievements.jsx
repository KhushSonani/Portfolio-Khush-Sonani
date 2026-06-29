import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientBlob from "@/components/ui/GradientBlob";
import TiltCard     from "@/components/ui/TiltCard";
import { ACHIEVEMENTS } from "@/lib/constants";
import teamImg from "@/assets/images/cpl_team.jpeg";
import profileImg from "@/assets/images/Me.jpeg";

const TIMELINE = [
  { year: "Present", event: "Preparing for Software Engineering Placements", color: "#10b981" },
  { year: "🏆 2026", event: "Won CodeAdda Premier League (CPL) as Team Leader of Null Pointers", color: "#f59e0b" },
  { year: "2026", event: "Full Stack Developer Intern at Empiric Infotech LLP", color: "#8b5cf6" },
  { year: "2025", event: "Focused on Competitive Programming", color: "#06b6d4" },
  { year: "2023", event: "Started B.Tech at Nirma University", color: "#a78bfa" },
];

// ─── Trophy card ──────────────────────────────────────────────────────────────
function TrophyCard({ a, i }) {
  return (
    <TiltCard maxTilt={9} perspective={700} glare>
      <motion.div
        className="relative p-5 rounded-2xl overflow-hidden group border border-white/8 text-center flex flex-col items-center h-full"
        style={{ background: "rgba(255,255,255,0.025)" }}
        initial={{ opacity: 0, y: 28, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={viewportConfig}
        transition={{ delay: i * 0.08, duration: 0.55, type: "spring", stiffness: 260 }}
        whileHover={{ borderColor: `${a.color}50` }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% -10%, ${a.color}18, transparent 65%)` }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${a.color}80, transparent)` }} />

        {/* Floating icon */}
        <motion.div
          className="text-4xl mb-3 relative z-10"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
        >
          {a.icon}
        </motion.div>

        <h3 className="relative z-10 text-white font-semibold text-sm mb-1 leading-snug">{a.title}</h3>
        <p className="relative z-10 text-gray-500 text-xs">{a.subtitle}</p>

        <motion.div
          className="relative z-10 mt-3 w-2 h-2 rounded-full"
          style={{ background: a.color }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
        />
      </motion.div>
    </TiltCard>
  );
}

// ─── Timeline row ─────────────────────────────────────────────────────────────
function TimelineRow({ item, i, total }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-5"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Dot + connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-3 h-3 rounded-full mt-1"
          style={{ background: item.color, boxShadow: `0 0 10px ${item.color}70` }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: i * 0.1 + 0.1, type: "spring", stiffness: 400 }}
        />
        {i < total - 1 && (
          <motion.div
            className="flex-1 w-px mt-2"
            style={{ background: `linear-gradient(180deg, ${item.color}50, transparent)` }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        className="pb-7"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.18 }}
      >
        <motion.span
          className="inline-block text-xs font-mono font-bold px-2.5 py-0.5 rounded-full mb-2"
          style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}32` }}
          whileHover={{ scale: 1.06 }}
        >
          {item.year}
        </motion.span>
        <p className="text-gray-300 text-sm leading-relaxed">{item.event}</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Featured Achievement Card ────────────────────────────────────────────────
function FeaturedAchievementCard() {
  return (
    <motion.div
      className="relative rounded-[2rem] overflow-hidden glass border border-[#f59e0b]/30 mb-20 max-w-5xl mx-auto flex flex-col lg:flex-row group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportConfig}
      transition={{ duration: 0.6 }}
      whileHover={{ borderColor: "rgba(245,158,11,0.5)" }}
    >
      {/* Glow */}
      <div className="absolute -inset-1 opacity-20 blur-2xl bg-gradient-to-r from-amber-500/30 to-purple-500/30 z-0 group-hover:opacity-40 transition-opacity duration-500" />
      
      {/* Image Side */}
      <div className="relative w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#08080c] z-10 hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] to-transparent z-10 block lg:hidden" />
        <motion.img 
          src={teamImg} 
          alt="Team Null Pointers - CPL 2026" 
          className="w-full h-full object-cover relative z-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7 }}
        />
      </div>

      {/* Content Side */}
      <div className="relative z-20 w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-[#08080c]/40 backdrop-blur-sm">
        <div className="inline-flex items-center gap-3 mb-3">
          <span className="text-3xl drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">🏆</span>
          <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 tracking-tight">
            Winner — CPL 2026
          </h3>
        </div>
        <h4 className="text-purple-400 font-semibold mb-6 text-sm uppercase tracking-widest">CodeAdda Premier League</h4>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
          CPL (CodeAdda Premier League) is the flagship competitive programming tournament organized by <strong className="text-white font-semibold">CodeAdda</strong>, the official programming club of Nirma University. 
          <br /><br />
          I led <strong className="text-white font-semibold">Team Null Pointers</strong> throughout the tournament as the team leader. Our team demonstrated strong problem-solving, teamwork, and contest strategy across multiple rounds, ultimately winning the championship in the grand finale. 
          <br /><br />
          This achievement reflects my leadership, competitive programming skills, ability to perform under pressure, and collaborative problem-solving in a team environment.
        </p>
        
        <div className="grid grid-cols-2 gap-4 text-xs md:text-sm bg-white/5 p-5 rounded-2xl border border-white/5 shadow-inner">
          <div>
            <span className="block text-gray-500 mb-1 font-medium">Team</span>
            <strong className="text-gray-200">Null Pointers</strong>
          </div>
          <div>
            <span className="block text-gray-500 mb-1 font-medium">Role</span>
            <strong className="text-purple-400">Team Leader</strong>
          </div>
          <div className="col-span-2">
            <span className="block text-gray-500 mb-1 font-medium">Organization</span>
            <strong className="text-gray-200">CodeAdda Programming Club, Nirma University</strong>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Moments Gallery ──────────────────────────────────────────────────────────
function MomentsGallery() {
  return (
    <div className="mt-24">
      <div className="flex items-center gap-4 mb-12 justify-center">
        <div className="flex-1 h-px max-w-[120px]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1))" }} />
        <span className="text-gray-500 text-xs uppercase tracking-widest font-semibold px-2">Featured Moments</span>
        <div className="flex-1 h-px max-w-[120px]" style={{ background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.1))" }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <motion.div 
          className="rounded-3xl overflow-hidden glass border border-white/10 aspect-square md:aspect-[4/3] relative group"
          whileHover={{ y: -6, borderColor: "rgba(139,92,246,0.4)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
        >
          <img src={profileImg} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" alt="Professional Headshot" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute bottom-6 left-6 text-sm md:text-base font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">Professional Headshot</span>
        </motion.div>

        <motion.div 
          className="rounded-3xl overflow-hidden glass border border-white/10 aspect-square md:aspect-[4/3] relative group"
          whileHover={{ y: -6, borderColor: "rgba(245,158,11,0.4)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ delay: 0.1 }}
        >
          <img src={teamImg} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" alt="CPL 2026 Champions" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute bottom-6 left-6 text-sm md:text-base font-semibold text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0">🏆 CPL 2026 Champions</span>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Achievements() {
  return (
    <section id="achievements" aria-label="Achievements" className="relative section-padding overflow-hidden">
      <GradientBlob className="-top-20 right-0" color1="#f59e0b" color2="#8b5cf6" size={450} opacity={0.07} />
      <GradientBlob className="bottom-0 left-0"  color1="#6366f1" color2="#ec4899" size={350} opacity={0.06} />

      <div className="container-custom">
        <SectionLabel
          eyebrow="🏆 Leadership & Achievements"
          title="Earned, Not Given"
          description="Recognition built through consistency, competition, and continuous improvement."
          center
        />

        {/* Featured Achievement */}
        <FeaturedAchievementCard />

        {/* Trophy grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {ACHIEVEMENTS.map((a, i) => (
            <TrophyCard key={i} a={a} i={i} />
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07))" }} />
            <span className="text-gray-600 text-xs uppercase tracking-widest font-medium px-3">Journey Timeline</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.07))" }} />
          </div>

          <div>
            {TIMELINE.map((item, i) => (
              <TimelineRow key={i} item={item} i={i} total={TIMELINE.length} />
            ))}
          </div>
        </div>

        {/* Moments Gallery */}
        <MomentsGallery />
      </div>
    </section>
  );
}
