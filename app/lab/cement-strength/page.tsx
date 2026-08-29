"use client";

import React, { useState } from "react";
import { CementInputFeatures, PredictionOutput } from "@/lib/cement-strength/types";
import { predictCementStrength } from "@/lib/cement-strength/predictionEngine";
import statisticsData from "@/data/cement-strength/statistics.json";
import { CementHeader } from "@/components/cement-strength/CementHeader";
import { HistoricalSummary } from "@/components/cement-strength/HistoricalSummary";
import { PredictionForm } from "@/components/cement-strength/PredictionForm";
import { PredictionResultCard } from "@/components/cement-strength/PredictionResultCard";
import { HistoricalDistribution } from "@/components/cement-strength/HistoricalDistribution";
import { SimilarSamples } from "@/components/cement-strength/SimilarSamples";
import { CompositionComparison } from "@/components/cement-strength/CompositionComparison";
import { ResultInterpretation } from "@/components/cement-strength/ResultInterpretation";
import { ModelInfoSection } from "@/components/cement-strength/ModelInfoSection";
import { CementDisclaimer } from "@/components/cement-strength/CementDisclaimer";

export default function CementStrengthPage() {
  const initialInputs: CementInputFeatures = {
    MgO: 0.90,
    CaO: 56.41,
    SO3: 1.79,
    LOI: 7.80,
    FL: 1.22,
    Insol: 11.22,
  };

  const [inputs, setInputs] = useState<CementInputFeatures>(initialInputs);
  const [predictionResult, setPredictionResult] = useState<PredictionOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [warnings, setWarnings] = useState<string[]>([]);

  const handlePredict = () => {
    setIsLoading(true);

    setTimeout(() => {
      const output = predictCementStrength(inputs);
      setPredictionResult(output);
      setWarnings(output.outOfRangeWarnings);
      setIsLoading(false);
    }, 300);
  };

  const handleReset = () => {
    setInputs(initialInputs);
    setPredictionResult(null);
    setWarnings([]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* 1. HEADER */}
        <CementHeader />

        {/* 2. HISTORICAL SUMMARY (3 KPI Cards) */}
        <HistoricalSummary />

        {/* 3 & 4. PREDICTION SIMULATOR & PREDICTION RESULT CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-7">
            <PredictionForm
              inputs={inputs}
              onChange={setInputs}
              onPredict={handlePredict}
              onReset={handleReset}
              isLoading={isLoading}
              warnings={warnings}
            />
          </div>

          <div className="lg:col-span-5">
            <PredictionResultCard result={predictionResult} />
          </div>
        </div>

        {/* 5. HISTORICAL POSITION (Distribution Histogram) */}
        <HistoricalDistribution
          predictedValue={predictionResult ? predictionResult.prediction : null}
        />

        {/* 6. SIMILAR HISTORICAL SAMPLES (Nearest Neighbors) */}
        <SimilarSamples
          samples={predictionResult ? predictionResult.similarSamples : []}
          userPrediction={predictionResult ? predictionResult.prediction : null}
        />

        {/* 7. INPUT VS HISTORICAL AVERAGE (Composition Comparison) */}
        <CompositionComparison inputs={inputs} />

        {/* 8. AUTOMATIC INTERPRETATION */}
        <ResultInterpretation result={predictionResult} />

        {/* 9. ABOUT MODEL (Collapsible Technical Section) */}
        <ModelInfoSection />

        {/* 10. DISCLAIMER / DATA INFORMATION */}
        <CementDisclaimer />
      </div>
    </div>
  );
}
