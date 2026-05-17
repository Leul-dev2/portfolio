import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

/* ─── Nav links — sections on homepage use hash, other pages use routes ─── */
const NAV_LINKS = [
  { title: "Home",     type: "route", path: "/"          },
  { title: "About",    type: "hash",  path: "#about"     },
  { title: "Projects", type: "route", path: "/projects"  },
  { title: "Blog",     type: "route", path: "/blog"      },
  { title: "Contact",  type: "hash",  path: "#contact"   },
];

const PALETTE = [
  { group:"Navigate", icon:"🏠", label:"Home",            desc:"/",           action:"route", href:"/"         },
  { group:"Navigate", icon:"👤", label:"About",           desc:"#about",      action:"hash",  href:"#about"    },
  { group:"Navigate", icon:"💼", label:"Projects",        desc:"/projects",   action:"route", href:"/projects" },
  { group:"Navigate", icon:"📖", label:"Blog",            desc:"/blog",       action:"route", href:"/blog"     },
  { group:"Navigate", icon:"✉️", label:"Contact",         desc:"#contact",    action:"hash",  href:"#contact"  },
  { group:"Actions",  icon:"⬇️", label:"Download Resume", desc:"PDF",         action:"open",  href:"/Leul_Resume.pdf" },
  { group:"Links",    icon:"🐙", label:"GitHub",          desc:"github.com/leul-dev2",        action:"open",  href:"https://github.com/leul-dev2" },
  { group:"Links",    icon:"💼", label:"LinkedIn",        desc:"linkedin.com/in/leul-seyoum", action:"open",  href:"https://www.linkedin.com/in/leul-seyoum/" },
  { group:"Links",    icon:"📧", label:"Email",           desc:"leulsegedseyoum@gmail.com",   action:"open",  href:"mailto:leulsegedseyoum@gmail.com" },
];

