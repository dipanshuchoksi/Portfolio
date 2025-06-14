import AboutSection from "./components/AboutSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import HeroSection from "./components/HeroSection";
import InterestSection from "./components/InterestSection";
import SkillSection from "./components/SkillSection";

export default function Home() {
  return (
    <div className="flex items-center flex-col">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillSection />
      <EducationSection />
      <InterestSection />
    </div>
  );
}
