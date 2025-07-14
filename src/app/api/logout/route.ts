import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export const runtime = 'edge';
export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.delete("token");
  return response;
}
