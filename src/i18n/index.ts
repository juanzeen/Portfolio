import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import pt from "./locales/pt.json";

export const defaultNS = "translation";
export const resources = {
  en: { translation: en },
  pt: { translation: pt },
  "pt-BR": { translation: pt },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "pt", "pt-BR"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
  });

if (typeof document !== "undefined") {
  const updateHtmlMetadata = (lng: string) => {
    const isPt = lng.startsWith("pt");
    document.documentElement.lang = isPt ? "pt-BR" : "en";
    const titleKey = "meta.title";
    const translatedTitle = i18n.t(titleKey);
    if (translatedTitle && translatedTitle !== titleKey) {
      document.title = translatedTitle;
    }
  };

  updateHtmlMetadata(i18n.language || "en");
  i18n.on("languageChanged", updateHtmlMetadata);
}

export default i18n;
