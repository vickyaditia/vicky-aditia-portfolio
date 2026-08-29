"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-28 pb-20 md:pt-36 md:pb-24 border-b border-slate-700/50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 space-y-6"
          >
            <Badge variant="emerald">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2 inline-block" />
              Data Scientist & Analyst
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-50 font-heading leading-[1.15]">
              Data Scientist yang Mengubah Telemetri Industri & Data Operasional Menjadi Keputusan Bisnis Terukur
            </h1>

            <p className="text-base sm:text-lg text-slate-400 font-sans leading-relaxed max-w-2xl">
              Lulusan Sains Data ITERA (IPK 3.09) berpengalaman membangun model Machine Learning optimasi biaya bahan bakar klinker semen di PT Semen Gresik, serta merancang otomatisasi data penjualan 7 brand produk di PT Depoguna Bangunan Online.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href="#projects" variant="primary" size="lg">
                <span>Lihat Proyek</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                href="/docs/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="CV_Vicky_Aditia_Data_Scientist.pdf"
                variant="outline"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </div>

            {/* 3-4 Secondary Compact Metrics */}
            <div className="pt-8 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-sans">Data Diproses</div>
                <div className="text-lg font-bold text-slate-50 font-heading">68,000+ Rows</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-sans">Akurasi Model</div>
                <div className="text-lg font-bold text-emerald-400 font-heading">R² = 0.934</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-sans">Efisiensi Waktu</div>
                <div className="text-lg font-bold text-slate-50 font-heading">88% Faster</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-slate-400 font-sans">Pendidikan</div>
                <div className="text-lg font-bold text-slate-50 font-heading">IPK 3.09 / 4.00</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Photo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-4 flex justify-center"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full p-1.5 bg-gradient-to-tr from-emerald-500/40 via-slate-700 to-emerald-400/30 shadow-xl shadow-emerald-500/10">
              <div className="w-full h-full rounded-full bg-slate-800 border-2 border-slate-700 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-heading text-2xl font-bold">
                  VA
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-50 text-lg">Vicky Aditia</h3>
                  <p className="text-xs text-slate-400">Data Scientist & Analyst</p>
                </div>
                <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-sans">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  <span>Available for Hire</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
