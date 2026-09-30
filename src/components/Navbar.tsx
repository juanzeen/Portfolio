import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import logo from "/public/assets/favicon.svg";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <header className="hidden sticky top-0 z-40 w-full border-b-2 border-inferno bg-offwhite/90 dark:bg-blackbrown/90 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          {/* Logo & City Station */}
          <a
            href="#"
            className="flex items-center gap-3 group transition-transform hover:scale-[1.02]"
          >
            <img src={logo} className="w-16 h-16 text-inferno fill-inferno" />
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <a
              href="#hero"
              className="px-3 py-1.5 text-sm font-medium font-heading text-slate-600 dark:text-zinc-300 hover:text-inferno dark:hover:text-cherry hover:bg-slate-100 dark:hover:bg-zinc-800/60 rounded-md transition-colors"
            >
              Central Station
            </a>
            <a
              href="#projects"
              className="px-3 py-1.5 text-sm font-medium font-heading text-slate-600 dark:text-zinc-300 hover:text-inferno dark:hover:text-cherry hover:bg-slate-100 dark:hover:bg-zinc-800/60 rounded-md transition-colors"
            >
              Projects District
            </a>
            <a
              href="#stack-park"
              className="px-3 py-1.5 text-sm font-medium font-heading text-slate-600 dark:text-zinc-300 hover:text-inferno dark:hover:text-cherry hover:bg-slate-100 dark:hover:bg-zinc-800/60 rounded-md transition-colors"
            >
              Stack Park
            </a>
            <a
              href="#timeline"
              className="px-3 py-1.5 text-sm font-medium font-heading text-slate-600 dark:text-zinc-300 hover:text-inferno dark:hover:text-cherry hover:bg-slate-100 dark:hover:bg-zinc-800/60 rounded-md transition-colors"
            >
              Transit Route Map
            </a>
            <img alt="" />
          </nav>

          {/* Action & Dark Mode Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#180a0a] text-slate-700 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5 text-xs font-heading"
              title={
                theme === "dark"
                  ? "Switch to Day Mode (Off-white)"
                  : "Switch to Night Mode (Black-Brown)"
              }
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                </>
              )}
            </button>
          </div>
        </div>
      </header>
      <header className="sticky top-2 z-40 w-3/4 md:w-3/5 border-2 border-inferno/60 bg-white/10 dark:bg-zinc-900/10 backdrop-blur-lg shadow-lg transition-opacity duration-200 mx-auto rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          {/* Logo & City Station */}
          <a
            href="#"
            className="flex items-center gap-3 group transition-transform hover:scale-[1.02]"
          >
            <img src={logo} className="w-16 h-16 text-inferno fill-inferno" />
          </a>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <a
              href="#hero"
              className="px-3 py-1.5 text-sm font-medium font-heading text-inferno dark:text-cherry hover:text-inferno/60 dark:hover:text-cherry/60 rounded-md transition-colors"
            >
              {window.screen.width < 500 ? "St1" : "Central Station"}
            </a>
            <a
              href="#projects"
              className="px-3 py-1.5 text-sm font-medium font-heading text-inferno dark:text-cherry hover:text-inferno/60 dark:hover:text-cherry/60 rounded-md transition-colors"
            >
              {window.screen.width < 500 ? "St2" : "Projects District"}
            </a>
            <a
              href="#stack-park"
              className="px-3 py-1.5 text-sm font-medium font-heading text-inferno dark:text-cherry hover:text-inferno/60 dark:hover:text-cherry/60 rounded-md transition-colors"
            >
              {window.screen.width < 500 ? "St3" : "Stack Park"}
            </a>
            <a
              href="#timeline"
              className="px-3 py-1.5 text-sm font-medium font-heading text-inferno dark:text-cherry hover:text-inferno/60 dark:hover:text-cherry/60 rounded-md transition-colors"
            >
              {window.screen.width < 500 ? "St4" : "Transit Route Map"}
            </a>
            <img alt="" />
          </nav>

          {/* Action & Dark Mode Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-transparent text-slate-700 dark:text-cherry transition-colors shadow-xs cursor-pointer flex items-center gap-1.5 text-xs font-heading"
              title={
                theme === "dark"
                  ? "Switch to Day Mode (Off-white)"
                  : "Switch to Night Mode (Black-Brown)"
              }
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4 text-cherry hover:text-inferno" />
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-inferno hover:text-cherry" />
                </>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
