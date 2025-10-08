export interface HeroCardInterface {
  title: string;
  subTitle: string;
  iconUrl: string;
}


export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ToastInterface {
  msg: string;
  duration?: number;
  onClose: () => void;
  type: "success" | "error" | "idle" | "loading";
}
