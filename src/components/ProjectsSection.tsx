import React from "react";
import { ExternalLink, MapPin, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import projectsData from "@/public/data/projects.json";

interface ProjectItem {
  id: string;
  title: string;
  district: string;
  stationCode: string;
  description: string;
  thumbnail: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  status: string;
}

const SAMPLE_PROJECTS = projectsData as ProjectItem[];

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="projects"
      className="relative py-24 bg-offwhite dark:bg-zinc-900 border-t border-b border-slate-200 dark:border-zinc-800 transition-colors duration-200"
    >
      <div className="w-9/10 lg:w-[82%] max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-slate-500 dark:text-zinc-400 font-heading uppercase tracking-wider font-semibold">
                Station 02 • Creative Area
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-inferno dark:text-cherry">
              Projects District
            </h2>
            <p className="font-body text-slate-600 dark:text-zinc-300 text-base max-w-2xl mt-2">
              Explore some of my latest projects and discover where I focus my
              efforts and skills. Each project was conceived as a fundamental
              building block of a city.
            </p>
          </div>
        </div>

        {/* Projects List - Wide lines (80% or full width) with Image on one side and Info on the other */}
        <div className="space-y-10 md:space-y-12">
          {SAMPLE_PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } rounded-md shadow-md border-2 border-slate-200 dark:border-blackbrown bg-white dark:bg-blackbrown overflow-hidden group hover:border-inferno/50 dark:hover:border-cherry/60 hover:shadow-xl transition-all duration-300`}
              >
                {/* Image Side (takes ~45-50% width) */}
                <div className="md:w-5/12 lg:w-1/2 relative overflow-hidden bg-slate-900 min-h-55 md:min-h-85">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
                  />

                  {/* District / Station Tag Overlay */}
                  <div className="absolute top-3 left-3 bg-blackbrown/85 backdrop-blur-xs text-lighttext text-xs font-heading font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-slate-700 shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-cherry" />
                    <span>{project.district}</span>
                  </div>

                  {/* Status Overlay */}
                  <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-blackbrown/95 backdrop-blur-xs text-inferno dark:text-cherry text-xs font-heading font-bold px-2.5 py-1 rounded-md shadow-md border border-slate-200 dark:border-zinc-700">
                    {project.status}
                  </div>
                </div>

                {/* Content Side: Title, Description, Stack, Actions */}
                <div className="md:w-7/12 lg:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white dark:bg-blackbrown transition-colors duration-200">
                  <div>
                    {/* Station & Category Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-inferno dark:text-cherry bg-inferno/10 dark:bg-cherry/20 px-2 py-0.5 rounded-sm">
                        {project.stationCode}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-heading font-medium flex items-center gap-1">
                        <Terminal className="w-3 h-3 text-cherry" />
                        Production Ready
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl md:text-3xl font-extrabold tracking-tight text-blackbrown dark:text-lighttext group-hover:text-inferno dark:group-hover:text-cherry transition-colors leading-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-slate-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed mt-3 mb-6">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-400 font-heading mb-2.5">
                        Technology Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs py-1 px-2.5 font-medium rounded-md shadow-2xs hover:bg-inferno/10 hover:text-inferno dark:hover:bg-cherry/20 dark:hover:text-cherry transition-colors dark:bg-zinc-800/80 dark:text-zinc-200 dark:border-zinc-700"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions / Links */}
                  <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-4">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-zinc-300 hover:text-inferno dark:hover:text-cherry transition-colors font-heading"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>Source Code</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-zinc-500 font-heading italic">
                        Project not registered in GitHub
                      </span>
                    )}

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-inferno dark:text-cherry hover:text-cherry dark:hover:text-cherry-hover transition-colors font-heading"
                      >
                        <span>Live Inspection</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-zinc-500 font-heading italic">
                        Internal System Core
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
