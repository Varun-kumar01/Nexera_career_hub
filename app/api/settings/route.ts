import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT setting_key, setting_value, updated_at
      FROM site_settings
    `);

    const settings: Record<string, string> = {};
    for (const row of result.rows) {
      settings[row.setting_key] = row.setting_value;
    }

    return NextResponse.json(
      { success: true, settings, list: result.rows },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Public settings API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load site settings" },
      { status: 500 }
    );
  }
}
