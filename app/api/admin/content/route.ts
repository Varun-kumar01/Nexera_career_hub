import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/admin-auth";
import pool from "@/lib/db";

export async function GET() {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await pool.query(`
      SELECT
        id,
        section_key,
        title,
        subtitle,
        content,
        image_url,
        is_visible,
        display_order
      FROM page_sections
      ORDER BY display_order ASC, id ASC
    `);

    return NextResponse.json({
      success: true,
      sections: result.rows,
    });
  } catch (error) {
    console.error("Get website content error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load website content",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      section_key,
      title,
      subtitle,
      content,
      image_url,
      is_visible = true,
      display_order = 0,
    } = body;

    if (!section_key) {
      return NextResponse.json(
        {
          success: false,
          message: "section_key is required",
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO page_sections
        (
          section_key,
          title,
          subtitle,
          content,
          image_url,
          is_visible,
          display_order
        )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        section_key,
        title || null,
        subtitle || null,
        content || null,
        image_url || null,
        is_visible,
        display_order,
      ]
    );

    return NextResponse.json({
      success: true,
      section: result.rows[0],
    });
  } catch (error) {
    console.error("Create website content error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create content",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      id,
      section_key,
      title,
      subtitle,
      content,
      image_url,
      is_visible,
      display_order,
    } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "id is required",
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      UPDATE page_sections
      SET
        section_key = $1,
        title = $2,
        subtitle = $3,
        content = $4,
        image_url = $5,
        is_visible = $6,
        display_order = $7,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING *
      `,
      [
        section_key,
        title || null,
        subtitle || null,
        content || null,
        image_url || null,
        is_visible ?? true,
        display_order ?? 0,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Content not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      section: result.rows[0],
    });
  } catch (error) {
    console.error("Update website content error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update content",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await getAdminSession();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "id is required",
        },
        { status: 400 }
      );
    }

    await pool.query(
      `
      DELETE FROM page_sections
      WHERE id = $1
      `,
      [id]
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Delete website content error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete content",
      },
      { status: 500 }
    );
  }
}