"use client";

import React from "react";
import { Users, Award, CheckCircle2, XCircle } from "lucide-react";
import { SkbSummary as SkbSummaryType } from "@/lib/skb-stmkg/types";

interface SkbSummaryProps {
  data: SkbSummaryType;
}

export const SkbSummary: React.FC<SkbSummaryProps> = ({ data }) => {
  const cards = [
    {
      title: "Total Peserta",
      value: data.totalPeserta.toLocaleString(),
      subtitle: "Peserta Terdata PTB STMKG",
      icon: Users,
      accent: "border-indigo-500/40 text-indigo-400 bg-indigo-500/10",
    },
    {
      title: "Rata-rata Nilai",
      value: `${data.rataRataNilai} / 100`,
      subtitle: "Skor Komposit Rerata SKB",
      icon: Award,
      accent: "border-sky-500/40 text-sky-400 bg-sky-500/10",
    },
    {
      title: "Persentase Lulus",
      value: data.persentaseLulus,
      subtitle: "Peluang Masuk Passing Grade",
      icon: CheckCircle2,
      accent: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    },
    {
      title: "Persentase Tidak Lulus",
      value: data.persentaseTidakLulus,
      subtitle: "Tingkat Kompetisi Seleksi",
      icon: XCircle,
      accent: "border-slate-700 text-slate-400 bg-slate-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl border ${card.accent}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-0.5">
              <div className="text-2xl font-bold font-heading text-slate-50">
                {card.value}
              </div>
              <div className="text-[11px] text-slate-400 font-normal">
                {card.subtitle}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
