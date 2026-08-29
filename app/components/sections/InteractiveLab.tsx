"use client";

import React, { useState } from "react";
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
    // Batu bara: ~125 kg/ton terak kiln
    const coalConsumptionKgPerHour = kilnOutput * 125;
    const coalCostPerHour = coalConsumptionKgPerHour * coalPrice;

    // Listrik: ~38 kWh/ton kiln + ~42 kWh/ton FM1 + ~44 kWh/ton FM2
    const totalPowerKwhPerHour = kilnOutput * 38 + fm1Feed * 42 + fm2Feed * 44;
    const electricityCostPerHour = totalPowerKwhPerHour * electricityPrice;

    // Solar: ~1.8 Liter/ton terak burner & heavy equipment
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
        description="Eksplorasi langsung simulator interaktif Machine Learning, analisis alur terak pabrik semen, dan kalkulator biaya energi operasional."
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

        {/* ========================================================================= */}
        {/* PROYEK 2: DASHBOARD INDUSTRI KLINKER & ENERGI PT SEMEN GRESIK */}
        {/* ========================================================================= */}
        {activeTab === "energy" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Sub-Dashboard Header Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <Badge variant="emerald">Industrial Operations & Multi-Fuel Telemetry</Badge>
                <h3 className="text-lg font-bold font-heading text-slate-50 mt-1">
                  Dashboard Optimasi Pabrik Semen & Biaya Energi
                </h3>
              </div>

              {/* Sub-Tab Navigation Switcher */}
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

            {/* --------------------------------------------------------------------- */}
            {/* SUB-TAB 1: GRAFIK TREN SIMULASI FINISH MILL 1, 2 & STOK TERAK */}
            {/* --------------------------------------------------------------------- */}
            {proj2SubTab === "trend" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sliders Input Control */}
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

                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 font-sans">
                    <div className="text-slate-400">Status Neraca Terak:</div>
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-200">Net Flow Balance:</span>
                      <span className={netTerakFlow >= 0 ? "text-emerald-400" : "text-amber-400"}>
                        {netTerakFlow >= 0 ? `+${netTerakFlow}` : netTerakFlow} Ton/Jam
                      </span>
                    </div>
                  </div>
                </div>

                {/* 24-Hour Trend Charts */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Production Rate Chart */}
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

                  {/* Silo Stock Projection Chart */}
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold">PROYEKSI AKUMULASI STOK TERAK SILO (TON)</span>
                      <span className="text-emerald-400">Silo Capacity: 25,000 Ton</span>
                    </div>
                    <div className="h-[160px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="jam" stroke="#94a3b8" fontSize={10} />
                          <YAxis stroke="#94a3b8" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                          <Bar dataKey="StokTerak" fill="#10b981" radius={[4, 4, 0, 0]} name="Stok Silo Terak" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* SUB-TAB 2: DASHBOARD FLOW DIAGRAM TERAK (MASS BALANCE FLOW) */}
            {/* --------------------------------------------------------------------- */}
            {proj2SubTab === "flow" && (
              <div className="space-y-8 py-4">
                <div className="text-center max-w-xl mx-auto space-y-1">
                  <h4 className="text-base font-bold font-heading text-slate-50">
                    Diagram Alir Neraca Massa Terak (Clinker Mass Balance Flow)
                  </h4>
                  <p className="text-xs text-slate-400 font-sans">
                    Visualisasi aliran distribusi terak dari Kiln pembakaran menuju Silo penampungan dan mesin Finish Mill 1 & 2.
                  </p>
                </div>

                {/* Industrial Flow Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center font-sans text-xs">
                  {/* Step 1: Kiln Plant */}
                  <div className="p-5 rounded-2xl bg-slate-900 border-2 border-emerald-500/60 space-y-3 text-center relative shadow-lg shadow-emerald-500/10">
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

                  {/* Flow Arrow 1 */}
                  <div className="hidden md:flex flex-col items-center justify-center text-slate-400">
                    <span className="text-[10px] font-mono text-emerald-400 mb-1">Transfer Terak</span>
                    <ArrowRight className="w-6 h-6 text-emerald-400 animate-pulse" />
                  </div>

                  {/* Step 2: Silo Terak Storage */}
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

                  {/* Flow Arrow 2 */}
                  <div className="hidden md:flex flex-col items-center justify-center text-slate-400">
                    <span className="text-[10px] font-mono text-emerald-400 mb-1">Distribusi Grinding</span>
                    <ArrowRight className="w-6 h-6 text-emerald-400 animate-pulse" />
                  </div>

                  {/* Step 3: Finish Mill 1 & 2 Output */}
                  <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-2 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-100 font-heading text-sm">FINISH MILL 1 (FM1)</div>
                        <div className="text-slate-400 text-[11px]">Penggilingan Semen PPC</div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-bold text-sm">
                        -{fm1Feed} Ton/Jam
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-2 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-100 font-heading text-sm">FINISH MILL 2 (FM2)</div>
                        <div className="text-slate-400 text-[11px]">Penggilingan Semen OPC</div>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-sky-400 font-bold text-sm">
                        -{fm2Feed} Ton/Jam
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* SUB-TAB 3: DASHBOARD INSIGHT AKHIR BIAYA ENERGI (LISTRIK, BATU BARA, SOLAR) */}
            {/* --------------------------------------------------------------------- */}
            {proj2SubTab === "insight" && (
              <div className="space-y-6">
                {/* Unit Price Controls */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-3 font-sans text-xs">
                  <div className="font-bold text-slate-200 font-heading text-sm">
                    Asumsi Harga Satuan Energi (Tarif Industri):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <span className="text-slate-400 block mb-1">Batu Bara (Rp/Kg):</span>
                      <input
                        type="number"
                        value={coalPrice}
                        onChange={(e) => setCoalPrice(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-emerald-400 font-bold focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">Listrik (Rp/kWh):</span>
                      <input
                        type="number"
                        value={electricityPrice}
                        onChange={(e) => setElectricityPrice(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-sky-400 font-bold focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-slate-400 block mb-1">Solar Industri (Rp/Liter):</span>
                      <input
                        type="number"
                        value={dieselPrice}
                        onChange={(e) => setDieselPrice(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-amber-400 font-bold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Energy Breakdown Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Batu Bara Card */}
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono">BATU BARA (KILN)</span>
                      <Badge variant="emerald">{energyInsight.coalPercent}% Budget</Badge>
                    </div>
                    <div className="text-2xl font-extrabold font-heading text-slate-50">
                      Rp {(energyInsight.coalCostPerHour / 1000000).toFixed(2)}{" "}
                      <span className="text-xs text-slate-400 font-normal">Juta / Jam</span>
                    </div>
                    <div className="text-xs text-slate-400 font-sans border-t border-slate-800 pt-2">
                      Konsumsi: <span className="text-emerald-400 font-bold">{energyInsight.coalConsumptionKgPerHour.toLocaleString()} Kg/Jam</span>
                    </div>
                  </div>

                  {/* Listrik Card */}
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono">LISTRIK (MILLING)</span>
                      <Badge variant="slate">{energyInsight.electricityPercent}% Budget</Badge>
                    </div>
                    <div className="text-2xl font-extrabold font-heading text-slate-50">
                      Rp {(energyInsight.electricityCostPerHour / 1000000).toFixed(2)}{" "}
                      <span className="text-xs text-slate-400 font-normal">Juta / Jam</span>
                    </div>
                    <div className="text-xs text-slate-400 font-sans border-t border-slate-800 pt-2">
                      Daya Daya: <span className="text-sky-400 font-bold">{energyInsight.totalPowerKwhPerHour.toLocaleString()} kWh/Jam</span>
                    </div>
                  </div>

                  {/* Solar Card */}
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-mono">SOLAR INDUSTRI</span>
                      <Badge variant="slate">{energyInsight.dieselPercent}% Budget</Badge>
                    </div>
                    <div className="text-2xl font-extrabold font-heading text-slate-50">
                      Rp {(energyInsight.dieselCostPerHour / 1000000).toFixed(2)}{" "}
                      <span className="text-xs text-slate-400 font-normal">Juta / Jam</span>
                    </div>
                    <div className="text-xs text-slate-400 font-sans border-t border-slate-800 pt-2">
                      Volume: <span className="text-amber-400 font-bold">{energyInsight.dieselLitersPerHour.toFixed(1)} Liter/Jam</span>
                    </div>
                  </div>
                </div>

                {/* Final Cost Recommendation & Daily Summary */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold font-heading text-base">
                    <Lightbulb className="w-5 h-5" />
                    <span>Rekomendasi AI Optimization & Insights Efisiensi Biaya</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="text-slate-400 font-medium">ESTIMASI TOTAL BIAYA ENERGI HARIAN:</div>
                      <div className="text-3xl font-extrabold text-emerald-400 font-heading">
                        Rp {energyInsight.totalCostPerDay} <span className="text-base font-normal text-slate-300">Miliar / Hari</span>
                      </div>
                      <div className="text-slate-400">
                        Biaya Energi per Ton Semen: <span className="text-slate-100 font-bold">Rp {energyInsight.costPerTonCement.toLocaleString()} / Ton</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 leading-relaxed text-slate-300">
                      <div className="font-bold text-slate-100">Rekomendasi Strategi Operasional:</div>
                      <ul className="space-y-1 list-disc pl-4 text-slate-400">
                        <li>Jadwalkan penggilingan FM1 & FM2 pada waktu <span className="text-emerald-400 font-semibold">Luar Waktu Beban Puncak (LWBP)</span> untuk hemat tarif listrik 15%.</li>
                        <li>Pertahankan pembakaran steady-state batu bara pada kisaran feed rate <span className="text-emerald-400 font-semibold">25 - 30 Ton/Jam</span> untuk efisiensi termal optimum.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* PROYEK 1: SKB STMKG CLASSIFICATION INTERACTIVE SIMULATOR */}
        {/* ========================================================================= */}
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

        {/* ========================================================================= */}
        {/* PROYEK 3: DEEP MLP CEMENT STRENGTH INTERACTIVE SIMULATOR */}
        {/* ========================================================================= */}
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
