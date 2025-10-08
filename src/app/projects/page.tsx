import { projectsArray } from "../const";
import ProjectItem from "./components/ProjectItem";

function ProjectPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-10 mb-5">Projects</h2>
      <div className="flex flex-col gap-5">
        {projectsArray.map((project) => (
          <ProjectItem
            key={project.id}
            description={project.description}
            githubUrl={project.githubUrl}
            image={project.image}
            liveUrl={project.liveUrl}
            techStack={project.techStack}
            title={project.title}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;
