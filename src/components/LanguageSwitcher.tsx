import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language?.startsWith("pt") ? "pt" : "en";

  const toggleLanguage = () => {
    const nextLang = currentLang === "en" ? "pt" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="fixed bottom-6 right-6 z-20 flex items-center justify-center gap-2 h-12 px-4 rounded-full bg-white/95 dark:bg-[#140808]/95 text-inferno dark:text-cherry border-2 border-inferno/60 dark:border-cherry/60 shadow-xl hover:shadow-2xl backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer font-heading font-bold text-xs select-none group"
      title={currentLang === "en" ? "Mudar para Português (Brasil)" : "Switch to English"}
      aria-label={t("nav.languageToggleAria")}
    >
      <Languages className="w-4 h-4 text-inferno dark:text-cherry group-hover:rotate-12 transition-transform duration-200" />
      <span className="font-extrabold uppercase tracking-wider text-[12px]">
        {currentLang === "pt" ? "PT-BR" : "EN"}
      </span>
    </button>
  );
};
