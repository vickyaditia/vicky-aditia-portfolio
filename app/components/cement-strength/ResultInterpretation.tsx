import React from "react";
import { PredictionOutput } from "@/lib/cement-strength/types";
import { FileText, Lightbulb } from "lucide-react";

interface ResultInterpretationProps {
  result: PredictionOutput | null;
}

export const ResultInterpretation: React.FC<ResultInterpretationProps> = ({ result }) => {
  if (!result) return null;

  const minSimilar = result.similarSamples.length > 0 ? Math.min(...result.similarSamples.map(s => s.strength28)) : 0;
  const maxSimilar = result.similarSamples.length > 0 ? Math.max(...result.similarSamples.map(s => s.strength28)) : 0;

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-cyan-500/5 via-slate-900/40 to-slate-900/60 border border-cyan-500/20 rounded-xl shadow-md mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
          <Lightbulb className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-heading font-semibold text-slate-900 dark:text-slate-100">
          Interpretasi Otomatis
        </h2>
      </div>

      <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
        <p className="flex items-start gap-2">
          <FileText className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
          <span>
            Berdasarkan karakteristik kimia yang dimasukkan, model memperkirakan kuat tekan semen setelah 28 hari sebesar{" "}
            <strong className="font-mono text-cyan-600 dark:text-cyan-400">{result.prediction.toFixed(1)} {result.unit}</strong>. Nilai tersebut sekitar{" "}
            <strong className="font-mono">{result.differencePercent.toFixed(1)}% {result.isAboveMean ? "di atas" : "di bawah"}</strong> rata-rata data historis ({result.historicalMean.toFixed(1)} {result.unit}).
          </span>
        </p>

        <p className="flex items-start gap-2">
          <FileText className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
          <span>
            Prediksi ini berada dalam kelompok <strong className="font-semibold text-emerald-600 dark:text-emerald-400">{result.category}</strong> dibanding distribusi sampel historis laboratorium.
          </span>
        </p>

        {result.similarSamples.length > 0 && (
          <p className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
            <span>
              Sampel historis dengan karakteristik paling serupa memiliki kuat tekan 28 hari pada kisaran{" "}
              <strong className="font-mono">{minSimilar.toFixed(1)} – {maxSimilar.toFixed(1)} {result.unit}</strong>.
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
