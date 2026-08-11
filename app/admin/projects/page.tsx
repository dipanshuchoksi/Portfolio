import ProjectCard from "@/components/ProjectCard";
import { projectContent } from "@/consts";
import { Plus } from "lucide-react";
import Link from "next/link";
import connectDB from "@/lib/connectDB";
import Project from "@/models/Project";

export const metadata = {
  title: "Manage Projects | Admin Dashboard",
  description: "Admin panel to manage side projects.",
};

export default async function AdminProjectsPage() {
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
              Manage Projects
            </h1>
            <div className="h-1.5 w-20 bg-primary rounded-full"></div>
          </div>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
          >
            <Plus size={18} />
            New Project
          </Link>
        </div>

        <p className="text-muted-foreground max-w-3xl sm:text-xl mb-12 -mt-6 animate-in slide-in-from-bottom-8 fade-in duration-1000">
          Add, edit, or delete your portfolio projects.
        </p>

        {activeProjects.length === 0 ? (
          <div className="text-center py-20 bg-card/20 rounded-2xl border border-border/50 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-2">No Projects Yet</h3>
            <p className="text-muted-foreground">Click "New Project" to add your first project.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {activeProjects.map((project, index) => (
              <ProjectCard project={project} index={index} key={index} canEdit={true} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
