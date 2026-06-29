// ─── Portfolio Data — Khush Sonani ───────────────────────────────────────────
// Single source of truth. All sections pull from here.

export const PERSONAL_INFO = {
  name:       "Khush Sonani",
  firstName:  "Khush",
  lastName:   "Sonani",
  title:      "Full Stack Developer",
  subtitle:   "Competitive Programmer",
  email:      "khushsonani2005@gmail.com",
  phone:      "",                               // add if desired
  location:   "Surat, Gujarat, India",
  university: "Nirma University",
  degree:     "B.Tech Computer Science Engineering",
  cgpa:       "8.52",
  batch:      "2023–2027",
  bio:        "Computer Science undergraduate at Nirma University (CGPA 8.52/10) with strong competitive programming achievements — LeetCode Knight (2082, Top 1.67%), CPL 2026 Winner, and 2600+ problems solved. Passionate about building scalable backend systems, real-time applications, and modern full-stack web experiences.",
  resumeUrl:  "/23BCE331_Khush_Sonani.pdf",
  links: {
    github:     "https://github.com/KhushSonani",
    linkedin:   "https://www.linkedin.com/in/khush-sonani-b9b056290/",
    leetcode:   "https://leetcode.com/u/khushsonani/",
    codeforces: "https://codeforces.com/profile/khushsonani",
    codechef:   "https://www.codechef.com/users/khush_sonani",
  },
};

// ─── Competitive stats ────────────────────────────────────────────────────────
export const COMPETITIVE_STATS = [
  {
    platform:   "LeetCode",
    rating:     "2082",
    rank:       "Knight",
    percentile: "Top 1.67%",
    color:      "#f59e0b",
    bg:         "rgba(245,158,11,0.1)",
    border:     "rgba(245,158,11,0.2)",
  },
  {
    platform:   "Codeforces",
    rating:     "1454",
    rank:       "Specialist",
    percentile: "",
    color:      "#06b6d4",
    bg:         "rgba(6,182,212,0.1)",
    border:     "rgba(6,182,212,0.2)",
  },
  {
    platform:   "CodeChef",
    rating:     "1708",
    rank:       "3★",
    percentile: "",
    color:      "#f97316",
    bg:         "rgba(249,115,22,0.1)",
    border:     "rgba(249,115,22,0.2)",
  },
  {
    platform:   "Problems Solved",
    rating:     "2600+",
    rank:       "All Platforms",
    percentile: "",
    color:      "#8b5cf6",
    bg:         "rgba(139,92,246,0.1)",
    border:     "rgba(139,92,246,0.2)",
  },
];

// ─── Contest highlights ───────────────────────────────────────────────────────
export const CONTEST_HIGHLIGHTS = [
  { rank: "148",  contest: "CodeChef Beginner Contest",      global: true },
  { rank: "668",  contest: "LeetCode Weekly Contest 462",    global: true },
  { rank: "806",  contest: "LeetCode Weekly Contest 474",    global: true },
  { rank: "820",  contest: "LeetCode Weekly Contest 455",    global: true },
  { rank: "828",  contest: "Codeforces Round 1050 (Div. 2)", global: true },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id:       "ridesync",
    title:    "RideSync",
    subtitle: "Real-time Ride-Hailing Platform",
    description:
      "Full-stack real-time ride-hailing platform built from scratch with live driver tracking, intelligent driver-matching, seamless booking flow, and a cross-platform React Native mobile app — production-grade architecture end to end.",
    highlights: [
      "Real-time bi-directional location sync via Socket.IO",
      "JWT authentication with secure route protection middleware",
      "Driver-matching algorithm using MongoDB geospatial queries",
      "RESTful Express.js API with proper error handling and validation",
      "React Native mobile client for both rider and driver flows",
      "Modular MVC codebase — clean separation of concerns",
    ],
    tech:     ["React Native", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT"],
    github:   "https://github.com/KhushSonani",
    live:     null,
    image:    null,
    featured: true,
    color:    "#8b5cf6",
  },
  {
    id:       "portfolio",
    title:    "Portfolio Website",
    subtitle: "Personal Developer Portfolio",
    description:
      "Premium developer portfolio built with React, GSAP, Framer Motion, and Lenis. Features a custom cursor, tilt cards, typewriter hero, GSAP scroll-triggered reveals, smooth scrolling, and a perfect dark-theme visual identity.",
    highlights: [
      "GSAP ScrollTrigger + Lenis smooth scroll integration",
      "Framer Motion stagger, tilt-card, and magnetic-button effects",
      "Custom cursor (dot + spring-lagged ring) with GSAP",
      "Fully responsive — mobile-first, all breakpoints",
      "Lighthouse-optimised: lazy loading, code splitting, WebP",
    ],
    tech:     ["React", "Vite", "Tailwind CSS", "Framer Motion", "GSAP", "Lenis"],
    github:   "https://github.com/KhushSonani",
    live:     "https://khushsonani.dev",
    image:    "/portfolio.png",
    featured: true,
    color:    "#6366f1",
  },
  {
    id:       "stms",
    title:    "Student Result Management System",
    subtitle: "Java Desktop Application",
    description:
      "A Java console application for managing student academic records with full CRUD operations, file-based data persistence, and clean object-oriented design. Built as a deep-dive into Java OOP and file I/O.",
    highlights: [
      "Complete CRUD — add, update, delete, search student records",
      "File I/O persistence using Java serialisation",
      "Object-oriented architecture with proper encapsulation",
      "Input validation and error handling throughout",
    ],
    tech:     ["Java", "OOP", "File I/O", "CRUD", "Serialisation"],
    github:   "https://github.com/KhushSonani",
    live:     null,
    image:    "/stms.png",
    featured: false,
    color:    "#ec4899",
  },
];

