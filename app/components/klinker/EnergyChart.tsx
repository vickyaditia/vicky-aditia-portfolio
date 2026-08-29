"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { DailyKlinkerRecord } from "@/lib/klinker/types";

interface EnergyChartProps {
  data: DailyKlinkerRecord[];
}

export const EnergyChart: React.FC<EnergyChartProps> = ({ data }) => {
  return (
    <div id="energy" className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
      <div>
        <h2 className="text-lg font-bold font-heading text-slate-50">
          Prediksi Biaya Energi (Total per Hari)
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Stacked area breakdown estimasi pengeluaran energi harian: Listrik, Solar, dan Batu Bara.
        </p>
      </div>

      <div className="h-[320px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="tanggal"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              tickFormatter={(val) => val.substring(5)}
            />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }}
              formatter={(val: any) => [`Rp ${val} Juta`, ""]}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
            <Area
              type="monotone"
              dataKey="listrikCost"
              stackId="1"
              stroke="#38bdf8"
              fill="#38bdf8"
              fillOpacity={0.6}
              name="Biaya Listrik (Rp Juta)"
            />
            <Area
              type="monotone"
              dataKey="solarCost"
              stackId="1"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.6}
              name="Biaya Solar (Rp Juta)"
            />
            <Area
              type="monotone"
              dataKey="batubaraCost"
              stackId="1"
              stroke="#a855f7"
              fill="#a855f7"
              fillOpacity={0.6}
              name="Biaya Batu Bara (Rp Juta)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
