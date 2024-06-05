/** @format */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isAuth = await getToken({ req: request });
    const protectedRoutes = ["/profile"];
    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/signup");
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (isAuth && isAuthRoute) {
            return NextResponse.redirect(new URL("/profile", request.url));

    }
    // Redirect to login if not authenticated and trying to access a protected route
    // if (
    //   pathname.startsWith("/profile") &&
    //   !request.cookies.get("next-auth.session-token")
    // ) {
    //   const url = request.nextUrl.clone();
    //   url.pathname = "/login";
    //   return NextResponse.redirect(url);
    // }
    // return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/profile/:path*", "/login/:path*"],
};
