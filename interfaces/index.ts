import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, ReactElement, RefAttributes } from "react";


export interface educationSection {
  description: string;
  history: {
    school: string;
    degree: string;
    period: string;
    description?: string;
  }[];
}

export interface projectSection {
  description: string;
  projects: project[];
}

export interface project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug?: string;
  links: {
    github: string;
    live: string;
  };
  status: "Active" | "WIP";
}

export interface heroSection {
  name: string;
  role: string;
  image_path: string;
  description: string;
  call_to_action: {
    name: string;
    url: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  }[];
}

export interface skillsSection {
  description: string;
  skills_items: { category: string; skills: string[] }[];
}

export type aboutSection = string[];

export interface achievementsSection {
  hackathons: {
    title: string;
    event: string;
    year: string;
    description: string;
    certificateUrl?: string;
  }[];
  certifications: {
    title: string;
    issuer: string;
    year: string;
    description: string;
    certificateUrl?: string;
  }[];
}
