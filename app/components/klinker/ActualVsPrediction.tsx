"use client";

import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { DailyKlinkerRecord } from "@/lib/klinker/types";

interface ActualVsPredictionProps {
  data: DailyKlinkerRecord[];
}

export const ActualVsPrediction: React.FC<ActualVsPredictionProps> = ({ data }) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
      <div>
        <h2 className="text-lg font-bold font-heading text-slate-50">
          Scatter Plot: Aktual vs Prediksi
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Sebaran data titik prediksi terhadap nilai aktual. Garis putus-putus hijau menandakan acuan ideal y = x.
        </p>
      </div>

      <div className="h-[300px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              type="number"
              dataKey="aktual"
              name="Produksi Aktual"
              unit=" ton"
              stroke="#94a3b8"
              fontSize={11}
              domain={[3000, 9500]}
            />
            <YAxis
              type="number"
              dataKey="prediksi"
              name="Produksi Prediksi"
              unit=" ton"
              stroke="#94a3b8"
              fontSize={11}
              domain={[3000, 9500]}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <ReferenceLine
              segment={[
                { x: 3000, y: 3000 },
                { x: 9500, y: 9500 },
              ]}
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{ value: "Garis Acuan y = x", fill: "#10b981", fontSize: 11, position: "top" }}
            />
            <Scatter name="Sampel Produksi" data={data} fill="#38bdf8" opacity={0.7} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
