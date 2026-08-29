"use client";

import React from "react";
import { ArrowUpRight, Github, Code2, Database } from "lucide-react";

export const AboutSection: React.FC = () => {
  const techStack = [
    "Python",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "XGBoost",
    "Next.js 15",
    "TypeScript",
    "Tailwind CSS",
    "Recharts",
  ];

  return (
    <div id="about" className="p-6 md:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
      <div>
        <h2 className="text-lg font-bold font-heading text-slate-50">
          About This Project
        </h2>
        <p className="text-xs text-slate-400 font-sans mt-1">
          Latar belakang teknis dan teknologi pembuatan platform analitik optimasi produksi klinker pabrik semen.
        </p>
      </div>

      <div className="space-y-4 text-xs text-slate-300 font-sans leading-relaxed">
        <p>
          Project ini menggunakan Machine Learning untuk membantu memprediksi volume produksi klinker semen dan menganalisis estimasi pengeluaran biaya energi operasional (batu bara, listrik, dan solar) di PT Semen Gresik.
        </p>

        <div className="space-y-2 pt-2">
          <div className="font-bold text-slate-100 font-heading">Technology Stack & Libraries:</div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-slate-950 text-emerald-400 text-[11px] font-mono border border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">Kode sumber notebook & skrip pemodelan lengkap:</span>
          <a
            href="https://github.com/vickyaditia/Optimasi-Produksi-Klinker-Prediksi-Biaya-Energi-Listrik-Solar-Batu-Bara-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-emerald-400 font-bold text-xs transition-colors"
          >
            <Github className="w-4 h-4 mr-2" />
            <span>View Source Code</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};
