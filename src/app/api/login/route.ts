import axios from "axios";
import * as cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const routePath = "http://localhost:3006/auth/login";

    const response = await axios.post(routePath, {
      email,
      password,
    });
    console.log(response?.data, "responseresponseresponse");
    const token = response.data?.access_token;

    const cookieValue = cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Set-Cookie": cookieValue,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: (error as any)?.response?.data?.message ?? "Credenciais inválidas" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
