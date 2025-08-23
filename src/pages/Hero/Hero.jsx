import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "@/assets/css/tomorrow.css";
import Meteors from "@/components/ui/meteors";
import PortfolioPage from "@/pages/About/About";
import SparklesText from "@/components/ui/sparkles-text";
import { FlipWords } from "@/components/ui/flip-words";

// Grid Background
const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className="absolute inset-0">
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse">
            <rect
              width="40"
              height="40"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              className="opacity-40 animate-gridPulse"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default function Hero() {
  const words = [
    "Frontend Developer | React & Tailwind",
    "Competitive Programmer | DSA Enthusiast",
    "LeetCode • Codeforces • CodeChef",
    "Learning MERN Stack",
  ];

  const [code] = useState(`
// My Profile
const profile = {
    name: 'Khush Sonani',
    title: 'Frontend Developer | Competitive Programmer',
    skills: [
        'React', 'TailwindCSS', 'JavaScript', 'C++', 
        'HTML', 'CSS', 'DSA', 'Git', 'GitHub'
    ],
    hardWorker: true,
    quickLearner: true,
    problemSolver: true,
    achievements: {
        leetcode: 'Solved 540+ problems | Max Rating 1813',
        codeforces: 'Pupil | Solved 800+ problems',
        codechef: '3★ | Global Rank 148 (Beginner Contest)',
        contests: 'Global Rank 668 in LeetCode Weekly Contest',
        other: 'Solved 180+ problems (gfg & codestudio)',
    },
    hireable: function() {
        return this.hardWorker && this.problemSolver && this.skills.length >= 5;
    }
};
  `);

  useEffect(() => {
    Prism.highlightAll();

    // Animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes gridPulse {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.3; }
      }
      @keyframes dotPulse {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 0.5; transform: scale(1.2); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [code]);

  return (
    <>
      <main className="bg-[#020617] text-white min-h-screen">
        <section className="hero min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-0">
          <div className="absolute inset-0"></div>
          <GridBackground />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Meteors number={10} />
          </div>

          {/* Content */}
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10 py-8 md:py-10 lg:py-12 md:pt-28 xl:pt-28">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-gray-300 text-sm font-medium">
                  Welcome to my portfolio
                </span>
              </div>

              <div className="relative mb-8">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                  <SparklesText text="Hello," />{" "}
                  <span className="gradient-text">I'm Khush Sonani</span>
                </h1>
              </div>

              {/* Role */}
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-teal-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm">
                <span>
                  <FlipWords
                    className="text-xl text-blue-400 font-medium"
                    words={words}
                  />
                </span>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-300/90 leading-relaxed max-w-xl mb-10">
                Passionate about building scalable web apps 🚀 | Skilled in
                React, Tailwind, and DSA ⚡ | Love solving problems on LeetCode,
                Codeforces, and CodeChef.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href="https://github.com/KhushSonani"
                  target="_blank"
                  className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-teal-400 p-0.5 rounded-xl transition-all hover:scale-105">
                  <span className="block w-full px-8 py-4 rounded-[11px] bg-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-teal-400">
                    <span className="flex items-center justify-center gap-2 text-white font-medium">
                      <span>View Projects</span>
                      <i className="fas fa-arrow-right group-hover:translate-x-1 transition-all"></i>
                    </span>
                  </span>
                </a>

                <a
                  href="/23BCE331_Khush_Sonani.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 p-0.5 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 transition-all hover:scale-105">
                  <span className="block w-full px-8 py-4 rounded-[11px] bg-gray-900 border border-gray-700/50">
                    <span className="flex items-center justify-center gap-2 text-gray-300 font-medium group-hover:text-white">
                      <span>Get Resume</span>
                      <i className="fas fa-file-alt group-hover:rotate-12 transition-all"></i>
                    </span>
                  </span>
                </a>
              </div>
            </div>

            {/* Right Side - Code */}
            <div className="w-full lg:w-1/2">
              <div className="gradient-border">
                <div className="code-window bg-[#091121]">
                  <div className="window-header">
                    <div className="window-dot bg-red-500"></div>
                    <div className="window-dot bg-yellow-500"></div>
                    <div className="window-dot bg-green-500"></div>
                    <span className="ml-2 text-sm text-gray-400 flex items-center gap-2">
                      <i className="fas fa-code"></i> profile.js
                    </span>
                  </div>
                  <pre className="language-javascript">
                    <code className="language-javascript">{code}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
          <span className="text-gray-400 text-sm flex items-center gap-2">
            <i className="fas fa-mouse text-blue-400"></i> About me
          </span>
          <i className="fas fa-chevron-down text-blue-400 text-xl"></i>
        </div>

        <PortfolioPage />
      </main>
    </>
  );
}
