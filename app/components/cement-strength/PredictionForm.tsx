import React from "react";
import { CementInputFeatures, FeatureStat } from "@/lib/cement-strength/types";
import statisticsData from "@/data/cement-strength/statistics.json";
import { Info, AlertTriangle, RotateCcw, Cpu } from "lucide-react";

interface PredictionFormProps {
  inputs: CementInputFeatures;
  onChange: (inputs: CementInputFeatures) => void;
  onPredict: () => void;
  onReset: () => void;
  isLoading: boolean;
  warnings: string[];
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  inputs,
  onChange,
  onPredict,
  onReset,
  isLoading,
  warnings,
}) => {
  const stats = statisticsData as FeatureStat[];

  const handleInputChange = (key: keyof CementInputFeatures, val: string) => {
    const num = parseFloat(val);
    onChange({
      ...inputs,
      [key]: isNaN(num) ? 0 : num,
    });
  };

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-heading font-semibold text-slate-900 dark:text-slate-100">
            Prediksi Sampel Semen
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Masukkan karakteristik kimia sampel untuk memperkirakan kuat tekan pada umur 28 hari.
          </p>
        </div>

        <button
          onClick={onReset}
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50"
          title="Reset ke Nilai Rata-rata Historis"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Rerata</span>
        </button>
      </div>

      {warnings.length > 0 && (
        <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs leading-relaxed space-y-1.5">
          <div className="flex items-center gap-2 font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Peringatan Rentang Data:</span>
          </div>
          {warnings.map((w, idx) => (
            <p key={idx} className="pl-6">
              • {w}
            </p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {stats.map((stat) => {
          const val = inputs[stat.key];
          const isOutOfRange = val < stat.min || val > stat.max;

          return (
            <div key={stat.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span>{stat.symbol}</span>
                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                    ({stat.label})
                  </span>
                </label>

                <div className="group relative cursor-help text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <Info className="w-4 h-4" />
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-56 p-2.5 rounded-lg bg-slate-900 text-slate-100 text-xs shadow-xl z-20 pointer-events-none">
                    {stat.tooltip}
                    <div className="mt-1 text-[10px] text-slate-400 font-mono">
                      Rentang: {stat.min} - {stat.max} {stat.unit}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <input
                  type="number"
                  step={stat.step}
                  value={val === 0 ? "" : val}
                  onChange={(e) => handleInputChange(stat.key, e.target.value)}
                  placeholder={`${stat.mean}`}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm font-mono transition-all outline-none ${
                    isOutOfRange
                      ? "border-amber-500/70 text-amber-700 dark:text-amber-300 bg-amber-50/50 dark:bg-amber-950/20"
                      : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  }`}
                />
                <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-400">
                  {stat.unit}
                </span>
              </div>

              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                <span>Rerata: {stat.mean}</span>
                <span>Rentang: {stat.min} – {stat.max}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onPredict}
        disabled={isLoading}
        type="button"
        className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <Cpu className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        <span>{isLoading ? "Menghitung Prediksi..." : "Prediksi Kuat Tekan"}</span>
      </button>
    </div>
  );
};
