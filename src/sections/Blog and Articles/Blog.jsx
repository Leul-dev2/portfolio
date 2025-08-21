import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Variants for the animations to be used throughout the app
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
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

// Dummy data for blog articles. This can be replaced with real data from an API.
const articles = [
  {
    id: 1,
    title: "The Rise of Full-Stack Development",
    date: "July 25, 2024",
    tag: "Web Development",
    description:
      "Exploring the benefits and challenges of the MERN stack for building scalable web applications.",
    image: "https://placehold.co/1200x600/1e293b/d4d4d8?text=Web+Development",
    content: `
      <p>The landscape of web development has undergone a significant transformation over the past decade. The rise of JavaScript frameworks and libraries on both the front and back ends has paved the way for a new paradigm: full-stack development. This approach allows a single developer or a small team to handle every layer of a web application, from the user interface to the server logic and database management.</p>
      <p>One of the most popular full-stack combinations today is the MERN stack, which consists of **MongoDB**, **Express.js**, **React**, and **Node.js**. This powerful quartet provides a cohesive, end-to-end JavaScript-based solution. The benefits are clear: a unified language across the stack reduces cognitive overhead and simplifies the development process. However, it also presents challenges, such as the need for a broad skill set and the ever-evolving nature of the ecosystem.</p>
      <p>Mastering the MERN stack means understanding how to build a responsive frontend with React, create robust REST APIs with Express and Node.js, and design efficient data models with MongoDB. This versatility makes full-stack developers highly sought after in the modern tech industry.</p>
    `,
  },
  {
    id: 2,
    title: "Building Cross-Platform Apps with Flutter",
    date: "August 10, 2024",
    tag: "Mobile Development",
    description:
      "A deep dive into how Flutter simplifies building beautiful and performant apps for all platforms from a single codebase.",
    image: "https://placehold.co/1200x600/1e293b/d4d4d8?text=Flutter+Apps",
    content: `
      <p>In the world of mobile application development, a persistent debate revolves around native versus cross-platform solutions. **Flutter**, Google's open-source UI toolkit, has emerged as a compelling answer to this challenge. It allows developers to build natively compiled applications for mobile, web, and desktop from a single codebase.</p>
      <p>Flutter’s core strength lies in its use of the **Dart** programming language and its unique widget-based architecture. Everything in Flutter is a widget, from buttons and text to layout structures and animations. This approach enables developers to create stunning, highly customized user interfaces that feel native on every platform. The performance is also a key selling point, as Flutter compiles to ARM or Intel machine code, avoiding the bridge-related performance issues often found in other cross-platform frameworks.</p>
      <p>For developers, Flutter’s hot-reload feature is a game-changer. It allows them to see the results of their code changes instantly, dramatically speeding up the development cycle. Whether you're a seasoned developer or just starting, Flutter offers a powerful and efficient way to bring your application ideas to life on all screens.</p>
    `,
  },
  {
    id: 3,
    title: "Mastering RESTful APIs with Node.js",
    date: "September 5, 2024",
    tag: "Software Engineering",
    description:
      "From basic routing to advanced authentication, learn the best practices for creating robust and secure APIs.",
    image: "https://placehold.co/1200x600/1e293b/d4d4d8?text=API+Design",
    content: `
      <p>At the heart of most modern web applications lies an **API (Application Programming Interface)**. It's the engine that powers data exchange between the frontend and backend. When building a backend with Node.js, creating a **RESTful API** is a common and effective approach. REST (Representational State Transfer) is an architectural style that provides a set of constraints for building web services.</p>
      <p>Key concepts in a RESTful API include resources, which are identified by URLs, and HTTP methods (GET, POST, PUT, DELETE) used to perform operations on those resources. Node.js, combined with the Express.js framework, provides a minimalist and flexible way to create these APIs. Developers can define endpoints, handle requests and responses, and connect to a database like MongoDB or PostgreSQL with ease.</p>
      <p>Beyond basic routing, a well-designed API also considers best practices like versioning, error handling, and most importantly, security. Implementing middleware for authentication and authorization is crucial to protect sensitive data and ensure that only authorized users can access specific resources.</p>
    `,
  },
  {
    id: 4,
    title: "State Management in React: A Comprehensive Guide",
    date: "September 20, 2024",
    tag: "Frontend",
    description:
      "Comparing popular state management libraries like Redux, Zustand, and React Context to find the right tool for your project.",
    image: "https://placehold.co/1200x600/1e293b/d4d4d8?text=React+State",
    content: `
      <p>As React applications grow in complexity, managing state becomes a critical challenge. Where should the data live? How do components share information? These questions lead to the topic of state management, a fundamental concept for any serious React developer.</p>
      <p>React's built-in **Context API** offers a simple way to pass data down the component tree without prop drilling. It's a great solution for managing global state that doesn't change frequently, such as user authentication or theme settings. For more complex, frequently-updated state, libraries like **Redux** and **Zustand** provide more robust and predictable patterns.</p>
      <p>Redux, with its strict, unidirectional data flow and dev tools, has long been the gold standard for large-scale applications. However, newer libraries like Zustand offer a more modern, lightweight, and less-boilerplate-heavy approach. Choosing the right state management solution depends on your project's size, complexity, and the team's familiarity with the patterns.</p>
    `,
  },
  {
    id: 5,
    title: "Demystifying Git and GitHub",
    date: "October 1, 2024",
    tag: "Tools",
    description:
      "A beginner's guide to version control. Learn how to commit, push, merge, and collaborate effectively with Git.",
    image: "https://placehold.co/1200x600/1e293b/d4d4d8?text=Git+and+GitHub",
    content: `
      <p>For any developer, regardless of their experience level, **version control** is an essential tool. **Git** is the most widely used version control system in the world, and **GitHub** is the platform that allows developers to collaborate on Git projects. Understanding these tools is a fundamental skill that every professional developer must possess.</p>
      <p>At its core, Git allows you to track changes to your code over time. You can create different versions of your project (called **commits**), revert to previous states, and work on new features in isolation (**branches**). GitHub takes this a step further by providing a centralized location to host your code, manage issues, and collaborate with a team using features like **pull requests**.</p>
      <p>This article will walk you through the basics of Git, from initializing a repository to committing changes, and then show you how to leverage GitHub for collaborative projects. By the end, you'll have a solid foundation for working with version control on any project.</p>
    `,
  },
  {
    id: 6,
    title: "Writing Clean Code: A Developer's Mindset",
    date: "October 15, 2024",
    tag: "Best Practices",
    description:
      "Tips and tricks for writing code that is easy to read, maintain, and scale. Focus on readability and simplicity.",
    image: "https://placehold.co/1200x600/1e293b/d4d4d8?text=Clean+Code",
    content: `
      <p>Code is read far more often than it's written. This simple truth is the foundation of the clean code movement. Writing code that is easy for others (and your future self) to understand is a crucial skill that separates good developers from great ones. Clean code is not just about making your program work; it's about making it maintainable and scalable.</p>
      <p>This mindset involves several key principles: using clear and descriptive variable and function names, writing concise and focused functions, and adhering to consistent formatting. Avoiding deep nesting and excessive comments (by writing self-explanatory code) are also core practices. Refactoring, the process of improving code's internal structure without changing its external behavior, is a continuous part of this process.</p>
      <p>Ultimately, writing clean code is a form of professional respect. It shows that you value your colleagues' time and that you're committed to building high-quality, sustainable software. This article will provide you with practical tips and examples to help you cultivate this essential mindset.</p>
    `,
  },
];

