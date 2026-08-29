import React from "react";
import { Hero } from "./components/sections/Hero";
import { FeaturedProjects } from "./components/sections/FeaturedProjects";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { InteractiveLab } from "./components/sections/InteractiveLab";
import { Contact } from "./components/sections/Contact";

export default function Home() {
  return (
    <main className="space-y-4 bg-slate-950 text-slate-100 min-h-screen">
      <Hero />
      <FeaturedProjects />
      <Skills />
      <Experience />
      <InteractiveLab />
      <Contact />
    </main>
  );
}
