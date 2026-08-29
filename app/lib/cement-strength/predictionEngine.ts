import { CementInputFeatures, PredictionOutput, HistoricalSample, FeatureStat } from "./types";
import modelWeights from "@/data/cement-strength/model_weights.json";
import summaryData from "@/data/cement-strength/summary.json";
import statisticsData from "@/data/cement-strength/statistics.json";
import historicalSamples from "@/data/cement-strength/samples.json";

function relu(x: number): number {
  return Math.max(0, x);
}

export function standardizeFeatures(inputs: CementInputFeatures): number[] {
  const keys: (keyof CementInputFeatures)[] = ["MgO", "CaO", "SO3", "LOI", "FL", "Insol"];
  const mean = modelWeights.scaler_mean;
  const scale = modelWeights.scaler_scale;

  return keys.map((key, i) => {
    const val = inputs[key];
    return (val - mean[i]) / scale[i];
  });
}

export function runDeepMLP(stdInput: number[]): number {
  const w0 = modelWeights.dense_0.weights;
  const b0 = modelWeights.dense_0.biases;
  const w1 = modelWeights.dense_1.weights;
  const b1 = modelWeights.dense_1.biases;
  const w2 = modelWeights.dense_2.weights;
  const b2 = modelWeights.dense_2.biases;

  // Layer 1: Dense 128 (ReLU)
  const h1 = new Array(128).fill(0);
  for (let j = 0; j < 128; j++) {
    let sum = b0[j];
    for (let i = 0; i < 6; i++) {
      sum += stdInput[i] * w0[i][j];
    }
    h1[j] = relu(sum);
  }

  // Layer 2: Dense 64 (ReLU)
  const h2 = new Array(64).fill(0);
  for (let k = 0; k < 64; k++) {
    let sum = b1[k];
    for (let j = 0; j < 128; j++) {
      sum += h1[j] * w1[j][k];
    }
    h2[k] = relu(sum);
  }

  // Layer 3: Dense 1 (Linear)
  let out = b2[0];
  for (let k = 0; k < 64; k++) {
    out += h2[k] * w2[k][0];
  }

  return Math.round(out * 10) / 10;
}

export function findSimilarSamples(inputs: CementInputFeatures, topN: number = 4): HistoricalSample[] {
  const userStd = standardizeFeatures(inputs);

  const scored = (historicalSamples as HistoricalSample[]).map((sample) => {
    const sampleFeatures: CementInputFeatures = {
      MgO: sample.MgO,
      CaO: sample.CaO,
      SO3: sample.SO3,
      LOI: sample.LOI,
      FL: sample.FL,
      Insol: sample.Insol,
    };
    const sampleStd = standardizeFeatures(sampleFeatures);

    let sumSq = 0;
    for (let i = 0; i < 6; i++) {
      sumSq += Math.pow(userStd[i] - sampleStd[i], 2);
    }
    const dist = Math.sqrt(sumSq);

    return { ...sample, distance: Math.round(dist * 100) / 100 };
  });

  scored.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  return scored.slice(0, topN);
}

export function checkRangeWarnings(inputs: CementInputFeatures): string[] {
  const warnings: string[] = [];
  const stats = statisticsData as FeatureStat[];

  stats.forEach((stat) => {
    const val = inputs[stat.key];
    if (val < stat.min || val > stat.max) {
      warnings.push(
        `Nilai ${stat.symbol} (${val}${stat.unit}) berada di luar rentang data historis model (${stat.min} - ${stat.max}${stat.unit}). Hasil prediksi dapat menjadi kurang reliable.`
      );
    }
  });

  return warnings;
}

export function predictCementStrength(inputs: CementInputFeatures): PredictionOutput {
  const stdInput = standardizeFeatures(inputs);
  const prediction = runDeepMLP(stdInput);
  const historicalMean = summaryData.meanStrength28Day;

  const diffRaw = prediction - historicalMean;
  const differencePercent = Math.round((diffRaw / historicalMean) * 100 * 10) / 10;
  const isAboveMean = differencePercent >= 0;

  let category: "Relatif Rendah" | "Rentang Umum Historis" | "Relatif Tinggi" = "Rentang Umum Historis";
  if (prediction < summaryData.q25Strength28Day) {
    category = "Relatif Rendah";
  } else if (prediction > summaryData.q75Strength28Day) {
    category = "Relatif Tinggi";
  }

  const similarSamples = findSimilarSamples(inputs, 4);
  const outOfRangeWarnings = checkRangeWarnings(inputs);

  return {
    prediction,
    unit: summaryData.unit,
    historicalMean,
    differencePercent: Math.abs(differencePercent),
    isAboveMean,
    category,
    similarSamples,
    outOfRangeWarnings,
  };
}
