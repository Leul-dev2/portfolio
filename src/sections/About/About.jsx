import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import { SiFlutter, SiFirebase, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import Tilt from "react-parallax-tilt";

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
      events: { onHover: { enable: true, mode: "bubble" }, resize: true },
      modes: { bubble: { distance: 150, size: 6, duration: 2, opacity: 0.8 } },
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#a855f7",
        distance: 140,
        enable: true,
        opacity: 0.2,
        width: 1.2,
      },
      move: { enable: true, speed: 1, outModes: "bounce" },
      number: { value: 55, density: { enable: true, area: 900 } },
      opacity: { value: 0.25 },
      shape: { type: "circle" },
      size: { value: { min: 1.5, max: 3.5 } },
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <AnimatePresence>
      <motion.section
        id="about"
        className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-24 py-28 bg-[#0c1221] text-white overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Background Gradients */}
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

        {/* Particles */}
        <Particles
          id="tsparticles-about"
          init={particlesInit}
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center max-w-7xl w-full gap-16 lg:gap-24">
          {/* Left Side: Photo and Text */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Main Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              viewport={{ once: true, amount: 0.3 }}
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

              {/* Download CV */}
              <motion.a
                variants={childVariants}
                href={cvUrl}
                download
                className="mt-14 inline-block px-12 py-4 font-bold rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white shadow-xl hover:shadow-pink-500/80 hover:scale-105 transition transform duration-500 interactive"
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(236,72,153,0.8)" }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
              </motion.a>
            </motion.div>
          </div>

          {/* Right Side: Photo and Skill Matrix */}
          <div className="flex flex-col items-center lg:items-end">
            {/* Photo with Tilt and Glitch Effect */}
            <div className="group relative w-72 h-80 md:w-[400px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl mb-12 lg:mb-0">
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.3}
                glareColor="#ffffff"
                glarePosition="all"
                scale={1.05}
                className="h-full"
              >
                <img
                  src={myPhoto}
                  alt="Leul Profile"
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer"
                  loading="lazy"
                  draggable={false}
                />
              </Tilt>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <motion.div
                className="absolute inset-0 pointer-events-none"
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

            {/* Skill Matrix */}
            <motion.div
              className="w-full max-w-lg mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {techIcons.map((skill, i) => (
                <motion.div
                  key={i}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center p-2 bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg cursor-pointer group interactive"
                  whileHover={{ scale: 1.1, y: -5, boxShadow: "0 0 15px rgba(255,255,255,0.4)" }}
                  transition={{ type: "spring", stiffness: 300, delay: i * 0.05 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: skill.color,
                      opacity: 0,
                      filter: "blur(10px)",
                    }}
                    whileHover={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                  />
                  <skill.Icon size={36} className="text-white relative z-10" />
                  <span className="absolute bottom-[-20px] text-xs font-semibold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {skill.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <style>{`
          @keyframes glitch-scan {
            0%, 100% {
              clip-path: inset(0 0 0 0);
            }
            10% {
              clip-path: inset(10% 0 85% 0);
            }
            20% {
              clip-path: inset(60% 0 10% 0);
            }
            30% {
              clip-path: inset(1% 0 99% 0);
            }
            40% {
              clip-path: inset(55% 0 20% 0);
            }
            50% {
              clip-path: inset(90% 0 5% 0);
            }
            60% {
              clip-path: inset(40% 0 45% 0);
            }
            70% {
              clip-path: inset(25% 0 70% 0);
            }
            80% {
              clip-path: inset(15% 0 80% 0);
            }
            90% {
              clip-path: inset(5% 0 90% 0);
            }
          }
        `}</style>
      </motion.section>
    </AnimatePresence>
  );
};

export default AboutSection;