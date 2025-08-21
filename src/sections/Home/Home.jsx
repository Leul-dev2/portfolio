import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Lottie from "lottie-react";
import robotAnimation from "../../assets/AI Robot.json"; // Update this path
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaRocket,
  FaCode,
  FaBrain,
  FaMagic,
} from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import Typed from "typed.js";

const navLinks = ["Home", "About", "Projects", "Contact"];

const socialIcons = [
  { Icon: FaGithub, url: "https://github.com" },
  { Icon: FaLinkedin, url: "https://linkedin.com" },
  { Icon: FaEnvelope, url: "mailto:you@example.com" },
];

const skillSet = [
  { name: "Flutter", level: 90, icon: FaRocket, color: "from-blue-400 to-blue-600" },
  { name: "React", level: 85, icon: FaCode, color: "from-cyan-400 to-cyan-600" },
  { name: "Node.js", level: 80, icon: FaBrain, color: "from-green-400 to-green-600" },
  { name: "UI/UX", level: 95, icon: FaMagic, color: "from-purple-400 to-purple-600" },
];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  const typedElement = useRef(null);
  const heroTextRef = useRef(null);
  const hoverRefs = useRef([]);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const particlesInit = useCallback(async (main) => {
    await loadFull(main);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    // Initialize typed.js for animated text
    const typed = new Typed(typedElement.current, {
      strings: ["Flutter Developer", "MERN Stack Pro", "UI/UX Enthusiast", "Problem Solver"],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "|"
    });

    // Cleanup
    return () => {
      typed.destroy();
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll("a, button, .interactive");

    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const toggleAudio = () => {
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setActiveLink(link);
    setMenuOpen(false);
    const target = document.getElementById(link.toLowerCase());
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  // Custom cursor component
  const CustomCursor = () => (
    <motion.div
      className={`fixed pointer-events-none z-50 rounded-full transition-all duration-300 ease-out mix-blend-difference ${
        isHovering ? "w-10 h-10 bg-white/50" : "w-8 h-8 bg-white/20"
      }`}
      animate={{
        x: cursorPosition.x - (isHovering ? 20 : 16),
        y: cursorPosition.y - (isHovering ? 20 : 16),
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: "spring", damping: 15, mass: 0.1, stiffness: 200 }}
    />
  );

  // Animated background grid
  const AnimatedGrid = () => (
    <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 border border-white/10 rounded-lg"
          style={{
            left: `${(i % 5) * 20}%`,
            top: `${Math.floor(i / 5) * 20}%`,
          }}
          animate={{
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );

  // 3D Animated Sphere
  const AnimatedSphere = () => (
    <Canvas className="absolute top-0 right-0 w-full h-full">
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-2, 5, 2]} intensity={2} />
      <Sphere args={[1, 100, 200]} scale={2.2}>
        <MeshDistortMaterial
          color="#8A2BE2"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Canvas>
  );

  const heroTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#0c1221] text-white overflow-hidden"
    >
      {/* Audio Element */}
      <audio ref={audioRef} loop src="/ambient-space.mp3" />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Audio Toggle Button */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-purple-600/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-purple-600/50 transition-all interactive"
        aria-label="Toggle ambient sound"
      >
        {audioPlaying ? "🔇" : "🔊"}
      </button>

      {/* Dynamic Radial Gradients */}
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

      {/* Enhanced Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          detectRetina: true,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "bubble" },
              onClick: { enable: true, mode: "repulse" },
            },
            modes: {
              bubble: { distance: 100, size: 5, duration: 2, opacity: 0.8 },
              repulse: { distance: 150, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              enable: true,
              color: "#aaa",
              distance: 140,
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: { min: 0.1, max: 0.3 } },
            size: { value: { min: 1, max: 3 } },
            shape: {
              type: ["circle", "square", "triangle"],
            },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* 3D Sphere Background Element */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 opacity-30">
        <AnimatedSphere />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0c1221]/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto">
          <motion.h1
            className="text-3xl font-extrabold tracking-wide cursor-pointer relative interactive"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-yellow-400">
              Leul.dev
            </span>
            <motion.span
              className="text-white text-4xl absolute -top-1 -right-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              ⚡
            </motion.span>
          </motion.h1>

          <div className="hidden md:flex gap-10 text-lg font-medium text-gray-300">
            {navLinks.map((link) => (
              <motion.button
                key={link}
                onClick={(e) => handleNavClick(e, link)}
                className={`group relative transition duration-300 hover:text-white interactive ${
                  activeLink === link ? "text-white" : ""
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {link}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ width: 0 }}
                  animate={{ width: activeLink === link ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
                {activeLink === link && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 rounded-sm"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            className="md:hidden text-3xl text-white bg-white/10 p-2 rounded-lg interactive"
            onClick={() => setMenuOpen(!menuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full max-w-xs h-full bg-[#0c1221]/95 backdrop-blur-2xl border-l border-white/10 z-50 px-8 py-16 space-y-10"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link}
                onClick={(e) => handleNavClick(e, link)}
                className={`block w-full text-left text-2xl font-semibold px-4 py-2 rounded transition-colors interactive ${
                  activeLink === link
                    ? "text-white bg-gradient-to-r from-pink-600/30 to-purple-600/30"
                    : "text-gray-300 hover:bg-white/10"
                }`}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {link}
              </motion.button>
            ))}

            <div className="absolute bottom-10 left-8 right-8 flex justify-center space-x-6">
              {socialIcons.map(({ Icon, url }, i) => (
                <motion.a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl bg-white/10 p-3 rounded-full hover:bg-white/20 transition interactive"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-7xl px-6 md:px-12 py-28 mx-auto gap-16">
        {/* Hero Text */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroTextVariants}
          className="flex-1"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold leading-tight text-white"
          >
            {"Hey! I'm ".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                variants={wordVariants}
              >
                {word}{" "}
              </motion.span>
            ))}
            <motion.span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400"
              variants={wordVariants}
            >
              <span className="underline decoration-yellow-400">Leul</span>
            </motion.span>
            <motion.span
              className="inline-block"
              variants={wordVariants}
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {" "}👋
            </motion.span>
          </motion.h1>

          <div className="mt-6 h-12">
            <span className="text-2xl text-gray-200 font-medium">I'm a </span>
            <span ref={typedElement} className="text-2xl text-yellow-400 font-bold" />
          </div>

          <motion.p className="mt-6 text-xl text-gray-200 max-w-xl font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Crafting immersive digital experiences with cutting-edge technology and innovative design.
          </motion.p>

          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, "Contact")}
            className="inline-block mt-10 px-12 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 text-black text-xl font-bold rounded-full shadow-lg relative overflow-hidden group interactive"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Let's Connect ⚡</span>
            <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0)0%,rgba(255,255,255,0.4)50%,rgba(255,255,255,0)100%)] group-hover:animate-shimmer" />
          </motion.a>

          <div className="flex mt-12 space-x-6">
            {socialIcons.map(({ Icon, url }, i) => (
              <motion.a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl bg-white/10 p-3 rounded-full hover:bg-white/20 transition interactive"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Hero Visual - Enhanced with 3D and animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1 flex justify-center relative"
        >
          <Tilt
            glareEnable={true}
            glareMaxOpacity={0.3}
            glareColor="#ffffff"
            glarePosition="all"
            scale={1.05}
            className="max-w-md w-full relative"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <Lottie
                animationData={robotAnimation}
                loop
                autoplay
                className="w-full h-auto"
              />
            </motion.div>

            {/* Floating elements around the main visual */}
            {skillSet.map((skill, i) => (
              <motion.div
                key={i}
                className={`absolute w-16 h-16 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center text-white text-xl shadow-lg interactive`}
                style={{
                  top: `${20 + (i * 15)}%`,
                  left: i % 2 === 0 ? "-10%" : "90%",
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                  boxShadow: ["0 0 10px rgba(255,255,255,0.2)", "0 0 20px rgba(255,255,255,0.4)", "0 0 10px rgba(255,255,255,0.2)"],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <skill.icon />
              </motion.div>
            ))}
          </Tilt>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            className="w-1 h-3 bg-white rounded-full mt-2"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;