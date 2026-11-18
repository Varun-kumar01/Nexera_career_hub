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
      SELECT id, title, description, image_url, features, display_order, is_published, created_at, updated_at
      FROM services
      ORDER BY display_order ASC, id ASC
    `);

    return NextResponse.json({ success: true, services: result.rows });
  } catch (error) {
    console.error("Admin services GET error:", error);
    return NextResponse.json({ success: false, message: "Failed to load services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, image_url, features, display_order = 0, is_published = true } = body;

    if (!title) {
      return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO services (title, description, image_url, features, display_order, is_published, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING *`,
      [title, description || "", image_url || null, JSON.stringify(features || []), display_order, is_published]
    );

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, service: result.rows[0] });
  } catch (error) {
    console.error("Admin services POST error:", error);
    return NextResponse.json({ success: false, message: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, title, description, image_url, features, display_order, is_published } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const result = await pool.query(
      `UPDATE services
       SET title = $1,
           description = $2,
           image_url = $3,
           features = $4,
           display_order = $5,
           is_published = $6,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [title, description || "", image_url || null, JSON.stringify(features || []), display_order ?? 0, is_published ?? true, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, service: result.rows[0] });
  } catch (error) {
    console.error("Admin services PUT error:", error);
    return NextResponse.json({ success: false, message: "Failed to update service" }, { status: 500 });
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

    await pool.query("DELETE FROM services WHERE id = $1", [id]);

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("Admin services DELETE error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete service" }, { status: 500 });
  }
}
