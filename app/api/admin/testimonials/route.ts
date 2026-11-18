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
      SELECT id, name, role, location, quote, image_url, company, is_featured, is_published, display_order, created_at, updated_at
      FROM testimonials
      ORDER BY display_order ASC, id ASC
    `);

    return NextResponse.json({ success: true, testimonials: result.rows });
  } catch (error) {
    console.error("Admin testimonials GET error:", error);
    return NextResponse.json({ success: false, message: "Failed to load testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, role, location, quote, image_url, company, is_featured = false, is_published = true, display_order = 0 } = body;

    if (!name || !quote) {
      return NextResponse.json({ success: false, message: "Name and quote are required" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO testimonials (name, role, location, quote, image_url, company, is_featured, is_published, display_order, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING *`,
      [name, role || "", location || "", quote, image_url || null, company || "", is_featured, is_published, display_order]
    );

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, testimonial: result.rows[0] });
  } catch (error) {
    console.error("Admin testimonials POST error:", error);
    return NextResponse.json({ success: false, message: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, name, role, location, quote, image_url, company, is_featured, is_published, display_order } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const result = await pool.query(
      `UPDATE testimonials
       SET name = $1,
           role = $2,
           location = $3,
           quote = $4,
           image_url = $5,
           company = $6,
           is_featured = $7,
           is_published = $8,
           display_order = $9,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $10
       RETURNING *`,
      [name, role || "", location || "", quote, image_url || null, company || "", is_featured ?? false, is_published ?? true, display_order ?? 0, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });
    }

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, testimonial: result.rows[0] });
  } catch (error) {
    console.error("Admin testimonials PUT error:", error);
    return NextResponse.json({ success: false, message: "Failed to update testimonial" }, { status: 500 });
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

    await pool.query("DELETE FROM testimonials WHERE id = $1", [id]);

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Admin testimonials DELETE error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete testimonial" }, { status: 500 });
  }
}
