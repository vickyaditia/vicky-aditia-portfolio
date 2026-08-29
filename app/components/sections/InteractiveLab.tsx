"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Flame,
  BarChart3,
  ArrowRight,
  Database,
  ExternalLink,
  GraduationCap,
  Beaker,
  Cpu,
} from "lucide-react";
import {
  ResponsiveContainer,
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
  const [activeTab, setActiveTab] = useState<"skb" | "energy" | "cement">("skb");
  const [proj2SubTab, setProj2SubTab] = useState<"trend" | "flow" | "insight">("trend");

  // MODEL 1 STATE: SKB STMKG CLASSIFICATION
  const [skdScore, setSkdScore] = useState<number>(385);
  const [tpaScore, setTpaScore] = useState<number>(82);
  const [physicalScore, setPhysicalScore] = useState<number>(88);
  const [interviewScore, setInterviewScore] = useState<number>(85);

  // MODEL 2 STATE: INDUSTRIAL KILN & FINISH MILL SIMULATION
  const [kilnOutput, setKilnOutput] = useState<number>(240);
  const [fm1Feed, setFm1Feed] = useState<number>(110);
  const [fm2Feed, setFm2Feed] = useState<number>(120);
  const [initialStock, setInitialStock] = useState<number>(8500);

  const [coalPrice, setCoalPrice] = useState<number>(1550);
  const [electricityPrice, setElectricityPrice] = useState<number>(1450);
  const [dieselPrice, setDieselPrice] = useState<number>(18200);

  const totalFmFeed = fm1Feed + fm2Feed;

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

  const calcEnergyCosts = () => {
    const coalConsumptionKgPerHour = kilnOutput * 125;
    const coalCostPerHour = coalConsumptionKgPerHour * coalPrice;

    const totalPowerKwhPerHour = kilnOutput * 38 + fm1Feed * 42 + fm2Feed * 44;
    const electricityCostPerHour = totalPowerKwhPerHour * electricityPrice;

    const dieselLitersPerHour = kilnOutput * 1.8;
    const dieselCostPerHour = dieselLitersPerHour * dieselPrice;

    const totalCostPerHour = coalCostPerHour + electricityCostPerHour + dieselCostPerHour;

    return {
      coalCostPerHour,
      electricityCostPerHour,
      dieselCostPerHour,
      totalCostPerHour,
    };
  };
  const energyInsight = calcEnergyCosts();

  return (
    <Container id="lab">
      <SectionHeading
        badgeText="INTERACTIVE DATA LAB"
        title="Simulasi Interaktif & Dashboard Project Real"
        description="Eksplorasi simulator Machine Learning interaktif untuk Klasifikasi SKB STMKG, Optimasi Klinker Industri, dan Prediksi Kuat Tekan Semen 28 Hari."
      />

      <Card className="space-y-8 p-6 md:p-8">
        {/* Main Tab Selector (Project 1, Project 2, Project 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-700/60 pb-6">
          <button
            onClick={() => setActiveTab("skb")}
            className={`p-4 rounded-xl text-left transition-all border ${
              activeTab === "skb"
                ? "bg-indigo-500/15 border-indigo-500 text-slate-50 shadow-lg shadow-indigo-500/10"
                : "bg-slate-900 border-slate-700/60 text-slate-400 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>PROYEK 1 — SKB STMKG 2024</span>
            </div>
            <div className="font-bold font-heading text-sm sm:text-base text-slate-100">
              Klasifikasi SKB STMKG
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
              <Flame className="w-4 h-4" />
              <span>PROYEK 2 — KLINKER OPTIMIZATION</span>
            </div>
            <div className="font-bold font-heading text-sm sm:text-base text-slate-100">
              Optimasi Klinker & Energi
            </div>
          </button>

          <button
            onClick={() => setActiveTab("cement")}
            className={`p-4 rounded-xl text-left transition-all border ${
              activeTab === "cement"
                ? "bg-cyan-500/15 border-cyan-500 text-slate-50 shadow-lg shadow-cyan-500/10"
                : "bg-slate-900 border-slate-700/60 text-slate-400 hover:text-slate-200"
            }`}
          >
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
              <Beaker className="w-4 h-4" />
              <span>PROYEK 3 — DEEP MLP REGRESSION</span>
            </div>
            <div className="font-bold font-heading text-sm sm:text-base text-slate-100">
              Prediksi Kuat Tekan Semen 28 Hari
            </div>
          </button>
        </div>

        {/* PROYEK 1 DEPLOY CONTENT (SKB STMKG 2024) */}
        {activeTab === "skb" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-indigo-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-bold text-slate-50 font-heading text-lg flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-indigo-400" />
                  <span>🎓 Simulator Klasifikasi SKB STMKG 2024</span>
                </div>
                <div className="text-xs text-slate-300 font-sans leading-relaxed max-w-2xl">
                  Simulasikan nilai SKB Anda berdasarkan pola data historis peserta menggunakan Machine Learning. Sederhana, akurat, dan dirancang khusus untuk calon taruna/taruni STMKG.
                </div>
              </div>

              <Link
                href="/lab/skb-stmkg"
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-slate-50 font-bold font-heading text-xs transition-all shadow-lg shadow-indigo-600/20 flex items-center space-x-2 shrink-0"
              >
                <span>Buka Simulasi Lengkap (/lab/skb-stmkg)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
              <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <div className="font-bold font-heading text-sm text-slate-100 border-b border-slate-800 pb-3">
                  Ringkasan Fitur Simulasi
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Statistik 2,480+ Data Historis Peserta STMKG</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Input Nilai SKD & 5 Mata Pelajaran</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Estimasi Probabilitas Kelulusan % & Progress Bar</span>
                  </div>
                </div>

                <Link
                  href="/lab/skb-stmkg"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-slate-50 font-bold font-heading text-xs transition-all flex items-center justify-center space-x-2"
                >
                  <span>Mulai Simulasi Nilai SKB</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-center">
                <div className="text-xs font-mono text-slate-400">DATA HISTORIS STMKG</div>
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Total Peserta</div>
                    <div className="text-xl font-bold font-heading text-slate-100">2,480</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Rerata Nilai</div>
                    <div className="text-xl font-bold font-heading text-slate-100">74.8 / 100</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Persentase Lulus</div>
                    <div className="text-xl font-bold font-heading text-emerald-400">28.5%</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Tingkat Seleksi</div>
                    <div className="text-xl font-bold font-heading text-indigo-400">Ketat</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROYEK 2 DEPLOY CONTENT (KLINKER OPTIMIZATION) */}
        {activeTab === "energy" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-bold text-slate-50 font-heading text-lg flex items-center">
                  <span>🏭 Industrial AI Analytics Platform (PT Semen Gresik)</span>
                </div>
                <div className="text-xs text-slate-300 font-sans leading-relaxed">
                  Platform analitik industri lengkap dengan sidebar, 5 KPI Cards, Line Chart Aktual vs Prediksi, Stacked Area Biaya Energi, Histogram, Donut R², & Simulator XGBoost.
                </div>
              </div>

              <Link
                href="/lab/klinker-optimization"
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-heading text-xs transition-all shadow-lg shadow-emerald-500/20 flex items-center space-x-2 shrink-0"
              >
                <span>Buka Dashboard (/lab/klinker-optimization)</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <Badge variant="emerald">Industrial Operations & Multi-Fuel Telemetry</Badge>
                <h3 className="text-base font-bold font-heading text-slate-50 mt-1">
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
          </div>
        )}

        {/* PROYEK 3 DEPLOY CONTENT (CEMENT STRENGTH PREDICTION) */}
        {activeTab === "cement" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="font-bold text-slate-50 font-heading text-lg flex items-center">
                  <Beaker className="w-5 h-5 mr-2 text-cyan-400" />
                  <span>🧪 Prediksi Kuat Tekan Semen 28 Hari (Deep MLP)</span>
                </div>
                <div className="text-xs text-slate-300 font-sans leading-relaxed max-w-2xl">
                  Estimasi kuat tekan semen pada umur 28 hari berdasarkan 6 karakteristik kimia (MgO, CaO, SO3, LOI, FL, Insol) menggunakan Deep Neural Network (DNN).
                </div>
              </div>

              <Link
                href="/lab/cement-strength"
                className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-heading text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center space-x-2 shrink-0"
              >
                <span>Buka Prediksi (/lab/cement-strength)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
              <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <div className="font-bold font-heading text-sm text-slate-100 border-b border-slate-800 pb-3">
                  Ringkasan Aplikasi Laboratorium
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>454 Data Sampel Laboratorium Historis Real</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Arsitektur Deep MLP (Dense 128 → Dense 64 → Dense 1)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Pencarian Sampel Historis Terdekat (Euclidean Standardized)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Histogram Distribusi & Interpretasi Otomatis</span>
                  </div>
                </div>

                <Link
                  href="/lab/cement-strength"
                  className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-heading text-xs transition-all flex items-center justify-center space-x-2"
                >
                  <span>Mulai Prediksi Sampel Semen</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-center">
                <div className="text-xs font-mono text-slate-400">DATASET HISTORIS LABORATORIUM</div>
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Total Observasi</div>
                    <div className="text-xl font-bold font-heading text-slate-100">454 Sampel</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Rerata 28 Hari</div>
                    <div className="text-xl font-bold font-heading text-cyan-400">356.8 kg/cm²</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Rentang Min-Max</div>
                    <div className="text-xl font-bold font-heading text-slate-100">285.5 - 442.6</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Model Neural Net</div>
                    <div className="text-xl font-bold font-heading text-emerald-400">Deep MLP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
};
