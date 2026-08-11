"use client";

import { projectSection } from "@/interfaces";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProjectTable from "./projectTable";
import ProjectCard from "./ProjectCard";

export default function Projects({ projectsContent }: { projectsContent: projectSection }) {
  const topProjects = projectsContent.projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="border-b border-border py-20 flex items-center bg-background/50 relative overflow-hidden snap-start"
    >
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-150 h-150 bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
              Projects
            </h2>
            <div className="h-1.5 w-20 bg-primary rounded-full mb-6"></div>

            <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
              {projectsContent.description}
            </p>
          </div>

          <div
            className="flex animate-in slide-in-from-bottom-6 duration-700"
            style={{ animationDelay: "150ms", animationFillMode: "both" }}
          >
            <Link
              href="/projects"
              scroll
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary font-semibold transition-all hover:bg-primary hover:text-primary-foreground focus:ring-2 focus:ring-primary/50 group"
            >
              View All Projects
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative animate-in slide-in-from-bottom-8 duration-1000 delay-300">
          <div className="rounded-2xl w-fit border border-border/50 bg-card/20 backdrop-blur-md shadow-lg shadow-primary/5">
            <div className="hidden md:block">
              <ProjectTable projectsContent={projectsContent} />
            </div>
            <div className="md:hidden grid grid-cols-1 gap-6 w-fit">
              {topProjects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
