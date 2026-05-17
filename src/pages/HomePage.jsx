import Home     from "../sections/Home/Home";
import About    from "../sections/About/About";
import Services from "../sections/Services/services";
import Projects from "../sections/Projects/progect";
import Skills   from "../sections/Skills/skill";
import Blog     from "../sections/Blog and Articles/Blog";
import Contact  from "../sections/Contact/Contact";
import Footer   from "../sections/fotter/footer";

export default function HomePage() {
  return (
    <main style={{ background:"var(--c-bg)" }}>
      <Home />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
