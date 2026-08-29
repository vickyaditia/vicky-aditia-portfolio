import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "emerald" | "slate";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "emerald",
  className,
}) => {
  const baseClasses =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-mono tracking-wider";

  const variantClasses = {
    emerald: "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400",
    slate: "bg-slate-800/80 border border-slate-700 text-slate-300",
  };

  return <span className={cn(baseClasses, variantClasses[variant], className)}>{children}</span>;
};
