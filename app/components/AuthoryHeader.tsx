"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, MapPin, Database, Award } from "lucide-react";
import { Button } from "./ui/Button";

export const AuthoryHeader: React.FC = () => {
  return (
    <section className="pt-24 pb-12 border-b border-slate-700/60 bg-slate-950/40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          {/* Avatar & Main Bio */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-emerald-500 via-slate-700 to-emerald-400 shrink-0 shadow-lg shadow-emerald-500/10">
              <div className="w-full h-full rounded-full bg-slate-900 border border-slate-700 flex flex-col items-center justify-center text-center">
                <span className="font-heading text-2xl font-bold text-emerald-400">VA</span>
                <span className="text-[10px] text-slate-400 font-mono">PORTFOLIO</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-bold font-heading text-slate-50">
                  Vicky Aditia
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                  Verified Data Scientist
                </span>
              </div>

              <p className="text-base font-semibold text-emerald-400 font-sans">
                Data Scientist | Data Analyst | Automation Engineer
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-sans">
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
                  <Award className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  IPK 3.09 / 4.00
                </span>
              </div>
            </div>
          </div>

          {/* Social Links & Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="mailto:aditia.vicky14@gmail.com"
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-emerald-400 transition-colors"
              title="Email Contact"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href="https://github.com/vickyaditia"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-emerald-400 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/vicky-aditia-7b96081a4/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-emerald-400 transition-colors"
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

        {/* Authory Style Bio Excerpt */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 text-sm text-slate-300 leading-relaxed font-sans max-w-4xl">
          Lulusan Sains Data ITERA (IPK 3.09) berpengalaman membangun model Machine Learning optimasi biaya bahan bakar klinker semen di PT Semen Gresik, serta merancang otomatisasi data penjualan 7 brand produk di PT Depoguna Bangunan Online.
        </div>
      </div>
    </section>
  );
};
