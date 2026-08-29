"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { SkbSimulationInput, SkbStatistics } from "@/lib/skb-stmkg/types";
import { Lightbulb } from "lucide-react";

interface ScoreComparisonProps {
  userInput: SkbSimulationInput | null;
  stats: SkbStatistics;
  insights: string[];
}

export const ScoreComparison: React.FC<ScoreComparisonProps> = ({
  userInput,
  stats,
  insights,
}) => {
  if (!userInput) return null;

  const chartData = [
    { subject: "Matematika", Kamu: userInput.matematika, RataRata: stats.matematika },
    { subject: "Fisika", Kamu: userInput.fisika, RataRata: stats.fisika },
    { subject: "B. Inggris", Kamu: userInput.bahasaInggris, RataRata: stats.bahasaInggris },
    { subject: "MetKlim", Kamu: userInput.metklim, RataRata: stats.metklim },
    { subject: "Geofisika", Kamu: userInput.geofisika, RataRata: stats.geofisika },
  ];

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 font-sans">
      <div>
        <h2 className="text-lg font-bold font-heading text-slate-50">
          Nilai Kamu vs Data Historis
        </h2>
        <p className="text-xs text-slate-400">
          Perbandingan langsung antara skor nilai simulasi Anda dengan rerata peserta seleksi.
        </p>
      </div>

      <div className="h-[260px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }}
              formatter={(val: any) => [`${val} Poin`, ""]}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Bar dataKey="Kamu" fill="#6366f1" radius={[4, 4, 0, 0]} name="Nilai Kamu" />
            <Bar dataKey="RataRata" fill="#64748b" radius={[4, 4, 0, 0]} name="Rata-rata Dataset" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {insights.length > 0 && (
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-slate-200 space-y-2">
          <div className="flex items-center space-x-1.5 text-indigo-400 font-bold font-heading">
            <Lightbulb className="w-4 h-4" />
            <span>Analisis Perbandingan:</span>
          </div>
          <ul className="space-y-1 list-disc pl-4 text-slate-300">
            {insights.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
