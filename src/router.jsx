import React from "react";
import Home from "./sections/Home/Home";
import About from "./sections/About/About";
import Contact from "./sections/Contact/Contact";
import Services from "./sections/Services/services";
import Projects from "./sections/Projects/progect"; 
import Blog from "./sections/Blog and Articles/Blog";

export default function AppRouter() {
  return (
    <>
      <Home />
      <About />
      <Services />
      <Projects />
   <Blog />
      <Contact />
    </>
  );
}
