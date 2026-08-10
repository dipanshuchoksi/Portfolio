import Hero from "@/components/hero";
import About from "@/components/about";
import Education from "@/components/education";
import Achievements from "@/components/achievements";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import {
  aboutContent,
  achievementsContent,
  educationContent,
  heroContent,
  skillContent,
} from "@/consts";

import { SnapEnforcer } from "@/components/snap-enforcer";

import connectDB from "@/lib/connectDB";
import Project from "@/models/Project";
import { project, projectSection } from "@/interfaces";

export default async function Home() {
  await connectDB();
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();

  const formattedProjects = projects.map((p: project) => ({
    title: p.title,
    description: p.description,
    image: p.image,
    tags: p.tags,
    links: p.links,
    status: p.status,
  }))

  const projectSection: projectSection = {
    description: "A comprehensive list of my side projects.",
    projects: formattedProjects,
  }
    ;
  return (
    <main className="flex-1 Home pt-20 sm:pt-0">
      <SnapEnforcer />
      <Hero heroContent={heroContent} />
      <About aboutContent={aboutContent} />
      <Achievements achievementsContent={achievementsContent} />
      <Projects projectsContent={projectSection} />
      <Skills skillsContent={skillContent} />
      <Education educationContent={educationContent} />
      <div className="fixed z-50 bottom-6 right-6">
        <a
          href="/api/resume"
          download
          className="group relative flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary/80 backdrop-blur-xl border border-white/10 text-sm font-medium text-foreground transition-all duration-500 hover:bg-primary/10 hover:border-primary/30 hover:scale-105 shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-r from-primary/0 via-primary/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span className="relative z-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Find My Resume
          </span>
        </a>
      </div>
    </main>
  );
}
