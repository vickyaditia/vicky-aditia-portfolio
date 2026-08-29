export interface CementInputFeatures {
  MgO: number;
  CaO: number;
  SO3: number;
  LOI: number;
  FL: number;
  Insol: number;
}

export interface FeatureStat {
  key: keyof CementInputFeatures;
  label: string;
  symbol: string;
  unit: string;
  tooltip: string;
  min: number;
  max: number;
  mean: number;
  median: number;
  std: number;
  step: number;
  recommendedMin: number;
  recommendedMax: number;
}

export interface HistoricalSummaryData {
  totalObservations: number;
  meanStrength28Day: number;
  minStrength28Day: number;
  maxStrength28Day: number;
  medianStrength28Day: number;
  q25Strength28Day: number;
  q75Strength28Day: number;
  unit: string;
}

export interface DistributionBin {
  range: string;
  minVal: number;
  maxVal: number;
  count: number;
}

export interface HistoricalSample {
  id: string;
  MgO: number;
  CaO: number;
  SO3: number;
  LOI: number;
  FL: number;
  Insol: number;
  strength28: number;
  distance?: number;
}

export interface PredictionOutput {
  prediction: number;
  unit: string;
  historicalMean: number;
  differencePercent: number;
  isAboveMean: boolean;
  category: "Relatif Rendah" | "Rentang Umum Historis" | "Relatif Tinggi";
  similarSamples: HistoricalSample[];
  outOfRangeWarnings: string[];
}
