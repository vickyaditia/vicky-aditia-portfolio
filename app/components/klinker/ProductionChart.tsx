"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { DailyKlinkerRecord } from "@/lib/klinker/types";

interface ProductionChartProps {
  data: DailyKlinkerRecord[];
}

export const ProductionChart: React.FC<ProductionChartProps> = ({ data }) => {
  const [range, setRange] = useState<"all" | "q1" | "q2" | "q3" | "q4">("all");

  const filteredData = React.useMemo(() => {
    if (range === "q1") return data.slice(0, 90);
    if (range === "q2") return data.slice(90, 181);
    if (range === "q3") return data.slice(181, 273);
    if (range === "q4") return data.slice(273, 365);
    return data;
  }, [data, range]);

  return (
    <div id="production" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-heading text-slate-50">
            Produksi Klinker: Aktual vs Prediksi
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            Komparasi tren historis produksi terak aktual vs estimasi regresi model XGBoost.
          </p>
        </div>

        {/* Filter Quarter Buttons */}
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-sans">
          {(["all", "q1", "q2", "q3", "q4"] as const).map((q) => (
            <button
              key={q}
              onClick={() => setRange(q)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                range === q
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {q.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[320px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="tanggal"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              tickFormatter={(val) => val.substring(5)}
            />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={["auto", "auto"]} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }}
              formatter={(val: any) => [`${Number(val).toLocaleString()} ton`, ""]}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Line
              type="monotone"
              dataKey="aktual"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={false}
              name="Produksi Aktual (Ton)"
            />
            <Line
              type="monotone"
              dataKey="prediksi"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name="Prediksi Model (Ton)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
