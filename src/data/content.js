export const navLinks = [
  { title: "Home", path: "/" },
  { title: "Projects", path: "/projects" },
  { title: "Blog", path: "/blog" },
  { title: "Contact", path: "/#contact" },
];

export const socialLinks = [
  { label: "GitHub", url: "https://github.com/leul-dev2" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/leul-seyoum/" },
  { label: "Email", url: "mailto:leulsegedseyoum@gmail.com" },
];

export const projects = [
  {
    slug: "mern-social-platform",
    title: "MERN Social Platform",
    description: "A full-stack social media platform with real-time messaging, post creation, notifications, and user authentication.",
    longDesc: "A comprehensive social media platform featuring real-time chat with Socket.io, image uploads with Cloudinary, JWT authentication, and a responsive React frontend with Redux for state management.",
    details: "Built with a secure Node.js backend, MongoDB database, and a real-time chat experience powered by Socket.io. The frontend uses modern UI patterns with React and responsive design for mobile-first access.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "Redux"],
    github: "https://github.com/leul-dev2/",
    demo: "https://github.com/leul-dev2",
    image: "/hom.png",
    category: "MERN",
    featured: true,
  },
  {
    slug: "flutter-ecommerce",
    title: "Flutter E-Commerce",
    description: "Cross-platform e-commerce app with clean UI, state management, and Stripe payment integration.",
    longDesc: "A feature-rich e-commerce application built with Flutter. Includes product catalog, shopping cart, Stripe payments, order tracking, and push notifications via Firebase.",
    details: "Designed for performance and immersive mobile shopping, this Flutter app combines smooth animations, secure checkout, and a rich product browsing experience across iOS and Android.",
    tech: ["Flutter", "Dart", "Firebase", "Stripe", "Provider"],
    github: "https://github.com/leul-dev2/",
    demo: "https://github.com/leul-dev2",
    image: "/ecomm.jpg",
    category: "Flutter",
    featured: true,
  },
  {
    slug: "food-delivery-platform",
    title: "Food Delivery Platform",
    description: "Full-stack food delivery with real-time order tracking, authentication, and integrated payments.",
    longDesc: "A complete food delivery ecosystem with a Flutter mobile app for customers, a React admin dashboard, and a Node.js backend with real-time order tracking.",
    details: "The platform supports real-time order updates, geolocation, secure authentication, and a polished delivery pipeline for merchants and customers.",
    tech: ["React", "Node.js", "MongoDB", "Flutter", "Google Maps"],
    github: "https://github.com/leul-dev2/",
    demo: "https://github.com/leul-dev2",
    image: "/recipes.png",
    category: "Full-Stack",
    featured: true,
  },
  {
    slug: "ai-dashboard",
    title: "AI Dashboard",
    description: "Data-rich dashboard with dynamic charts and AI-powered predictive analytics.",
    longDesc: "An intelligent analytics dashboard featuring interactive D3.js visualizations, machine learning predictions via Python microservices, and real-time data streaming.",
    details: "This dashboard brings data science into the browser with responsive charts, intelligent forecasting, and a polished UX for business decision makers.",
    tech: ["React", "D3.js", "Python", "TensorFlow", "FastAPI"],
    github: "https://github.com/leul-dev2/",
    demo: null,
    image: "/home.png",
    category: "MERN",
    featured: false,
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    description: "This very website! A personal portfolio showcasing projects and skills with modern animations.",
    longDesc: "A cutting-edge portfolio website built with React, Framer Motion, Three.js, and Tailwind CSS. Features 3D elements, particle effects, and smooth animations.",
    details: "The portfolio demonstrates how to combine modern frontend technologies with beautiful motion and layout to create a high-impact personal brand presence.",
    tech: ["React", "Framer Motion", "Three.js", "Tailwind"],
    github: "https://github.com/leul-dev2/",
    demo: "https://yourdomain.com",
    image: "/home.png",
    category: "UI/UX",
    featured: false,
  },
  {
    slug: "digital-art-gallery",
    title: "Digital Art Gallery",
    description: "Interactive gallery for digital artists with a simple CMS, user profiles, and social features.",
    longDesc: "A platform for artists to showcase their digital artwork. Features include image optimization, lazy loading, user profiles, likes, comments, and a custom CMS.",
    details: "The gallery experience is designed for visual impact, with a polished artist interface and a responsive browsing experience for collectors.",
    tech: ["Next.js", "Firebase", "Cloudinary", "Tailwind"],
    github: "https://github.com/leul-dev2/",
    demo: null,
    image: "/web.jpg",
    category: "Full-Stack",
    featured: false,
  },
];

export const articles = [
  {
    slug: "future-of-web-development-2025",
    title: "The Future of Web Development in 2025",
    date: "July 25, 2024",
    readTime: "8 min read",
    tag: "Trends",
    author: "Leul Seyoum",
    description: "An exploration into the emerging technologies and frameworks shaping the next generation of web applications, including AI-driven code and serverless architecture.",
    image: "/web.jpg",
    content: `
      <p>The web is constantly evolving, and staying ahead of the curve is crucial for any developer. We're seeing a massive shift towards <strong>AI-powered development tools</strong>, which are not just assisting with boilerplate code but are also helping to optimize performance and security.</p>
      <h2>The Rise of AI in Development</h2>
      <p>Tools like GitHub Copilot and ChatGPT are revolutionizing how we write code. They're not replacing developers but augmenting our capabilities, allowing us to focus on architecture and problem-solving rather than repetitive tasks.</p>
      <h2>Serverless Architecture</h2>
      <p>Another major trend is the rise of <strong>serverless computing</strong>. Platforms like AWS Lambda and Google Cloud Functions allow developers to focus on writing code without managing servers, leading to more efficient and scalable applications.</p>
      <h2>WebAssembly & Beyond</h2>
      <p>Furthermore, the integration of <strong>WebAssembly</strong> is pushing the boundaries of what browsers can do, enabling near-native performance for computationally intensive tasks like gaming and video editing directly in the browser.</p>
    `,
  },
  {
    slug: "building-fluid-animations-with-flutter",
    title: "Building Fluid Animations with Flutter",
    date: "August 10, 2024",
    readTime: "6 min read",
    tag: "Flutter",
    author: "Leul Seyoum",
    description: "A practical guide to using Flutter's built-in animation framework for creating stunning, fluid animations and interactive experiences.",
    image: "/flutter.jpg",
    content: `
      <p>Animations are no longer just a luxury; they are a key part of creating a great user experience. <strong>Flutter's built-in animation framework</strong> is a powerful, yet incredibly easy-to-use, system for creating fluid motion.</p>
      <h2>Getting Started with Animations</h2>
      <p>The framework's declarative approach allows you to define animations using widgets like <code>AnimatedContainer</code>, <code>TweenAnimationBuilder</code>, and the <code>AnimationController</code> class. You can control everything from simple fades to complex staggered animations.</p>
      <h2>Performance Matters</h2>
      <p>Flutter's animations are built to leverage hardware acceleration for 60fps performance, which gives your animations a natural, fluid feel. Beyond basic animations, Flutter also provides built-in tools for hero animations, physics-based simulations, and gesture recognition.</p>
    `,
  },
  {
    slug: "developers-guide-to-personal-branding",
    title: "The Developer's Guide to Personal Branding",
    date: "September 5, 2024",
    readTime: "5 min read",
    tag: "Career",
    author: "Leul Seyoum",
    description: "Learn how to build a strong personal brand as a developer, from creating a standout portfolio to contributing to open-source projects.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200",
    content: `
      <p>In a competitive market, having a strong personal brand can set you apart from the crowd. For developers, this goes beyond just having a good resume. It's about showcasing your skills, passion, and expertise to the world.</p>
      <h2>Your Portfolio is Your Digital Business Card</h2>
      <p>A great <strong>portfolio website</strong> should not only display your projects but also reflect your personality and design sensibilities. Consider writing <strong>blog posts</strong> to share your knowledge and establish yourself as an authority in your niche.</p>
      <h2>Open Source Contributions</h2>
      <p>Contributing to <strong>open-source projects</strong> is another powerful way to demonstrate your coding skills and collaborate with the broader community. Building a personal brand is a long-term investment in your career.</p>
    `,
  },
];
