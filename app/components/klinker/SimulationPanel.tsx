"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Sliders, CheckCircle2, Lightbulb, Zap, Flame, Pickaxe, Wallet, Factory } from "lucide-react";
import { SimulationInput, SimulationResult } from "@/lib/klinker/types";
import { runKlinkerSimulation } from "@/lib/klinker/predictionEngine";

export const SimulationPanel: React.FC = () => {
  const [targetProduksi, setTargetProduksi] = useState<number>(6600);
  const [stokTerak, setStokTerak] = useState<number>(120000);
  const [kebutuhanFm, setKebutuhanFm] = useState<number>(4200);
  const [rilisSemen, setRilisSemen] = useState<number>(5800);

  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(() =>
    runKlinkerSimulation({
      targetProduksi: 6600,
      stokTerak: 120000,
      kebutuhanFm: 4200,
      rilisSemen: 5800,
    })
  );

  const handleRunSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = runKlinkerSimulation({
        targetProduksi,
        stokTerak,
        kebutuhanFm,
        rilisSemen,
      });
      setResult(res);
      setIsRunning(false);
    }, 400);
  };

  const handleReset = () => {
    setTargetProduksi(6600);
    setStokTerak(120000);
    setKebutuhanFm(4200);
    setRilisSemen(5800);
    setResult(
      runKlinkerSimulation({
        targetProduksi: 6600,
        stokTerak: 120000,
        kebutuhanFm: 4200,
        rilisSemen: 5800,
      })
    );
  };

  return (
    <div id="simulation" className="p-6 md:p-8 rounded-2xl bg-slate-900 border-2 border-emerald-500/40 space-y-8 shadow-2xl shadow-emerald-500/10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-medium">
            <Sliders className="w-3.5 h-3.5" />
            <span>CORE FEATURE</span>
          </div>
          <h2 className="text-xl font-bold font-heading text-slate-50">
            Simulasi & Optimasi Produksi Klinker Interaktif
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            Ubah parameter operasional untuk menjalankan inferensi prediksi Machine Learning secara real-time.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="inline-flex items-center text-xs font-sans text-slate-400 hover:text-slate-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          <span>Reset Default</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* INPUT CONTROLS PANEL */}
        <div className="space-y-5 bg-slate-950 p-6 rounded-xl border border-slate-800">
          <div className="font-bold font-heading text-sm text-slate-100 border-b border-slate-800 pb-3">
            Parameter Input Operasional (Top Feature Importances)
          </div>

          <div className="space-y-5 font-sans text-xs">
            {/* Input 1: Target Produksi Klinker */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1.5 font-medium">
                <span>Target Produksi Klinker (ton/hari)</span>
                <span className="text-emerald-400 font-bold font-mono">{targetProduksi.toLocaleString()} ton/hari</span>
              </div>
              <input
                type="range"
                min="3000"
                max="9000"
                step="100"
                value={targetProduksi}
                onChange={(e) => setTargetProduksi(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
              />
            </div>

            {/* Input 2: Stok Terak Total */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1.5 font-medium">
                <span>Stok Terak Total (Dome + Yard)</span>
                <span className="text-emerald-400 font-bold font-mono">{stokTerak.toLocaleString()} ton</span>
              </div>
              <input
                type="range"
                min="30000"
                max="200000"
                step="5000"
                value={stokTerak}
                onChange={(e) => setStokTerak(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
              />
            </div>

            {/* Input 3: Kebutuhan FM */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1.5 font-medium">
                <span>Kebutuhan Finish Mill (ton/hari)</span>
                <span className="text-emerald-400 font-bold font-mono">{kebutuhanFm.toLocaleString()} ton/hari</span>
              </div>
              <input
                type="range"
                min="1000"
                max="8000"
                step="200"
                value={kebutuhanFm}
                onChange={(e) => setKebutuhanFm(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
              />
            </div>

            {/* Input 4: Rilis Semen */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1.5 font-medium">
                <span>Rilis Pasar Semen (ton/hari)</span>
                <span className="text-emerald-400 font-bold font-mono">{rilisSemen.toLocaleString()} ton/hari</span>
              </div>
              <input
                type="range"
                min="1000"
                max="8000"
                step="200"
                value={rilisSemen}
                onChange={(e) => setRilisSemen(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* RUN SIMULATION BUTTON */}
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold font-heading text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
          >
            {isRunning ? (
              <span>Running Simulation...</span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-slate-950" />
                <span>▶ Jalankan Simulasi</span>
              </>
            )}
          </button>
        </div>

        {/* SIMULATION RESULTS PANEL */}
        {result && (
          <div className="space-y-6 font-sans">
            <div className="text-xs font-mono text-slate-400">HASIL SIMULASI PREDIKSI MODEL</div>

            {/* Key Output Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Predicted Klinker Production */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium">
                  <Factory className="w-4 h-4 text-emerald-400" />
                  <span>Estimasi Produksi Klinker</span>
                </div>
                <div className="text-2xl font-extrabold font-heading text-slate-50">
                  {result.predictedProduction.toLocaleString()} <span className="text-xs text-slate-400 font-normal">ton/hari</span>
                </div>
              </div>

              {/* Total Energy Cost */}
              <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-2">
                <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium">
                  <Wallet className="w-4 h-4 text-emerald-400" />
                  <span>Total Biaya Energi</span>
                </div>
                <div className="text-2xl font-extrabold font-heading text-emerald-400">
                  Rp {result.totalEnergyCost} <span className="text-xs text-slate-300 font-normal">jt/hari</span>
                </div>
              </div>
            </div>

            {/* Fuel Breakdown Grid */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 flex items-center">
                  <Zap className="w-3.5 h-3.5 mr-1 text-sky-400" />
                  <span>Listrik</span>
                </div>
                <div className="font-bold text-slate-100 text-sm">Rp {result.electricityCost} jt</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 flex items-center">
                  <Flame className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  <span>Solar</span>
                </div>
                <div className="font-bold text-slate-100 text-sm">Rp {result.solarCost} jt</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 flex items-center">
                  <Pickaxe className="w-3.5 h-3.5 mr-1 text-purple-400" />
                  <span>Batu Bara</span>
                </div>
                <div className="font-bold text-slate-100 text-sm">Rp {result.coalCost} jt</div>
              </div>
            </div>

            {/* Automated AI Insight Box */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs leading-relaxed space-y-1.5 text-slate-200">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-bold font-heading">
                <Lightbulb className="w-4 h-4" />
                <span>Automated Machine Learning Insight:</span>
              </div>
              <p>{result.insightMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
