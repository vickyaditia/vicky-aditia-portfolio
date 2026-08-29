import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  download,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-heading font-semibold tracking-wider uppercase rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-[0.98]";

  const variantClasses = {
    primary:
      "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20",
    secondary:
      "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700",
    outline:
      "bg-transparent hover:bg-slate-900 text-slate-200 border border-slate-700 hover:border-emerald-500/50 hover:text-emerald-400",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-xs",
    lg: "px-6 py-3.5 text-xs",
  };

  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <a href={href} target={target} rel={rel} download={download} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
