"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { DistributionMap } from "@/lib/skb-stmkg/types";

interface ScoreDistributionProps {
  distributionMap: DistributionMap;
}

export const ScoreDistribution: React.FC<ScoreDistributionProps> = ({
  distributionMap,
}) => {
  const subjects = Object.keys(distributionMap);
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0]);

  const currentData = distributionMap[selectedSubject] || [];

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-heading text-slate-50">
            Distribusi Nilai Peserta
          </h2>
          <p className="text-xs text-slate-400">
            Sebaran rentang nilai peserta berdasarkan data historis seleksi STMKG.
          </p>
        </div>

        {/* Subject Dropdown Selector */}
        <div className="flex items-center space-x-2">
          <label htmlFor="subject-select" className="text-xs text-slate-400 font-medium">
            Pilih Komponen Nilai:
          </label>
          <select
            id="subject-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-indigo-300 font-medium focus:outline-none focus:border-indigo-500"
          >
            {subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-[240px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }}
              formatter={(val: any) => [`${val} Peserta`, "Jumlah"]}
            />
            <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} name="Jumlah Peserta" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
