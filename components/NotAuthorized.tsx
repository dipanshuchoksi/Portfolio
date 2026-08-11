'use client';

import Link from 'next/link';

export default function NotAuthorized({ isLoggedIn, actionText, basePage }: { isLoggedIn: boolean, actionText: string, basePage: string }) {
    return (
        <div className="w-full p-12 flex flex-col items-center justify-center border border-destructive/20 bg-destructive/5 rounded-xl text-center">
            <h2 className="text-xl font-bold text-destructive mb-2">Not Authorized</h2>
            <p className="text-muted-foreground mb-6">
                {isLoggedIn
                    ? `You are logged in, but you do not have admin permissions to ${actionText}.`
                    : `You need to log in with an admin account to ${actionText}.`}
            </p>
            <div className="flex items-center gap-4">
                <Link
                    href={"/" + basePage}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors shadow-sm border border-border"
                >
                    {"Back to " + basePage}
                </Link>
            </div>
        </div>
    );
}
