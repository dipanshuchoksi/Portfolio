"use client";

import { Menu, Moon, Sun, LogIn, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import useIntersectionObserver from "@/hooks/useIntersectionOberver";
import { login, logout } from "@/app/actions/auth";
import { toast } from "sonner";

interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  navLinks: Array<{ href: string; label: string }>;
  isLoggedIn?: boolean;
}

export function MobileNav({ isOpen, onOpenChange, navLinks, isLoggedIn = false }: MobileNavProps) {
  const { activeSection, setActiveSection } = useIntersectionObserver();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <button
        onClick={() => onOpenChange(true)}
        className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Navigation Sheet */}
      <Sheet open={isOpen} onOpenChange={onOpenChange} >
        <SheetContent side="right" className="w-75 sm:w-87.5 flex flex-col overflow-y-scroll">
          <SheetHeader>
            <SheetTitle className="text-2xl text-left">Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-between py-6">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link, idx) => {
                let isActive = false;

                if (link.href.startsWith("/#") || link.href === "/") {
                  if (pathname === "/") {
                    isActive = link.label.toLowerCase() === activeSection;
                  }
                } else {
                  if (pathname !== "/" && pathname.startsWith(link.href)) {
                    isActive = true;
                  }
                }

                return (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center rounded-lg px-4 py-3 text-base font-semibold transition-colors ${isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary/80"
                        }`}
                      onClick={() => setActiveSection(link.label.toLowerCase())}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                );
              })}

              {isLoggedIn && !pathname.startsWith("/admin") && (
                <SheetClose asChild>
                  <Link
                    href="/admin/dashboard"
                    className={`flex items-center rounded-lg px-4 py-3 text-base font-semibold transition-colors ${pathname.startsWith("/admin")
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary/80"
                      }`}
                  >
                    Admin Dashboard
                  </Link>
                </SheetClose>
              )}
              {!pathname.startsWith("/admin") && <SheetClose asChild>
                <Link
                  href="/connect"
                  className={`flex items-center rounded-lg px-4 py-3 text-base font-semibold transition-colors ${pathname.startsWith("/connect")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-secondary/80"
                    }`}
                >
                  Contact Me
                </Link>
              </SheetClose>
              }
            </nav>

            <div className="flex flex-col space-y-1 pt-6 mt-6 border-t border-border/50">
              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
                className="flex items-center gap-3 w-full rounded-lg px-4 py-3 text-base font-semibold text-left text-foreground hover:bg-secondary/80 transition-colors"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
                  className="flex items-center gap-3 w-full rounded-lg px-4 py-3 text-base font-semibold text-left text-primary hover:bg-primary/10 transition-colors"
                >
                  {isLoggedIn ? <LogOut className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
                  <span>{isLoggedIn ? "Logout" : "Login"}</span>
                </button>
              </form>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
