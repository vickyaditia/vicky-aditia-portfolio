import React from "react";
import { AlertCircle } from "lucide-react";

export const CementDisclaimer: React.FC = () => {
  return (
    <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-3">
      <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
      <p className="leading-relaxed">
        <strong>Disclaimer Informasi Data:</strong> Prediksi merupakan estimasi berdasarkan pola data historis yang dipelajari model Machine Learning (Deep Multi-Layer Perceptron). Hasil ini tidak menggantikan pengujian kuat tekan fisik laboratorium dan tidak boleh digunakan sebagai satu-satunya dasar keputusan kualitas produk.
      </p>
    </div>
  );
};
