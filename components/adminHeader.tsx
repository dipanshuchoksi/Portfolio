"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { NavigationMenu, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MobileNav } from "@/components/mobile-nav";
import { SettingsMenu } from "./settings-menu";
import { useAuthStatus } from "@/hooks/useAuthStatus";

const adminNavLinks = [
  { href: "/", label: "Hero" },
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/archieve", label: "Archive" },
  { href: "/admin/resume", label: "Resume" },
];

export function AdminHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isLoggedIn } = useAuthStatus()

  // Add scroll event listener for changing header background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 w-full",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-sm py-2"
          : "bg-transparent py-4 border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 font-medium">
          {/* Logo */}
          <Link
            href="/"
            className="group text-lg font-medium md:text-xl whitespace-nowrap transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <div>
              <span className="text-primary group-hover:text-accent transition-colors">{"<"}</span>
              <span className="hidden sm:inline">
                <span className="text-foreground tracking-tight"> dipanshu</span>
                <span className="text-primary group-hover:text-accent transition-colors">choksi</span>
              </span>
              <span className="sm:hidden">
                <span className="text-foreground tracking-tight">dipanshu </span>
              </span>
              <span className="text-primary group-hover:text-accent transition-colors">{"/>"}</span>
            </div>
            <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider hidden sm:block">
              Admin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            {adminNavLinks.map((link, idx) => {
              const isActive = pathname.startsWith(link.href) && link.href !== "/";

              return (
                <NavigationMenuItem
                  key={idx}
                  className="bg-transparent"
                  asChild
                >
                  <NavigationMenuLink
                    asChild
                    active={isActive}
                    className={cn(
                      "group inline-flex items-center justify-center px-4 py-2 text-sm font-semibold transition-colors bg-transparent",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Link href={link.href}>
                      <span className={cn("nav-link-underline", isActive && "active")}>
                        {link.label}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenu>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <SettingsMenu isLoggedIn={isLoggedIn} />

            {/* Mobile Menu Button */}
            <MobileNav isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} navLinks={adminNavLinks} isLoggedIn={true} />
          </div>
        </div>
      </div>
    </header>
  );
}
