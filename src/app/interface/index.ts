export interface HeroCardInterface {
  title: string;
  subTitle: string;
  iconUrl: string;
}

export interface ToastInterface {
  msg: string;
  duration?: number;
  onClose: () => void;
  type: "success" | "error" | "idle" | "loading";
}
