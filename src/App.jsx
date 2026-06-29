import "./assets/css/index.css";
import { lazy, Suspense } from "react";

import useLenis from "@/hooks/useLenis";
import { useSyncGSAPLenis } from "@/hooks/useGSAP";

import Navbar         from "@/components/layout/Navbar";
import Footer         from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageLoader     from "@/components/ui/PageLoader";
import CursorGlow     from "@/components/ui/CursorGlow";

// ── Code-split every section — only the Hero and the first visible viewport ──
// content need to load synchronously. Everything else is deferred.
const Hero           = lazy(() => import("@/sections/Hero"));
const About          = lazy(() => import("@/sections/About"));
const Skills         = lazy(() => import("@/sections/Skills"));
const Experience     = lazy(() => import("@/sections/Experience"));
const Projects       = lazy(() => import("@/sections/Projects"));
const Competitive    = lazy(() => import("@/sections/Competitive"));
const Achievements   = lazy(() => import("@/sections/Achievements"));
const CodingProfiles = lazy(() => import("@/sections/CodingProfiles"));
const Contact        = lazy(() => import("@/sections/Contact"));

// Minimal, accessible loading fallback
const SectionFallback = () => (
  <div
    role="status"
    aria-label="Loading section"
    className="min-h-[180px] flex items-center justify-center"
  >
    <div
      aria-hidden="true"
      className="w-5 h-5 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"
    />
    <span className="sr-only">Loading…</span>
  </div>
);

const S = (Component, label) => (
  <Suspense fallback={<SectionFallback />}>
    <Component aria-label={label} />
  </Suspense>
);

export default function App() {
  useLenis();
  useSyncGSAPLenis();

  return (
    // Role="document" is implicit for body, but wrapping div gets none.
    // We set a skip-nav landmark for keyboard users.
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">

      {/* Skip to main content — keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-purple-600 focus:text-white focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* Global chrome */}
      <PageLoader />
      <CursorGlow />
      <ScrollProgress />
      <Navbar />

      {/* Main landmark — required for accessibility */}
      <main id="main-content" tabIndex={-1}>
        {S(Hero,           "Hero — introduction")}
        {S(About,          "About me")}
        {S(Skills,         "Technical skills")}
        {S(Experience,     "Work experience")}
        {S(Projects,       "Projects")}
        {S(Competitive,    "Competitive programming")}
        {S(Achievements,   "Achievements")}
        {S(CodingProfiles, "Coding profiles")}
        {S(Contact,        "Contact")}
      </main>

      <Footer />
    </div>
  );
}
