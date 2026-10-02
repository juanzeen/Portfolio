import React from "react"
import { useTranslation } from "react-i18next"
import { Bus, MapPin, ArrowRight, ShieldCheck, Park } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import avatar from "/assets/juanavatar.png"

export const HeroSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 bg-offwhite dark:bg-blackbrown transition-colors duration-200"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* District Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-8 pb-3 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              {t("hero.stationTag")}
            </span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {t("hero.speedLimit")}
          </Badge>
        </div>

        {/* Hero Grid: Left = Image, Right = Name & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Image in City Transit Card Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* City Map / Passport Border Decoration */}
              <div className="absolute -top-3 -left-3 w-full h-full rounded-md border-2 border-dashed border-inferno/30 dark:border-cherry/40 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-md bg-inferno/5 dark:bg-cherry/10 pointer-events-none" />

              {/* Transit Pass Card */}
              <div className="relative rounded-md shadow-md border-2 border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#140808] p-4 transition-all hover:border-inferno/40 dark:hover:border-cherry/50">
                {/* Transit Pass Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-400 font-heading">
                  <div className="flex items-center gap-1.5 font-bold text-inferno dark:text-cherry">
                    <span>{t("hero.residentCard")}</span>
                  </div>
                  <span className="text-[10px] font-mono text-inferno bg-slate-100 dark:bg-zinc-800 dark:text-cherry px-2 py-0.5 rounded-sm">
                    {t("hero.cardId")}
                  </span>
                </div>

                {/* Avatar Image with required object-fit and grayscale hover effect */}
                <div className="relative overflow-hidden rounded-md aspect-square bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 group">
                  <img
                    src={avatar}
                    alt={t("hero.avatarAlt")}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Road Line Decorator at Bottom of Card */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-heading">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cherry" />
                    {t("hero.cityLocation")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Name, Description, and Details */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">

            {/* Main Name Heading */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-blackbrown dark:text-lighttext leading-none mb-3">
              Juan Cristo
            </h1>

            {/* Subtitle / Short Description */}
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-cherry mb-4 flex items-center gap-2 flex-wrap">
              <span>{t("hero.role")}</span>
            </h2>

            {/* Narrative / Context */}
            <p className="font-body text-base sm:text-lg text-darkslate dark:text-zinc-300 leading-relaxed mb-6 max-w-2xl">
              {t("hero.bio")}
            </p>

            {/* Key Transit Highlights */}
            <div className="grid grid-cols-2 mb-8">
              <div className="col-span-2 sm:col-span-1 bg-white dark:bg-[#160a0a] p-3 rounded-md shadow-md border border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 font-medium mb-1 font-heading">
                  <ShieldCheck className="w-3.5 h-3.5 text-cherry dark:text-cherry" />
                  <span>{t("hero.statusLabel")}</span>
                </div>
                <p className="font-heading font-bold text-sm text-blackbrown dark:text-lighttext">
                  {t("hero.statusValue")}
                </p>
                <span className="text-[11px] text-cherry dark:text-cherry font-medium">
                  {t("hero.statusSubtext")}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                variant="default"
                onClick={() => {
                  const el = document.getElementById("projects")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
                className="gap-2"
              >
                <span>{t("hero.btnProjects")}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  const el = document.getElementById("stack-park")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
                className="gap-2 dark:border-zinc-700 dark:bg-[#160a0a] dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <Park className="w-4 h-4 text-inferno dark:text-cherry" />
                <span>{t("hero.btnStack")}</span>
              </Button>

              <Button
                variant="default"
                onClick={() => {
                  const el = document.getElementById("timeline")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <span>{t("hero.btnTimeline")}</span>
                <Bus className="w-4 h-4 text-offwhite dark:text-lighttext" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
