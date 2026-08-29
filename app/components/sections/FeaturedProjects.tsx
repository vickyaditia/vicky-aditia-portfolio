"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
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
            <Card className="h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <Badge variant="emerald">{project.surfaceMetric}</Badge>
                </div>

                <h3 className="text-xl font-bold text-slate-100 font-heading leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs font-mono text-slate-400">{project.role}</p>

                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>GITHUB REPO</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};
