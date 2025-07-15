import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";

// 📌 Your experience data:
export const experienceData = [
  {
    role: "Frontend Developer",
    company: "Tech Innovations Ltd.",
    period: "Jan 2023 - Present",
    description:
      "Building responsive web apps with React, TailwindCSS, animations, and accessibility best practices.",
  },
  {
    role: "Flutter Developer Intern",
    company: "Creative Apps Co.",
    period: "Jun 2022 - Dec 2022",
    description:
      "Developed cross-platform mobile apps, worked closely with backend teams, optimized performance & UX.",
  },
  {
    role: "MERN Stack Developer",
    company: "NextGen Solutions",
    period: "Jan 2021 - May 2022",
    description:
      "Built full-stack web apps with MongoDB, Express, React, and Node.js. Delivered modern dashboards & APIs.",
  },
];

// ✅ Framer Motion container:
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative min-h-screen bg-[#0c1221] text-white px-6 py-20"
    >
      <div className="max-w-5xl mx-auto relative">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-pink-500 text-sm font-semibold mb-2 uppercase tracking-wide"
        >
          Career Journey
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-12 relative inline-block after:block after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100"
        >
          Experience
        </motion.h1>

        {/* Timeline line */}
        <div className="absolute top-20 bottom-0 left-4 md:left-1/2 w-1 bg-gradient-to-b from-pink-500 to-purple-500/40 rounded-full"></div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative flex flex-col gap-12"
        >
          {experienceData.map(({ role, company, period, description }, i) => (
            <motion.article
              key={i}
              variants={item}
              whileHover={{
                y: -5,
                scale: 1.02,
                boxShadow: "0 10px 25px rgba(236,72,153,0.2)",
              }}
              className={`relative bg-[#001a4d]/50 backdrop-blur-md p-6 rounded-2xl border-l-4 border-pink-500 shadow-md md:w-1/2 transition-all duration-300 ${
                i % 2 === 0
                  ? "md:self-start md:pl-12"
                  : "md:self-end md:pr-12"
              }`}
              aria-labelledby={`exp-${i}-role`}
            >
              {/* Animated dot */}
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="absolute -left-6 md:-left-7 top-6 w-5 h-5 bg-pink-500 rounded-full border-4 border-[#0c1221]"
              />

              <div className="flex items-center mb-3 space-x-3">
                <FaBriefcase
                  className="text-pink-500"
                  size={24}
                  aria-hidden="true"
                />
                <h3
                  id={`exp-${i}-role`}
                  className="text-xl font-bold text-white"
                >
                  {role}
                </h3>
              </div>
              <p className="text-pink-400 font-semibold mb-1">{company}</p>
              <p className="text-gray-400 italic mb-4">{period}</p>
              <p className="text-gray-300">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
