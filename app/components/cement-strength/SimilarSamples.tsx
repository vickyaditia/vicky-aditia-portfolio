import React from "react";
import { HistoricalSample } from "@/lib/cement-strength/types";
import { Layers } from "lucide-react";

interface SimilarSamplesProps {
  samples: HistoricalSample[];
  userPrediction: number | null;
}

export const SimilarSamples: React.FC<SimilarSamplesProps> = ({
  samples,
  userPrediction,
}) => {
  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-slate-900 dark:text-slate-100">
            Sampel Historis dengan Karakteristik Serupa
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ditentukan berdasarkan jarak Euclidean pada ruang fitur kimia yang telah distandardisasi.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-sans">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">
              <th className="py-3 px-4">Identifikasi Sampel</th>
              <th className="py-3 px-4">MgO (%)</th>
              <th className="py-3 px-4">CaO (%)</th>
              <th className="py-3 px-4">SO3 (%)</th>
              <th className="py-3 px-4">LOI (%)</th>
              <th className="py-3 px-4">FL (%)</th>
              <th className="py-3 px-4">Insol (%)</th>
              <th className="py-3 px-4">Jarak Kemiripan</th>
              <th className="py-3 px-4 text-right">Kuat Tekan 28 Hari</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {userPrediction !== null && (
              <tr className="bg-cyan-500/10 dark:bg-cyan-500/20 font-semibold text-cyan-900 dark:text-cyan-200">
                <td className="py-3 px-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  <span>Prediksi Anda</span>
                </td>
                <td className="py-3 px-4 font-mono">-</td>
                <td className="py-3 px-4 font-mono">-</td>
                <td className="py-3 px-4 font-mono">-</td>
                <td className="py-3 px-4 font-mono">-</td>
                <td className="py-3 px-4 font-mono">-</td>
                <td className="py-3 px-4 font-mono">-</td>
                <td className="py-3 px-4 font-mono text-xs">Acuan (0.00)</td>
                <td className="py-3 px-4 font-mono text-right text-base text-cyan-600 dark:text-cyan-400 font-bold">
                  {userPrediction.toFixed(1)} kg/cm²
                </td>
              </tr>
            )}

            {samples.map((sample) => (
              <tr key={sample.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                  {sample.id}
                </td>
                <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">{sample.MgO}</td>
                <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">{sample.CaO}</td>
                <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">{sample.SO3}</td>
                <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">{sample.LOI}</td>
                <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">{sample.FL}</td>
                <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">{sample.Insol}</td>
                <td className="py-3 px-4 font-mono text-xs text-slate-500">
                  d = {sample.distance?.toFixed(2)}
                </td>
                <td className="py-3 px-4 font-mono text-right font-semibold text-slate-900 dark:text-slate-100">
                  {sample.strength28.toFixed(1)} kg/cm²
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
