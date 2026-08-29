"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, GraduationCap, ArrowLeft } from "lucide-react";

export const SkbHeader: React.FC = () => {
  return (
    <div className="space-y-4 pb-6 border-b border-slate-800">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs font-sans text-slate-400">
        <Link href="/" className="hover:text-emerald-400 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link href="/lab" className="hover:text-emerald-400 transition-colors">
          Lab
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-200 font-semibold">SKB STMKG 2024</span>
      </nav>

      {/* Main Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-medium">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>PROJECT SIMULASI & EKSPLORASI DATA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-slate-50 tracking-tight">
            Klasifikasi SKB STMKG 2024
          </h1>

          <p className="text-sm text-slate-300 font-sans leading-relaxed max-w-3xl">
            Simulasikan nilai SKB Anda berdasarkan pola data historis peserta menggunakan Machine Learning.
          </p>
        </div>

        <Link
          href="/lab"
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-sans font-medium transition-colors shrink-0 self-start md:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Lab</span>
        </Link>
      </div>
    </div>
  );
};
