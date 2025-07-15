import React, { useCallback, useEffect } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGithub,
} from "react-icons/fa";
import { SiFlutter, SiFirebase } from "react-icons/si";

// Tech icons
const techIcons = [
  { Icon: FaHtml5, color: "#e34f26", title: "HTML5" },
  { Icon: FaCss3Alt, color: "#1572B6", title: "CSS3" },
  { Icon: FaJs, color: "#f7df1e", title: "JavaScript" },
  { Icon: FaReact, color: "#61dafb", title: "React" },
  { Icon: SiFlutter, color: "#02569B", title: "Flutter" },
  { Icon: FaNodeJs, color: "#3C873A", title: "Node.js" },
  { Icon: SiFirebase, color: "#FFCA28", title: "Firebase" },
  { Icon: FaGithub, color: "#ffffff", title: "GitHub" },
];

// Orbiting icon helper
const OrbitingIcon = ({ Icon, color, angle, title }) => {
  const orbitRadius = 110;
  const controls = useAnimation();
  const angleMotion = useMotionValue(angle);

  useEffect(() => {
    controls.start({
      rotate: 360 + angle,
      transition: { repeat: Infinity, ease: "linear", duration: 30 },
    });
  }, [controls, angle]);

  const x = useTransform(angleMotion, (a) =>
    orbitRadius * Math.cos((a * Math.PI) / 180)
  );
  const y = useTransform(angleMotion, (a) =>
    orbitRadius * Math.sin((a * Math.PI) / 180)
  );

  return (
    <motion.div
      animate={controls}
      style={{
        x,
        y,
        position: "absolute",
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
      }}
      whileHover={{
        scale: 1.5,
        rotate: 15,
        filter: `drop-shadow(0 0 10px ${color})`,
      }}
      transition={{ type: "spring", stiffness: 300 }}
      title={title}
      role="img"
      aria-label={title}
      tabIndex={0}
    >
      <Icon size={36} style={{ color }} />
    </motion.div>
  );
};

// Main section
const AboutSection = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "#0f172a" } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: "bubble" }, resize: true },
      modes: { bubble: { distance: 150, size: 6, duration: 2, opacity: 0.8 } },
    },
    particles: {
      color: { value: "#a855f7" },
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

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-24 py-28 bg-gradient-to-br from-[#110d2c] to-[#0f172a] overflow-hidden"
    >
      {/* Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center max-w-7xl w-full gap-24">
        {/* Photo with animated gradient overlay */}
        <div className="relative w-80 h-96 md:w-[400px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl">
          <img
            src={myPhoto}
            alt="Leul Profile"
            className="object-cover w-full h-full grayscale hover:grayscale-0 transition duration-700 ease-in-out cursor-pointer"
            loading="lazy"
            draggable={false}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            style={{
              background:
                "linear-gradient(120deg, #a855f7, #ec4899, #fcd34d, #3b82f6)",
              backgroundSize: "600% 600%",
              clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
              animation: "gradientShift 10s ease infinite",
              mixBlendMode: "screen",
            }}
          />
        </div>

        {/* Text + orbiting icons */}
        <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
          <motion.h2
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 mb-6 select-none"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            Hey, I’m Leul, <br /> Flutter & MERN Craftsman
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-xl mb-12 select-none"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
          >
            I craft pixel-perfect cross-platform apps and blazing-fast websites.
            Clean, elegant code + stunning UI + seamless UX — that’s my craft.
          </motion.p>

          {/* Orbiting Carousel */}
          <div className="relative w-64 h-64 mx-auto md:mx-0">
            {techIcons.map(({ Icon, color, title }, i) => {
              const angle = (360 / techIcons.length) * i;
              return (
                <OrbitingIcon
                  key={title}
                  Icon={Icon}
                  color={color}
                  angle={angle}
                  title={title}
                />
              );
            })}
          </div>

          {/* Download CV */}
          <motion.a
            href={cvUrl}
            download
            className="mt-14 inline-block px-12 py-4 font-bold rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white shadow-xl hover:shadow-pink-500/80 hover:scale-105 transition transform duration-500 select-none"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.a>
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
