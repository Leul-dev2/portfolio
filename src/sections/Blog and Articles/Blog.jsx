import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaTags, FaClock, FaUser } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import SectionHeading from "../../components/SectionHeading";
import GradientBlob from "../../components/GradientBlob";
import { articles } from "../../data/content";

/* ---- Blog List ---- */
const BlogSection = () => {
  return (
    <section
      id="blog"
      className="relative min-h-screen bg-[#030712] text-white py-24 md:py-32 overflow-hidden"
    >
      <GradientBlob color1="bg-violet-600" color2="bg-cyan-600" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          tag="Blog & Articles"
          title="Thoughts & Insights"
          subtitle="Sharing knowledge about web development, software engineering, and the tech industry."
        />

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Link
            to={`/article/${articles[0].slug}`}
            className="group relative block rounded-2xl overflow-hidden glass border border-white/5 hover:border-pink-500/20 transition-all duration-500"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#030712]/50 hidden md:block" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 text-xs font-bold">
                    Featured
                  </span>
                  <span className="text-xs text-gray-500 font-mono">{articles[0].readTime}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-pink-400 transition-colors">
                  {articles[0].title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {articles[0].description}
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><FaCalendarAlt className="text-pink-400" /> {articles[0].date}</span>
                  <span className="flex items-center gap-1"><FaTags className="text-violet-400" /> {articles[0].tag}</span>
                </div>
                <div className="mt-6 flex items-center gap-2 text-pink-400 group-hover:gap-3 transition-all">
                  <span className="font-medium">Read Article</span>
                  <HiOutlineArrowRight />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(1).map((article, index) => (
            <Link
              key={article.slug}
              to={`/article/${article.slug}`}
              className="group relative block rounded-2xl overflow-hidden glass border border-white/5 hover:border-pink-500/20 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg glass text-[10px] font-mono text-gray-300">
                  {article.tag}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><FaCalendarAlt className="text-pink-400" /> {article.date}</span>
                  <span className="flex items-center gap-1"><FaClock className="text-violet-400" /> {article.readTime}</span>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-pink-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {article.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-pink-400 text-sm group-hover:gap-3 transition-all">
                  <span>Read more</span>
                  <HiOutlineArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---- Main Blog Component ---- */
export default function Blog() {
  return <BlogSection />;
}
