"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, Moon, Sun, LogIn, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { login, logout } from "@/app/actions/auth";
import { toast } from "sonner";

export function SettingsMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-secondary rounded-lg transition-colors flex items-center justify-center"
        aria-label="Settings"
      >
        <Settings className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border/50 bg-card/95 backdrop-blur-md shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col p-1.5">
            <button
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                setOpen(false);
              }}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-left hover:bg-secondary/80 rounded-md transition-colors"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <form
              action={async () => {
                if (isLoggedIn) {
                  await logout();
                  toast.success("You have successfully logged out.");
                } else {
                  await login();
                }
              }}
              className="w-full"
            >
              <button
                type="submit"
                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-left hover:bg-secondary/80 rounded-md transition-colors text-primary font-medium"
              >
                {isLoggedIn ? <LogOut className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                <span>{isLoggedIn ? "Logout" : "Login"}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
