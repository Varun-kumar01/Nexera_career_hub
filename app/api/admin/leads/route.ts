import { NextResponse } from "next/server";
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
      SELECT id, name, whatsapp_number, current_status, target_role, preferred_location, resume_url, status, created_at, updated_at
      FROM leads
      ORDER BY created_at DESC, id DESC
    `);

    return NextResponse.json({ success: true, leads: result.rows });
  } catch (error) {
    console.error("Admin leads GET error:", error);
    return NextResponse.json({ success: false, message: "Failed to load leads" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, message: "ID and status are required" }, { status: 400 });
    }

    const result = await pool.query(
      `UPDATE leads
       SET status = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lead: result.rows[0] });
  } catch (error) {
    console.error("Admin leads PUT error:", error);
    return NextResponse.json({ success: false, message: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    await pool.query("DELETE FROM leads WHERE id = $1", [id]);

    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Admin leads DELETE error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete lead" }, { status: 500 });
  }
}
