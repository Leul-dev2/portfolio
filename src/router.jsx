import React from "react";
import Home from "./sections/Home/Home";
import About from "./sections/About/About";
import Contact from "./sections/Contact/Contact";
import Services from "./sections/Services/services";
import Projects from "./sections/Projects/progect"; 
import Education from "./sections/Education/Education";
import Experience from "./sections/Experience/Experience";

export default function AppRouter() {
  return (
    <>
      <Home />
      <About />
      <Experience />
      <Education />
      <Services />
      <Projects />
      <Contact />
    </>
  );
}
