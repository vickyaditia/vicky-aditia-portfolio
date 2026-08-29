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
  ReferenceLine,
} from "recharts";
import { DailyKlinkerRecord, FeatureImportanceItem } from "@/lib/klinker/types";

interface ProductionAnalysisProps {
  data: DailyKlinkerRecord[];
  features: FeatureImportanceItem[];
}

export const ProductionAnalysis: React.FC<ProductionAnalysisProps> = ({
  data,
  features,
}) => {
  // Generate histogram distribution bins
  const distributionData = React.useMemo(() => {
    const bins: { range: string; count: number }[] = [
      { range: "< 4k ton", count: 0 },
      { range: "4k - 5.5k", count: 0 },
      { range: "5.5k - 7k", count: 0 },
      { range: "7k - 8.5k", count: 0 },
      { range: "> 8.5k ton", count: 0 },
    ];

    data.forEach((r) => {
      const p = r.aktual;
      if (p < 4000) bins[0].count++;
      else if (p < 5500) bins[1].count++;
      else if (p < 7000) bins[2].count++;
      else if (p < 8500) bins[3].count++;
      else bins[4].count++;
    });

    return bins;
  }, [data]);

  return (
    <div id="analysis" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* A. DISTRIBUSI PRODUKSI KLINKER */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <h2 className="text-lg font-bold font-heading text-slate-50">
            Distribusi Produksi Klinker
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            Histogram frekuensi sebaran volume produksi harian dengan indikator rerata.
          </p>
        </div>

        <div className="h-[260px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="range" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }}
                formatter={(val: any) => [`${val} Hari`, "Frekuensi"]}
              />
              <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} name="Frekuensi Hari" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* B. TOP 5 FEATURE IMPORTANCE (XGBoost) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div>
          <h2 className="text-lg font-bold font-heading text-slate-50">
            Top 5 Fitur Terpenting (XGBoost Model)
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            Nilai feature importance yang diekstrak langsung dari trained XGBoost Regressor model.
          </p>
        </div>

        <div className="h-[260px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={features} margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#94a3b8" fontSize={11} domain={[0, 0.5]} />
              <YAxis dataKey="feature" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={110} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }}
                formatter={(val: any) => [`Score: ${Number(val).toFixed(2)}`, "Importance"]}
              />
              <Bar dataKey="importance" fill="#38bdf8" radius={[0, 6, 6, 0]} name="Feature Importance" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
