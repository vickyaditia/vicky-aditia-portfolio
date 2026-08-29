import React from "react";
import summaryData from "@/data/cement-strength/summary.json";
import { Database, Activity, Gauge } from "lucide-react";

export const HistoricalSummary: React.FC = () => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-heading font-semibold text-slate-900 dark:text-slate-100 mb-4">
        Ringkasan Data Historis
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Data Historis
            </span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-50">
            {summaryData.totalObservations.toLocaleString()}{" "}
            <span className="text-xs font-normal text-slate-500">Observasi</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Sampel valid yang digunakan dalam pelatihan model
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Rata-rata Kuat Tekan 28 Hari
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {summaryData.meanStrength28Day.toFixed(1)}{" "}
            <span className="text-xs font-normal text-slate-500">{summaryData.unit}</span>
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Rerata historis populasi (Median: {summaryData.medianStrength28Day} {summaryData.unit})
          </p>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Rentang Kuat Tekan
            </span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Gauge className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-50">
            {summaryData.minStrength28Day.toFixed(1)} – {summaryData.maxStrength28Day.toFixed(1)}
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Min – Max {summaryData.unit} pada dataset historis
          </p>
        </div>
      </div>
    </div>
  );
};
