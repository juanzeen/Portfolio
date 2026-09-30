import React, { useState } from "react";
import { Code2, Server, Database, Cpu } from "lucide-react";
import stackData from "@/public/data/stack.json";

interface TechSkill {
  name: string;
  category: "frontend" | "backend" | "database" | "infra and ops";
  level: "Advanced" | "Proficient" | "Academic";
  description: string;
  tags: string[];
}

const TECH_STACK = stackData as TechSkill[];

const PARK_ZONES = [
  { id: "frontend", label: "Frontend Playground", icon: Code2, count: 6 },
  { id: "backend", label: "Backend Grove", icon: Server, count: 4 },
  { id: "database", label: "Database Lake", icon: Database, count: 3 },
  { id: "infra and ops", label: "Infra & DevOps Trail", icon: Cpu, count: 5 },
] as const;

export const StackParkSection: React.FC = () => {
  const [activeZone, setActiveZone] = useState<string>("frontend");

  const filteredSkills = TECH_STACK.filter(
    (skill) => skill.category === activeZone,
  );

  return (
    <section
      id="stack-park"
      className="relative py-24 bg-offwhite dark:bg-blackbrown border-b border-slate-200 dark:border-zinc-800 overflow-hidden transition-colors duration-200"
    >
      <div className="w-[90%] lg:w-[82%] max-w-6xl mx-auto relative z-10">
        {/* Section Header: Park Entrance Archway */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-heading uppercase tracking-wider font-semibold">
                Station 3 • Green Zone
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-blackbrown dark:text-lighttext">
              Stack Park
            </h2>

            <p className="font-body text-slate-600 dark:text-zinc-300 text-base max-w-2xl mt-2 leading-relaxed">
              Step into the city's open technology park. Just as trees and
              gardens bring a breath of fresh air to the urban landscape, these
              programming languages, frameworks, and foundations are essential
              to my software creations.
            </p>
          </div>
        </div>

        {/* Park Pavilions / Category Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-10 pb-4 border-b border-slate-200 dark:border-zinc-800">
          {PARK_ZONES.map((zone) => {
            const Icon = zone.icon;
            const isActive = activeZone === zone.id;

            return (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold font-heading transition-all cursor-pointer shadow-xs ${
                  isActive
                    ? "bg-inferno dark:bg-cherry text-white shadow-md active:translate-y-px"
                    : "bg-white dark:bg-blackbrown text-slate-600 dark:text-zinc-300 hover:text-inferno dark:hover:text-cherry hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-white" : "text-inferno dark:text-cherry"}`}
                />
                <span>{zone.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400"
                  }`}
                >
                  {zone.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tech Skills Grid: Styled with rounded-md and shadow-md per guidelines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSkills.map((tech) => {
            const isAcademic = tech.level === "Academic";
            const isAdvanced = tech.level === "Advanced";

            return (
              <div
                key={tech.name}
                className="rounded-md shadow-md border border-slate-200 dark:border-zinc-800 bg-white dark:bg-blackbrown p-5 flex flex-col justify-between group hover:border-inferno/50 dark:hover:border-cherry/60 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  {/* Top Header of Card */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-heading text-base font-bold text-blackbrown dark:text-lighttext group-hover:text-inferno dark:group-hover:text-cherry transition-colors flex items-center gap-1.5">
                      {tech.name}
                    </span>

                    <span
                      className={`text-[10px] font-bold font-heading px-2 py-0.5 rounded-sm uppercase tracking-tight ${
                        isAcademic
                          ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                          : isAdvanced
                            ? "bg-inferno/10 dark:bg-cherry/20 text-inferno dark:text-cherry border border-inferno/20 dark:border-cherry/30"
                            : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700"
                      }`}
                    >
                      {tech.level}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed mb-4">
                    {tech.description}
                  </p>
                </div>

                {/* Tags / Sub-skills */}
                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex flex-wrap gap-1.5">
                  {tech.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-slate-50 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-300 text-[10px] font-medium font-heading px-2 py-0.5 rounded-sm border border-slate-200/80 dark:border-zinc-700/80 group-hover:bg-inferno/5 dark:group-hover:bg-cherry/15 group-hover:text-inferno dark:group-hover:text-cherry transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Park Visitor Information / CS 4/5 Benchmark Banner
        <div className="mt-14 bg-white dark:bg-blackbrown rounded-md shadow-md border-2 border-slate-200 dark:border-zinc-800 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-md bg-inferno text-white flex items-center justify-center shrink-0 shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading text-lg font-bold text-blackbrown dark:text-lighttext flex items-center gap-2">
                <span>The Computer Science Garden</span>
                <Badge variant="accent" className="text-[10px]">
                  Year 4 of 5
                </Badge>
              </h4>
              <p className="font-body text-sm text-slate-600 dark:text-zinc-300 leading-relaxed mt-1 max-w-2xl">
                Every technology featured in Stack Park is grounded in 4 years of university
                computer science theory—from algorithmic time complexity to memory allocation—combined
                with hands-on full-stack product building.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="#timeline"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold font-heading bg-inferno text-white hover:bg-inferno-dark shadow-md transition-colors"
            >
              <span>Follow Route to Timeline</span>
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};
