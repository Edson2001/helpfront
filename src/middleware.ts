// middleware.ts
import * as cookie from "cookie";
import { NextRequest, NextResponse } from "next/server";
import { useUserStore } from "./stores/userStore";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userToken = request.cookies.get("user")?.value;
  console.log("Cookie 'user':", userToken); // Depuração

  // Analisar o cookie 'user' para obter os dados do usuário
  let userData = null;
  try {
    userData = userToken ? JSON.parse(userToken) : null;
    console.log("Dados do usuário analisados:", userData); // Depuração
  } catch (error) {
    console.error("Erro ao analisar o cookie 'user':", error);
  }

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/painel");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/painel/users");

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("user", userToken);

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
