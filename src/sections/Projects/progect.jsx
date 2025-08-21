import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

export const projects = [
  {
    title: "Portfolio Website",
    description:
      "A sleek, responsive portfolio website built with React, TailwindCSS, and Framer Motion animations.",
    tech: ["React", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/yourusername/portfolio",
    demo: "https://yourdomain.com",
    image: "/images/portfolio-preview.jpg", // Add a placeholder image path
  },
  {
    title: "E-commerce App",
    description:
      "Full-featured MERN stack e-commerce app with authentication, cart, and payment integration.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    github: "https://github.com/yourusername/ecommerce-app",
    demo: null,
    image: "/images/ecommerce-preview.jpg", // Add a placeholder image path
  },
  {
    title: "Flutter Chat App",
    description:
      "Cross-platform chat app using Flutter and Firebase with real-time messaging and push notifications.",
    tech: ["Flutter", "Firebase", "Dart"],
    github: "https://github.com/yourusername/flutter-chat",
    demo: null,
    image: "/images/chat-app-preview.jpg", // Add a placeholder image path
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50, rotateX: -20 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
    },
  },
};

export default function Projects() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    particles: {
      number: { value: 30 },
      size: { value: 2 },
      move: { enable: true, speed: 0.5 },
      opacity: { value: 0.2 },
      color: { value: "#ec4899" },
      links: { enable: true, distance: 120, color: "#a855f7", opacity: 0.2 },
    },
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-[#0c1221] text-white px-6 py-24 overflow-hidden"
    >
      <Particles
        id="tsparticles-projects"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* Background Gradients for depth */}
      <div className="absolute inset-0 z-0 opacity-40">
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-3xl"
          animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-teal-500 rounded-full blur-3xl"
          animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-pink-500 text-sm font-semibold mb-2 uppercase tracking-widest"
        >
          Work
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12 relative inline-block after:block after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100"
        >
          Projects
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={item}
            >
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.4}
                glareColor="#ffffff"
                glarePosition="all"
                scale={1.05}
                transitionSpeed={2000}
                className="group relative overflow-hidden bg-[#001a4d]/40 backdrop-blur-xl p-6 rounded-3xl border border-pink-500/30 transition-all duration-500 shadow-xl hover:shadow-pink-500/50 cursor-pointer"
                aria-labelledby={`project-${i}-title`}
              >
                {/* Background Glitch/Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-500 animate-shimmer transition-all duration-700 rounded-3xl"></div>

                <div className="relative z-10">
                  {/* Optional: Add a project image at the top */}
                  {project.image && (
                    <div className="w-full h-40 mb-4 rounded-xl overflow-hidden border border-white/10">
                      <img
                        src={project.image}
                        alt={`Preview of ${project.title}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}

                  <h3
                    id={`project-${i}-title`}
                    className="text-2xl font-bold mb-4 relative pb-1 after:block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-500"
                  >
                    {project.title}
                  </h3>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-pink-600/30 text-pink-200 text-xs font-semibold px-3 py-1 rounded-full select-none backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-5 items-center mt-6">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub Repo`}
                        className="text-pink-400 hover:text-pink-600 transition duration-300 transform hover:scale-110"
                      >
                        <FaGithub size={22} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} Live Demo`}
                        className="text-pink-400 hover:text-pink-600 transition duration-300 transform hover:scale-110"
                      >
                        <FaExternalLinkAlt size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .animate-shimmer {
          background-size: 200% 200%;
          animation: shimmer 5s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}