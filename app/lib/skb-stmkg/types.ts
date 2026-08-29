export interface SkbSummary {
  totalPeserta: number;
  rataRataNilai: number;
  persentaseLulus: string;
  persentaseTidakLulus: string;
}

export interface SkbStatistics {
  skd: number;
  matematika: number;
  fisika: number;
  bahasaInggris: number;
  metklim: number;
  geofisika: number;
}

export interface DistributionBin {
  range: string;
  count: number;
}

export type DistributionMap = Record<string, DistributionBin[]>;

export interface SkbSimulationInput {
  skd: number;           // 100 - 500
  matematika: number;    // 0 - 100
  fisika: number;        // 0 - 100
  bahasaInggris: number; // 0 - 100
  metklim: number;       // 0 - 100
  geofisika: number;     // 0 - 100
}

export interface SkbSimulationResult {
  predictionLabel: "LULUS" | "TIDAK LULUS";
  probability: number;   // 0 - 100 %
  categoryLabel: "Peluang Tinggi" | "Peluang Sedang" | "Peluang Rendah";
  interpretationMessage: string;
  insights: string[];
}
