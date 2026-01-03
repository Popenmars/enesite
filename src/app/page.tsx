import { BackgroundLayers } from '@/components/BackgroundLayers';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { HireMeSection } from '@/components/sections/HireMeSection';

export default function Home() {
  return (
    <div className="min-h-screen w-full relative">
      <BackgroundLayers />

      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
        <HireMeSection />
      </main>
    </div>
  );
}
