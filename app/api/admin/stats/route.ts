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

    const [
      sectionsRes,
      servicesRes,
      testimonialsRes,
      faqsRes,
      pricingRes,
      leadsRes,
      recentLeadsRes
    ] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM page_sections"),
      pool.query("SELECT COUNT(*) FROM services"),
      pool.query("SELECT COUNT(*) FROM testimonials"),
      pool.query("SELECT COUNT(*) FROM faqs"),
      pool.query("SELECT COUNT(*) FROM pricing_plans"),
      pool.query("SELECT COUNT(*) FROM leads"),
      pool.query("SELECT id, name, whatsapp_number, target_role, created_at FROM leads ORDER BY created_at DESC LIMIT 5")
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        sections: parseInt(sectionsRes.rows[0].count),
        services: parseInt(servicesRes.rows[0].count),
        testimonials: parseInt(testimonialsRes.rows[0].count),
        faqs: parseInt(faqsRes.rows[0].count),
        pricing: parseInt(pricingRes.rows[0].count),
        leads: parseInt(leadsRes.rows[0].count),
      },
      recentLeads: recentLeadsRes.rows
    });
  } catch (error) {
    console.error("Admin stats GET error:", error);
    return NextResponse.json({ success: false, message: "Failed to load stats" }, { status: 500 });
  }
}
