import { useEffect } from "react";
import { ToastInterface } from "../interface";

const Toast: React.FC<ToastInterface> = ({
  msg,
  onClose,
  type,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearInterval(timer);
  }, [onClose, duration]);

  let colorClass = "";

  if (type == "error") {
    colorClass = "bg-red-600 text-text";
  } else if (type == "loading") {
    colorClass = "bg-background-accent text-text";
  } else if (type == "success") {
    colorClass = "bg-green-400 text-background";
  }

  return (
    <div
      className={`fixed top-5 right-5 z-50 rounded-md px-4 py-2 text-white shadow-md ${colorClass}`}
    >
      {msg}
    </div>
  );
};

export default Toast;