// ─── Work experience ──────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    id:          "empiric",
    company:     "Empiric Infotech LLP",
    role:        "Full Stack Developer Intern",
    period:      "May 2026 – June 2026",
    type:        "Internship",
    description:
      "Contributed to production-level full-stack web applications at Empiric Infotech LLP. Worked across the React frontend and Node.js/Express backend, shipping features, fixing bugs, and collaborating on a real codebase with senior engineers.",
    bullets: [
      "Built and integrated REST API endpoints with Express.js, connected to a MongoDB backend.",
      "Developed responsive React UI components consumed by live production users.",
      "Implemented JWT-based authentication flow including refresh-token logic and protected routes.",
      "Participated in code reviews, Git branching workflows, and daily standups.",
      "Optimised API response times by adding proper indexing and query projection on MongoDB collections.",
    ],
    tech:  ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Git"],
    color: "#8b5cf6",
  },
];

// ─── Education ────────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    degree:      "B.Tech Computer Science Engineering",
    institution: "Nirma University",
    period:      "2023 – 2027",
    cgpa:        "8.52 / 10",
    location:    "Ahmedabad, Gujarat",
    description:
      "Pursuing B.Tech in Computer Science with focus on Data Structures & Algorithms, System Design, Operating Systems, DBMS, and Full-Stack Development.",
    color: "#8b5cf6",
  },
];

// ─── Achievements ─────────────────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  {
    icon:     "🏆",
    title:    "Winner — CPL 2026",
    subtitle: "Competitive Programming League, Nirma University",
    color:    "#f59e0b",
  },
  {
    icon:     "🏅",
    title:    "LeetCode Knight",
    subtitle: "Rating 2082 · Top 1.67% globally",
    color:    "#f59e0b",
  },
  {
    icon:     "🏅",
    title:    "Codeforces Specialist",
    subtitle: "Rating 1454",
    color:    "#06b6d4",
  },
  {
    icon:     "🏅",
    title:    "CodeChef 3★",
    subtitle: "Rating 1708",
    color:    "#f97316",
  },
  {
    icon:     "⭐",
    title:    "2600+ Problems Solved",
    subtitle: "LeetCode · Codeforces · CodeChef",
    color:    "#8b5cf6",
  },
];

// ─── Coding profiles ──────────────────────────────────────────────────────────
export const CODING_PROFILES = [
  {
    platform:    "GitHub",
    username:    "@KhushSonani",
    description: "Full-stack projects, competitive programming solutions, and open-source contributions.",
    url:         "https://github.com/KhushSonani",
    color:       "#ffffff",
    bg:          "rgba(255,255,255,0.05)",
  },
  {
    platform:    "LinkedIn",
    username:    "khush-sonani",
    description: "Professional network · SDE intern experience · Open to opportunities.",
    url:         "https://www.linkedin.com/in/khush-sonani-b9b056290/",
    color:       "#0a66c2",
    bg:          "rgba(10,102,194,0.08)",
  },
  {
    platform:    "LeetCode",
    username:    "khushsonani",
    description: "Knight · Rating 2082 · Top 1.67% · 1500+ problems solved.",
    url:         "https://leetcode.com/u/khushsonani/",
    color:       "#f59e0b",
    bg:          "rgba(245,158,11,0.08)",
  },
  {
    platform:    "Codeforces",
    username:    "khushsonani",
    description: "Specialist · Rating 1454 · 800+ problems · active in Div. 2 & 3.",
    url:         "https://codeforces.com/profile/khushsonani",
    color:       "#06b6d4",
    bg:          "rgba(6,182,212,0.08)",
  },
  {
    platform:    "CodeChef",
    username:    "khush_sonani",
    description: "3★ Coder · Rating 1708 · Global Rank 148 in Beginner Contest.",
    url:         "https://www.codechef.com/users/khush_sonani",
    color:       "#f97316",
    bg:          "rgba(249,115,22,0.08)",
  },
];

// ─── Hero floating badges ─────────────────────────────────────────────────────
export const HERO_BADGES = [
  { icon: "🏆", label: "CPL 2026 Winner"       },
  { icon: "🥇", label: "LeetCode Knight"        },
  { icon: "💻", label: "MERN Stack"             },
  { icon: "⚡", label: "React Native"           },
  { icon: "⭐", label: "2600+ Problems"         },
  { icon: "📈", label: "CF Specialist"          },
];

// ─── Navigation links ─────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "About",       href: "#about"       },
  { label: "Skills",      href: "#skills"      },
  { label: "Experience",  href: "#experience"  },
  { label: "Projects",    href: "#projects"    },
  { label: "Competitive", href: "#competitive" },
  { label: "Profiles",    href: "#profiles"    },
  { label: "Contact",     href: "#contact"     },
];
