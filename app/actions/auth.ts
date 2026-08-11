'use server';

import { signIn, signOut, auth } from '@/auth';

export async function login() {
    await signIn('github', { redirectTo: "/admin/dashboard" });
}

export async function logout() {
    await signOut({ redirectTo: '/' });
}

export async function getAuthStatus() {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    const canEdit = isLoggedIn && !!process.env.ADMIN_EMAIL &&
        session.user?.email?.trim().toLowerCase() === process.env.ADMIN_EMAIL.trim().toLowerCase();

    return { isLoggedIn, canEdit };
}
