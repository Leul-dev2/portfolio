import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback, useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaStackOverflow } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

// Framer Motion variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const ContactSection = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    particles: {
      number: { value: 60 },
      size: { value: 1.5, random: true },
      move: { enable: true, speed: 0.5, direction: "none", random: true },
      opacity: { value: 0.4 },
      color: { value: "#f0c24e" },
      links: { enable: false },
    },
  };

  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen bg-[#010101] text-white px-6 py-20 flex items-center justify-center overflow-hidden"
    >
      <Particles
        id="tsparticles-contact"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />

      {/* Dynamic Background Gradients */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
      >
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
      </motion.div>

      {/* Main Container with an animated border glow */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        onMouseMove={handleMouseMove}
        className="group relative z-10 max-w-6xl w-full flex flex-col md:flex-row gap-12 bg-[#0c1221]/80 p-8 md:p-16 rounded-3xl shadow-2xl shadow-zinc-900/50 border border-[#f0c24e]/20 backdrop-blur-xl transition-all duration-500"
      >
        {/* Animated border glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                #f0c24e80,
                transparent 80%
              )
            `,
          }}
        />

        {/* Contact Form */}
        <motion.div variants={itemVariants} className="flex-1 relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#f0c24e] to-[#f5e0a9]">
            Let’s Connect
          </h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            I’m <strong className="text-[#f0c24e]">Leulseyoum</strong>, a passionate{" "}
            <span className="text-[#f5e0a9] font-medium">Flutter & Frontend Developer</span>. Got a project,
            idea or just want to say hi? Drop a message below!
          </p>
          <form className="space-y-6">
            <motion.input
              variants={itemVariants}
              type="text"
              placeholder="Your Name"
              className="w-full p-4 bg-[#111827] text-white rounded-xl border border-[#f0c24e]/10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f0c24e] transition-all duration-300 focus:shadow-[0_0_10px_2px_#f0c24e50] focus:scale-[1.01]"
              required
            />
            <motion.input
              variants={itemVariants}
              type="email"
              placeholder="Your Email"
              className="w-full p-4 bg-[#111827] text-white rounded-xl border border-[#f0c24e]/10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f0c24e] transition-all duration-300 focus:shadow-[0_0_10px_2px_#f0c24e50] focus:scale-[1.01]"
              required
            />
            <motion.textarea
              variants={itemVariants}
              placeholder="Your Message"
              rows="5"
              className="w-full p-4 bg-[#111827] text-white rounded-xl border border-[#f0c24e]/10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f0c24e] transition-all duration-300 focus:shadow-[0_0_10px_2px_#f0c24e50] focus:scale-[1.01]"
              required
            ></motion.textarea>
            <motion.button
              variants={itemVariants}
              type="submit"
              className="w-full bg-gradient-to-r from-[#f0c24e] to-[#f5e0a9] text-[#010101] hover:scale-[1.01] transition rounded-full py-4 font-bold shadow-lg shadow-[#f0c24e]/20"
            >
              SEND MESSAGE
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div variants={itemVariants} className="flex-1 space-y-8 text-gray-300 md:pl-12 md:border-l md:border-[#f0c24e]/20 relative z-10">
          <div className="flex items-center gap-4">
            <MdEmail size={28} className="text-[#f0c24e]" />
            <a href="mailto:Leulseyoum103@gmail.com" className="hover:text-white transition-colors duration-300">
              Leulseyoum103@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <MdPhone size={28} className="text-[#f0c24e]" />
            <a href="tel:+251989905112" className="hover:text-white transition-colors duration-300">
              +251 989 905 112
            </a>
          </div>
          <div className="flex items-center gap-4">
            <MdLocationOn size={28} className="text-[#f0c24e]" />
            <span>Addis Ababa, Ethiopia</span>
          </div>

          <div className="flex gap-6 mt-10 text-3xl">
            <motion.a
              href="https://linkedin.com/in/leulseyoum"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 8px #f0c24e)" }}
              whileTap={{ scale: 0.95 }}
              className="text-[#f0c24e] transition-all duration-300"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://stackoverflow.com/users/your_id/leulseyoum"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 8px #f0c24e)" }}
              whileTap={{ scale: 0.95 }}
              className="text-[#f0c24e] transition-all duration-300"
            >
              <FaStackOverflow />
            </motion.a>
            <motion.a
              href="https://facebook.com/leulseyoum"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 8px #f0c24e)" }}
              whileTap={{ scale: 0.95 }}
              className="text-[#f0c24e] transition-all duration-300"
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 8px #f0c24e)" }}
              whileTap={{ scale: 0.95 }}
              className="text-[#f0c24e] transition-all duration-300"
            >
              <FaGithub />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
