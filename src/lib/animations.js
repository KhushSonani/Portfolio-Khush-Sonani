// ─── Framer Motion Variants ───────────────────────────────────────────────────
// All animation variants centralised here for consistency.
// Rule: ease arrays use [x1,y1,x2,y2] cubic-bezier — same across the app.

const EASE_OUT     = [0.25, 0.46, 0.45, 0.94];
const EASE_IN_OUT  = [0.43, 0.13, 0.23, 0.96];
const EASE_SPRING  = { type: "spring", stiffness: 380, damping: 28 };

// ─── Basic fades ─────────────────────────────────────────────────────────────
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const fadeInUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const fadeInDown = {
  hidden:  { opacity: 0, y: -36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

export const fadeInLeft = {
  hidden:  { opacity: 0, x: -52 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.75, ease: EASE_OUT } },
};

export const fadeInRight = {
  hidden:  { opacity: 0, x: 52 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.75, ease: EASE_OUT } },
};

// ─── Scale ───────────────────────────────────────────────────────────────────
export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const scaleInSpring = {
  hidden:  { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { ...EASE_SPRING } },
};

// ─── Stagger containers ───────────────────────────────────────────────────────
export const staggerContainer = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.08 },
  },
};

export const staggerContainerFast = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.065, delayChildren: 0.04 },
  },
};

export const staggerContainerSlow = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.16, delayChildren: 0.15 },
  },
};

export const staggerItem = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export const staggerItemLeft = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.55, ease: EASE_OUT } },
};

// ─── Hero text ───────────────────────────────────────────────────────────────
export const heroTextReveal = {
  hidden: { opacity: 0, y: 64, rotateX: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE_OUT },
  },
};

// Character-level split reveal for big headings
export const charReveal = {
  hidden:  { opacity: 0, y: 80, rotateX: 30 },
  visible: (i) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.8, ease: EASE_OUT, delay: i * 0.04 },
  }),
};

// ─── Slide ───────────────────────────────────────────────────────────────────
export const slideInLeft = {
  hidden:  { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

export const slideInRight = {
  hidden:  { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

// ─── Card interactions ────────────────────────────────────────────────────────
export const cardHover = {
  rest:  { scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { scale: 1.02, y: -6, transition: { duration: 0.3, ease: "easeOut" } },
};

export const cardTilt = {
  rest:  { rotateX: 0, rotateY: 0 },
  hover: { rotateX: 3, rotateY: -3, transition: { duration: 0.4, ease: "easeOut" } },
};

// ─── Glow layer ───────────────────────────────────────────────────────────────
export const glowReveal = {
  rest:  { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.35 } },
};

// ─── Page transition ─────────────────────────────────────────────────────────
export const pageTransition = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  exit:    { opacity: 0, y: -18, transition: { duration: 0.3 } },
};

// ─── List items ───────────────────────────────────────────────────────────────
export const listItemReveal = {
  hidden:  { opacity: 0, x: -20, height: 0 },
  visible: { opacity: 1, x: 0, height: "auto", transition: { duration: 0.4, ease: EASE_OUT } },
  exit:    { opacity: 0, x: -20, height: 0,    transition: { duration: 0.25 } },
};

// ─── Viewport config ─────────────────────────────────────────────────────────
export const viewportConfig       = { once: true, margin: "-72px" };
export const viewportConfigEarly  = { once: true, margin: "-20px" };
export const viewportConfigLazy   = { once: true, margin: "-120px" };
