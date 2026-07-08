import HeroSection from "@/components/landing/HeroSection";
import PersonalitySection from "@/components/landing/PersonalitySection";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <HeroSection />
      <PersonalitySection />
    </div>
  );
}