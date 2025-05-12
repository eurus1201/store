import { NextResponse } from "next/server";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Mock authentication (replace with real API or DB)
    if (email === "test@example.com" && password === "password123") {
      const token = "mock-jwt-token-" + Math.random().toString(36).substring(2);
      const response = NextResponse.json({ message: "Login successful", userId: "1" }, { status: 200 });
      response.cookies.set("token", token, { httpOnly: true, path: "/", maxAge: 3600 });
      return response;
    } else {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation failed", errors: error.errors }, { status: 400 });
    }
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}