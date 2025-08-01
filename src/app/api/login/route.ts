import axios from "axios";
import * as cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export const runtime = "edge";
export async function POST(req: Request) {
  const { email, password, turnstileToken } = await req.json();
  try {
    const routePath = process.env.NEXT_PUBLIC_BACK_URL + "/auth/login";

    const response = await axios.post(routePath, {
      email,
      password,
      turnstileToken,
    });

    const token = response.data;

    const cookieValue = cookie.serialize("token", token?.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      domain:
        process.env.NODE_ENV === "development" ? undefined : ".webfacil.site",
      maxAge: 60 * 60 * 24 * 7,
    });

    const cookieUser = cookie.serialize(
      "user",
      JSON.stringify({ role: "ADMIN" }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        domain:
          process.env.NODE_ENV === "development" ? undefined : ".webfacil.site",
        maxAge: 60 * 60 * 24 * 7,
      },
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Set-Cookie": [cookieValue, cookieUser].join(", "),
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message:
          (error as any)?.response?.data?.message ?? "Credenciais inválidas",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
