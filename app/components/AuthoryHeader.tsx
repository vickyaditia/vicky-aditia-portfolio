"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, MapPin, Database, Award, HardHat } from "lucide-react";
import { Button } from "./ui/Button";

export const AuthoryHeader: React.FC = () => {
  return (
    <section className="relative pt-28 pb-14 border-b border-slate-700/60 overflow-hidden min-h-[420px] flex items-center">
      {/* Real Industrial Field Background Image with Professional Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Vicky Aditia Industrial Plant Field Telemetry"
          fill
          className="object-cover object-center opacity-30 filter brightness-95 contrast-110"
          priority
        />
        {/* Dark Gradient Mask for High Contrast Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          {/* Real Avatar Photo & Main Bio */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-emerald-500 via-slate-600 to-emerald-400 shrink-0 shadow-xl shadow-emerald-500/20">
              <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-slate-900 bg-slate-900">
                <Image
                  src="/images/hero-profile.jpg"
                  alt="Vicky Aditia Data Scientist"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-950" title="Active Data Scientist" />
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-slate-50 tracking-tight">
                  Vicky Aditia
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-medium">
                  <HardHat className="w-3 h-3 mr-1" />
                  Industrial Data Scientist
                </span>
              </div>

              <p className="text-base sm:text-lg font-semibold text-emerald-400 font-heading">
                Data Scientist | Data Analyst | Automation Engineer
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-sans">
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  Bandar Lampung, Indonesia
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Database className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  68,000+ Rows Processed
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <Award className="w-3.5 h-3.5 mr-1 text-slate-300" />
                  IPK 3.09 / 4.00
                </span>
              </div>
            </div>
          </div>

          {/* Social Links & Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="mailto:aditia.vicky14@gmail.com"
              className="p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-emerald-400 transition-colors"
              title="Email Contact"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/vickyaditia"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-emerald-400 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/vicky-aditia-7b96081a4/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-emerald-400 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <Button
              href="/docs/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="CV_Vicky_Aditia_Data_Scientist.pdf"
              variant="primary"
              size="md"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Download CV
            </Button>
          </div>
        </motion.div>

        {/* Value Proposition Statement */}
        <div className="mt-6 pt-6 border-t border-slate-800/90 text-sm text-slate-200 leading-relaxed font-sans max-w-4xl bg-slate-950/40 p-4 rounded-xl border border-slate-800/60 backdrop-blur-sm">
          <span className="font-semibold text-emerald-400">Value Proposition: </span>
          Lulusan Sains Data ITERA (IPK 3.09) berpengalaman membangun model Machine Learning optimasi biaya bahan bakar klinker semen di PT Semen Gresik, serta merancang otomatisasi data penjualan 7 brand produk di PT Depoguna Bangunan Online.
        </div>
      </div>
    </section>
  );
};
