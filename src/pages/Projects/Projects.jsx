import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

// I've added a new property 'imageFit' to control how each image is displayed.
const projects = [
  {
    title: "🚀 Student Result Management System",
    description:
      "A full-stack web application to manage student results. Built with React, Node.js, Express, and MongoDB with authentication, role-based access, and a clean UI.",
    src: "stms.png",
    link: "stms.png",
    color: "#60a5fa",
    githubLink:
      "https://github.com/KhushSonani/Student-Result-Management-System",
    liveLink: "#",
    imageFit: "cover", // This image looks good cropped
  },
  {
    title: "🌐 Personal Portfolio Website",
    description:
      "A responsive portfolio built using React and Tailwind CSS to showcase my skills, projects, and achievements in competitive programming.",
    src: "portfolio.png", // Corrected to your uploaded file
    link: "portfolio.png", // Corrected to your uploaded file
    color: "#34d399",
    githubLink: "https://github.com/KhushSonani/Portfolio-Website",
    liveLink: "https://khushsonani.vercel.app",
    imageFit: "contain", // Set to 'contain' to show the full image
  },
  {
    title: "💡 Hackathons & Challenges",
    description:
      "Participated in Adobe India Hackathon 2025 (didn’t reach round 2). Continuously learning through coding challenges, contests, and hackathons.",
    src: "adk.webp", // Corrected to your uploaded file
    link: "adk.webp", // Corrected to your uploaded file
    color: "#ef4444",
    githubLink: "#",
    liveLink: "#",
    imageFit: "contain", // Set to 'contain' to show the full image
  },
];

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @media screen and (width: 1366px) and (height: 768px) {
        .project-card {
          scale: 0.9;
          margin-top: -5vh;
        }
        .project-container {
          height: 90vh;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <ReactLenis root>
      <main className="bg-black" ref={container}>
        <section className="text-white w-full bg-slate-950">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                {...project} // Pass all project props easily
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}

function Card({
  i,
  title,
  description,
  link, // Use 'link' for the image src to avoid conflict with 'src' in data
  color,
  progress,
  range,
  targetScale,
  githubLink,
  liveLink,
  imageFit, // Receive the new prop
}) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 project-container">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          transform: `scale(var(--project-scale, 1))`,
          marginTop: "var(--project-margin, 0)",
        }}
        className="relative -top-[25%] h-auto w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] origin-top project-card"
        whileHover={{ y: -8, transition: { duration: 0.3 } }}>
        <div className="w-full flex flex-col md:flex-row bg-zinc-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="w-full md:w-[55%] h-[250px] md:h-[400px] lg:h-[450px] relative overflow-hidden bg-black">
            <motion.img
              src={link}
              alt={title}
              // Here is the fix: dynamically use object-contain or object-cover
              className={`w-full h-full ${
                imageFit === "contain" ? "object-contain" : "object-cover"
              }`}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: color, mixBlendMode: "overlay" }}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full text-xs font-medium">
              Project {i + 1}
            </div>
          </div>

          <div className="w-full md:w-[45%] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div className="h-[1px] w-12 bg-gray-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                {description}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700 flex gap-4">
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium"
                style={{ color }}>
                Code
              </a>
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium"
                style={{ color }}>
                Live
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

Card.propTypes = {
  i: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.array.isRequired,
  targetScale: PropTypes.number.isRequired,
  githubLink: PropTypes.string.isRequired,
  liveLink: PropTypes.string.isRequired,
  imageFit: PropTypes.string, // Add the new prop type
};
