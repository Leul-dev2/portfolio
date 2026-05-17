import Blog from "../sections/Blog and Articles/Blog";
import Footer from "../sections/fotter/footer";

export default function BlogPage() {
  return (
    <main style={{ paddingTop: 68, background: "var(--c-bg)", minHeight: "100vh" }}>
      <Blog />
      <Footer />
    </main>
  );
}
