import React from "react";
import distributionData from "@/data/cement-strength/distribution.json";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from "recharts";

interface HistoricalDistributionProps {
  predictedValue: number | null;
}

export const HistoricalDistribution: React.FC<HistoricalDistributionProps> = ({
  predictedValue,
}) => {
  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-slate-900 dark:text-slate-100">
            Posisi Prediksi terhadap Data Historis
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Distribusi frekuensi kuat tekan 28 hari pada populasi data historis (kg/cm²).
          </p>
        </div>

        {predictedValue !== null && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            <span>Prediksi Anda: {predictedValue.toFixed(1)} kg/cm²</span>
          </div>
        )}
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={distributionData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={{ stroke: "#475569" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={{ stroke: "#475569" }}
              label={{ value: "Jumlah Sampel", angle: -90, position: "insideLeft", style: { textAnchor: 'middle', fill: '#94a3b8', fontSize: 11 } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                borderColor: "#334155",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "12px",
              }}
              formatter={(value: any) => [`${value} Sampel`, "Frekuensi"]}
              labelFormatter={(label: any) => `Kuat Tekan: ${label} kg/cm²`}
            />

            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {distributionData.map((entry, index) => {
                const isHighlight =
                  predictedValue !== null &&
                  predictedValue >= entry.minVal &&
                  predictedValue <= entry.maxVal;

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={isHighlight ? "#06b6d4" : "#3b82f6"}
                    opacity={isHighlight ? 1 : 0.65}
                  />
                );
              })}
            </Bar>

            {predictedValue !== null && (
              <ReferenceLine
                x={
                  distributionData.find(
                    (d) => predictedValue >= d.minVal && predictedValue <= d.maxVal
                  )?.range
                }
                stroke="#06b6d4"
                strokeWidth={3}
                strokeDasharray="4 4"
                label={{
                  value: `Prediksi (${predictedValue.toFixed(1)})`,
                  position: "top",
                  fill: "#06b6d4",
                  fontSize: 11,
                  fontWeight: "bold",
                }}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
