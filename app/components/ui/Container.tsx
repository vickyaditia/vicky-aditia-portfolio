import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className, id }) => {
  return (
    <section id={id} className={cn("py-20 md:py-28 border-b border-slate-800/80", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {children}
      </div>
    </section>
  );
};
