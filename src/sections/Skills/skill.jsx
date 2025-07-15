import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

const projects = [
  {
    title: "Ecommerce Fashion Website",
    image: "/images/ecommerce.png",
    likes: 14,
    link: "#",
  },
  {
    title: "Quiz Builder Application",
    image: "/images/quiz.png",
    likes: 4,
    link: "#",
  },
  {
    title: "Notes Keeping Application",
    image: "/images/notes.png",
    likes: 26,
    link: "#",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: "spring",
    },
  }),
};

export default function skills() {
  return (
    <section className="bg-[#121212] py-16 px-4 md:px-12 min-h-screen text-white">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">My Portfolio</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            className="bg-[#1e1e1e] rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <img
                src={project.image}
                alt={project.title}
                className="rounded-xl w-full object-cover mb-4"
              />
              <p className="text-pink-500 text-sm font-semibold uppercase mb-1">
                External Link
              </p>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <div className="flex items-center gap-1 text-gray-400">
                  <FaHeart className="text-pink-500" /> {project.likes}
                </div>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
