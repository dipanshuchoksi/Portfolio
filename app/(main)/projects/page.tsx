import ProjectCard from "@/components/ProjectCard";
import { projectContent } from "@/consts";
import connectDB from "@/lib/connectDB";
import Project from "@/models/Project";

export const metadata = {
  title: "Projects | Dipanshu Choksi",
  description: "A showcase of my recent work and open source projects.",
};

export default async function ProjectsPage() {
  await connectDB();
  const dbProjects = await Project.find({}).sort({ createdAt: -1 }).lean();

  const activeProjects = dbProjects.length > 0
    ? dbProjects.map((p: any) => ({
      title: p.title,
      description: p.description,
      image: p.image,
      tags: p.tags,
      slug: p.slug,
      links: p.links,
      status: p.status,
    }))
    : projectContent.projects;

  return (
    <section className="py-20 flex flex-col items-center snap-start w-full min-h-screen relative overflow-hidden bg-background/50">
      {/* Background decoration */}
      <div className="absolute top-1/4 -right-1/4 w-200 h-200 bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 -left-1/4 w-150 h-150 bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-12 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-3xl lg:text-3xl mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
              All Projects
            </h1>
            <div className="h-1.5 w-20 bg-primary rounded-full"></div>
          </div>
        </div>

        <p className="text-muted-foreground max-w-3xl sm:text-xl mb-12 -mt-6 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          A comprehensive list of my side projects.
        </p>

        {activeProjects.length === 0 ? (
          <div className="text-center py-20 bg-card/20 rounded-2xl border border-border/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-2">No Projects Yet</h3>
            <p className="text-muted-foreground">Check back soon for updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {activeProjects.map((project, index) => (
              <ProjectCard project={project} index={index} key={index} canEdit={false} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
