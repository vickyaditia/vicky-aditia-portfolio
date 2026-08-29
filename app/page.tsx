"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { AuthoryHeader } from "./components/AuthoryHeader";
import { FilterToolbar } from "./components/FilterToolbar";
import { AuthoryProjectCard } from "./components/AuthoryProjectCard";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { InteractiveLab } from "./components/sections/InteractiveLab";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/Footer";
import { projectsData } from "./data/projects";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All Work");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add("All Work");
    projectsData.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const matchCategory =
        selectedCategory === "All Work" || p.category === selectedCategory;

      const q = searchQuery.toLowerCase();
      const matchSearch =
        p.title.toLowerCase().includes(q) ||
        p.problemStatement.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-slate-900 text-slate-50 min-h-screen">
      <Navbar />
      
      {/* 01. AUTHORY PROFILE HEADER */}
      <AuthoryHeader />

      {/* 02. AUTHORY FILTER & SEARCH TOOLBAR */}
      <FilterToolbar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCount={filteredProjects.length}
      />

      {/* 03. AUTHORY PROJECT CARDS STREAM */}
      <section id="projects" className="py-12 border-b border-slate-700/60">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-sans">
              Tidak ada proyek yang sesuai dengan kata kunci "{searchQuery}".
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 gap-8"
                  : "space-y-4"
              }
            >
              {filteredProjects.map((project) => (
                <AuthoryProjectCard
                  key={project.id}
                  project={project}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 04. TECH STACK & KEAHLIAN */}
      <Skills />

      {/* 05. REKAM JEJAK PENGALAMAN & PENDIDIKAN */}
      <Experience />

      {/* 06. INTERACTIVE DATA LAB (BONUS DEMO) */}
      <InteractiveLab />

      {/* 07. KONTAK & FOOTER */}
      <Contact />
      <Footer />
    </div>
  );
}
