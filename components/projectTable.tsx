import { ExternalLink, Github } from "lucide-react";
import { projectSection } from "@/interfaces";

function ProjectTable({ projectsContent }: { projectsContent: projectSection }) {
  const topProjects = projectsContent.projects.slice(0, 3);

  return (
    <table className="w-full text-left border-collapse min-w-150">
      <thead>
        <tr className="border-b border-border/50 bg-secondary/30">
          <th className="py-4 px-6 font-semibold text-muted-foreground w-1/4">Name</th>
          <th className="py-4 px-6 font-semibold text-muted-foreground w-2/4">Project Summary</th>
          <th className="py-4 px-6 font-semibold text-muted-foreground w-1/4">Tech Used</th>
        </tr>
      </thead>
      <tbody>
        {topProjects.map((project, index) => (
          <tr
            key={index}
            className="border-b border-border/50 hover:bg-primary/5 transition-colors group"
          >
            <td className="py-5 px-6 align-top">
              <div className="flex flex-col gap-2">
                <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Live Project"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            </td>
            <td className="py-5 px-6 align-top">
              <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
            </td>
            <td className="py-5 px-6 align-top">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="cursor-default inline-flex items-center rounded-md bg-secondary/80 border border-border/50 px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors group-hover:border-primary/20 group-hover:text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProjectTable;
