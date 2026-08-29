"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";
import { SkbSimulationResult } from "@/lib/skb-stmkg/types";

interface SimulationResultProps {
  result: SkbSimulationResult | null;
}

export const SimulationResult: React.FC<SimulationResultProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3 font-sans">
        <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-200 font-heading">
          Hasil Simulasi
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Masukkan nilai Anda pada formulir di sebelah dan klik <span className="text-indigo-400 font-semibold">Simulasikan</span> untuk melihat estimasi peluang kelulusan.
        </p>
      </div>
    );
  }

  const isLulus = result.predictionLabel === "LULUS";

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 font-sans animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <span className="text-xs font-mono text-slate-400">HASIL SIMULASI PREDIKSI</span>
        <span
          className={`px-3 py-0.5 rounded-full text-xs font-bold font-mono ${
            isLulus ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-400" : "bg-amber-500/15 border border-amber-500/40 text-amber-400"
          }`}
        >
          {result.categoryLabel}
        </span>
      </div>

      {/* Main Outcome Badge */}
      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
        <div className="inline-flex items-center justify-center space-x-2">
          {isLulus ? (
            <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
          ) : (
            <AlertTriangle className="w-10 h-10 text-amber-400" />
          )}
          <span className={`text-3xl font-extrabold font-heading ${isLulus ? "text-emerald-400" : "text-amber-400"}`}>
            {result.predictionLabel}
          </span>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-slate-400">Estimasi Probabilitas Kelulusan:</div>
          <div className="text-2xl font-bold font-heading text-slate-50">
            {result.probability}%
          </div>
        </div>

        {/* Probability Progress Bar */}
        <div className="w-full bg-slate-900 rounded-full h-3.5 overflow-hidden border border-slate-800 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isLulus ? "bg-emerald-500" : "bg-amber-500"
            }`}
            style={{ width: `${result.probability}%` }}
          />
        </div>
      </div>

      {/* Safe Interpretation Wording */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
        {result.interpretationMessage}
      </div>
    </div>
  );
};
