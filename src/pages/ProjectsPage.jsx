import Projects from "../sections/Projects/progect";
import Footer from "../sections/fotter/footer";

export default function ProjectsPage() {
  return (
    <main style={{ paddingTop: 68, background: "var(--c-bg)", minHeight: "100vh" }}>
      <Projects />
      <Footer />
    </main>
  );
}
