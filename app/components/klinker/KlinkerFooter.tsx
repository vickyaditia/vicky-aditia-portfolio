import React from "react";

export const KlinkerFooter: React.FC = () => {
  return (
    <footer className="pt-8 pb-12 border-t border-slate-800 text-xs font-sans text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="space-y-1 text-center sm:text-left">
        <div>Data Source: Industrial Production Dataset (PT Semen Gresik Rembang RKAP 2023)</div>
        <div>Model Architecture: XGBoost Regressor (R² = 0.934)</div>
      </div>

      <div className="text-center sm:text-right space-y-1">
        <div>Last Updated: August 2026</div>
        <div>
          Industrial AI Platform by{" "}
          <span className="text-emerald-400 font-semibold font-heading">Vicky Aditia</span>
        </div>
      </div>
    </footer>
  );
};
