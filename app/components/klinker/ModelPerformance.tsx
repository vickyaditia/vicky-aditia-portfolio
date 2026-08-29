"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ModelMetrics } from "@/lib/klinker/types";

interface ModelPerformanceProps {
  metrics: ModelMetrics;
}

export const ModelPerformance: React.FC<ModelPerformanceProps> = ({ metrics }) => {
  const pieData = [
    { name: "Explained Variance (R²)", value: metrics.r2 * 100 },
    { name: "Unexplained Residual", value: (1 - metrics.r2) * 100 },
  ];

  const COLORS = ["#10b981", "#334155"];

  return (
    <div id="performance" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
      <div>
        <h2 className="text-lg font-bold font-heading text-slate-50">
          Evaluasi Performa Model Machine Learning (XGBoost Regressor)
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Matriks pengujian statistik dari hasil evaluasi 5-Fold Cross-Validation pada dataset operasional 2023.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Donut Chart with Centered R2 */}
        <div className="relative h-[200px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-xs text-slate-400 font-mono">R² SCORE</span>
            <span className="text-2xl font-extrabold font-heading text-emerald-400">
              {(metrics.r2 * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 font-sans text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400 font-medium">R² Score</div>
            <div className="text-xl font-bold font-heading text-emerald-400">{metrics.r2}</div>
            <div className="text-[10px] text-slate-500">Goodness of fit</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400 font-medium">MAE</div>
            <div className="text-xl font-bold font-heading text-slate-100">{metrics.mae}</div>
            <div className="text-[10px] text-slate-500">Mean Abs Error (ton)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400 font-medium">RMSE</div>
            <div className="text-xl font-bold font-heading text-slate-100">{metrics.rmse}</div>
            <div className="text-[10px] text-slate-500">Root Mean Sq Error</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400 font-medium">MAPE</div>
            <div className="text-xl font-bold font-heading text-emerald-400">{metrics.mape}</div>
            <div className="text-[10px] text-slate-500">Mean Abs Pct Error</div>
          </div>
        </div>
      </div>
    </div>
  );
};
