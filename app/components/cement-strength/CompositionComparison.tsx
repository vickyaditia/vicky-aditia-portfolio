import React from "react";
import { CementInputFeatures, FeatureStat } from "@/lib/cement-strength/types";
import statisticsData from "@/data/cement-strength/statistics.json";
import { Sliders } from "lucide-react";

interface CompositionComparisonProps {
  inputs: CementInputFeatures;
}

export const CompositionComparison: React.FC<CompositionComparisonProps> = ({ inputs }) => {
  const stats = statisticsData as FeatureStat[];

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-slate-900 dark:text-slate-100">
            Komposisi Sampel vs Rata-rata Historis
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Perbandingan nilai parameter masukan sampel Anda terhadap nilai rerata populasi historis.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-sans">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">
              <th className="py-3 px-4">Parameter Kimia</th>
              <th className="py-3 px-4">Simbol</th>
              <th className="py-3 px-4">Nilai Sampel Anda</th>
              <th className="py-3 px-4">Rata-rata Historis</th>
              <th className="py-3 px-4">Selisih Absolut</th>
              <th className="py-3 px-4 text-right">Rentang Normal Historis</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {stats.map((stat) => {
              const userVal = inputs[stat.key];
              const diff = userVal - stat.mean;
              const diffPercent = (diff / stat.mean) * 100;
              const isDiffSignificant = Math.abs(diffPercent) > 15;

              return (
                <tr key={stat.key} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                    {stat.label}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {stat.symbol}
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-900 dark:text-slate-100">
                    {userVal.toFixed(2)} {stat.unit}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">
                    {stat.mean.toFixed(2)} {stat.unit}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded font-semibold ${
                        isDiffSignificant
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {diff >= 0 ? "+" : ""}
                      {diff.toFixed(2)} ({diffPercent >= 0 ? "+" : ""}
                      {diffPercent.toFixed(1)}%)
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-right text-slate-500">
                    {stat.min} – {stat.max} {stat.unit}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
