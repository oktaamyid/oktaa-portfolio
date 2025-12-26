"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "id";

interface LanguageContextType {
     language: Language;
     setLanguage: (lang: Language) => void;
     toggleLanguage: () => void;
     t: (en: string, id: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
     const [language, setLanguage] = useState<Language>("en");

     // Load from local storage if available
     useEffect(() => {
          const savedLang = localStorage.getItem("language") as Language;
          if (savedLang && (savedLang === "en" || savedLang === "id")) {
               setLanguage(savedLang);
          }
     }, []);

     const handleSetLanguage = (lang: Language) => {
          setLanguage(lang);
          localStorage.setItem("language", lang);
     };

     const toggleLanguage = () => {
          handleSetLanguage(language === "en" ? "id" : "en");
     };

     const t = (en: string, id: string) => {
          return language === "en" ? en : id;
     };

     return (
          <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, toggleLanguage, t }}>
               {children}
          </LanguageContext.Provider>
     );
}

export function useLanguage() {
     const context = useContext(LanguageContext);
     if (context === undefined) {
          throw new Error("useLanguage must be used within a LanguageProvider");
     }
     return context;
}
