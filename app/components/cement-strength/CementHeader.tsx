import React from "react";
import Link from "next/link";
import { ArrowLeft, Beaker } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const CementHeader: React.FC = () => {
  return (
    <div className="mb-8 md:mb-12">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-slate-400">
          <Link href="/lab" className="hover:text-emerald-500 transition-colors">
            Lab
          </Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-200">Prediksi Kuat Tekan Semen</span>
        </div>

        <Link
          href="/lab"
          className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors bg-white dark:bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← Kembali ke Lab</span>
        </Link>
      </div>

      {/* Main Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
              <Beaker className="w-6 h-6" />
            </div>
            <Badge variant="emerald" className="bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/30 text-cyan-600 dark:text-cyan-400">
              Deep Learning / Regression
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Prediksi Kuat Tekan Semen 28 Hari
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Prediksi kuat tekan semen berdasarkan karakteristik kimia menggunakan Deep Multi-Layer Perceptron (DNN). Masukkan hasil analisis kimia sampel semen untuk memperoleh estimasi kuat tekan setelah 28 hari.
          </p>
        </div>
      </div>
    </div>
  );
};
