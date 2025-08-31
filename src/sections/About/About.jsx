import React, { useCallback, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Tilt from "react-parallax-tilt";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import {
  SiFlutter,
  SiFirebase,
  SiTailwindcss,
  SiNextdotjs,
} from "react-icons/si";

// Tech icons - CORRECTED & CLEANED
const techIcons = [
  { Icon: FaHtml5, color: "#e34f26", title: "HTML5" },
  { Icon: FaCss3Alt, color: "#1572B6", title: "CSS3" },
  { Icon: SiTailwindcss, color: "#38B2AC", title: "TailwindCSS" },
  { Icon: FaJs, color: "#f7df1e", title: "JavaScript" },
  { Icon: FaReact, color: "#61dafb", title: "React" },
  { Icon: SiNextdotjs, color: "#000000", title: "Next.js" },
  { Icon: SiFlutter, color: "#02569B", title: "Flutter" },
  { Icon: FaNodeJs, color: "#3C873A", title: "Node.js" },
  { Icon: SiFirebase, color: "#FFCA28", title: "Firebase" },
  { Icon: FaGithub, color: "#FFFFFF", title: "GitHub" },
  { Icon: FaFigma, color: "#F24E1E", title: "Figma" },
];

const AboutSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const techContainerRef = useRef(null);
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    // Pause animation on hover for better UX
    const container = techContainerRef.current;
    if (!container) return;

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 } },
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#a855f7",
        distance: 140,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: { enable: true, speed: 1.5, outModes: "out" },
      number: { value: 60, density: { enable: true, area: 900 } },
      opacity: { value: 0.2 },
      shape: { type: ["circle", "triangle", "polygon"] },
      size: { value: { min: 1, max: 2.5 } },
    },
    detectRetina: true,
  };

  const myPhoto = "/leul.jpg";
  const cvUrl = "/Leul_Resume.pdf";

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <AnimatePresence>
      <motion.section
        id="about"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-24 py-28 bg-[#0c1221] text-white overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 opacity-40">
            <Particles
              id="tsparticles-about"
              init={particlesInit}
              options={particlesOptions}
              className="absolute inset-0 z-0 h-full w-full"
            />
        </div>

        {/* Main Content Container */}
        <div className="relative z-20 w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          {/* Left Side: Text Content */}
          <motion.div
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
            variants={containerVariants}
          >
            <motion.h2
              variants={childVariants}
              className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 mb-6"
            >
              About Me
            </motion.h2>
            <motion.h3
              variants={childVariants}
              className="text-2xl md:text-4xl font-bold mb-4"
            >
              A Flutter & MERN Craftsman
            </motion.h3>
            <motion.p
              variants={childVariants}
              className="text-lg md:text-xl text-gray-300 max-w-xl mb-8"
            >
              I craft immersive digital experiences with cutting-edge technology and innovative design. My passion lies in creating clean, elegant code that powers stunning UI and provides a seamless user experience.
            </motion.p>
            <motion.p
              variants={childVariants}
              className="text-lg md:text-xl text-gray-300 max-w-xl mb-12"
            >
              With a focus on both mobile and web, I've had the privilege of working on projects that solve real-world problems and push the boundaries of what's possible.
            </motion.p>
            <motion.a
              variants={childVariants}
              href={cvUrl}
              download
              className="mt-8 inline-block px-12 py-4 font-bold rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white shadow-xl hover:shadow-pink-500/80 hover:scale-105 transition transform duration-500"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(236,72,153,0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.a>
          </motion.div>

          {/* Right Side: Photo */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <Tilt
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="#ffffff"
                glarePosition="all"
                scale={1.05}
                className="w-72 h-80 md:w-[400px] md:h-[500px] rounded-[40px] shadow-2xl relative"
            >
              <img
                src={myPhoto}
                alt="Leul Profile"
                className="object-cover w-full h-full rounded-[40px] grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-[40px] border-4 border-transparent pointer-events-none" style={{
                background: 'linear-gradient(to right, #ec4899, #8b5cf6, #fcd34d) border-box',
                mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }} />
            </Tilt>
          </div>
        </div>

        {/* Tech Stack Section - FIXED */}
        <div className="relative z-20 w-full max-w-7xl mt-24">
          <motion.div
            className="w-full flex justify-center items-center py-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="w-full overflow-hidden" ref={techContainerRef}>
              <div className="flex animate-infinite-scroll" style={{ animationPlayState: isHovered ? 'paused' : 'running' }}>
                {[...techIcons, ...techIcons].map((skill, i) => (
                  <div key={i} className="flex-shrink-0 mx-4 lg:mx-6">
                    <motion.div
                      className="flex flex-col items-center gap-2 p-2 group"
                      whileHover={{ scale: 1.2, y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center p-2 bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        <skill.Icon size={40} style={{ color: skill.color }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {skill.title}
                      </span>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Final Thoughts Section */}
        <motion.div 
            className="relative z-20 w-full max-w-3xl mt-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                Final Thoughts
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
                I'm always eager to learn, grow, and collaborate on exciting new projects. Whether it's building a beautiful mobile app or a scalable web platform, I bring dedication and a keen eye for detail to everything I do. Let's create something amazing together.
            </p>
        </motion.div>

        <style jsx>{`
          @keyframes infinite-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-infinite-scroll {
            display: flex;
            width: max-content;
            animation: infinite-scroll 40s linear infinite;
          }
        `}</style>
      </motion.section>
    </AnimatePresence>
  );
};

export default AboutSection;