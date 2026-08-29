import React from "react";
import { PredictionOutput } from "@/lib/cement-strength/types";
import { CheckCircle2, ArrowUpRight, ArrowDownRight, Award } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface PredictionResultCardProps {
  result: PredictionOutput | null;
}

export const PredictionResultCard: React.FC<PredictionResultCardProps> = ({ result }) => {
  if (!result) {
    return (
      <div className="p-6 md:p-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-400 mb-4">
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-slate-700 dark:text-slate-300">
          Belum Ada Hasil Prediksi
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          Masukkan karakteristik sampel kimia di samping dan klik tombol <span className="font-semibold text-cyan-500">"Prediksi Kuat Tekan"</span> untuk menghitung estimasi 28 hari.
        </p>
      </div>
    );
  }

  const categoryColor =
    result.category === "Relatif Tinggi"
      ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/30"
      : result.category === "Rentang Umum Historis"
      ? "text-cyan-500 bg-cyan-500/10 border-cyan-500/30"
      : "text-amber-500 bg-amber-500/10 border-amber-500/30";

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Hasil Prediksi Model
          </span>
          <Badge variant="emerald" className={categoryColor}>
            {result.category}
          </Badge>
        </div>

        <div className="my-4 text-center py-6 px-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
          <div className="text-5xl md:text-6xl font-bold font-mono text-cyan-600 dark:text-cyan-400 tracking-tight">
            {result.prediction.toFixed(1)}
          </div>
          <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">
            Kuat Tekan Semen Umur 28 Hari ({result.unit})
          </div>

          <div className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-slate-200/70 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            {result.isAboveMean ? (
              <ArrowUpRight className="w-4 h-4 text-emerald-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-amber-500" />
            )}
            <span>
              {result.isAboveMean ? "+" : "-"}
              {result.differencePercent.toFixed(1)}% dibanding rata-rata historis
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed text-center">
          Diprediksi menggunakan Deep Multi-Layer Perceptron trained pada 454 data sampel laboratorium historis.
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Model Ready
        </span>
        <span className="font-mono">Rerata: {result.historicalMean.toFixed(1)} {result.unit}</span>
      </div>
    </div>
  );
};
