import React from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { ProjectItem } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group transition-all duration-300 transform hover:-translate-y-1">
      <Card className="h-full flex flex-col justify-between space-y-6 group-hover:border-emerald-500/50">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-sans text-slate-400 font-medium">
              {project.category}
            </span>
            <Badge variant="emerald">{project.impactMetric}</Badge>
          </div>

          <h3 className="text-xl font-bold text-slate-50 font-heading leading-snug group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-slate-300 font-sans leading-relaxed">
            {project.problemStatement}
          </p>

          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-700/60 space-y-1">
            <div className="text-xs text-slate-400 font-sans">Hasil Bisnis:</div>
            <div className="text-xs font-semibold text-emerald-400 font-sans">
              {project.impactDescription}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 text-[11px] font-sans border border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-sans font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>{project.urlLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </a>

          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-700 rounded transition-colors"
            title={project.urlLabel}
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </Card>
    </div>
  );
};
