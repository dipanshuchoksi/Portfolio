import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const canEdit = isLoggedIn && !!process.env.ADMIN_EMAIL &&
        req.auth?.user?.email?.trim().toLowerCase() === process.env.ADMIN_EMAIL.trim().toLowerCase();

    const isApiAuthRoute = req.nextUrl.pathname.startsWith('/api/auth');
    const isLoginRoute = req.nextUrl.pathname === '/admin/login';
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin') && !isLoginRoute;

    if (isApiAuthRoute) return NextResponse.next();

    if (isAdminRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/admin/login', req.nextUrl));
        }
        if (!canEdit) {
            return NextResponse.redirect(new URL('/', req.nextUrl));
        }
    }

    if (isLoginRoute && canEdit) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
