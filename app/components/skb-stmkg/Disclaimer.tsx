import React from "react";
import { AlertCircle } from "lucide-react";

export const Disclaimer: React.FC = () => {
  return (
    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs leading-relaxed flex items-start space-x-3 font-sans">
      <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
      <div>
        <span className="font-bold text-slate-300">Catatan: </span>
        Hasil ini merupakan simulasi berdasarkan pola data historis dan model Machine Learning. Hasil simulasi bukan keputusan resmi penerimaan STMKG.
      </div>
    </div>
  );
};
