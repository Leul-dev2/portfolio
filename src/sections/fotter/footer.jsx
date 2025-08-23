import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

// Framer Motion variants for staggered animations
const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative bg-[#0c1221] text-gray-400 py-12 px-6 border-t border-t-white/10 overflow-hidden"
    >
      {/* Background gradients for a subtle effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <motion.div
          className="absolute -top-[50%] -left-[50%] w-[100%] h-[100%] bg-blue-500 rounded-full blur-3xl"
          animate={{ x: ["-50%", "10%", "-50%"], y: ["-50%", "10%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-[50%] -right-[50%] w-[100%] h-[100%] bg-teal-500 rounded-full blur-3xl"
          animate={{ x: ["-50%", "10%", "-50%"], y: ["-50%", "10%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Call to action or main heading */}
        <motion.a
          variants={itemVariants}
          href="#contact"
          className="text-2xl md:text-3xl font-bold text-white mb-6 hover:text-teal-400 transition-colors duration-300 flex items-center gap-2 group"
        >
          Let's Build Something Great Together
          <HiOutlineArrowNarrowRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
        </motion.a>

        {/* Social media links */}
        <motion.div variants={itemVariants} className="flex space-x-6 mb-6">
          <motion.a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-2xl hover:text-white transition-colors duration-300 transform hover:scale-110"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-2xl hover:text-white transition-colors duration-300 transform hover:scale-110"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter Profile"
            className="text-2xl hover:text-white transition-colors duration-300 transform hover:scale-110"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaTwitter />
          </motion.a>
          <motion.a
            href="mailto:youremail@example.com"
            aria-label="Email Address"
            className="text-2xl hover:text-white transition-colors duration-300 transform hover:scale-110"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEnvelope />
          </motion.a>
        </motion.div>

        {/* Copyright and signature */}
        <motion.p variants={itemVariants} className="text-sm">
          &copy; {currentYear} Leulseyoum. All Rights Reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
}