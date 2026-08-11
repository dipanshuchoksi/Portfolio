import { Mail, ExternalLink } from "lucide-react";
import type { projectSection } from "../interfaces";


export const aboutContent = [
  `I’m a passionate full-stack developer with a strong focus on building scalable, user-centric web applications and solving complex backend challenges. I enjoy turning ideas into real products that are not only functional but also efficient, maintainable, and impactful. My journey in software development has been driven by curiosity, consistency, and a deep interest in understanding how systems work beneath the surface.
My expertise primarily lies in backend development with hands-on experience in technologies like JavaScript, Node.js, Express.js, MongoDB, SQL, and modern frontend tools like React, Next.js, Tailwind CSS, and shadcn/ui. I love designing clean architectures, optimizing performance, and building systems that can scale reliably. Alongside development, I continuously strengthen my problem-solving skills through Data Structures and Algorithms and core computer science subjects like OS, DBMS, CN, and system design.`,
];

export const navLinks = [
  { href: "/#hero", label: "Hero" },
  { href: "/#about", label: "About" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/archieve", label: "Archive" },
];

export const socialsArr = [
  {
    name: "Twitter(X)",
    path: "/icon.twitter.svg",
    url: "https://x.com/dipanshuchoksi",
  },
  {
    name: "LinkedIn",
    path: "/icon.linkedin.svg",
    url: "https://linkedin.com/in/dipanshu-choksi",
  },
  {
    name: "Github",
    path: "/icon.github.svg",
    url: "https://github.com/dipanshuchoksi",
  },
];

export const educationContent = {
  description: `My educational background.`,
  history: [
    {
      school: "ITM(sls) Baroda University",
      degree: "Bachelor of Computer Science Engineering",
      period: "2022 - June 2026",
      description:
        "Expected to graduate in june 2026 with focus on software engineering, data structures, and distributed systems.",
    },
    {
      school: "Sarwa Mangal School",
      degree: "High School",
      period: "2020 - 2022",
    },
  ],
};

export const achievementsContent = {
  hackathons: [
    {
      title: "Winner",
      event: "HackITM Company Edition Hackathon 2025",
      year: "2025",
      description:
        "Led a highly collaborative team to build an AI-driven system focused on 'One Candidate, One Profile,' enabling intelligent candidate-JD matching using advanced resume analysis.",
    },
    {
      title: "1st Rank",
      event: "Cryptors 2025",
      year: "2025",
      description:
        "Solved complex problem-solving and puzzle challenges, securing 1st place among 100+ participants.",
      certificateUrl: "#",
    },
    {
      title: "2nd Rank",
      event: "CodeClash 2025",
      year: "2025",
      description:
        "Ranked 2nd in competitive DSA coding contest, demonstrating strong algorithmic and analytical skills.",
      certificateUrl: "#",
    },
    {
      title: "2nd Place",
      event: "Illuminati Hackathon 2025",
      year: "2025",
      description:
        "Collaborated in a cross-functional team to design an innovative prototype 'LabSeva' that streamlines blood sample collection and delivers automated results via SMS and email.",
      certificateUrl: "#",
    },
  ],
  certifications: [
    {
      title: "NamsteNodeJS",
      issuer: "Namaste Dev",
      year: "2024",
      description:
        "Learnt to build a resilient, well-tested, performant backend using NodeJS and implemented a webapp for developers to connect based on their interests.",
      certificateUrl: "#",
    },
    {
      title: "DSA & Aptitude",
      issuer: "TakeUForward",
      year: "Ongoing",
      description:
        "Actively upskilling in DSA and Aptitude via Take U Forward, improving analytical thinking and algorithmic problem-solving.",
    },
  ],
};

export const projectContent: projectSection = {
  description:
    "Here are some of my recent projects. Each one showcases different technologies and problem-solving approaches.",
  projects: [
    {
      title: "Influx",
      description:
        "A offline media server that let's you stream and share audio, video and files accross a group of devices inspired by Jellyfin.",
      image: "/placeholder.svg",
      tags: ["React", "Node.js", "MongoDB", "TypeScript"],
      links: {
        github: "https://github.com/DipanshuChoksi/Influx",
        live: "/#",
      },
      status: "Active",
    },
    {
      title: "CLario",
      description:
        "An AI-powered newsletter intelligence platform that extracts, summarizes, organizes, and delivers insights from newsletters and email feeds.",
      image: "/placeholder.svg",
      tags: ["Next.js", "TypeScript", "Node.js", "AI"],
      links: {
        github: "https://github.com/DipanshuChoksi/CLario",
        live: "/#",
      },
      status: "Active",
    },
    {
      title: "DC-Tools",
      description:
        "A modular developer infrastructure toolkit for ingestion, extraction, automation, AI workflows, and scalable developer productivity systems.",
      image: "/placeholder.svg",
      tags: ["TypeScript", "Node.js", "Monorepo", "Infrastructure"],
      links: {
        github: "https://github.com/DipanshuChoksi/DC-Tools",
        live: "/#",
      },
      status: "Active",
    },
    {
      title: "RIP",
      description:
        "A modern content ingestion and processing pipeline focused on extracting, transforming, and organizing data from multiple sources efficiently.",
      image: "/placeholder.svg",
      tags: ["TypeScript", "Node.js", "Data Pipeline", "Backend"],
      links: {
        github: "https://github.com/DipanshuChoksi/RIP-Resume-Intelligence-Platform",
        live: "/#",
      },
      status: "Active",
    },
  ],
};

export const heroContent = {
  name: "Dipanshu Choksi",
  role: "Software Engineer",
  image_path: "/me.jpeg",
  description:
    "I build beautiful, performant web applications with a focus on user experience and clean code. Passionate about open source and learning new frameworks and technologies.",
  call_to_action: [
    { name: "View My Work", url: "#projects", icon: ExternalLink },
    {
      name: " Get in Touch",
      url: "mailto:dipanshuchoksi@gmail.com",
      icon: Mail,
    },
  ],
};

export const skillContent = {
  description:
    "I have experience with a diverse set of technologies and tools that I leverage to build robust, scalable applications.",
  skills_items: [
    {
      category: "Languages",
      skills: ["JavaScript", "TypeScript", "C++", "GoLang", "Python"],
    },
    {
      category: "Frontend",
      skills: ["React.js", "Next.js", "Tailwind CSS", "ShadCN"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js"],
    },
    {
      category: "Database",
      skills: ["PostgreSQL", "MongoDB", "Redis"],
    },
    {
      category: "Communication",
      skills: ["GraphQL", "RabbitMQ", "Socket.io"],
    },
    {
      category: "DevOps",
      skills: ["Docker", "Kubernetes"],
    },
    {
      category: "Tools & Platforms",
      skills: ["Git", "GitHub", "VS Code"],
    },
  ],
};
