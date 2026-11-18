import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT id, name, price, description, features, button_text, whatsapp_message, is_featured, is_published, display_order, created_at
      FROM pricing_plans
      WHERE is_published = TRUE
      ORDER BY display_order ASC, id ASC
    `);

    return NextResponse.json(
      { success: true, pricing: result.rows },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Public pricing API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load pricing plans" },
      { status: 500 }
    );
  }
}
