import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackParkSection } from "@/components/StackParkSection";
import { TimelineSection } from "@/components/TimelineSection";
import { Footer } from "@/components/Footer";
import { MovingBusLoader } from "@/components/ui/moving-bus-loader";

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-offwhite dark:bg-blackbrown transition-colors duration-200">
        <MovingBusLoader
          label="Departing for Juan Cristo's City..."
          size="lg"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-offwhite dark:bg-blackbrown text-darkslate dark:text-lighttext font-body selection:bg-cherry selection:text-white transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <StackParkSection />
        <TimelineSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
