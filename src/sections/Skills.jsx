import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { staggerContainer, staggerItem, fadeInUp, viewportConfig } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientBlob from "@/components/ui/GradientBlob";
import { useGSAPReveal } from "@/hooks/useGSAP";
import {
  SiCplusplus, SiPython, SiJavascript,
  SiReact, SiNodedotjs, SiExpress, SiMongodb,
  SiTailwindcss, SiGit, SiGithub, SiPostman, SiVercel,
  SiSocketdotio, SiOpenjdk,
} from "react-icons/si";
import { TbSql } from "react-icons/tb";
import { BiMobileAlt } from "react-icons/bi";

// ─── Data ─────────────────────────────────────────────────────────────────────
const GROUPS = [
  {
    id: "languages", title: "Languages", emoji: "⌨️", color: "#8b5cf6",
    desc: "Core languages powering every project.",
    skills: [
      { name: "C++",        icon: SiCplusplus,  color: "#00599c", level: 95 },
      { name: "Java",       icon: SiOpenjdk,    color: "#f89820", level: 80 },
      { name: "Python",     icon: SiPython,     color: "#3776ab", level: 75 },
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e", level: 90 },
    ],
  },
  {
    id: "frameworks", title: "Frameworks", emoji: "⚙️", color: "#6366f1",
    desc: "Battle-tested libraries and frameworks.",
    skills: [
      { name: "React",        icon: SiReact,     color: "#61dafb", level: 88 },
      { name: "React Native", icon: BiMobileAlt, color: "#61dafb", level: 78 },
      { name: "Node.js",      icon: SiNodedotjs, color: "#339933", level: 85 },
      { name: "Express.js",   icon: SiExpress,   color: "#ffffff", level: 83 },
    ],
  },
  {
    id: "databases", title: "Databases & Realtime", emoji: "🗄️", color: "#10b981",
    desc: "Data persistence and live communication.",
    skills: [
      { name: "MongoDB",   icon: SiMongodb,     color: "#47a248", level: 82 },
      { name: "SQL",       icon: TbSql,         color: "#336791", level: 70 },
      { name: "Socket.IO", icon: SiSocketdotio, color: "#aaaaaa", level: 80 },
    ],
  },
  {
    id: "tools", title: "Tools & DevOps", emoji: "🛠️", color: "#f59e0b",
    desc: "Developer tooling from code to deploy.",
    skills: [
      { name: "Git",         icon: SiGit,        color: "#f05032", level: 90 },
      { name: "GitHub",      icon: SiGithub,     color: "#ffffff", level: 90 },
      { name: "Tailwind CSS",icon: SiTailwindcss,color: "#38bdf8", level: 88 },
      { name: "Postman",     icon: SiPostman,    color: "#ff6c37", level: 82 },
      { name: "Vercel",      icon: SiVercel,     color: "#ffffff", level: 85 },
    ],
  },
];

