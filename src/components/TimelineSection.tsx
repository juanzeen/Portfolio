import React, { useEffect, useState, useRef } from "react";
import {
  Calendar,
  MapPin,
  Construction,
  ArrowRight,
  Bus,
  CheckCircle2,
  Flag,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/useTheme";
import timelineData from "@/public/data/timeline.json";

interface TimelineStop {
  id: string;
  stopNumber: string;
  title: string;
  category: "Education" | "Job" | "Life Milestone" | "Current Phase";
  period: string;
  location: string;
  description: string;
  highlights: string[];
  status: "Completed" | "Current Stop" | "Upcoming";
  xPosition: number; // Horizontal coordinate along the track in px
}

// Longer road coordinates:
// Bus starts at X = 200 (Depot / Departure Bay) BEFORE Stop 1 (X = 850)
const TIMELINE_STOPS = timelineData as TimelineStop[];

// Road dimensions: Expanded to 6000px with bus starting at X = 200 before Stop 1 (X = 850)
const TOTAL_ROAD_WIDTH = 6000;
const BUS_START_X = 200;
const STOP_4_X = 3850; // Strict maximum for the bus!
const STOP_5_X = 4750; // Milestone 5 horizon focus coordinate

export const TimelineSection: React.FC = () => {
  const outerWrapperRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [viewportWidth, setViewportWidth] = useState<number>(1200);

  // Track window resize to compute proper horizontal translation
  useEffect(() => {
    const updateDimensions = () => {
      setViewportWidth(window.innerWidth);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Natural vertical-to-horizontal smooth scroll translation
  useEffect(() => {
    const handleScroll = () => {
      if (!outerWrapperRef.current) return;

      const rect = outerWrapperRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / scrollableDistance;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate Bus X position along the road:
  // Starts at X = 200 (Depot) BEFORE Stop 1 (X = 850).
  // From scrollProgress 0.0 to 0.80, bus travels from Depot (X=200) to Stop 4 (X=3850).
  // From scrollProgress 0.80 to 1.0, bus stays STRICTLY PARKED at Stop 4 (X=3850) and never advances to Step 5!
  const BUS_TRAVEL_CUTOFF = 0.8;
  const busNormalized = Math.min(1, scrollProgress / BUS_TRAVEL_CUTOFF);
  const currentBusX = BUS_START_X + busNormalized * (STOP_4_X - BUS_START_X);

  // Camera Focus coordinate along the track:
  // - From scrollProgress 0.0 to 0.80, camera tracks the moving bus continuously.
  // - From scrollProgress 0.80 to 1.00, the bus remains parked at Stop 4, while the camera focus pans
  //   ahead past the roadblock barrier to directly center on Milestone 5 (X = 4750).
  const currentFocusX =
    scrollProgress <= BUS_TRAVEL_CUTOFF
      ? currentBusX
      : STOP_4_X +
        ((scrollProgress - BUS_TRAVEL_CUTOFF) / (1 - BUS_TRAVEL_CUTOFF)) *
          (STOP_5_X - STOP_4_X);

  // Dynamic Camera Framing:
  // - On mobile (< 768px, specifically 400px), bus and Milestone 5 are kept centered in the viewport.
  // - On larger screens, the bus stays comfortably at ~45% (capped at 500px), and Milestone 5 settles near center (capped at 700px).
  const targetBusScreenX =
    viewportWidth < 768
      ? viewportWidth * 0.5
      : Math.min(viewportWidth * 0.45, 500);

  const targetStop5ScreenX =
    viewportWidth < 768
      ? viewportWidth * 0.5
      : Math.min(viewportWidth * 0.5, 700);

  const currentTranslateX =
    scrollProgress <= BUS_TRAVEL_CUTOFF
      ? Math.max(0, currentBusX - targetBusScreenX)
      : Math.max(0, STOP_4_X - targetBusScreenX) +
        ((scrollProgress - BUS_TRAVEL_CUTOFF) / (1 - BUS_TRAVEL_CUTOFF)) *
          (Math.max(0, STOP_5_X - targetStop5ScreenX) -
            Math.max(0, STOP_4_X - targetBusScreenX));

  // Wheel rotation angle based on travel distance
  const wheelRotation = (currentBusX * 2.8) % 360;

  // Active stop calculations
  const isFocusAtStop5 = scrollProgress >= 0.92;
  const isBusAtStop4 = busNormalized >= 0.98 && !isFocusAtStop5;

  return (
    <section
      id="timeline"
      ref={outerWrapperRef}
      className="relative h-[480vh] bg-offwhite dark:bg-blackbrown transition-colors duration-200"
    >
      {/* Sticky Fullscreen Viewport: smoothly locks in place during vertical scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 md:py-14 bg-offwhite dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 select-none transition-colors duration-200">
        {/* Top Control & Header Bar */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-zinc-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-slate-500 dark:text-zinc-400 font-heading uppercase tracking-wider font-semibold">
                  Station 4 • Extended Expressway
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-inferno dark:text-cherry">
                The Journey Bus
              </h2>
            </div>

            {/* Live Bus Telemetry & Scroll Hint */}
            <div className="flex items-center flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white dark:bg-blackbrown px-3.5 py-1.5 rounded-md shadow-xs border border-slate-200 dark:border-zinc-800 text-xs font-mono">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isFocusAtStop5
                      ? "bg-emerald-500 animate-pulse"
                      : isBusAtStop4
                        ? "bg-amber-500 animate-ping"
                        : "bg-inferno animate-pulse"
                  }`}
                />
                <span className="text-slate-600 dark:text-zinc-300 font-bold">
                  {isFocusAtStop5
                    ? "HORIZON: STOP 05 (NEXT DESTINATION)"
                    : isBusAtStop4
                      ? "TERMINUS: STOP 04 (4/5 CS)"
                      : currentBusX < 850
                        ? "DEPARTING CENTRAL DEPOT"
                        : `BUS JC-01: ${Math.round(busNormalized * 100)}%`}
                </span>
                <span className="text-slate-300 dark:text-zinc-600">|</span>
                <span className="text-cherry font-semibold">
                  {isFocusAtStop5
                    ? "Future Horizons • Degree Completion Ahead"
                    : isBusAtStop4
                      ? "Bus Parked at 4/5 CS • Panning to Horizon"
                      : currentBusX < 850
                        ? "Approaching Stop 01"
                        : "En Route to Station 4"}
                </span>
              </div>

              <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800/80 px-3 py-1.5 rounded-md font-heading">
                <span>Scroll down to drive bus</span>
                <ArrowRight className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal World Track Container */}
        <div className="relative flex flex-1 flex-col justify-around overflow-hidden py-2">
          {/* Moving Horizontal Canvas */}
          <div
            className="relative will-change-transform"
            style={{
              width: `${TOTAL_ROAD_WIDTH}px`,
              transform: `translateX(-${currentTranslateX}px)`,
              transition: "transform 0.05s ease-out",
            }}
          >
            {/* Background City Skyline Silhouettes */}
            <div className="absolute -top-12 left-0 right-0 h-24 flex items-end opacity-15 dark:opacity-25 pointer-events-none overflow-hidden">
              {[...Array(90)].map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-700 dark:bg-cherry mx-1 shrink-0 rounded-t-xs"
                  style={{
                    width: `${35 + ((i * 19) % 55)}px`,
                    height: `${40 + ((i * 37) % 65)}px`,
                  }}
                />
              ))}
            </div>

            {/* Starting Central Depot Visual (Before Milestone 1) */}
            <div
              className="absolute top-8 w-70 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${BUS_START_X}px` }}
            >
              <div className="bg-white dark:bg-blackbrown border-2 border-slate-300 dark:border-zinc-800 rounded-md shadow-md p-3.5 text-center w-full">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-inferno dark:text-cherry font-heading mb-1">
                  <Flag className="w-3.5 h-3.5 text-inferno dark:text-cherry" />
                  <span>CENTRAL TRANSIT DEPOT</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-body">
                  Bay 00 • Departure Point • Conceição de Macabu.
                </p>
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-sm border border-emerald-200 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Green Signal • Dispatched
                </div>
              </div>

              {/* Station Pole to road */}
              <div className="w-0.5 h-10 bg-slate-300 dark:bg-zinc-700" />
              <div className="w-6 h-6 rounded-full bg-inferno text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                00
              </div>
            </div>

            {/* Milestone Cards Row */}
            <div className="relative h-72 md:h-77.5 w-full">
              {TIMELINE_STOPS.map((stop, index) => {
                const isStep5 = index === 4;
                const isStep4 = index === 3;

                // Has the bus or camera focus reached this stop?
                const isReached = currentFocusX >= stop.xPosition - 30;

                return (
                  <div
                    key={stop.id}
                    className="absolute -top-12 w-80 sm:w-90 md:w-97.5 max-w-[calc(100vw-2.5rem)] transition-all duration-300 -translate-x-1/2"
                    style={{ left: `${stop.xPosition}px` }}
                  >
                    {/* Milestone Card */}
                    <div
                      className={`rounded-md shadow-md border bg-white dark:bg-blackbrown border-inferno dark:border-cherry p-5 md:p-6 transition-all duration-300 ${
                        isStep5 && isFocusAtStop5
                          ? "border-inferno dark:border-cherry ring-2 ring-inferno/20 dark:ring-cherry/30 shadow-xl opacity-100 scale-[1.01]"
                          : isReached
                            ? "border-slate-300 dark:border-zinc-700 hover:border-inferno/50 dark:hover:border-cherry/60"
                            : "border-slate-200 dark:border-zinc-800 opacity-80"
                      }`}
                    >
                      {/* Card Meta */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge
                          variant={
                            isStep4
                              ? "default"
                              : isStep5
                                ? isFocusAtStop5
                                  ? "default"
                                  : "outline"
                                : isReached
                                  ? "accent"
                                  : "secondary"
                          }
                          className="text-xs"
                        >
                          {stop.category}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-zinc-400 font-heading">
                          <Calendar className="w-3.5 h-3.5 text-inferno dark:text-cherry" />
                          {stop.period}
                        </span>
                      </div>

                      {/* Card Title */}
                      <h3
                        className={`font-heading text-base md:text-lg font-bold tracking-tight leading-snug line-clamp-2 ${
                          isStep4
                            ? "text-inferno dark:text-lighttext"
                            : isStep5
                              ? isFocusAtStop5
                                ? "text-inferno dark:text-cherry font-extrabold"
                                : "text-slate-600 dark:text-zinc-400"
                              : "text-blackbrown dark:text-lighttext"
                        }`}
                      >
                        {stop.title}
                      </h3>

                      {/* Location Station */}
                      <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 mt-1 font-heading">
                        <MapPin className="w-3.5 h-3.5 text-cherry" />
                        <span>{stop.location}</span>
                      </p>

                      {/* Description */}
                      <p className="font-body text-xs md:text-sm text-darkslate dark:text-zinc-300 leading-relaxed mt-2.5 line-clamp-4">
                        {stop.description}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-100 dark:border-zinc-800">
                        {stop.highlights.map((h) => (
                          <span
                            key={h}
                            className={`text-[10px] font-medium font-heading px-2 py-0.5 rounded-sm ${
                              isStep5 && !isFocusAtStop5
                                ? "bg-slate-200/70 dark:bg-zinc-800/60 text-slate-600 dark:text-zinc-400"
                                : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300"
                            }`}
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Connecting Station Signpost to the Road */}
                    <div className="flex flex-col items-center mt-2">
                      <div className="w-0.5 h-6 bg-slate-300 dark:bg-zinc-700" />
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-heading shadow-xs border-2 ${
                          isStep5
                            ? isFocusAtStop5
                              ? "bg-inferno dark:bg-cherry text-white border-inferno dark:border-cherry"
                              : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-400"
                            : isReached
                              ? "bg-white dark:bg-blackbrown text-inferno dark:text-cherry border-inferno dark:border-cherry"
                              : "bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 border-slate-300 dark:border-zinc-700"
                        }`}
                      >
                        {isStep5 ? "5" : stop.stopNumber}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* The Horizontal Asphalt Road */}
            <div className="relative w-full h-20 bg-blackbrown shadow-xl rounded-sm flex items-center overflow-visible border-y-2 border-slate-800">
              {/* White Road Edge Lines */}
              <div className="absolute top-1 left-0 right-0 h-0.5 bg-white/70" />
              <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-white/70" />

              {/* Starting Checkered Line at Depot (X = 200) */}
              <div
                className="absolute top-0 bottom-0 w-3 pointer-events-none"
                style={{
                  left: `${BUS_START_X - 10}px`,
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #FFF 0, #FFF 4px, #000 4px, #000 8px)",
                }}
              />

              {/* Dashed Center Yellow Line across the extended road */}
              <div className="w-full flex items-center gap-6 overflow-hidden px-4">
                {[...Array(160)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 w-12 bg-amber-400 rounded-full shrink-0"
                  />
                ))}
              </div>

              {/* Depot Platform Label */}
              <div
                className="absolute bottom-1 -translate-x-1/2 text-[9px] font-mono font-bold px-2 py-0.5 rounded-xs shadow-xs uppercase tracking-tight bg-inferno text-white pointer-events-none"
                style={{ left: `${BUS_START_X}px` }}
              >
                DEPOT 00 • START
              </div>

              {/* Station Stop Platform Labels on Road */}
              {TIMELINE_STOPS.map((stop) => (
                <div
                  key={`platform-${stop.id}`}
                  className={`absolute bottom-1 -translate-x-1/2 text-[9px] font-mono font-bold px-2 py-0.5 rounded-xs shadow-xs uppercase tracking-tight pointer-events-none ${
                    stop.id === "stop-4"
                      ? "bg-inferno text-white"
                      : stop.id === "stop-5"
                        ? isFocusAtStop5
                          ? "bg-inferno text-white"
                          : "bg-amber-500 text-blackbrown"
                        : "bg-slate-800 text-white"
                  }`}
                  style={{
                    left: `${stop.xPosition}px`,
                  }}
                >
                  {stop.id === "stop-4"
                    ? "TERMINUS 04"
                    : stop.id === "stop-5"
                      ? isFocusAtStop5
                        ? "HORIZON 05"
                        : "FUTURE HORIZON 05"
                      : `PLATFORM ${stop.stopNumber}`}
                </div>
              ))}

              {/* STRICT ROADBLOCK BARRIER: Between Stop 4 and Stop 5 */}
              <div
                className="absolute z-20 flex flex-col items-center pointer-events-none"
                style={{ left: `${STOP_4_X + 220}px` }}
              >
                {/* Construction Barrier Fence */}
                <div className="flex flex-col items-center">
                  <div
                    className="h-10 w-28 rounded-xs border-2 border-black flex items-center justify-center font-extrabold text-[10px] uppercase font-heading shadow-lg text-black tracking-wider"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #FBBF24, #FBBF24 10px, var(--color-blackbrown) 10px, var(--color-blackbrown) 20px)",
                      color: "#FFFFFF",
                      textShadow: "0 1px 2px #000",
                    }}
                  >
                    ROAD CLOSED
                  </div>
                  <div className="flex justify-between w-24">
                    <div className="w-2 h-4 bg-slate-400" />
                    <div className="w-2 h-4 bg-slate-400" />
                  </div>
                </div>
              </div>

              {/* THE SINGLE MOVING BUS: Starts before Stop 1 at Depot (X=200), drives rightward, capped strictly at Stop 4 */}
              <div
                className="absolute bottom-2 z-30 transition-all duration-75 ease-out pointer-events-none"
                style={{
                  left: `${currentBusX}px`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="relative flex flex-col items-center">
                  {/* Profile View SVG Bus (Facing Right / Moving Forward) */}
                  <div className="relative filter drop-shadow-2xl">
                    <svg
                      className="w-28 h-14"
                      viewBox="0 0 120 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Bus Shadow */}
                      <ellipse
                        cx="60"
                        cy="54"
                        rx="52"
                        ry="4"
                        fill="#000000"
                        fillOpacity="0.5"
                      />

                      {/* Bus Chassis (Red Inferno) */}
                      <path
                        d="M10 12 H102 C108 12 112 16 112 22 V46 H10 V12 Z"
                        fill="var(--color-inferno)"
                        stroke="var(--color-inferno-dark)"
                        strokeWidth="1.5"
                      />

                      {/* Roof AC / Vent Unit */}
                      <rect
                        x="30"
                        y="8"
                        width="40"
                        height="4"
                        rx="1.5"
                        fill="var(--color-inferno-dark)"
                      />
                      <rect
                        x="75"
                        y="8"
                        width="22"
                        height="4"
                        rx="1.5"
                        fill="var(--color-inferno-dark)"
                      />

                      {/* Accent Red Mid-Stripe */}
                      <rect
                        x="10"
                        y="32"
                        width="102"
                        height="5"
                        fill="var(--color-cherry)"
                      />
                      <rect
                        x="10"
                        y="38"
                        width="102"
                        height="1.5"
                        fill="#FFFFFF"
                        fillOpacity="0.4"
                      />

                      {/* Front Windshield (Right side is front) */}
                      <path
                        d="M92 16 H106 C109 16 111 18 111 21 V30 H92 V16 Z"
                        fill="var(--color-offwhite)"
                        fillOpacity="0.9"
                      />

                      {/* Passenger Side Windows */}
                      <rect
                        x="16"
                        y="16"
                        width="16"
                        height="13"
                        rx="1.5"
                        fill="var(--color-offwhite)"
                        fillOpacity="0.85"
                      />
                      <rect
                        x="35"
                        y="16"
                        width="16"
                        height="13"
                        rx="1.5"
                        fill="var(--color-offwhite)"
                        fillOpacity="0.85"
                      />
                      <rect
                        x="54"
                        y="16"
                        width="16"
                        height="13"
                        rx="1.5"
                        fill="var(--color-offwhite)"
                        fillOpacity="0.85"
                      />
                      <rect
                        x="73"
                        y="16"
                        width="16"
                        height="13"
                        rx="1.5"
                        fill="var(--color-offwhite)"
                        fillOpacity="0.85"
                      />

                      {/* Bus Destination Sign */}
                      <rect
                        x="88"
                        y="13"
                        width="18"
                        height="2.5"
                        rx="0.5"
                        fill="#FEF08A"
                      />

                      {/* Headlights (Front / Right) */}
                      <circle cx="111" cy="35" r="2.5" fill="#FEF08A" />
                      <circle cx="111" cy="41" r="2" fill="#FEF08A" />

                      {/* Taillights (Rear / Left) */}
                      <rect
                        x="10"
                        y="34"
                        width="2"
                        height="4"
                        rx="0.5"
                        fill="#EF4444"
                      />

                      {/* Wheel Arch Cutouts */}
                      <circle
                        cx="32"
                        cy="46"
                        r="9"
                        fill="var(--color-blackbrown)"
                      />
                      <circle
                        cx="88"
                        cy="46"
                        r="9"
                        fill="var(--color-blackbrown)"
                      />

                      {/* Rotating Wheel 1 (Rear) */}
                      <g transform={`rotate(${wheelRotation}, 32, 46)`}>
                        <circle
                          cx="32"
                          cy="46"
                          r="8"
                          fill="#1E293B"
                          stroke="#475569"
                          strokeWidth="1.5"
                        />
                        <circle cx="32" cy="46" r="3" fill="#E2E8F0" />
                        <line
                          x1="32"
                          y1="39"
                          x2="32"
                          y2="53"
                          stroke="#94A3B8"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="25"
                          y1="46"
                          x2="39"
                          y2="46"
                          stroke="#94A3B8"
                          strokeWidth="1.5"
                        />
                      </g>

                      {/* Rotating Wheel 2 (Front) */}
                      <g transform={`rotate(${wheelRotation}, 88, 46)`}>
                        <circle
                          cx="88"
                          cy="46"
                          r="8"
                          fill="#1E293B"
                          stroke="#475569"
                          strokeWidth="1.5"
                        />
                        <circle cx="88" cy="46" r="3" fill="#E2E8F0" />
                        <line
                          x1="88"
                          y1="39"
                          x2="88"
                          y2="53"
                          stroke="#94A3B8"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="81"
                          y1="46"
                          x2="95"
                          y2="46"
                          stroke="#94A3B8"
                          strokeWidth="1.5"
                        />
                      </g>

                      {/* Route Tag on Bus Body */}
                      <text
                        x="20"
                        y="36"
                        fill="#FFFFFF"
                        fontSize="4"
                        fontFamily="var(--font-heading)"
                        fontWeight="bold"
                      >
                        JC-01 • 4/5 CS
                      </text>
                    </svg>

                    {/* Forward Headlight Beam on Road */}
                    {theme === "dark" && (
                      <div className="absolute rotate-1 top-[48%] left-[95%] w-24 h-5 pointer-events-none opacity-45 bg-linear-to-r from-amber-300 via-amber-200/20 to-transparent clip-path-beam" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Station Progress Indicator & Legend */}
        <div className="hidden lg:block w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-30 pt-3 border-t border-slate-200 dark:border-zinc-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-heading">
            {/* Route Breadcrumb Stations */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
              {/* Start Depot Crumb */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                    currentBusX >= BUS_START_X
                      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                      : "bg-white dark:bg-blackbrown text-slate-400 dark:text-zinc-500 border-slate-200 dark:border-zinc-800"
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Depot 00 (Start)</span>
                </div>
                <span className="text-slate-300 dark:text-zinc-600 font-normal">
                  →
                </span>
              </div>

              {TIMELINE_STOPS.map((stop, i) => {
                const isPassed = currentFocusX >= stop.xPosition - 30;
                const isStep4 = i === 3;
                const isStep5 = i === 4;

                return (
                  <div
                    key={`crumb-${stop.id}`}
                    className="flex items-center gap-1.5 shrink-0"
                  >
                    <div
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${
                        isStep5 && isFocusAtStop5
                          ? "bg-inferno text-white shadow-xs"
                          : isStep4 && isBusAtStop4
                            ? "bg-inferno text-white shadow-xs"
                            : isStep5
                              ? "bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 border-dashed border-slate-300 dark:border-zinc-700"
                              : isPassed
                                ? "bg-inferno/10 dark:bg-cherry/20 text-inferno dark:text-cherry border-inferno/30 dark:border-cherry/40"
                                : "bg-white dark:bg-blackbrown text-slate-400 dark:text-zinc-500 border-slate-200 dark:border-zinc-800"
                      }`}
                    >
                      {isPassed && !isStep5 ? (
                        <CheckCircle2 className="w-3 h-3 text-inferno dark:text-cherry" />
                      ) : isStep5 ? (
                        isFocusAtStop5 ? (
                          <Flag className="w-3 h-3 text-white" />
                        ) : (
                          <Construction className="w-3 h-3 text-amber-500" />
                        )
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-zinc-600" />
                      )}
                      <span>Stop {stop.stopNumber}</span>
                    </div>
                    {i < TIMELINE_STOPS.length - 1 && (
                      <span className="text-slate-300 dark:text-zinc-600 font-normal">
                        →
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Status explanation */}
            <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 shrink-0">
              <Bus className="w-4 h-4 text-inferno dark:text-cherry" />
              <span className="text-[11px]">
                {isFocusAtStop5
                  ? "Arrived at Milestone 05 horizon. Keep scrolling to continue to footer."
                  : isBusAtStop4
                    ? "Bus halted at 4/5 CS station. Viewing upcoming destination."
                    : currentBusX < 850
                      ? "Bus departed Central Depot, driving toward Stop 01."
                      : "Bus driving along route. Keep scrolling down."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
