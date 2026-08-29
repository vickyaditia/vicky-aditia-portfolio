"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { projectsData } from "@/data/projects";

export const FeaturedProjects: React.FC = () => {
  return (
    <Container id="projects">
      <SectionHeading
        badgeText="PROYEK UNGGULAN"
        title="Portofolio Proyek Data Science Real"
        description="Empat proyek unggulan yang memecahkan masalah efisiensi energi industri, rekomendasi akademis, dan pemrosesan ulasan teks."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </Container>
  );
};
