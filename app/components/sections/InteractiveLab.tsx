"use client";

import React, { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { projectsData } from "@/data/projects";

export const InteractiveLab: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(projectsData[0].id);
  const activeProject = projectsData.find((p) => p.id === selectedProjectId) || projectsData[0];

  return (
    <Container id="lab">
      <SectionHeading
        badgeText="INTERACTIVE DATA LAB (DEMO)"
        title="Coba Eksplorasi Data & Prediksi Model"
        description="Bagian demo interaktif untuk melihat grafik hasil pengujian model Machine Learning pada setiap dataset proyek."
      />

      <Card className="space-y-6">
        {/* Dataset Selector Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-700/60 pb-4">
          {projectsData.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-sans font-medium transition-all ${
                selectedProjectId === p.id
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
              }`}
            >
              {p.title.split(" (")[0]}
            </button>
          ))}
        </div>

        {/* Recharts Bar Visualization & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 h-[260px] bg-slate-900 p-4 rounded-lg border border-slate-700/60">
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
            <h4 className="text-lg font-bold text-slate-50 font-heading">
              {activeProject.title}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {activeProject.problemStatement}
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-700/60 text-xs font-semibold text-emerald-400">
              Metrik Utama: {activeProject.impactMetric}
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};
