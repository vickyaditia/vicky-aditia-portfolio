"use client";

import React from "react";
import { Calendar, Filter, Clock } from "lucide-react";

export const DashboardHeader: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-50 tracking-tight">
          Optimasi Produksi Klinker & Prediksi Biaya Energi
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
          Dashboard prediksi produksi klinker dan optimasi biaya energi menggunakan Machine Learning (XGBoost Regressor).
        </p>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-sans">
        {/* Date Range Picker Display */}
        <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span className="font-mono">01/01/2023 — 31/12/2023</span>
        </div>

        {/* Disabled Shift Filter (No shift column in raw data) */}
        <div
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-900/50 border border-slate-800/50 text-slate-500 cursor-not-allowed opacity-60"
          title="Shift Filter tidak tersedia pada dataset mentah (Hide / Disabled)"
        >
          <Clock className="w-4 h-4 text-slate-500" />
          <span>Semua Shift (Disabled)</span>
        </div>
      </div>
    </div>
  );
};
