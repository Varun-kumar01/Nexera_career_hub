import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const sectionKey = request.nextUrl.searchParams.get("section_key");

    if (sectionKey) {
      const result = await pool.query(
        `
        SELECT id, section_key, title, subtitle, content, image_url, is_visible, display_order, updated_at
        FROM page_sections
        WHERE section_key = $1 AND is_visible = TRUE
        LIMIT 1
        `,
        [sectionKey]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, message: "Section not found or hidden", section: null },
          { status: 404, headers: { "Cache-Control": "no-store, max-age=0" } }
        );
      }

      return NextResponse.json(
        { success: true, section: result.rows[0] },
        { headers: { "Cache-Control": "no-store, max-age=0" } }
      );
    }

    const result = await pool.query(`
      SELECT id, section_key, title, subtitle, content, image_url, is_visible, display_order, updated_at
      FROM page_sections
      WHERE is_visible = TRUE
      ORDER BY display_order ASC, id ASC
    `);

    const sectionsMap: Record<string, any> = {};
    for (const row of result.rows) {
      sectionsMap[row.section_key] = row;
    }

    return NextResponse.json(
      { success: true, sections: sectionsMap, list: result.rows },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    console.error("Public content API error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load content" },
      { status: 500 }
    );
  }
}
