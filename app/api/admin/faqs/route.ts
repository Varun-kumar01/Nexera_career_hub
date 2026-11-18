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
      SELECT id, question, answer, display_order, is_published, created_at, updated_at
      FROM faqs
      ORDER BY display_order ASC, id ASC
    `);

    return NextResponse.json({ success: true, faqs: result.rows });
  } catch (error) {
    console.error("Admin FAQs GET error:", error);
    return NextResponse.json({ success: false, message: "Failed to load FAQs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { question, answer, display_order = 0, is_published = true } = body;

    if (!question || !answer) {
      return NextResponse.json({ success: false, message: "Question and answer are required" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO faqs (question, answer, display_order, is_published, created_at, updated_at)
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING *`,
      [question, answer, display_order, is_published]
    );

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, faq: result.rows[0] });
  } catch (error) {
    console.error("Admin FAQs POST error:", error);
    return NextResponse.json({ success: false, message: "Failed to create FAQ" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, question, answer, display_order, is_published } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const result = await pool.query(
      `UPDATE faqs
       SET question = $1,
           answer = $2,
           display_order = $3,
           is_published = $4,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [question, answer, display_order ?? 0, is_published ?? true, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: "FAQ not found" }, { status: 404 });
    }

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, faq: result.rows[0] });
  } catch (error) {
    console.error("Admin FAQs PUT error:", error);
    return NextResponse.json({ success: false, message: "Failed to update FAQ" }, { status: 500 });
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

    await pool.query("DELETE FROM faqs WHERE id = $1", [id]);

    try {
      revalidatePath("/");
    } catch (e) {}

    return NextResponse.json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Admin FAQs DELETE error:", error);
    return NextResponse.json({ success: false, message: "Failed to delete FAQ" }, { status: 500 });
  }
}
