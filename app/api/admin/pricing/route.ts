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
      SELECT id, name, price, description, features, button_text, whatsapp_message, is_featured, is_published, display_order, created_at, updated_at
      FROM pricing_plans
      ORDER BY display_order ASC, id ASC
    `);

    return NextResponse.json({ success: true, plans: result.rows });
  } catch (error) {
    console.error("Admin pricing GET error:", error);
    return NextResponse.json({ success: false, message: "Failed to load pricing plans" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, price, description, features, button_text = "Get Started", whatsapp_message = "", is_featured = false, is_published = true, display_order = 0 } = body;

    if (!name || !price) {
      return NextResponse.json({ success: false, message: "Plan name and price are required" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO pricing_plans (name, price, description, features, button_text, whatsapp_message, is_featured, is_published, display_order, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING *`,
      [name, price, description || "", JSON.stringify(features || []), button_text, whatsapp_message, is_featured, is_published, display_order]
    );

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, plan: result.rows[0] });
  } catch (error) {
    console.error("Admin pricing POST error:", error);
    return NextResponse.json({ success: false, message: "Failed to create pricing plan" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, price, description, features, button_text, whatsapp_message, is_featured, is_published, display_order } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const result = await pool.query(
      `UPDATE pricing_plans
       SET name = $1,
           price = $2,
           description = $3,
           features = $4,
           button_text = $5,
           whatsapp_message = $6,
           is_featured = $7,
           is_published = $8,
           display_order = $9,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [name, price, description || "", JSON.stringify(features || []), button_text || "Get Started", whatsapp_message || "", is_featured ?? false, is_published ?? true, display_order ?? 0, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Pricing plan not found" }, { status: 404 });
    }

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, plan: result.rows[0] });
  } catch (error) {
    console.error("Admin pricing PUT error:", error);
    return NextResponse.json({ success: false, message: "Failed to update pricing plan" }, { status: 500 });
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

    await pool.query("DELETE FROM pricing_plans WHERE id = $1", [id]);

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, message: "Pricing plan deleted successfully" });
  } catch (error) {
    console.error("Admin pricing DELETE error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete pricing plan" }, { status: 500 });
  }
}
