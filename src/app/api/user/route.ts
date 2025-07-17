import * as cookie from "cookie";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const runtime = "edge";
export async function GET(request: NextRequest) {
  try {
    const userCookie = request.cookies.get("user")?.value;

    if (!userCookie) {
      return NextResponse.json(
        { message: "Usuário não autenticado" },
        { status: 401 },
      );
    }

    const userData = JSON.parse(userCookie);

    return NextResponse.json(
      { success: true, user: userData },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
