"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";

import { SkbHeader } from "@/components/skb-stmkg/SkbHeader";
import { SkbSummary } from "@/components/skb-stmkg/SkbSummary";
import { ScoreDistribution } from "@/components/skb-stmkg/ScoreDistribution";
import { SimulationForm } from "@/components/skb-stmkg/SimulationForm";
import { SimulationResult } from "@/components/skb-stmkg/SimulationResult";
import { ScoreComparison } from "@/components/skb-stmkg/ScoreComparison";
import { Disclaimer } from "@/components/skb-stmkg/Disclaimer";
import { SkbAboutSection } from "@/components/skb-stmkg/SkbAboutSection";

import summaryRaw from "@/data/skb-stmkg/summary.json";
import distributionRaw from "@/data/skb-stmkg/distribution.json";
import statisticsRaw from "@/data/skb-stmkg/statistics.json";

import {
  SkbSummary as SkbSummaryType,
  DistributionMap,
  SkbStatistics,
  SkbSimulationInput,
  SkbSimulationResult,
} from "@/lib/skb-stmkg/types";
import { runSkbSimulation } from "@/lib/skb-stmkg/predictionEngine";

export default function SkbStmkgPage() {
  const summaryData = summaryRaw as SkbSummaryType;
  const distributionMap = distributionRaw as DistributionMap;
  const statistics = statisticsRaw as SkbStatistics;

  const [userInput, setUserInput] = useState<SkbSimulationInput | null>(null);
  const [result, setResult] = useState<SkbSimulationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulate = (input: SkbSimulationInput) => {
    setIsLoading(true);
    setUserInput(input);

    setTimeout(() => {
      const res = runSkbSimulation(input, statistics);
      setResult(res);
      setIsLoading(false);
    }, 350);
  };

  return (
    <div className="bg-slate-900 text-slate-50 min-h-screen">
      <Navbar />
      <main className="pt-20 pb-16">
        <Container>
          <div className="space-y-8">
            {/* HEADER */}
            <SkbHeader />

            {/* SECTION 1 — RINGKASAN DATA */}
            <SkbSummary data={summaryData} />

            {/* SECTION 2 — DISTRIBUSI DATA */}
            <ScoreDistribution distributionMap={distributionMap} />

            {/* SECTION 3 & 4 — SIMULASI NILAI & HASIL SIMULASI */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <SimulationForm onSimulate={handleSimulate} isLoading={isLoading} />
              <SimulationResult result={result} />
            </div>

            {/* SECTION 5 — PERBANDINGAN NILAI */}
            {userInput && result && (
              <ScoreComparison
                userInput={userInput}
                stats={statistics}
                insights={result.insights}
              />
            )}

            {/* DISCLAIMER */}
            <Disclaimer />

            {/* ABOUT PROJECT */}
            <SkbAboutSection />
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
