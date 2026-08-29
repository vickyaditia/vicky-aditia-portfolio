"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Factory,
  LayoutDashboard,
  TrendingUp,
  Zap,
  BarChart2,
  Cpu,
  Sliders,
  Database,
  Info,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "production", label: "Prediksi Produksi", icon: TrendingUp },
    { id: "energy", label: "Prediksi Biaya Energi", icon: Zap },
    { id: "analysis", label: "Analisis Data", icon: BarChart2 },
    { id: "performance", label: "Model Performance", icon: Cpu },
    { id: "simulation", label: "Simulasi & Optimasi", icon: Sliders },
    { id: "explorer", label: "Data Explorer", icon: Database },
    { id: "about", label: "About", icon: Info },
  ];

  const handleNavClick = (id: string) => {
    onSelectSection(id);
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-3.5 rounded-full bg-emerald-500 text-slate-950 shadow-xl border border-emerald-400 flex items-center justify-center"
          aria-label="Toggle Navigation Sidebar"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-slate-950 border-r border-slate-800 z-40 flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Header Branding */}
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Factory className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-bold text-base text-slate-50 tracking-tight leading-none">
                🏭 Klinker Optimization
              </div>
              <div className="text-[10px] text-emerald-400 font-mono mt-1">
                Industrial AI Platform
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1 text-xs font-sans font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Back to Main Portfolio Link */}
        <div className="p-6 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-sans text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Portofolio Utama</span>
          </Link>
        </div>
      </aside>
    </>
  );
};
