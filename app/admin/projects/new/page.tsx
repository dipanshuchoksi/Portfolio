import ProjectEditor from "@/components/ProjectEditor";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "New Project | Dipanshu Choksi",
    description: "Add a new project to the portfolio.",
};

export default async function NewProjectPage() {

    return (
        <div className="flex-1 pt-32 pb-20 bg-background/50 relative overflow-hidden min-h-screen">
            <div className="absolute top-1/4 -right-1/4 w-200 h-200 bg-primary/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="mb-12">
                    <Link
                        href="/admin/projects"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
                    >
                        <ArrowLeft size={16} className="transition-transform grousp-hover:-translate-x-1" />
                        Back to Projects
                    </Link>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-4xl mb-6 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                        Add New Project
                    </h1>
                </div>

                <ProjectEditor />
            </div>
        </div>
    );
}
