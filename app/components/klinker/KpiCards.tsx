"use client";

import React from "react";
import { Factory, Zap, Flame, Pickaxe, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ModelMetrics } from "@/lib/klinker/types";

interface KpiCardsProps {
  metrics: ModelMetrics;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ metrics }) => {
  const cards = [
    {
      title: "Rata-rata Produksi Klinker",
      value: `${metrics.avgProduksi.toLocaleString()} ton/hari`,
      change: metrics.prodChange,
      isPositive: true,
      icon: Factory,
      accentColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
      textColor: "text-emerald-400",
    },
    {
      title: "Biaya Listrik (Prediksi)",
      value: `Rp ${metrics.avgListrikCost} jt/hari`,
      change: metrics.listrikChange,
      isPositive: true,
      icon: Zap,
      accentColor: "border-sky-500/40 text-sky-400 bg-sky-500/10",
      textColor: "text-sky-400",
    },
    {
      title: "Biaya Solar (Prediksi)",
      value: `Rp ${metrics.avgSolarCost} jt/hari`,
      change: metrics.solarChange,
      isPositive: false,
      icon: Flame,
      accentColor: "border-amber-500/40 text-amber-400 bg-amber-500/10",
      textColor: "text-amber-400",
    },
    {
      title: "Biaya Batu Bara (Prediksi)",
      value: `Rp ${metrics.avgBatubaraCost} jt/hari`,
      change: metrics.batubaraChange,
      isPositive: true,
      icon: Pickaxe,
      accentColor: "border-purple-500/40 text-purple-400 bg-purple-500/10",
      textColor: "text-purple-400",
    },
    {
      title: "Total Biaya Energi (Prediksi)",
      value: `Rp ${metrics.avgTotalCost} jt/hari`,
      change: metrics.totalCostChange,
      isPositive: true,
      icon: Wallet,
      accentColor: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
      textColor: "text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 font-sans">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-slate-700 transition-all shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl border ${card.accentColor}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xl font-bold font-heading text-slate-50">
                {card.value}
              </div>

              <div className="flex items-center space-x-1 text-xs">
                {card.isPositive ? (
                  <span className="inline-flex items-center text-emerald-400 font-medium">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                    {card.change}
                  </span>
                ) : (
                  <span className="inline-flex items-center text-amber-400 font-medium">
                    <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                    {card.change}
                  </span>
                )}
                <span className="text-slate-500 font-normal text-[10px]">
                  vs rerata periode
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
