"use client";

import React from "react";
import { Search, LayoutGrid, List } from "lucide-react";

interface FilterToolbarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  totalCount: number;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  totalCount,
}) => {
  return (
    <div className="py-6 border-b border-slate-700/60 bg-slate-900/80 sticky top-16 z-40 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Topic Category Pills (Authory Tab Bar) */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input & View Toggle Controls */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects or tools..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-800 border border-slate-700/80 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* View Mode Switcher Buttons */}
            <div className="flex items-center bg-slate-800 border border-slate-700/80 rounded-lg p-0.5">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-slate-700 text-emerald-400" : "text-slate-400 hover:text-slate-200"
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-slate-700 text-emerald-400" : "text-slate-400 hover:text-slate-200"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <span className="text-xs text-slate-400 font-mono hidden lg:inline">
              ({totalCount} items)
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
