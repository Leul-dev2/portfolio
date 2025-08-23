import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaGithub, FaExternalLinkAlt, FaTools, FaCodeBranch, FaMobileAlt } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

// Updated project data with new icons and colors
export const projects = [
  {
    title: "MERN-Stack Social Media",
    description: "A full-stack social media platform with user authentication, post creation, and real-time notifications. Built for scalability.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Redux"],
    github: "https://github.com/yourusername/social-media-app",
    demo: null,
    image: "/images/social-media-preview.jpg",
    icon: <FaCodeBranch className="text-pink-500" />,
  },
  {
    title: "Flutter E-commerce App",
    description: "A cross-platform e-commerce app with a clean UI, state management, and Stripe payment integration. One codebase, all platforms.",
    tech: ["Flutter", "Dart", "Firebase", "Stripe"],
    github: "https://github.com/yourusername/flutter-ecommerce",
    demo: null,
    image: "/images/flutter-ecommerce.jpg",
    icon: <FaMobileAlt className="text-cyan-400" />,
  },
  {
    title: "AI-Powered Dashboard",
    description: "A data-rich dashboard with dynamic charts and an AI component for predictive analysis, built using the MERN stack.",
    tech: ["React", "D3.js", "Python", "TensorFlow"],
    github: "https://github.com/yourusername/ai-dashboard",
    demo: "https://yourdomain.com",
    image: "/images/ai-dashboard-preview.jpg",
    icon: <FaTools className="text-purple-400" />,
  },
];

// Animation variants for the container
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Animation variants for individual project cards
const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 10,
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
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: ["#ec4899", "#8b5cf6", "#38bdf8"] },
      shape: { type: "circle" },
      opacity: { value: 0.3 },
      size: { value: 3, random: true },
      links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 0.5, direction: "none", random: true, straight: false, out_mode: "out" },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 4 },
      },
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

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-pink-500 text-lg font-semibold mb-2 uppercase tracking-widest"
        >
          My Work
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold mb-12 relative inline-block text-white group"
        >
          Featured Projects
          <span className="block absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project, i) => (
            <motion.div key={i} variants={item}>
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
                  <div className="w-full h-40 mb-4 rounded-xl overflow-hidden border border-white/10 group-hover:border-pink-500 transition-colors duration-300">
                    <img
                      src={project.image}
                      alt={`Preview of ${project.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-xl">{project.icon}</div>
                    <h3
                      id={`project-${i}-title`}
                      className="text-2xl font-bold relative pb-1 after:block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-12 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-500"
                    >
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-pink-600/30 text-pink-200 text-xs font-semibold px-3 py-1 rounded-full select-none backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-pink-500/50"
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
                        className="text-pink-400 hover:text-pink-600 transition duration-300 transform hover:scale-125"
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
                        className="text-pink-400 hover:text-pink-600 transition duration-300 transform hover:scale-125"
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

      <style jsx>{`
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