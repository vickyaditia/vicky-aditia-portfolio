"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-800/80">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-8"
        >
          <Badge variant="emerald">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2 inline-block" />
            DATA SCIENTIST & DATA ANALYST
          </Badge>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 font-heading leading-[1.1]">
              Vicky Aditia
            </h1>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-emerald-400 font-heading">
              Mengubah Telemetri Industri & Data Operasional Menjadi Keputusan Bisnis Terukur.
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-400 font-sans leading-relaxed">
            Lulusan Sains Data ITERA (IPK 3.09) berpengalaman membangun model Machine Learning optimasi biaya bahan bakar klinker semen di PT Semen Gresik, serta merancang pipeline otomatisasi data penjualan 7 brand produk di PT Depoguna Bangunan Online.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              href="/docs/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="CV_Vicky_Aditia_Data_Scientist.pdf"
              variant="primary"
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV (PDF)
            </Button>

            <Button href="#projects" variant="outline" size="lg">
              <span>Lihat 4 Proyek Unggulan</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-slate-300">
            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Data Processed</div>
              <div className="text-xl font-bold text-slate-100 font-mono">68,000+ Rows</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Model Accuracy</div>
              <div className="text-xl font-bold text-emerald-400 font-mono">R² = 0.934</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Time Efficiency</div>
              <div className="text-xl font-bold text-slate-100 font-mono">88% Faster</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Education</div>
              <div className="text-xl font-bold text-slate-100 font-mono">IPK 3.09 / 4.00</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
