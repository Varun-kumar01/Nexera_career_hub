import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth/admin-auth";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const result = await pool.query(`
      SELECT setting_key, setting_value, updated_at
      FROM site_settings
    `);

    const settings: Record<string, string> = {};
    for (const row of result.rows) {
      settings[row.setting_key] = row.setting_value;
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Admin settings GET error:", error);
    return NextResponse.json({ success: false, message: "Failed to load settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { settings } = body;

    if (!settings || typeof settings !== "object") {
      return NextResponse.json({ success: false, message: "Settings object is required" }, { status: 400 });
    }

    for (const [key, value] of Object.entries(settings)) {
      await pool.query(
        `INSERT INTO site_settings (setting_key, setting_value, updated_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (setting_key)
         DO UPDATE SET setting_value = EXCLUDED.setting_value, updated_at = CURRENT_TIMESTAMP`,
        [key, String(value ?? "")]
      );
    }

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, message: "Settings saved successfully" });
  } catch (error) {
    console.error("Admin settings PUT error:", error);
    return NextResponse.json({ success: false, message: "Failed to update settings" }, { status: 500 });
  }
}
