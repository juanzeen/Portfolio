import React from "react"
import { useTheme } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"

interface MovingBusLoaderProps {
  label?: string
  className?: string
  size?: "sm" | "md" | "lg"
}

export const MovingBusLoader: React.FC<MovingBusLoaderProps> = ({
  label = "Traveling along the route...",
  className,
  size = "md",
}) => {
  const { theme } = useTheme()
  const sizeClasses = {
    sm: "scale-75",
    md: "scale-100",
    lg: "scale-125",
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 text-center select-none",
        className
      )}
    >
      <div className={cn("relative w-64 h-32 overflow-hidden flex flex-col justify-end items-center", sizeClasses[size])}>
        {/* City silhouette backdrop */}
        <div className="absolute top-4 w-full flex justify-around opacity-20 pointer-events-none">
          <div className="w-6 h-14 bg-slate-800 rounded-t-xs" />
          <div className="w-8 h-20 bg-slate-700 rounded-t-xs" />
          <div className="w-5 h-10 bg-slate-900 rounded-t-xs" />
          <div className="w-7 h-16 bg-slate-700 rounded-t-xs" />
          <div className="w-10 h-12 bg-slate-800 rounded-t-xs" />
          <div className="w-6 h-18 bg-slate-700 rounded-t-xs" />
        </div>

        {/* Bus and road container */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Moving Bus with slight suspension bounce */}
          <div>
            <svg
              className="w-28 h-16 drop-shadow-md text-inferno"
              viewBox="0 0 120 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bus Body */}
              <rect x="10" y="12" width="98" height="42" rx="7" fill="var(--color-inferno)" />
              {/* Bus Roof Line / AC Unit */}
              <rect x="25" y="7" width="40" height="5" rx="2" fill="var(--color-inferno-dark)" />
              <rect x="70" y="7" width="25" height="5" rx="2" fill="var(--color-inferno-dark)" />

              {/* Front windshield */}
              <path
                d="M86 16 H102 C105 16 106 18 106 21 V32 H86 V16 Z"
                fill="var(--color-offwhite)"
                fillOpacity="0.9"
              />
              {/* Side Passenger Windows */}
              <rect x="16" y="16" width="18" height="16" rx="2" fill="var(--color-offwhite)" fillOpacity="0.85" />
              <rect x="38" y="16" width="18" height="16" rx="2" fill="var(--color-offwhite)" fillOpacity="0.85" />
              <rect x="60" y="16" width="22" height="16" rx="2" fill="var(--color-offwhite)" fillOpacity="0.85" />

              {/* Bus Destination Sign */}
              <rect x="88" y="13" width="16" height="3" rx="1" fill="#FEF08A" />

              {/* Accent Striping */}
              <rect x="10" y="36" width="98" height="6" fill="var(--color-cherry)" />
              <rect x="10" y="44" width="98" height="2" fill="var(--color-lighttext)" fillOpacity="0.4" />

              {/* Headlights (right side - front of bus) */}
              <circle cx="106" cy="40" r="3" fill="#FEF08A" />
              {/* Headlight beam glow */}
              {theme === "dark" && (<path
                d="M107 38 L119 32 L119 46 L107 42 Z"
                fill="#FEF08A"
                fillOpacity="0.35"
              />)}

              {/* Tail light (left side) */}
              <rect x="10" y="38" width="2.5" height="5" rx="1" fill="#EF4444" />

              {/* Wheel Arches */}
              <path d="M26 54 A 10 10 0 0 1 46 54 Z" fill="var(--color-blackbrown)" />
              <path d="M78 54 A 10 10 0 0 1 98 54 Z" fill="var(--color-blackbrown)" />

              {/* Wheels (rotating rims) */}
              <g className="animate-spin origin-[36px_54px]" style={{ animationDuration: "0.8s" }}>
                <circle cx="36" cy="54" r="9" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                <circle cx="36" cy="54" r="3.5" fill="#E2E8F0" />
                <line x1="36" y1="46" x2="36" y2="62" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="28" y1="54" x2="44" y2="54" stroke="#94A3B8" strokeWidth="1.5" />
              </g>
              <g className="animate-spin origin-[88px_54px]" style={{ animationDuration: "0.8s" }}>
                <circle cx="88" cy="54" r="9" fill="#1E293B" stroke="#475569" strokeWidth="2" />
                <circle cx="88" cy="54" r="3.5" fill="#E2E8F0" />
                <line x1="88" y1="46" x2="88" y2="62" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="80" y1="54" x2="96" y2="54" stroke="#94A3B8" strokeWidth="1.5" />
              </g>

              {/* Subtle Route Number Tag */}
              <text
                x="20"
                y="41"
                fill="#FFFFFF"
                fontSize="4.5"
                fontFamily="var(--font-heading)"
                fontWeight="bold"
              >
                JC-01
              </text>
            </svg>
          </div>

          {/* Road Asphalt */}
          <div className="w-full h-3 bg-blackbrown rounded-sm relative overflow-hidden -mt-1.5 shadow-inner">
            {/* Dashed moving line */}
            <div className="absolute top-1/2 -translate-y-1/2 flex w-[200%] gap-4 animate-road-move">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-0.5 w-6 bg-amber-400 shrink-0 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {label && (
        <div className="mt-8 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cherry opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-inferno"></span>
          </span>
          <p className="text-xs font-semibold tracking-wide uppercase font-heading text-inferno">
            {label}
          </p>
        </div>
      )}
    </div>
  )
}
