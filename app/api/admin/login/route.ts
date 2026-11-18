import { NextRequest, NextResponse } from "next/server";
import {
  authenticateAdmin,
  createAdminSession,
} from "@/lib/auth/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const admin = await authenticateAdmin(
      email,
      password
    );

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    await createAdminSession(admin.id);

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error: any) {
    console.error("Admin login error:", error);

    const isDbError =
      error?.code === "ECONNREFUSED" ||
      error?.message?.includes("connect ECONNREFUSED") ||
      (Array.isArray(error?.errors) &&
        error.errors.some((e: any) => e?.code === "ECONNREFUSED"));

    const message = isDbError
      ? "Database is offline. Please start PostgreSQL service (postgresql-x64-18)."
      : "Login failed";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}