"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { projectsData } from "@/data/projects";

export const InteractiveLab: React.FC = () => {
  const [activeProject, setActiveProject] = useState(projectsData[0]);

  return (
    <Container id="lab">
      <SectionHeading
        badgeText="INTERACTIVE DATA LAB (BONUS)"
        title="Simulasi Visualisasi & Model Performance"
        description="Eksplorasi grafik interaktif hasil prediksi model Machine Learning real untuk setiap proyek unggulan."
      />

      <Card className="space-y-6">
        {/* Project Selector Pills */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {projectsData.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                activeProject.id === p.id
                  ? "bg-emerald-500 text-slate-950 font-bold"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {p.title.split(" (")[0]}
            </button>
          ))}
        </div>

        {/* Selected Project Chart & Metric */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 h-[260px] bg-slate-950/60 p-4 rounded-lg border border-slate-800">
            {activeProject.chartData && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeProject.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }}
                  />
                  <Bar dataKey="val" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="space-y-4 font-sans">
            <Badge variant="emerald">{activeProject.category}</Badge>
            <h4 className="text-lg font-bold text-slate-100 font-heading">
              {activeProject.title}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {activeProject.description}
            </p>
            <div className="p-3 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
              Metrik Surface: {activeProject.surfaceMetric}
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};
