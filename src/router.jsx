import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Routes, Route, useNavigate } from "react-router-dom";
import Navbar       from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Cursor       from "./components/Cursor";
import HomePage     from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage     from "./pages/BlogPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ArticlePage  from "./pages/ArticlePage";
import NotFoundPage from "./pages/NotFoundPage";

/* ─── Boot Loader ─── */
const BOOT_LINES = [
  "initializing runtime...",
  "loading assets...",
  "mounting components...",
  "ready.",
];

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [lineIdx,  setLineIdx]  = useState(0);
  const [done,     setDone]     = useState(false);

  useEffect(() => {
    const prog = setInterval(() => {
      setProgress(p => {
        const next = p + (100 - p) * 0.12 + 1.8;
        return Math.min(next, 100);
      });
    }, 55);
    const lines = setInterval(() => {
      setLineIdx(i => Math.min(i + 1, BOOT_LINES.length - 1));
    }, 430);
    const finish = setTimeout(() => setDone(true), 1800);
    return () => { clearInterval(prog); clearInterval(lines); clearTimeout(finish); };
  }, []);

  return (
    <motion.div
      className="apex-loader"
      initial={{ opacity:1 }}
      exit={{ opacity:0, scale:0.98 }}
      transition={{ duration:0.5, ease:[0.23,1,0.32,1] }}
    >
      <motion.div
        className="gradient-text"
        initial={{ scale:0.8, opacity:0 }}
        animate={{ scale:1, opacity:1 }}
        transition={{ type:"spring", stiffness:220, damping:18 }}
        style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:800, lineHeight:1 }}
      >
        Leul
        <span style={{ color:"var(--c-secondary)", WebkitTextFillColor:"var(--c-secondary)" }}>.</span>
        <span style={{ color:"var(--c-muted)", WebkitTextFillColor:"var(--c-muted)", fontFamily:"var(--f-mono)", fontSize:"70%" }}>dev</span>
      </motion.div>

      <div className="apex-loader-bar">
        <motion.div
          className="apex-loader-bar-fill"
          animate={{ width:`${progress}%` }}
          transition={{ ease:"easeOut" }}
        />
      </div>

      <div className="apex-loader-label" style={{ display:"flex", alignItems:"center", gap:6 }}>
        <motion.span
          animate={{ opacity:[1,0,1] }}
          transition={{ repeat:Infinity, duration:0.9 }}
          style={{ color:"var(--c-primary)" }}
        >
          ▶
        </motion.span>
        {BOOT_LINES[lineIdx]}
      </div>
    </motion.div>
  );
}

/* ─── Scroll to top on route change ─── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top:0, behavior:"instant" });
  }, [pathname]);
  return null;
}

/* ─── Page transition variants ─── */
const pageVariants = {
  initial: { opacity:0, y:10 },
  animate: { opacity:1, y:0, transition:{ duration:0.42, ease:[0.23,1,0.32,1] } },
  exit:    { opacity:0, y:-6, transition:{ duration:0.22 } },
};

/* ─── Main Router ─── */
export default function AppRouter() {
  const [loading,  setLoading]  = useState(true);
  const location  = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Boot loader */}
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* App shell — shown after boot */}
      {!loading && (
        <>
          <Cursor />
          <ScrollProgress />
          <ScrollToTop />
          <Navbar />

          <AnimatePresence mode="wait" initial={false}>
            <motion.main
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Routes location={location}>
                <Route path="/"              element={<HomePage />} />
                <Route path="/projects"      element={<ProjectsPage />} />
                <Route path="/blog"          element={<BlogPage />} />
                <Route path="/project/:slug" element={<ProjectDetailPage />} />
                <Route path="/article/:slug" element={<ArticlePage />} />
                <Route path="*"              element={<NotFoundPage />} />
              </Routes>
            </motion.main>
          </AnimatePresence>
        </>
      )}
    </>
  );
}
