import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT id, title, description, image_url, features, display_order, is_published, created_at, updated_at
      FROM services
      WHERE is_published = TRUE
      ORDER BY display_order ASC, id ASC
    `);

    return NextResponse.json(
      { success: true, services: result.rows },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Public services API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load services" },
      { status: 500 }
    );
  }
}
