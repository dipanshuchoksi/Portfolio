import { achievementsSection } from "@/interfaces";
import AchievementCard from "./ui/AchievementCard";

export default function Achievements({
  achievementsContent,
}: {
  achievementsContent: achievementsSection;
}) {
  return (
    <section
      id="achievements"
      className="border-b border-border py-20 flex items-center bg-background/50 snap-start"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-14 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
            Achievements
          </h2>
          <div className="h-1.5 w-20 bg-primary rounded-full mb-6"></div>
          <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
            Competitions won, hackathons built, and courses completed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Hackathons */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-widest text-primary mb-5 flex items-center gap-2">
              Hackathons & Competitions
            </h3>
            <div className="space-y-4">
              {achievementsContent.hackathons.map((item, idx) => (
                <AchievementCard
                  key={idx}
                  topLabel={item.title}
                  heading={item.event}
                  year={item.year}
                  description={item.description}
                  certificateUrl={item.certificateUrl}
                />
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-base font-semibold uppercase tracking-widest text-primary mb-5 flex items-center gap-2">
              Certifications & Courses
            </h3>
            <div className="space-y-4">
              {achievementsContent.certifications.map((item, idx) => (
                <AchievementCard
                  key={idx}
                  topLabel={item.issuer}
                  heading={item.title}
                  year={item.year}
                  description={item.description}
                  certificateUrl={item.certificateUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