// ─── Animated progress bar row ────────────────────────────────────────────────
function SkillRow({ skill, color, isVisible }) {
  return (
    <motion.div
      className="group flex items-center gap-3 py-2.5"
      initial={{ opacity: 0, x: -12 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${skill.color}15`, border: `1px solid ${skill.color}25` }}
        whileHover={{ scale: 1.15, rotate: -8 }}
        transition={{ duration: 0.18 }}
      >
        <skill.icon size={15} style={{ color: skill.color }} />
      </motion.div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200">
            {skill.name}
          </span>
          <span className="text-xs text-gray-600 font-mono">{skill.level}%</span>
        </div>
        {/* Progress track */}
        <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
            initial={{ width: 0 }}
            animate={{ width: isVisible ? `${skill.level}%` : 0 }}
            transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tab button ───────────────────────────────────────────────────────────────
function TabBtn({ group, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-left"
      style={{ color: active ? "#fff" : "#6b7280" }}
      whileHover={{ color: active ? "#fff" : "#d1d5db" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
    >
      {active && (
        <motion.div
          layoutId="skill-tab"
          className="absolute inset-0 rounded-xl"
          style={{ background: `${group.color}14`, border: `1px solid ${group.color}40` }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      )}
      <span className="relative z-10 text-base">{group.emoji}</span>
      <span className="relative z-10">{group.title}</span>
      {active && (
        <motion.div
          className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full"
          style={{ background: group.color }}
          layoutId="skill-dot"
        />
      )}
    </motion.button>
  );
}

// ─── Skill panel with panel-level inView tracking ─────────────────────────────
function SkillPanel({ group }) {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      key={group.id}
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="relative p-6 rounded-2xl border overflow-hidden"
      style={{ background: "rgba(255,255,255,0.025)", borderColor: `${group.color}25` }}
    >
      {/* Corner glow */}
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${group.color}18, transparent 70%)` }} />
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${group.color}70, transparent)` }} />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-5">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ background: `${group.color}18`, border: `1px solid ${group.color}30` }}
          whileHover={{ rotate: -10, scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {group.emoji}
        </motion.div>
        <div>
          <h3 className="text-white font-semibold">{group.title}</h3>
          <p className="text-gray-500 text-xs mt-0.5">{group.desc}</p>
        </div>
      </div>

      {/* Rows */}
      <div className="relative z-10 divide-y divide-white/[0.04]">
        {group.skills.map((skill, i) => (
          <SkillRow key={skill.name} skill={skill} color={group.color} isVisible={isVisible} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── All-tech pill cloud ───────────────────────────────────────────────────────
function TechCloud() {
  const ref = useRef(null);
  useGSAPReveal(ref, { y: 12, stagger: 0.04, start: "top 92%" });

  return (
    <div ref={ref} className="mt-12">
      <p className="text-gray-600 text-xs text-center mb-4 uppercase tracking-widest font-medium">
        All technologies
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {GROUPS.flatMap((g) => g.skills).map(({ name, icon: Icon, color }) => (
          <motion.div
            key={name}
            data-reveal
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-gray-500 border border-white/6"
            style={{ background: "rgba(255,255,255,0.025)" }}
            whileHover={{ color: "#e2e8f0", borderColor: `${color}45`, background: `${color}12`, scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.14 }}
          >
            <Icon size={11} style={{ color }} />
            {name}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Skills() {
  const [activeId, setActiveId] = useState("languages");
  const activeGroup = GROUPS.find((g) => g.id === activeId);

  return (
    <section id="skills" aria-label="Technical skills" className="relative section-padding overflow-hidden">
      <GradientBlob className="-bottom-24 left-0" color1="#8b5cf6" color2="#6366f1" size={420} opacity={0.08} />
      <GradientBlob className="top-20 right-0"   color1="#10b981" color2="#06b6d4" size={320} opacity={0.06} />

      <div className="container-custom">
        <SectionLabel
          eyebrow="Technical Skills"
          title="What I Work With"
          description="A curated toolkit built through competitive programming, real projects, and continuous learning."
        />

        <div className="grid lg:grid-cols-5 gap-8 xl:gap-12">

          {/* Left — tabs */}
          <motion.div
            className="lg:col-span-2 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {GROUPS.map((g) => (
              <motion.div key={g.id} variants={staggerItem} className="flex-shrink-0 lg:flex-shrink lg:w-full">
                <TabBtn group={g} active={activeId === g.id} onClick={() => setActiveId(g.id)} />
              </motion.div>
            ))}

            {/* Hint card — desktop */}
            <motion.div
              variants={fadeInUp}
              className="hidden lg:block mt-4 p-4 rounded-xl border border-white/8"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <p className="text-gray-600 text-xs leading-relaxed">
                Proficiency bars reflect hands-on project usage — not just theoretical familiarity.
              </p>
            </motion.div>
          </motion.div>

          {/* Right — panel */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <SkillPanel key={activeId} group={activeGroup} />
            </AnimatePresence>
          </div>
        </div>

        <TechCloud />
      </div>
    </section>
  );
}
