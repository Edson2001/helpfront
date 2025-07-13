// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { useUserStore } from "./stores/userStore";
 

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log(token, "************");
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/painel");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/painel/users");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminRoute) {
    // Simulando a obtenção do usuário do userStore (você pode adaptar para buscar do backend)
    const user = useUserStore.getState().user;
    if (user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/painel", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/painel/:path*"],
};
/* // middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log(token, "************")
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/painel");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/painel/:path*"],  
};
 */