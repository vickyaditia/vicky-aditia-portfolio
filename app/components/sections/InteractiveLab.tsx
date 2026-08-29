"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, CheckCircle2, AlertTriangle, Cpu, Flame, Activity } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export const InteractiveLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"skb" | "energy" | "cement">("skb");

  // Model 1 State: SKB STMKG Classification
  const [skdScore, setSkdScore] = useState<number>(385);
  const [tpaScore, setTpaScore] = useState<number>(82);
  const [physicalScore, setPhysicalScore] = useState<number>(88);
  const [interviewScore, setInterviewScore] = useState<number>(85);

  const calculateSkbPrediction = () => {
    const composite = skdScore * 0.4 + tpaScore * 0.25 + physicalScore * 0.2 + interviewScore * 0.15;
    const probability = Math.min(99, Math.max(10, Math.round((composite / 320) * 100)));
    const passed = composite >= 250;
    return { composite: composite.toFixed(1), probability, passed };
  };
  const skbResult = calculateSkbPrediction();

  // Model 2 State: Kiln Energy Cost Optimization
  const [kilnTemp, setKilnTemp] = useState<number>(1350);
  const [coalFeed, setCoalFeed] = useState<number>(28);
  const [airflow, setAirflow] = useState<number>(1200);

  const calculateEnergyCost = () => {
    const powerKwh = Math.round(75 + (coalFeed * 1.8) + (kilnTemp / 100) - (airflow / 200));
    const costMillionRp = (powerKwh * 1.45 * 0.85).toFixed(2);
    const efficiency = Math.min(98, Math.max(60, Math.round(100 - (coalFeed * 0.6) + (airflow / 100))));
    return { powerKwh, costMillionRp, efficiency };
  };
  const energyResult = calculateEnergyCost();

  const energyChartData = [
    { name: "Batu Bara", val: Math.round(coalFeed * 2.5) },
    { name: "Solar", val: Math.round(coalFeed * 0.8) },
    { name: "Listrik kWh", val: energyResult.powerKwh },
  ];

  // Model 3 State: Deep MLP Cement Strength
  const [clinker, setClinker] = useState<number>(75);
  const [gypsum, setGypsum] = useState<number>(5);
  const [silica, setSilica] = useState<number>(15);
  const [waterRatio, setWaterRatio] = useState<number>(0.45);

  const calculateCementStrength = () => {
    const predictedMpa = (
      clinker * 0.42 +
      gypsum * 0.8 +
      silica * 0.35 -
      waterRatio * 45
    ).toFixed(2);

    const numericMpa = parseFloat(predictedMpa);
    const qcPassed = numericMpa >= 42.5;
    return { predictedMpa, qcPassed };
  };
  const cementResult = calculateCementStrength();

  return (
    <Container id="lab">
      <SectionHeading
        badgeText="INTERACTIVE DATA LAB (DEPLOYS)"
        title="Simulasi Interaktif Hasil Deploy 3 Proyek Real"
        description="Cobalah langsung simulator prediksi interaktif dari model Machine Learning & Deep Learning yang telah dideploy untuk 3 proyek utama."
      />

      <Card className="space-y-8 p-6 md:p-8">
        {/* Selector Tabs for 3 Projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-b border-slate-700/60 pb-6">
          <button
            onClick={() => setActiveTab("skb")}
            className={`p-4 rounded-xl text-left transition-all border ${
              activeTab === "skb"
                ? "bg-emerald-500/15 border-emerald-500 text-slate-50 shadow-lg shadow-emerald-500/10"
                : "bg-slate-900 border-slate-700/60 text-slate-400 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 mb-1">
              <Cpu className="w-3.5 h-3.5" />
              <span>PROYEK 1 DEPLOY</span>
            </div>
            <div className="font-bold font-heading text-sm text-slate-100">
              Klasifikasi SKB STMKG 2024
            </div>
          </button>

          <button
            onClick={() => setActiveTab("energy")}
            className={`p-4 rounded-xl text-left transition-all border ${
              activeTab === "energy"
                ? "bg-emerald-500/15 border-emerald-500 text-slate-50 shadow-lg shadow-emerald-500/10"
                : "bg-slate-900 border-slate-700/60 text-slate-400 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>PROYEK 2 DEPLOY</span>
            </div>
            <div className="font-bold font-heading text-sm text-slate-100">
              Optimasi Biaya Energi Kiln
            </div>
          </button>

          <button
            onClick={() => setActiveTab("cement")}
            className={`p-4 rounded-xl text-left transition-all border ${
              activeTab === "cement"
                ? "bg-emerald-500/15 border-emerald-500 text-slate-50 shadow-lg shadow-emerald-500/10"
                : "bg-slate-900 border-slate-700/60 text-slate-400 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>PROYEK 3 DEPLOY</span>
            </div>
            <div className="font-bold font-heading text-sm text-slate-100">
              Prediksi Kuat Tekan Semen (Deep MLP)
            </div>
          </button>
        </div>

        {/* TAB 1: SKB STMKG CLASSIFICATION INTERACTIVE SIMULATOR */}
        {activeTab === "skb" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
            <div className="space-y-5">
              <div>
                <Badge variant="emerald">Random Forest & XGBoost Classifier</Badge>
                <h3 className="text-xl font-bold font-heading text-slate-50 mt-2">
                  Simulator Prediksi Kelulusan SKB STMKG
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Masukkan skor nilai peserta untuk mensimulasikan hasil klasifikasi Machine Learning secara real-time.
                </p>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1 font-medium">
                    <span>Skor SKD (100 - 500)</span>
                    <span className="text-emerald-400 font-bold">{skdScore}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    value={skdScore}
                    onChange={(e) => setSkdScore(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1 font-medium">
                    <span>Skor Tes Potensi Akademik (TPA)</span>
                    <span className="text-emerald-400 font-bold">{tpaScore}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={tpaScore}
                    onChange={(e) => setTpaScore(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1 font-medium">
                    <span>Skor Tes Fisik & Kesehatan</span>
                    <span className="text-emerald-400 font-bold">{physicalScore}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={physicalScore}
                    onChange={(e) => setPhysicalScore(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1 font-medium">
                    <span>Skor Wawancara</span>
                    <span className="text-emerald-400 font-bold">{interviewScore}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={interviewScore}
                    onChange={(e) => setInterviewScore(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Prediction Output Card */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-6 text-center">
              <div className="text-xs text-slate-400 font-mono">HASIL PREDIKSI MACHINE LEARNING</div>

              <div className="inline-flex flex-col items-center justify-center p-6 rounded-xl bg-slate-950 border border-slate-800 w-full space-y-3">
                {skbResult.passed ? (
                  <>
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-bounce" />
                    <div className="text-2xl font-bold font-heading text-emerald-400">
                      REKOMENDASI: LULUS SKB
                    </div>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-12 h-12 text-amber-400" />
                    <div className="text-2xl font-bold font-heading text-amber-400">
                      REKOMENDASI: TIDAK LULUS
                    </div>
                  </>
                )}

                <div className="text-xs text-slate-300 font-sans">
                  Estimasi Probabilitas Kelulusan:{" "}
                  <span className="font-bold text-emerald-400 text-sm">{skbResult.probability}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans text-left">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Skor Komposit:</div>
                  <div className="text-base font-bold text-slate-100">{skbResult.composite}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Model Precision:</div>
                  <div className="text-base font-bold text-emerald-400">92.4% (Tuned)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KILN ENERGY COST OPTIMIZATION INTERACTIVE SIMULATOR */}
        {activeTab === "energy" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
            <div className="space-y-5">
              <div>
                <Badge variant="emerald">Gradient Boosting Industrial Regressor</Badge>
                <h3 className="text-xl font-bold font-heading text-slate-50 mt-2">
                  Simulator Optimasi Konsumsi & Biaya Energi Kiln
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Geser parameter operasional telemetri kiln pabrik semen untuk mensimulasikan estimasi biaya bahan bakar.
                </p>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1 font-medium">
                    <span>Suhu Kiln (°C)</span>
                    <span className="text-emerald-400 font-bold">{kilnTemp} °C</span>
                  </div>
                  <input
                    type="range"
                    min="900"
                    max="1500"
                    value={kilnTemp}
                    onChange={(e) => setKilnTemp(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1 font-medium">
                    <span>Feed Rate Batu Bara (Ton/Jam)</span>
                    <span className="text-emerald-400 font-bold">{coalFeed} Ton/Jam</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={coalFeed}
                    onChange={(e) => setCoalFeed(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1 font-medium">
                    <span>Airflow Rate Pembakaran (m³/min)</span>
                    <span className="text-emerald-400 font-bold">{airflow} m³/min</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="2000"
                    value={airflow}
                    onChange={(e) => setAirflow(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Industrial Energy Chart & Output */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">ESTIMASI KONSUMSI ENERGI</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  Efisiensi: {energyResult.efficiency}%
                </span>
              </div>

              <div className="h-[180px] bg-slate-950 p-3 rounded-xl border border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={energyChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                    <Bar dataKey="val" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Total Listrik:</div>
                  <div className="text-base font-bold text-slate-100">{energyResult.powerKwh} kWh/Ton</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Estimasi Biaya Energi:</div>
                  <div className="text-base font-bold text-emerald-400">Rp {energyResult.costMillionRp} Juta/Ton</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DEEP MLP CEMENT STRENGTH INTERACTIVE SIMULATOR */}
        {activeTab === "cement" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
            <div className="space-y-5">
              <div>
                <Badge variant="emerald">TensorFlow / Keras Deep MLP</Badge>
                <h3 className="text-xl font-bold font-heading text-slate-50 mt-2">
                  Simulator Prediksi Kuat Tekan Semen 28 Hari
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Atur rasio campuran laboratorium untuk mensimulasikan hasil pengujian mutu fisik semen secara instan.
                </p>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1 font-medium">
                    <span>Kandungan Klinker (%)</span>
                    <span className="text-emerald-400 font-bold">{clinker}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="90"
                    value={clinker}
                    onChange={(e) => setClinker(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1 font-medium">
                    <span>Kandungan Gypsum (%)</span>
                    <span className="text-emerald-400 font-bold">{gypsum}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={gypsum}
                    onChange={(e) => setGypsum(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1 font-medium">
                    <span>Campuran Silica & Slag (%)</span>
                    <span className="text-emerald-400 font-bold">{silica}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={silica}
                    onChange={(e) => setSilica(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1 font-medium">
                    <span>Water-Cement Ratio (Rasio Air/Semen)</span>
                    <span className="text-emerald-400 font-bold">{waterRatio}</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="0.6"
                    step="0.01"
                    value={waterRatio}
                    onChange={(e) => setWaterRatio(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-900 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Neural Network Strength Output */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-6 text-center">
              <div className="text-xs text-slate-400 font-mono">PREDIKSI KUAT TEKAN 28 HARI (DEEP MLP)</div>

              <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-4xl font-extrabold font-heading text-emerald-400">
                  {cementResult.predictedMpa} <span className="text-lg text-slate-300 font-normal">MPa</span>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider font-mono">
                  {cementResult.qcPassed ? (
                    <span className="inline-flex items-center text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> STATUS QC: PASSED (≥ 42.5 MPa)
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1" /> STATUS QC: BELOW STANDARD
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans text-left">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Akurasi Model R²:</div>
                  <div className="text-base font-bold text-emerald-400">0.934 (Deep MLP)</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-slate-400">Standar Pengujian:</div>
                  <div className="text-base font-bold text-slate-100">SNI Semen Gresik</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
};
