import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (!token && pathname.startsWith("/users")) {
    return NextResponse.redirect(new URL("/login?error=Unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/users/:path*"],
};