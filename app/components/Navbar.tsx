"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Proyek", href: "#projects" },
    { label: "Skill", href: "#skills" },
    { label: "Pengalaman", href: "#experience" },
    { label: "Lab", href: "#lab" },
    { label: "Kontak", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-md border-b border-slate-700/60 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 font-heading text-base tracking-tight font-bold text-slate-50 group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="group-hover:text-emerald-400 transition-colors">
            VICKY<span className="text-emerald-400">.DATA</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-sans font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-300 hover:text-emerald-400 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <Button
            href="/docs/CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="CV_Vicky_Aditia_Data_Scientist.pdf"
            variant="primary"
            size="sm"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download CV
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-700 bg-slate-900/95 backdrop-blur-lg px-4 pt-4 pb-6 space-y-4 font-sans text-sm">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-200 hover:text-emerald-400 py-1.5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-700">
            <Button
              href="/docs/CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="CV_Vicky_Aditia_Data_Scientist.pdf"
              onClick={() => setMobileMenuOpen(false)}
              variant="primary"
              size="md"
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV (PDF)
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
