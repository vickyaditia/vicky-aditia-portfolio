"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Flame,
  Activity,
  Zap,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Database,
  DollarSign,
  PieChart,
  Lightbulb,
  ExternalLink,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export const InteractiveLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"skb" | "energy" | "cement">("energy");
  const [proj2SubTab, setProj2SubTab] = useState<"trend" | "flow" | "insight">("trend");

  // MODEL 1 STATE: SKB STMKG CLASSIFICATION
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

  // MODEL 2 STATE: INDUSTRIAL KILN & FINISH MILL SIMULATION
  const [kilnOutput, setKilnOutput] = useState<number>(240); // Ton/jam terak kiln
  const [fm1Feed, setFm1Feed] = useState<number>(110); // Ton/jam terak FM1
  const [fm2Feed, setFm2Feed] = useState<number>(120); // Ton/jam terak FM2
  const [initialStock, setInitialStock] = useState<number>(8500); // Ton stok awal silo

  // Unit Energy Prices
  const [coalPrice, setCoalPrice] = useState<number>(1550); // Rp/kg batu bara
  const [electricityPrice, setElectricityPrice] = useState<number>(1450); // Rp/kWh listrik
  const [dieselPrice, setDieselPrice] = useState<number>(18200); // Rp/Liter solar

  // Calculations for Project 2
  const totalFmFeed = fm1Feed + fm2Feed;
  const netTerakFlow = kilnOutput - totalFmFeed; // Balance per jam

  // Generate 24-hour simulation trend for FM1, FM2, and Silo Stock Level
  const generateTrendData = () => {
    const data = [];
    let currentStock = initialStock;

    for (let hour = 1; hour <= 24; hour++) {
      const fm1Prod = Math.round(fm1Feed * (0.95 + Math.sin(hour * 0.5) * 0.08));
      const fm2Prod = Math.round(fm2Feed * (0.94 + Math.cos(hour * 0.5) * 0.07));
      const hourlyNet = kilnOutput - (fm1Prod + fm2Prod);
      currentStock = Math.max(0, currentStock + hourlyNet);

      data.push({
        jam: `Jam ${hour < 10 ? "0" + hour : hour}`,
        FM1: fm1Prod,
        FM2: fm2Prod,
        StokTerak: currentStock,
      });
    }
    return data;
  };
  const trendData = generateTrendData();

  // Energy Insights & Cost Calculations
  const calcEnergyCosts = () => {
    const coalConsumptionKgPerHour = kilnOutput * 125;
    const coalCostPerHour = coalConsumptionKgPerHour * coalPrice;

    const totalPowerKwhPerHour = kilnOutput * 38 + fm1Feed * 42 + fm2Feed * 44;
    const electricityCostPerHour = totalPowerKwhPerHour * electricityPrice;

    const dieselLitersPerHour = kilnOutput * 1.8;
    const dieselCostPerHour = dieselLitersPerHour * dieselPrice;

    const totalCostPerHour = coalCostPerHour + electricityCostPerHour + dieselCostPerHour;
    const totalCostPerDay = (totalCostPerHour * 24) / 1000000; // Juta Rupiah per Hari
    const totalProductionDailyTon = (fm1Feed + fm2Feed) * 24;
    const costPerTonCement = totalProductionDailyTon > 0 ? (totalCostPerHour * 24) / totalProductionDailyTon : 0;

    const coalPercent = Math.round((coalCostPerHour / totalCostPerHour) * 100);
    const electricityPercent = Math.round((electricityCostPerHour / totalCostPerHour) * 100);
    const dieselPercent = Math.round((dieselCostPerHour / totalCostPerHour) * 100);

    return {
      coalCostPerHour,
      electricityCostPerHour,
      dieselCostPerHour,
      totalCostPerHour,
      totalCostPerDay: totalCostPerDay.toFixed(2),
      costPerTonCement: Math.round(costPerTonCement),
      coalPercent,
      electricityPercent,
      dieselPercent,
      totalPowerKwhPerHour,
      coalConsumptionKgPerHour,
      dieselLitersPerHour,
    };
  };
  const energyInsight = calcEnergyCosts();

  // MODEL 3 STATE: DEEP MLP CEMENT STRENGTH
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
        description="Eksplorasi langsung simulator interaktif Machine Learning, analisis alur terak pabrik semen, dan platform analitik industri."
      />

      <Card className="space-y-8 p-6 md:p-8">
        {/* Main Tab Selector (Project 1, Project 2, Project 3) */}
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
              Optimasi Klinker & Biaya Energi PT Semen Gresik
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

        {/* PROYEK 2 DEPLOY CONTENT */}
        {activeTab === "energy" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Direct Link to Full Dedicated Industrial AI Platform */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-bold text-slate-50 font-heading text-base flex items-center">
                  <span>🏭 Full Industrial AI Analytics Platform</span>
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                    NEW APP ROUTE
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-sans">
                  Buka aplikasi platform analitik industri lengkap dengan sidebar, 5 KPI Cards, Line Chart Aktual vs Prediksi, Stacked Area Biaya Energi, Histogram, Donut R², & Simulator XGBoost.
                </div>
              </div>

              <Link
                href="/lab/klinker-optimization"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-heading text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2 shrink-0"
              >
                <span>Buka Dashboard /lab/klinker-optimization</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            {/* Sub-Dashboard Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <Badge variant="emerald">Industrial Operations & Multi-Fuel Telemetry</Badge>
                <h3 className="text-lg font-bold font-heading text-slate-50 mt-1">
                  Dashboard Quick View Optimasi Pabrik Semen & Biaya Energi
                </h3>
              </div>

              <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-lg border border-slate-700/80">
                <button
                  onClick={() => setProj2SubTab("trend")}
                  className={`px-3 py-1.5 rounded-md text-xs font-sans font-medium transition-all ${
                    proj2SubTab === "trend"
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                      : "text-slate-300 hover:text-slate-100"
                  }`}
                >
                  1. Tren FM1, FM2 & Stok
                </button>
                <button
                  onClick={() => setProj2SubTab("flow")}
                  className={`px-3 py-1.5 rounded-md text-xs font-sans font-medium transition-all ${
                    proj2SubTab === "flow"
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                      : "text-slate-300 hover:text-slate-100"
                  }`}
                >
                  2. Flow Diagram Terak
                </button>
                <button
                  onClick={() => setProj2SubTab("insight")}
                  className={`px-3 py-1.5 rounded-md text-xs font-sans font-medium transition-all ${
                    proj2SubTab === "insight"
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-md"
                      : "text-slate-300 hover:text-slate-100"
                  }`}
                >
                  3. Insight Biaya Energi
                </button>
              </div>
            </div>

            {/* SUB-TAB 1: TREND */}
            {proj2SubTab === "trend" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-5 bg-slate-900 p-5 rounded-2xl border border-slate-700/80">
                  <div className="font-bold font-heading text-sm text-slate-100 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2 text-emerald-400" />
                    <span>Input Parameter Operasional</span>
                  </div>

                  <div className="space-y-4 font-sans text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1 font-medium">
                        <span>Produksi Terak Kiln (Ton/Jam)</span>
                        <span className="text-emerald-400 font-bold">{kilnOutput} Ton/Jam</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="400"
                        value={kilnOutput}
                        onChange={(e) => setKilnOutput(Number(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1 font-medium">
                        <span>Feed Rate Terak Finish Mill 1 (FM1)</span>
                        <span className="text-emerald-400 font-bold">{fm1Feed} Ton/Jam</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="200"
                        value={fm1Feed}
                        onChange={(e) => setFm1Feed(Number(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1 font-medium">
                        <span>Feed Rate Terak Finish Mill 2 (FM2)</span>
                        <span className="text-emerald-400 font-bold">{fm2Feed} Ton/Jam</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="200"
                        value={fm2Feed}
                        onChange={(e) => setFm2Feed(Number(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1 font-medium">
                        <span>Stok Awal Terak Silo (Ton)</span>
                        <span className="text-emerald-400 font-bold">{initialStock} Ton</span>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="20000"
                        step="500"
                        value={initialStock}
                        onChange={(e) => setInitialStock(Number(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold">GRAFIK TREN OPERASIONAL MESIN FM1 & FM2 (24 JAM)</span>
                      <span className="text-emerald-400">Total Feed: {totalFmFeed} Ton/Jam</span>
                    </div>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="jam" stroke="#94a3b8" fontSize={10} />
                          <YAxis stroke="#94a3b8" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                          <Legend wrapperStyle={{ fontSize: "11px" }} />
                          <Line type="monotone" dataKey="FM1" stroke="#10b981" strokeWidth={2} name="Finish Mill 1" />
                          <Line type="monotone" dataKey="FM2" stroke="#38bdf8" strokeWidth={2} name="Finish Mill 2" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: FLOW */}
            {proj2SubTab === "flow" && (
              <div className="space-y-8 py-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center font-sans text-xs">
                  <div className="p-5 rounded-2xl bg-slate-900 border-2 border-emerald-500/60 space-y-3 text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-bold">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-100 font-heading">KILN PLANT</div>
                      <div className="text-slate-400 text-[11px]">Pembakaran Klinker</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-bold text-sm">
                      +{kilnOutput} Ton/Jam
                    </div>
                  </div>

                  <div className="hidden md:flex flex-col items-center justify-center text-slate-400">
                    <span className="text-[10px] font-mono text-emerald-400 mb-1">Transfer Terak</span>
                    <ArrowRight className="w-6 h-6 text-emerald-400 animate-pulse" />
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-3 text-center">
                    <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-300 mx-auto flex items-center justify-center font-bold">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-100 font-heading">SILO TERAK</div>
                      <div className="text-slate-400 text-[11px]">Penampungan Utama</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-bold text-sm">
                      Stok: {initialStock} Ton
                    </div>
                  </div>

                  <div className="hidden md:flex flex-col items-center justify-center text-slate-400">
                    <span className="text-[10px] font-mono text-emerald-400 mb-1">Distribusi Grinding</span>
                    <ArrowRight className="w-6 h-6 text-emerald-400 animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: INSIGHT */}
            {proj2SubTab === "insight" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-3">
                    <div className="text-xs text-slate-400 font-mono">BATU BARA (KILN)</div>
                    <div className="text-2xl font-extrabold font-heading text-slate-50">
                      Rp {(energyInsight.coalCostPerHour / 1000000).toFixed(2)} <span className="text-xs text-slate-400">Juta/Jam</span>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-3">
                    <div className="text-xs text-slate-400 font-mono">LISTRIK (MILLING)</div>
                    <div className="text-2xl font-extrabold font-heading text-slate-50">
                      Rp {(energyInsight.electricityCostPerHour / 1000000).toFixed(2)} <span className="text-xs text-slate-400">Juta/Jam</span>
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-3">
                    <div className="text-xs text-slate-400 font-mono">SOLAR INDUSTRI</div>
                    <div className="text-2xl font-extrabold font-heading text-slate-50">
                      Rp {(energyInsight.dieselCostPerHour / 1000000).toFixed(2)} <span className="text-xs text-slate-400">Juta/Jam</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROYEK 1 DEPLOY CONTENT */}
        {activeTab === "skb" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
            <div className="space-y-5">
              <div>
                <Badge variant="emerald">Random Forest & XGBoost Classifier</Badge>
                <h3 className="text-xl font-bold font-heading text-slate-50 mt-2">
                  Simulator Prediksi Kelulusan SKB STMKG
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* PROYEK 3 DEPLOY CONTENT */}
        {activeTab === "cement" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
            <div className="space-y-5">
              <div>
                <Badge variant="emerald">TensorFlow / Keras Deep MLP</Badge>
                <h3 className="text-xl font-bold font-heading text-slate-50 mt-2">
                  Simulator Prediksi Kuat Tekan Semen 28 Hari
                </h3>
              </div>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
};
