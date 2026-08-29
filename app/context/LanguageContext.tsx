"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "ID" | "EN";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("ID");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang === "ID" || savedLang === "EN") {
      setLanguageState(savedLang);
    } else {
      setLanguageState("ID");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("language", language);
  }, [language, mounted]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "ID" ? "EN" : "ID"));
  };

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
