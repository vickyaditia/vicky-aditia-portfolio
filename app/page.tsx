import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/sections/Hero";
import { FeaturedProjects } from "./components/sections/FeaturedProjects";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { InteractiveLab } from "./components/sections/InteractiveLab";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-slate-900 text-slate-50 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProjects />
        <Skills />
        <Experience />
        <InteractiveLab />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
