import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-slate-700/60 bg-slate-950 text-slate-400 font-sans text-xs">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © 2026 Vicky Aditia. Built with Next.js 15, TypeScript & Tailwind CSS.
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/vickyaditia"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/vicky-aditia-7b96081a4/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:aditia.vicky14@gmail.com"
            className="hover:text-emerald-400 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
