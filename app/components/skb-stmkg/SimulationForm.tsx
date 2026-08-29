"use client";

import React, { useState } from "react";
import { Play, RotateCcw, Sliders, AlertCircle } from "lucide-react";
import { SkbSimulationInput } from "@/lib/skb-stmkg/types";

interface SimulationFormProps {
  onSimulate: (input: SkbSimulationInput) => void;
  isLoading: boolean;
}

export const SimulationForm: React.FC<SimulationFormProps> = ({
  onSimulate,
  isLoading,
}) => {
  const [skd, setSkd] = useState<number>(380);
  const [matematika, setMatematika] = useState<number>(80);
  const [fisika, setFisika] = useState<number>(75);
  const [bahasaInggris, setBahasaInggris] = useState<number>(82);
  const [metklim, setMetklim] = useState<number>(78);
  const [geofisika, setGeofisika] = useState<number>(76);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Inline Validation
    if (skd < 100 || skd > 500) {
      setErrorMessage("Skor SKD harus berada dalam rentang 100 - 500.");
      return;
    }
    if (
      matematika < 0 || matematika > 100 ||
      fisika < 0 || fisika > 100 ||
      bahasaInggris < 0 || bahasaInggris > 100 ||
      metklim < 0 || metklim > 100 ||
      geofisika < 0 || geofisika > 100
    ) {
      setErrorMessage("Masukkan nilai mata pelajaran yang valid antara 0 - 100.");
      return;
    }

    setErrorMessage(null);
    onSimulate({
      skd,
      matematika,
      fisika,
      bahasaInggris,
      metklim,
      geofisika,
    });
  };

  const handleReset = () => {
    setSkd(380);
    setMatematika(80);
    setFisika(75);
    setBahasaInggris(82);
    setMetklim(78);
    setGeofisika(76);
    setErrorMessage(null);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-slate-50">
            Simulasikan Nilaimu
          </h2>
          <p className="text-xs text-slate-400">
            Masukkan nilai Anda untuk melihat hasil simulasi berdasarkan model Machine Learning.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          <span>Reset</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Skor SKD */}
          <div className="space-y-1.5 sm:col-span-2">
            <div className="flex justify-between font-medium text-slate-300">
              <label htmlFor="skd-input">Skor SKD (TWK + TIU + TKP)</label>
              <span className="font-mono text-indigo-400 font-bold">{skd}</span>
            </div>
            <input
              id="skd-input"
              type="number"
              min={100}
              max={500}
              value={skd}
              onChange={(e) => setSkd(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Nilai Matematika */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-slate-300">
              <label htmlFor="mtk-input">Nilai Matematika (0 - 100)</label>
              <span className="font-mono text-indigo-400 font-bold">{matematika}</span>
            </div>
            <input
              id="mtk-input"
              type="number"
              min={0}
              max={100}
              value={matematika}
              onChange={(e) => setMatematika(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Nilai Fisika */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-slate-300">
              <label htmlFor="fis-input">Nilai Fisika (0 - 100)</label>
              <span className="font-mono text-indigo-400 font-bold">{fisika}</span>
            </div>
            <input
              id="fis-input"
              type="number"
              min={0}
              max={100}
              value={fisika}
              onChange={(e) => setFisika(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Nilai Bahasa Inggris */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-slate-300">
              <label htmlFor="ing-input">Nilai Bahasa Inggris (0 - 100)</label>
              <span className="font-mono text-indigo-400 font-bold">{bahasaInggris}</span>
            </div>
            <input
              id="ing-input"
              type="number"
              min={0}
              max={100}
              value={bahasaInggris}
              onChange={(e) => setBahasaInggris(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Nilai Meteorologi & Klimatologi */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-slate-300">
              <label htmlFor="met-input">Nilai Meteorologi & Klimatologi</label>
              <span className="font-mono text-indigo-400 font-bold">{metklim}</span>
            </div>
            <input
              id="met-input"
              type="number"
              min={0}
              max={100}
              value={metklim}
              onChange={(e) => setMetklim(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Nilai Geofisika */}
          <div className="space-y-1.5 sm:col-span-2">
            <div className="flex justify-between font-medium text-slate-300">
              <label htmlFor="geo-input">Nilai Geofisika (0 - 100)</label>
              <span className="font-mono text-indigo-400 font-bold">{geofisika}</span>
            </div>
            <input
              id="geo-input"
              type="number"
              min={0}
              max={100}
              value={geofisika}
              onChange={(e) => setGeofisika(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-slate-50 font-bold font-heading text-sm transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <span>Menghitung...</span>
          ) : (
            <>
              <Play className="w-4 h-4 fill-slate-50" />
              <span>Simulasikan</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
