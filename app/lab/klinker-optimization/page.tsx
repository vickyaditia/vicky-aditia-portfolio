"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/klinker/Sidebar";
import { DashboardHeader } from "@/components/klinker/DashboardHeader";
import { KpiCards } from "@/components/klinker/KpiCards";
import { ProductionChart } from "@/components/klinker/ProductionChart";
import { EnergyChart } from "@/components/klinker/EnergyChart";
import { ProductionAnalysis } from "@/components/klinker/ProductionAnalysis";
import { ModelPerformance } from "@/components/klinker/ModelPerformance";
import { ActualVsPrediction } from "@/components/klinker/ActualVsPrediction";
import { SimulationPanel } from "@/components/klinker/SimulationPanel";
import { AboutSection } from "@/components/klinker/AboutSection";
import { KlinkerFooter } from "@/components/klinker/KlinkerFooter";

import historicalDataRaw from "@/data/klinker/historical-data.json";
import modelMetricsRaw from "@/data/klinker/model-metrics.json";
import featureImportanceRaw from "@/data/klinker/feature-importance.json";

import { DailyKlinkerRecord, ModelMetrics, FeatureImportanceItem } from "@/lib/klinker/types";

export default function KlinkerOptimizationPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const historicalData = historicalDataRaw as DailyKlinkerRecord[];
  const modelMetrics = modelMetricsRaw as ModelMetrics;
  const featureImportance = featureImportanceRaw as FeatureImportanceItem[];

  return (
    <div className="bg-slate-950 text-slate-50 min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* LEFT SIDEBAR */}
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      {/* MAIN DASHBOARD CONTENT AREA */}
      <main className="lg:pl-64 transition-all duration-300">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          
          {/* DASHBOARD HEADER */}
          <DashboardHeader />

          {/* OVERVIEW SECTION: KPI CARDS */}
          <div id="overview" className="space-y-6">
            <KpiCards metrics={modelMetrics} />
          </div>

          {/* SECTION 1: PRODUKSI KLINKER (AKTUAL VS PREDIKSI) */}
          <ProductionChart data={historicalData} />

          {/* SECTION 2: PREDIKSI BIAYA ENERGI (STACKED AREA) */}
          <EnergyChart data={historicalData} />

          {/* SECTION 3: ANALISIS PRODUKSI (HISTOGRAM & FEATURE IMPORTANCE) */}
          <ProductionAnalysis data={historicalData} features={featureImportance} />

          {/* SECTION 4 & 5: MODEL PERFORMANCE & SCATTER PLOT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ModelPerformance metrics={modelMetrics} />
            <ActualVsPrediction data={historicalData} />
          </div>

          {/* CORE FEATURE: SIMULASI & OPTIMASI PRODUKSI */}
          <SimulationPanel />

          {/* ABOUT SECTION & FOOTER */}
          <AboutSection />
          <KlinkerFooter />
        </div>
      </main>
    </div>
  );
}
