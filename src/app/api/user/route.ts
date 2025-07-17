import * as cookie from "cookie";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export const runtime = 'edge';
export async function GET(request: NextRequest) {
  try {
    // Obter o cookie 'user' da requisição
    const userCookie = request.cookies.get("user")?.value;

    if (!userCookie) {
      return NextResponse.json(
        { message: "Usuário não autenticado" },
        { status: 401 },
      );
    }

    // Analisar o cookie para obter os dados do usuário
    const userData = JSON.parse(userCookie);

    return NextResponse.json(
      { success: true, user: userData },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
