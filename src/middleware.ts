// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/products",
  "/about",
  "/contact",
  "/login",
  "/register",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;
  const role = request.cookies.get("role")?.value; // "ADMIN" | "USER"

  // Allow public routes
  if (publicRoutes.includes(pathname) || pathname.startsWith("/product/")) {
    return NextResponse.next();
  }

  // If not logged in
  if (!token) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url),
    );
  }

  // Admin route protection
  if (pathname.startsWith("/admin")) {
    if (role !== "ADMIN")
      return NextResponse.redirect(new URL("/", request.url));
  }

  // User route protection
  if (pathname.startsWith("/user")) {
    if (role !== "USER" && role !== "ADMIN")
      return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
