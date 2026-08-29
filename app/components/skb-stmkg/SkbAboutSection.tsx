"use client";

import React from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export const SkbAboutSection: React.FC = () => {
  const techStack = [
    "Python",
    "Pandas",
    "Scikit-learn",
    "XGBoost",
    "Next.js 15",
    "TypeScript",
    "Tailwind CSS",
    "Recharts",
  ];

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 font-sans">
      <div>
        <h2 className="text-lg font-bold font-heading text-slate-50">
          Tentang Project
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Latar belakang pemodelan data seleksi penerimaan taruna/taruni STMKG.
        </p>
      </div>

      <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
        <p>
          Project ini menggunakan Machine Learning untuk mempelajari pola hasil SKB STMKG 2024 dan memberikan simulasi berdasarkan nilai yang dimasukkan pengguna.
        </p>

        <div className="space-y-2 pt-2">
          <div className="font-bold text-slate-100 font-heading">Teknologi & Library:</div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-slate-950 text-indigo-400 text-[11px] font-mono border border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-slate-400">Notebook Kaggle Resmi & Source Code:</span>
          <a
            href="https://www.kaggle.com/code/vickyaditia/klasifikasi-skb-stmkg-2024"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-indigo-400 font-bold text-xs transition-colors"
          >
            <span>View Kaggle Notebook</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};
