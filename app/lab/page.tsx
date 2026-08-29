"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GraduationCap, Factory, ArrowRight, Sparkles } from "lucide-react";

export default function LabPortalPage() {
  return (
    <div className="bg-slate-900 text-slate-50 min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <Container>
          <div className="space-y-10">
            {/* Header Portal */}
            <SectionHeading
              badgeText="INTERACTIVE DATA LAB PORTAL"
              title="Daftar Aplikasi & Dashboard Interactive Data Science"
              description="Pilih salah satu aplikasi analitik interaktif atau simulator Machine Learning yang telah dideploy di bawah ini."
            />

            {/* Grid 2 Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* CARD 1: SKB STMKG 2024 */}
              <Card className="flex flex-col justify-between space-y-6 hover:border-indigo-500/60 transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <Badge variant="emerald">Simulasi Machine Learning</Badge>
                  </div>

                  <h3 className="text-2xl font-bold font-heading text-slate-50 group-hover:text-indigo-400 transition-colors">
                    Klasifikasi SKB STMKG 2024
                  </h3>

                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    Simulasi nilai seleksi SKB STMKG berdasarkan pola data historis peserta dan Machine Learning.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-indigo-400">
                      Classification
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                      STMKG 2024
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                      XGBoost
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <Button
                    href="/lab/skb-stmkg"
                    variant="primary"
                    size="md"
                    className="w-full justify-between bg-indigo-600 hover:bg-indigo-500 text-slate-50"
                  >
                    <span>Buka Simulasi SKB</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>

              {/* CARD 2: KLINKER OPTIMIZATION */}
              <Card className="flex flex-col justify-between space-y-6 hover:border-emerald-500/60 transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                      <Factory className="w-6 h-6" />
                    </div>
                    <Badge variant="emerald">Industrial AI Analytics</Badge>
                  </div>

                  <h3 className="text-2xl font-bold font-heading text-slate-50 group-hover:text-emerald-400 transition-colors">
                    Optimasi Produksi Klinker & Prediksi Biaya Energi
                  </h3>

                  <p className="text-sm text-slate-300 font-sans leading-relaxed">
                    Dashboard prediksi produksi klinker dan optimasi biaya energi menggunakan Machine Learning (PT Semen Gresik).
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-emerald-400">
                      Regression ML
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                      Multi-Fuel Energy
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300">
                      XGBoost
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <Button
                    href="/lab/klinker-optimization"
                    variant="primary"
                    size="md"
                    className="w-full justify-between"
                  >
                    <span>Buka Dashboard Klinker</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>

            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
