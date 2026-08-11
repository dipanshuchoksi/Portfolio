import { getAuthStatus } from "@/app/actions/auth";
import { auth } from "@/auth";
import Link from "next/link";
import { FolderGit2, FileText, FileArchive } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const { isLoggedIn, canEdit } = await getAuthStatus();

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-4">You need to be logged in!</h1>
      </div>
    );
  }

  const firstName = session?.user?.name?.split(" ")[0] || "Guest";

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12">
        {canEdit ? (
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
              Welcome back, Dipanshu!
            </h1>
            <p className="text-xl text-muted-foreground">
              Here is your command center. Manage your portfolio content below.
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-primary to-accent inline-block">
              Hello there, {firstName}!
            </h1>
            <p className="text-xl text-muted-foreground">
              Thanks for checking out the admin area. You can only access this dashboard page.
            </p>
          </div>
        )}
      </div>

      {canEdit && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/projects" className="group">
            <div className="flex flex-col p-6 h-full bg-card/50 hover:bg-card border border-border/50 hover:border-primary/50 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="p-3 bg-primary/10 text-primary rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FolderGit2 size={28} />
              </div>
              <h2 className="text-xl font-bold mb-2">Projects</h2>
              <p className="text-muted-foreground">Manage your portfolio projects, add new ones, or update existing details.</p>
            </div>
          </Link>

          <Link href="/admin/archieve" className="group">
            <div className="flex flex-col p-6 h-full bg-card/50 hover:bg-card border border-border/50 hover:border-primary/50 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="p-3 bg-primary/10 text-primary rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileArchive size={28} />
              </div>
              <h2 className="text-xl font-bold mb-2">Archive</h2>
              <p className="text-muted-foreground">Manage your notes, snippets, and archived thoughts.</p>
            </div>
          </Link>

          <Link href="/admin/resume" className="group">
            <div className="flex flex-col p-6 h-full bg-card/50 hover:bg-card border border-border/50 hover:border-primary/50 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
              <div className="p-3 bg-primary/10 text-primary rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText size={28} />
              </div>
              <h2 className="text-xl font-bold mb-2">Resume</h2>
              <p className="text-muted-foreground">Upload and manage your current resume document.</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