// Component to display a single article in detail
const ArticleDetail = ({ article, onBackClick }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
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

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.button
          onClick={onBackClick}
          className="mb-8 flex items-center gap-2 text-pink-500 hover:text-white transition-colors duration-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Back arrow icon */}
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
          </svg>
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
            {/* Calendar icon */}
            <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
            </svg>
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1">
            {/* Tag icon */}
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.868 2.029a1.002 1.002 0 00-1.424 0L3.293 8.175a1 1 0 000 1.414l6.151 6.151a1 1 0 001.414 0l6.151-6.151a1 1 0 000-1.414L10.868 2.029zM10 5a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd"></path>
            </svg>
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
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articles.map((article, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <div
                onClick={() => onArticleClick(article)}
                className="group block p-4 rounded-xl shadow-lg border border-white/10 transition-all duration-300 hover:scale-[1.03] hover:border-pink-500/50 hover:bg-white/5 cursor-pointer"
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
                    {/* Calendar icon */}
                    <svg className="w-3 h-3 text-pink-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                    </svg>
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* Tag icon */}
                    <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.868 2.029a1.002 1.002 0 00-1.424 0L3.293 8.175a1 1 0 000 1.414l6.151 6.151a1 1 0 001.414 0l6.151-6.151a1 1 0 000-1.414L10.868 2.029zM10 5a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-sm font-semibold text-blue-400">{article.tag}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{article.title}</h3>
                <p className="text-gray-300">{article.description}</p>
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
