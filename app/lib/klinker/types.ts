export interface DailyKlinkerRecord {
  tanggal: string;
  aktual: number;
  prediksi: number;
  listrikCost: number;
  solarCost: number;
  batubaraCost: number;
  totalCost: number;
}

export interface ModelMetrics {
  r2: number;
  mae: number;
  rmse: number;
  mape: string;
  avgProduksi: number;
  avgListrikCost: number;
  avgSolarCost: number;
  avgBatubaraCost: number;
  avgTotalCost: number;
  prodChange: string;
  listrikChange: string;
  solarChange: string;
  batubaraChange: string;
  totalCostChange: string;
}

export interface FeatureImportanceItem {
  feature: string;
  importance: number;
  description: string;
}

export interface SimulationInput {
  targetProduksi: number; // ton/hari
  stokTerak: number;     // ton
  kebutuhanFm: number;   // ton/hari
  rilisSemen: number;    // ton/hari
}

export interface SimulationResult {
  predictedProduction: number;
  electricityCost: number; // Rp Juta/hari
  solarCost: number;       // Rp Juta/hari
  coalCost: number;        // Rp Juta/hari
  totalEnergyCost: number;  // Rp Juta/hari
  insightMessage: string;
}
