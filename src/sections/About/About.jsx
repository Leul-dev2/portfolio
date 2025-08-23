import React, { useCallback } from "react";
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

// Tech icons
const techIcons = [
  { Icon: FaHtml5, color: "#e34f26", title: "HTML5" },
  { Icon: FaCss3Alt, color: "#1572B6", title: "CSS3" },
  { Icon: SiTailwindcss, color: "#38B2AC", title: "TailwindCSS" },
  { Icon: FaJs, color: "#f7df1e", title: "JavaScript" },
  { Icon: FaReact, color: "#61dafb", title: "React" },
  { Icon: SiNextdotjs, color: "#ffffff", title: "Next.js" },
  { Icon: SiFlutter, color: "#02569B", title: "Flutter" },
  { Icon: FaNodeJs, color: "#3C873A", title: "Node.js" },
  { Icon: SiFirebase, color: "#FFCA28", title: "Firebase" },
  { Icon: FaGithub, color: "#ffffff", title: "GitHub" },
  { Icon: FaFigma, color: "#F24E1E", title: "Figma" },
];

const AboutSection = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
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
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.6,
        ease: "easeIn",
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
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Background Gradients & Particles */}
        <div className="absolute inset-0 z-0 opacity-40">
          <motion.div
            className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-pink-500 rounded-full blur-3xl"
            animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-500 rounded-full blur-3xl"
            animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          />
        </div>
        <Particles
          id="tsparticles-about"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />

        {/* Main Content Container - The central content block */}
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
              className="mt-8 inline-block px-12 py-4 font-bold rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white shadow-xl hover:shadow-pink-500/80 hover:scale-105 transition transform duration-500 interactive"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(236,72,153,0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.a>
          </motion.div>

          {/* Right Side: Photo */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="group relative w-72 h-80 md:w-[400px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="#ffffff"
                glarePosition="all"
                scale={1.05}
                className="h-full relative z-10"
              >
                <img
                  src={myPhoto}
                  alt="Leul Profile"
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute inset-0 rounded-[40px] border-4 border-transparent pointer-events-none" style={{
                  background: 'linear-gradient(to right, #ec4899, #8b5cf6, #fcd34d) border-box',
                  mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }} />
              </Tilt>
              <motion.div
                className="absolute inset-0 pointer-events-none z-20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: "linear-gradient(120deg, #a855f7, #ec4899, #fcd34d, #3b82f6)",
                  backgroundSize: "600% 600%",
                  mixBlendMode: "screen",
                  animation: "glitch-scan 0.5s infinite",
                }}
              />
            </div>
          </div>
        </div>

        {/* New: Tech Stack Section Below the Main Content */}
        <div className="relative z-20 w-full max-w-7xl mt-20">
          <motion.div
            className="w-full flex justify-center items-center py-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div
              className="flex items-center space-x-6 lg:space-x-12 whitespace-nowrap"
              animate={{
                x: ["-100%", "0%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate the icons to create a seamless loop */}
              {[...techIcons, ...techIcons].map((skill, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-2 p-2 group interactive"
                  whileHover={{ scale: 1.2, boxShadow: "0 0 15px rgba(255,255,255,0.4)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center p-2 bg-white/5 backdrop-blur-sm border border-white/10"
                  >
                    <skill.Icon size={40} className="text-white" style={{ color: skill.color }} />
                  </motion.div>
                  <span className="text-xs font-semibold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {skill.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        <style>{`
          @keyframes glitch-scan {
            0%, 100% { clip-path: inset(0 0 0 0); }
            10% { clip-path: inset(10% 0 85% 0); }
            20% { clip-path: inset(60% 0 10% 0); }
            30% { clip-path: inset(1% 0 99% 0); }
            40% { clip-path: inset(55% 0 20% 0); }
            50% { clip-path: inset(90% 0 5% 0); }
            60% { clip-path: inset(40% 0 45% 0); }
            70% { clip-path: inset(25% 0 70% 0); }
            80% { clip-path: inset(15% 0 80% 0); }
            90% { clip-path: inset(5% 0 90% 0); }
          }
        `}</style>
      </motion.section>
    </AnimatePresence>
  );
};

export default AboutSection;