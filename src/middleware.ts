import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userToken = request.cookies.get("user")?.value;

  let userData = null;
  try {
    userData = userToken ? JSON.parse(userToken) : null;
  } catch (error) {
    console.error("Erro ao analisar o cookie 'user':", error);
  }

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/painel");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/painel/users");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminRoute) {
    if (userData?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/painel", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/painel/:path*"],
};
