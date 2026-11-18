import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT id, question, answer, display_order, is_published, created_at
      FROM faqs
      WHERE is_published = TRUE
      ORDER BY display_order ASC, id ASC
    `);

    return NextResponse.json(
      { success: true, faqs: result.rows },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Public faqs API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load FAQs" },
      { status: 500 }
    );
  }
}
