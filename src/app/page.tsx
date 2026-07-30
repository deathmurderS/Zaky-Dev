import HeroSection from "@/components/sections/HeroSection";
import PersonalitySection from "@/components/sections/PersonalitySection";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <HeroSection />
      <PersonalitySection />
    </div>
  );
}