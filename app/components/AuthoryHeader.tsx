"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, MapPin, Database, Award, HardHat } from "lucide-react";
import { Button } from "./ui/Button";

export const AuthoryHeader: React.FC = () => {
  return (
    <section className="relative pt-28 pb-16 border-b border-slate-700/60 overflow-hidden min-h-[460px] flex items-center">
      {/* Full Industrial Field Background Photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Vicky Aditia Industrial Field Background"
          fill
          className="object-cover object-center filter brightness-90 contrast-105"
          priority
        />
        {/* Professional Dark Overlay for Text High Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          {/* Main Bio & Candidate Name */}
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-medium backdrop-blur-md">
              <HardHat className="w-3.5 h-3.5 mr-1.5" />
              <span>DATA SCIENTIST & DATA ANALYST</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-slate-50 tracking-tight leading-[1.1]">
              Vicky Aditia
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-emerald-400 font-heading">
              Mengubah Telemetri Industri & Data Operasional Menjadi Keputusan Bisnis Terukur
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 font-sans pt-1">
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

          {/* Social Links & Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="mailto:aditia.vicky14@gmail.com"
              className="p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-emerald-400 transition-colors backdrop-blur-md"
              title="Email Contact"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/vickyaditia"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-emerald-400 transition-colors backdrop-blur-md"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/vicky-aditia-7b96081a4/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 hover:text-emerald-400 transition-colors backdrop-blur-md"
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
        <div className="mt-8 text-sm text-slate-200 leading-relaxed font-sans max-w-4xl bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 backdrop-blur-md shadow-lg">
          <span className="font-semibold text-emerald-400">Pengalaman & Expertise: </span>
          Lulusan Sains Data ITERA (IPK 3.09) berpengalaman membangun model Machine Learning optimasi biaya bahan bakar klinker semen di PT Semen Gresik, serta merancang otomatisasi data penjualan 7 brand produk di PT Depoguna Bangunan Online.
        </div>
      </div>
    </section>
  );
};
