import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, whatsapp_number, current_status, target_role, preferred_location } = body;

    if (!name || !whatsapp_number) {
      return NextResponse.json(
        { success: false, message: "Name and WhatsApp number are required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO leads (name, whatsapp_number, current_status, target_role, preferred_location, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, 'New', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING id, name, whatsapp_number, current_status, target_role, preferred_location, status, created_at`,
      [
        name.trim(),
        whatsapp_number.trim(),
        current_status || "Student",
        target_role || "",
        preferred_location || ""
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Lead recorded successfully",
      lead: result.rows[0]
    });
  } catch (error) {
    console.error("Public lead submission error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit lead" },
      { status: 500 }
    );
  }
}
