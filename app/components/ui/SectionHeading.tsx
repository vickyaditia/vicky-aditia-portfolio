import React from "react";
import { Badge } from "./Badge";

interface SectionHeadingProps {
  badgeText: string;
  title: string;
  description?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badgeText,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="space-y-3">
        <Badge variant="emerald">{badgeText}</Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 font-heading">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-sm text-slate-400 max-w-md font-sans leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
