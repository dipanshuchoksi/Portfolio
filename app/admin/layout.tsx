import Link from "next/link";
import { ReactNode } from "react";
import { Home, FolderGit2, Archive, LayoutDashboard, File, LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center px-4 mx-auto max-w-6xl">
                    <div className="flex w-full justify-between items-center">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
                                <Home className="h-4 w-4" />
                                <span className="font-bold">Public Site</span>
                            </Link>

                            <div className="hidden md:flex h-6 w-px bg-border/60"></div>

                            <nav className="flex items-center space-x-6 text-sm font-medium text-muted-foreground">
                                <Link href="/admin/dashboard" className="transition-colors hover:text-foreground flex items-center gap-2">
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Link>
                                <Link href="/admin/projects" className="transition-colors hover:text-foreground flex items-center gap-2">
                                    <FolderGit2 className="h-4 w-4" />
                                    Projects
                                </Link>
                                <Link href="/admin/archieve" className="transition-colors hover:text-foreground flex items-center gap-2">
                                    <Archive className="h-4 w-4" />
                                    Archive
                                </Link>
                                <Link href="/admin/resume" className="transition-colors hover:text-foreground flex items-center gap-2">
                                    <File className="h-4 w-4" />
                                    Resume
                                </Link>
                            </nav>
                        </div>

                        <form action={logout}>
                            <button
                                type="submit"
                                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
