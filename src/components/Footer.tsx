import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-800 text-lighttext border-t-2 border-inferno relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          <div className="flex flex-col items-center md:col-span-6 space-y-3">
            <img
              src="/assets/favicon.svg"
              alt={t("footer.logoAlt")}
              className="w-30 h-30"
            />
            <p className="text-sm text-slate-400 max-w-md font-body leading-relaxed text-center md:text-left">
              {t("footer.description")}
            </p>
          </div>

          {/* Center Links */}
          <div className="md:col-span-4 space-y-2 text-sm font-heading">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              {t("footer.navigationTitle")}
            </h4>
            <ul className="space-y-1 text-slate-300">
              <li>
                <a
                  href="#hero"
                  className="hover:text-cherry transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-inferno" />
                  {t("footer.navHero")}
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-cherry transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-inferno" />
                  {t("footer.navProjects")}
                </a>
              </li>
              <li>
                <a
                  href="#stack-park"
                  className="hover:text-cherry transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-inferno" />
                  {t("footer.navStack")}
                </a>
              </li>
              <li>
                <a
                  href="#timeline"
                  className="hover:text-cherry transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-inferno" />
                  {t("footer.navTimeline")}
                </a>
              </li>
            </ul>
          </div>

          {/* Right Links & Back to Top */}
          <div className="md:col-span-2 flex flex-col md:items-end justify-between space-y-4">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/juanzeen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-white/10 hover:bg-inferno flex items-center justify-center text-white transition-colors"
                title="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/juan-cristo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-white/10 hover:bg-inferno flex items-center justify-center text-white transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="mailto:juanhygino@gmail.com"
                className="w-9 h-9 rounded-md bg-white/10 hover:bg-inferno flex items-center justify-center text-white transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md transition-colors font-heading cursor-pointer"
            >
              <span>{t("footer.returnToTop")}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 font-body">
          <p>© {new Date().getFullYear()} Juan Cristo. {t("footer.rights")}</p>
          <p className="flex items-center gap-1">
            <span>{t("footer.poweredBy")}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
