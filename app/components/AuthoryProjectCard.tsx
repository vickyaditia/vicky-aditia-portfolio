"use client";

import React, { useState } from "react";
import { ArrowUpRight, Github, ChevronDown, ChevronUp, Layers, CheckCircle2 } from "lucide-react";
import { Badge } from "./ui/Badge";
import { ProjectItem } from "@/data/projects";

interface AuthoryProjectCardProps {
  project: ProjectItem;
  viewMode: "grid" | "list";
}

export const AuthoryProjectCard: React.FC<AuthoryProjectCardProps> = ({
  project,
  viewMode,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-6 bg-slate-800/80 border border-slate-700/80 rounded-xl hover:border-emerald-500/50 transition-all duration-300 space-y-5 group">
      {/* Card Top Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-sans font-medium text-emerald-400">
            {project.category}
          </span>
          <Badge variant="emerald">{project.impactMetric}</Badge>
        </div>

        <h3 className="text-xl font-bold font-heading text-slate-50 group-hover:text-emerald-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-slate-300 font-sans leading-relaxed">
          {project.problemStatement}
        </p>

        <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-700/60 space-y-1">
          <div className="text-[11px] text-slate-400 font-sans">Hasil Bisnis:</div>
          <div className="text-xs font-semibold text-emerald-400 font-sans">
            {project.impactDescription}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
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

      {/* Step-by-Step Data Science Pipeline Accordion */}
      <div className="border-t border-slate-700/60 pt-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between text-xs font-heading font-semibold text-slate-300 hover:text-emerald-400 transition-colors py-1.5"
        >
          <span className="flex items-center">
            <Layers className="w-4 h-4 mr-2 text-emerald-400" />
            <span>Alur Step-by-Step Data Science ({project.steps.length} Langkah)</span>
          </span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expanded && (
          <div className="mt-3 space-y-3 pl-2 border-l-2 border-emerald-500/40 text-xs font-sans animate-in fade-in duration-200">
            {project.steps.map((step) => (
              <div key={step.stepNumber} className="space-y-1 pl-3 relative">
                <span className="absolute -left-[17px] top-0.5 w-2 h-2 rounded-full bg-emerald-400" />
                <div className="font-bold text-slate-100">
                  Langkah {step.stepNumber}: {step.title}
                </div>
                <div className="text-slate-400 leading-relaxed">
                  {step.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Direct Link CTA */}
      <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
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
          className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-700 rounded transition-colors"
          title={project.urlLabel}
        >
          <Github className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
