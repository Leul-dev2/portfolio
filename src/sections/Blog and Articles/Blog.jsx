import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaCalendarAlt, FaTags, FaArrowLeft } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";

// Variants for a more dynamic and staggered reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

// Simplified and updated dummy data with new images and content
const articles = [
  {
    id: 1,
    title: "The Future of Web Development",
    date: "July 25, 2024",
    tag: "Trends",
    description: "An exploration into the emerging technologies and frameworks shaping the next generation of web applications, including AI-driven code and serverless architecture.",
    image: "/web.jpg",
    content: `
      <p>The web is constantly evolving, and staying ahead of the curve is crucial for any developer. We're seeing a massive shift towards **AI-powered development tools**, which are not just assisting with boilerplate code but are also helping to optimize performance and security.</p>
      <p>Another major trend is the rise of **serverless computing**. Platforms like AWS Lambda and Google Cloud Functions allow developers to focus on writing code without managing servers, leading to more efficient and scalable applications. This shift fundamentally changes how we think about backend architecture.</p>
      <p>Furthermore, the integration of **WebAssembly** is pushing the boundaries of what browsers can do, enabling near-native performance for computationally intensive tasks like gaming and video editing directly in the browser. The future of web dev is faster, smarter, and more integrated than ever before.</p>
    `,
  },
  {
    id: 2,
    title: "Building Interactive UI with Framer Motion",
    date: "August 10, 2024",
    tag: "Frontend",
    description: "A practical guide to using Flutter's built-in animation framework for creating stunning, fluid animations and interactive experiences in your Flutter applications..",
    image: "/flutter.jpg",
    content: `
   String htmlContent = """
<p>Animations are no longer just a luxury; they are a key part of creating a great user experience. <strong>Flutter's built-in animation framework</strong> is a powerful, yet incredibly easy-to-use, system for creating fluid motion. It simplifies complex animations, making them accessible to developers of all skill levels.</p>
<p>The framework's declarative approach allows you to define animations using widgets like <code>AnimatedContainer</code>, <code>TweenAnimationBuilder</code>, and the <code>AnimationController</code> class. You can use properties like <code>duration</code>, <code>curve</code>, and <code>Tween</code> to control everything from simple fades to complex staggered animations. It's built to leverage hardware acceleration for 60fps performance, which gives your animations a natural, fluid feel.</p>
<p>Beyond basic animations, Flutter also provides built-in tools for hero animations, physics-based simulations using springs, gesture recognition, drag-and-drop interactions, and scroll-based animations. It's the perfect toolkit for bringing your frontend designs to life and making your applications feel polished and professional.</p>
""";
    `,
  },
  {
    id: 3,
    title: "The Developer's Guide to Personal Branding",
    date: "September 5, 2024",
    tag: "Career",
    description: "Learn how to build a strong personal brand as a developer, from creating a standout portfolio to contributing to open-source projects.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    content: `
      <p>In a competitive market, having a strong personal brand can set you apart from the crowd. For developers, this goes beyond just having a good resume. It's about showcasing your skills, passion, and expertise to the world.</p>
      <p>A great **portfolio website** is your digital business card. It should not only display your projects but also reflect your personality and design sensibilities. Consider writing **blog posts** to share your knowledge and establish yourself as an authority in your niche. Contributing to **open-source projects** is another powerful way to demonstrate your coding skills and collaborate with the broader community.</p>
      <p>Building a personal brand is a long-term investment in your career. It's a way to attract opportunities that align with your interests and values, rather than just waiting for jobs to come to you. Start small, be consistent, and let your work speak for itself.</p>
    `,
  },
];

// Component to display a single article in detail
const ArticleDetail = ({ article, onBackClick }) => {
  return (
    <motion.section
      key="detail"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-[#0c1221] text-white px-6 py-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-40">
        {/* Animated Background Gradients */}
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
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.button
          onClick={onBackClick}
          className="mb-8 flex items-center gap-2 text-pink-500 hover:text-white transition-colors duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaArrowLeft className="text-sm" />
          <span>Back to Articles</span>
        </motion.button>

        <motion.img
          src={article.image}
          alt={article.title}
          className="w-full h-auto rounded-lg mb-8 shadow-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
        >
          {article.title}
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center space-x-4 text-gray-400 mb-8"
        >
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="w-4 h-4 text-pink-500" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaTags className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-blue-400">{article.tag}</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="prose prose-lg prose-invert text-gray-300"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </motion.section>
  );
};

// Component to display the list of all blog articles
const BlogSection = ({ onArticleClick }) => {
  return (
    <section
      id="blog"
      className="relative min-h-screen bg-[#0c1221] text-white px-6 py-20 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-40">
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center relative inline-block group after:block after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 group-hover:after:scale-x-100"
        >
          My Articles
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
        >
          Insights, tutorials, and thoughts on web development, software engineering, and the tech industry.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              onClick={() => onArticleClick(article)}
              className="group relative block p-4 rounded-xl shadow-lg border border-white/10 transition-all duration-300 hover:scale-[1.03] hover:border-pink-500/50 hover:bg-white/5 cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.05]"
                />
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-pink-500" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaTags className="text-blue-500" />
                  <span className="font-semibold text-blue-400">{article.tag}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 relative after:block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 group-hover:after:w-full after:transition-all after:duration-500">
                {article.title}
              </h3>
              <p className="text-gray-300">{article.description}</p>
              <div className="flex items-center mt-4 text-pink-500 group-hover:text-white transition-colors duration-300">
                <span>Read more</span>
                <HiOutlineArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Main App component that renders either the blog list or the article detail page
export default function App() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBackClick = () => {
    setSelectedArticle(null);
  };

  return (
    <AnimatePresence mode="wait">
      {selectedArticle ? (
        <ArticleDetail key="detail" article={selectedArticle} onBackClick={handleBackClick} />
      ) : (
        <BlogSection key="list" onArticleClick={handleArticleClick} />
      )}
    </AnimatePresence>
  );
}