import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "p-6 md:p-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500/40 transition-all duration-300 shadow-md dark:shadow-lg dark:shadow-black/20",
        className
      )}
    >
      {children}
    </div>
  );
};
