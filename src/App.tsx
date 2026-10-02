import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackParkSection } from "@/components/StackParkSection";
import { TimelineSection } from "@/components/TimelineSection";
import { Footer } from "@/components/Footer";
import { MovingBusLoader } from "@/components/ui/moving-bus-loader";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const { t } = useTranslation();

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
          label={t("loader.label")}
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
      <LanguageSwitcher />
    </div>
  );
}

export default App;
