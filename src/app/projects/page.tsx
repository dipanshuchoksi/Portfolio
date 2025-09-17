import ProjectItem from "./components/ProjectItem";

function ProjectPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-10 mb-5">Projects</h2>
      <div className="flex flex-col gap-5">
        <ProjectItem />
      </div>
    </div>
  );
}

export default ProjectPage;