/* smooth-scroll to a hash section, works from any page */
function scrollToHash(hash) {
  const id  = hash.replace("#", "");
  const el  = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

/* ─── Command Palette ─── */
function CommandPalette({ open, onClose }) {
  const [query,    setQuery]    = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (open) { setQuery(""); setSelected(0); setTimeout(() => inputRef.current?.focus(), 60); }
  }, [open]);

  const filtered = query.trim()
    ? PALETTE.filter(i =>
        i.label.toLowerCase().includes(query.toLowerCase()) ||
        i.group.toLowerCase().includes(query.toLowerCase()))
    : PALETTE;

  const groups = [...new Set(filtered.map(i => i.group))];

  const execute = (item) => {
    onClose();
    if (item.action === "open") { window.open(item.href, "_blank", "noopener"); return; }
    if (item.action === "hash") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollToHash(item.href), 350);
      } else {
        scrollToHash(item.href);
      }
      return;
    }
    navigate(item.href);
  };

  useEffect(() => {
    const h = (e) => {
      if (!open) return;
      if (e.key === "Escape")    onClose();
      if (e.key === "ArrowDown") setSelected(s => Math.min(s + 1, filtered.length - 1));
      if (e.key === "ArrowUp")   setSelected(s => Math.max(s - 1, 0));
      if (e.key === "Enter" && filtered[selected]) execute(filtered[selected]);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, selected, filtered, location]);

  let flatIdx = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="apex-palette-overlay"
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          transition={{ duration:0.15 }}
          onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="apex-palette"
            initial={{ opacity:0, scale:0.96, y:-16 }}
            animate={{ opacity:1, scale:1, y:0 }}
            exit={{ opacity:0, scale:0.95, y:-8 }}
            transition={{ duration:0.2, ease:[0.23,1,0.32,1] }}
          >
            {/* Input */}
            <div className="apex-palette-input-row">
              <span style={{ color:"var(--c-muted)", flexShrink:0, fontSize:16 }}>⌕</span>
              <input
                ref={inputRef}
                className="apex-palette-input"
                placeholder="Search pages, actions, links…"
                value={query}
                onChange={e => { setQuery(e.target.value); setSelected(0); }}
              />
              <div className="apex-palette-kbds">
                <span className="apex-palette-kbd">↑↓</span>
                <span className="apex-palette-kbd">↵</span>
                <span className="apex-palette-kbd">Esc</span>
              </div>
            </div>

            {/* Results */}
            <div className="apex-palette-results">
              {filtered.length === 0 && (
                <div style={{ padding:"2rem", textAlign:"center", color:"var(--c-muted)", fontFamily:"var(--f-mono)", fontSize:13 }}>
                  No results for &quot;{query}&quot;
                </div>
              )}
              {groups.map(group => (
                <div key={group}>
                  <div className="apex-palette-group-label">{group}</div>
                  {filtered.filter(i => i.group === group).map(item => {
                    flatIdx++;
                    const idx = flatIdx;
                    return (
                      <div
                        key={item.label}
                        className={`apex-palette-item${selected === idx ? " sel" : ""}`}
                        onMouseEnter={() => setSelected(idx)}
                        onMouseDown={() => execute(item)}
                      >
                        <div className="apex-palette-item-icon">{item.icon}</div>
                        <div>
                          <div className="apex-palette-item-label">{item.label}</div>
                          <div className="apex-palette-item-desc">{item.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="apex-palette-footer">
              <div className="apex-palette-footer-hint"><span className="apex-palette-kbd">↑↓</span> navigate</div>
              <div className="apex-palette-footer-hint"><span className="apex-palette-kbd">↵</span> select</div>
              <div className="apex-palette-footer-hint"><span className="apex-palette-kbd">Esc</span> close</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main Navbar ─── */
export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeHash,  setActiveHash]  = useState("");
  const navigate  = useNavigate();
  const location  = useLocation();
  const isHome    = location.pathname === "/";

  /* scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* track active section via IntersectionObserver */
  useEffect(() => {
    if (!isHome) { setActiveHash(""); return; }
    const sections = ["home","about","projects","services","blog","contact"];
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveHash("#" + e.target.id); });
      },
      { rootMargin:"-40% 0px -55% 0px" }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [isHome, location.pathname]);

  /* Cmd/Ctrl + K */
  useEffect(() => {
    const h = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setPaletteOpen(v => !v); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  /* lock scroll */
  useEffect(() => {
    document.body.style.overflow = (mobileOpen || paletteOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, paletteOpen]);

  /* close mobile on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  /* nav link click handler */
  const handleNavClick = (link, e) => {
    if (link.type === "hash") {
      e.preventDefault();
      if (!isHome) {
        navigate("/");
        setTimeout(() => scrollToHash(link.path), 380);
      } else {
        scrollToHash(link.path);
      }
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  };

  /* is a nav link "active"? */
  const isActive = (link) => {
    if (link.type === "route") {
      if (link.path === "/") return location.pathname === "/" && !activeHash;
      return location.pathname.startsWith(link.path);
    }
    if (link.type === "hash") return isHome && activeHash === link.path;
    return false;
  };

  const linkStyle = (active) => ({
    fontFamily:"var(--f-body)", fontSize:14, fontWeight:500,
    color: active ? "var(--c-primary)" : "var(--c-text-2)",
    textDecoration:"none", padding:"7px 14px", borderRadius:8,
    background: active ? "var(--c-primary-dim)" : "transparent",
    transition:"color var(--t-fast), background var(--t-fast)",
    display:"block",
  });

  return (
    <>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <header className={`apex-nav${scrolled ? " scrolled" : ""}`}>
        <div className="apex-nav-inner">

          {/* Logo */}
          <Link to="/" className="apex-logo" onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}>
            <div className="apex-logo-mark">L</div>
            <span className="apex-logo-text">leul<span>.dev</span></span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary">
            <ul className="apex-nav-links">
              {NAV_LINKS.map(link => (
                <li key={link.title}>
                  {link.type === "hash" ? (
                    <a
                      href={link.path}
                      style={linkStyle(isActive(link))}
                      onClick={e => handleNavClick(link, e)}
                      onMouseEnter={e => { if (!isActive(link)) { e.currentTarget.style.color="var(--c-primary)"; e.currentTarget.style.background="var(--c-primary-dim)"; }}}
                      onMouseLeave={e => { if (!isActive(link)) { e.currentTarget.style.color="var(--c-text-2)"; e.currentTarget.style.background="transparent"; }}}
                    >
                      {link.title}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      style={linkStyle(isActive(link))}
                      onMouseEnter={e => { if (!isActive(link)) { e.currentTarget.style.color="var(--c-primary)"; e.currentTarget.style.background="var(--c-primary-dim)"; }}}
                      onMouseLeave={e => { if (!isActive(link)) { e.currentTarget.style.color="var(--c-text-2)"; e.currentTarget.style.background="transparent"; }}}
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right controls */}
          <div className="apex-nav-right">
            {/* ⌘K palette button */}
            <button
              className="apex-palette-hint-btn"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
            >
              ⌘ Search <kbd>K</kbd>
            </button>

            {/* Resume download */}
            <a
              href="/Leul_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="apex-nav-icon-btn"
              title="Download Resume"
              aria-label="Download Resume"
            >
              <FaDownload size={13} />
            </a>

            {/* Hire Me */}
            <a
              href="#contact"
              className="apex-hire-btn"
              onClick={e => { e.preventDefault(); if (!isHome) { navigate("/"); setTimeout(() => scrollToHash("#contact"), 380); } else scrollToHash("#contact"); }}
            >
              Hire Me
            </a>

            {/* Hamburger */}
            <button
              className={`apex-hamburger${mobileOpen ? " open" : ""}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="apex-mobile-menu"
            initial={{ opacity:0, y:-16 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-8 }}
            transition={{ duration:0.22, ease:[0.23,1,0.32,1] }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.title}
                initial={{ opacity:0, x:-20 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: i * 0.07 }}
              >
                {link.type === "hash" ? (
                  <a
                    href={link.path}
                    className={`apex-mobile-link${isActive(link) ? " active" : ""}`}
                    style={{ color: isActive(link) ? "var(--c-primary)" : undefined }}
                    onClick={e => handleNavClick(link, e)}
                  >
                    {link.title}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    className={`apex-mobile-link${isActive(link) ? " active" : ""}`}
                    style={{ color: isActive(link) ? "var(--c-primary)" : undefined }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.title}
                  </Link>
                )}
              </motion.div>
            ))}

            {/* Social row */}
            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay: NAV_LINKS.length * 0.07 + 0.05 }}
              style={{ display:"flex", gap:12, marginTop:"1rem" }}
            >
              {[
                { href:"https://github.com/leul-dev2", icon:<FaGithub size={16}/> },
                { href:"https://www.linkedin.com/in/leul-seyoum/", icon:<FaLinkedin size={16}/> },
                { href:"mailto:leulsegedseyoum@gmail.com", icon:<FaEnvelope size={16}/> },
              ].map(({ href, icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener" style={{ width:40, height:40, borderRadius:10, background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--c-muted)", textDecoration:"none" }}>
                  {icon}
                </a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              transition={{ delay: NAV_LINKS.length * 0.07 + 0.12 }}
              style={{ marginTop:"1.5rem" }}
            >
              <a
                href="#contact"
                className="apex-btn-primary"
                onClick={e => { e.preventDefault(); setMobileOpen(false); if (!isHome) { navigate("/"); setTimeout(() => scrollToHash("#contact"), 380); } else scrollToHash("#contact"); }}
              >
                Hire Me →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
