import React from "react";
import { Sun, Moon, Train, HouseCog, Park, Map } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import logo from "/public/assets/favicon.svg";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <header className="sticky top-2 z-40 w-3/4 min-w-80 max-w-200 border-2 border-inferno/60 bg-white/10 dark:bg-zinc-900/10 backdrop-blur-lg shadow-lg transition-opacity duration-200 mx-auto rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          {/* Logo & City Station */}
          <a
            href="#"
            className="transition-opacity hover:opacity-75"
          >
            <img src={logo} className="min-w-9 min-h-12 w-16 h-16 text-inferno fill-inferno" />
          </a>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <a
              href="#hero"
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium font-heading text-inferno dark:text-cherry hover:text-inferno/60 dark:hover:text-cherry/60 rounded-md transition-colors"
            >
              <Train className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:block">Central Station</span>
            </a>
            <a
              href="#projects"
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium font-heading text-inferno dark:text-cherry hover:text-inferno/60 dark:hover:text-cherry/60 rounded-md transition-colors"
            >
              <HouseCog className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:block">Projects District</span>
            </a>
            <a
              href="#stack-park"
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium font-heading text-inferno dark:text-cherry hover:text-inferno/60 dark:hover:text-cherry/60 rounded-md transition-colors"
            >
              <Park className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:block">Stack Park</span>
            </a>
            <a
              href="#timeline"
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium font-heading text-inferno dark:text-cherry hover:text-inferno/60 dark:hover:text-cherry/60 rounded-md transition-colors"
            >
              <Map className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:block">Transit Route Map</span>
            </a>
            <img alt="" />
          </nav>

          {/* Action & Dark Mode Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-transparent text-slate-700 dark:text-cherry transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-heading"
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
