import React, { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Code2, Cpu } from "lucide-react";

export const ModelInfoSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6 md:p-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="w-full flex items-center justify-between gap-4 text-left focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-slate-900 dark:text-slate-100">
              Tentang Model Machine Learning
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Klik untuk melihat detail arsitektur Deep MLP, preprosesing, dan tautan repositori GitHub.
            </p>
          </div>
        </div>

        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6 text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
          <p>
            Model menggunakan <strong>Deep Multi-Layer Perceptron (DNN)</strong> untuk mempelajari hubungan nonlinear kompleks antara karakteristik kimia unsur semen (MgO, CaO, SO3, LOI, FL, Insol) dan kekuatan tekan pada umur 28 hari.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400 font-bold uppercase mb-2">Spesifikasi Model:</div>
              <div>• Model: Deep Multi-Layer Perceptron (MLP)</div>
              <div>• Task Type: Regression</div>
              <div>• Target Variable: 28-Day Compressive Strength (kg/cm²)</div>
              <div>• Total Training Observations: 454 Valid Samples</div>
              <div>• Scaling: StandardScaler (u = 0, std = 1)</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400 font-bold uppercase mb-2">Arsitektur Neural Network:</div>
              <div>Input Layer (6 Features: MgO, CaO, SO3, LOI, FL, Insol)</div>
              <div className="text-cyan-500 pl-4">↓</div>
              <div>Dense Layer 1 (128 Neurons, ReLU Activation)</div>
              <div className="text-cyan-500 pl-4">↓</div>
              <div>Dense Layer 2 (64 Neurons, ReLU Activation)</div>
              <div className="text-cyan-500 pl-4">↓</div>
              <div>Output Layer (1 Neuron, Linear Output)</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <a
              href="https://github.com/vickyaditia/Prediksi-Kuat-Tekan-Semen-setelah-28-hari-Menggunakan-Deep-MLP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              <Code2 className="w-4 h-4" />
              <span>Lihat Source Code Repositori GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
