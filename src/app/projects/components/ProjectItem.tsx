import { ProjectCardProps } from "@/app/interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProjectItem: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  techStack,
  githubUrl,
  liveUrl,
}) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-text/10 hover:shadow-2xl transition-shadow duration-300 bg-background-accent">
      <Image
        src={image}
        alt={title}
        height={300}
        width={300}
        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-text/70 text-background font-bold px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
            >
              GitHub
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
            >
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
