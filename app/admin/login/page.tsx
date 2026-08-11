import { getAuthStatus, login, logout } from "../../actions/auth";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
    const { isLoggedIn, canEdit } = await getAuthStatus();

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-card text-card-foreground rounded-xl p-8 shadow-sm border text-center">
                <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

                {!isLoggedIn ? (
                    <form action={login}>
                        <Button type="submit" className="w-full">
                            Login with GitHub
                        </Button>
                    </form>
                ) : !canEdit ? (
                    <div className="space-y-4">
                        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm font-medium">
                            Access Denied: You are not authorized as an admin.
                        </div>
                        <form action={logout}>
                            <Button type="submit" variant="outline" className="w-full">
                                Logout
                            </Button>
                        </form>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 text-sm font-medium">
                            Welcome, Admin! Verified successfully.
                        </div>
                        <form action={logout}>
                            <Button type="submit" variant="outline" className="w-full">
                                Logout
                            </Button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
