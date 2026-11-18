const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

function loadEnvFile(filename) {
  const filePath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:srilatha@localhost:5432/nexera_career",
});

async function seedEnspiritContent() {
  try {
    console.log("Connecting to PostgreSQL to seed dynamic content...");

    // 1. Ensure page_sections table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.page_sections (
        id SERIAL PRIMARY KEY,
        section_key VARCHAR(100) UNIQUE NOT NULL,
        title TEXT,
        subtitle TEXT,
        content TEXT,
        image_url TEXT,
        is_visible BOOLEAN DEFAULT TRUE,
        display_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Seed / Upsert Page Sections
    const sections = [
      {
        section_key: "hero",
        title: "Leave the 'Apply' button to us. You focus on interviews.",
        subtitle: "PIPELINE ACTIVE • RECRUITER OUTREACH OS",
        content:
          "We manage your entire job search workflow — from algorithmic ATS resume optimization and role targeting to daily verified applications and response tracking. Built for ambitious graduates ready to land interviews without the manual burnout.",
        image_url: null,
        display_order: 1,
      },
      {
        section_key: "problem",
        title: "Job hunting is broken. Manual applications consume 40+ hours a week.",
        subtitle: "THE REPETITIVE FRICTION",
        content:
          "Sending hundreds of manual applications into resume black holes drains momentum, damages confidence, and distracts from high-leverage technical and behavioral interview preparation.",
        image_url: null,
        display_order: 2,
      },
      {
        section_key: "how_it_works",
        title: "The Delivery OS: How Nexera Works",
        subtitle: "A structured, transparent 5-stage career operations pipeline.",
        content:
          "A governed end-to-end framework: preference alignment, ATS keyword engineering, daily automated submissions, inbox tracking, and interview readiness.",
        image_url: null,
        display_order: 3,
      },
      {
        section_key: "why_nexera",
        title: "Engineered for Velocity and Interview Consistency",
        subtitle: "WHY CANDIDATES CHOOSE NEXERA",
        content:
          "We treat your career search like an enterprise software deployment — transparent metrics, zero dropped leads, ATS-aligned profiles, and relentless execution.",
        image_url: null,
        display_order: 4,
      },
      {
        section_key: "final_cta",
        title: "Ready to automate your application workflow?",
        subtitle: "COMMENCE ENGAGEMENT",
        content:
          "Tell us your target roles and preferred cities. Our dedicated team will take over your application pipeline within 24 hours.",
        image_url: null,
        display_order: 5,
      },
    ];

    for (const sec of sections) {
      await pool.query(
        `
        INSERT INTO page_sections (section_key, title, subtitle, content, image_url, is_visible, display_order, updated_at)
        VALUES ($1, $2, $3, $4, $5, TRUE, $6, CURRENT_TIMESTAMP)
        ON CONFLICT (section_key) DO UPDATE SET
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          content = EXCLUDED.content,
          image_url = EXCLUDED.image_url,
          is_visible = TRUE,
          display_order = EXCLUDED.display_order,
          updated_at = CURRENT_TIMESTAMP
        `,
        [
          sec.section_key,
          sec.title,
          sec.subtitle,
          sec.content,
          sec.image_url,
          sec.display_order,
        ]
      );
    }
    console.log("✓ page_sections seeded successfully.");

    // 3. Upsert Services
    const services = [
      {
        title: "Daily Application Pipeline",
        description:
          "Systematic daily outreach to 20–50+ verified roles aligned with your domain, skills, and target locations.",
        features: JSON.stringify([
          "Automated portal submissions",
          "Daily volume with relevance",
          "Zero application fatigue",
        ]),
        display_order: 1,
      },
      {
        title: "ATS Keyword Engineering",
        description:
          "Algorithmically tailored resumes optimized for applicant tracking systems to ensure 90%+ pass-through rates.",
        features: JSON.stringify([
          "Role-specific keyword injection",
          "Clean recruiter-first formatting",
          "Full ATS compatibility",
        ]),
        display_order: 2,
      },
      {
        title: "Full Career Management OS",
        description:
          "End-to-end governance of your entire job search workflow — applications, tracking, and momentum.",
        features: JSON.stringify([
          "Live status dashboard",
          "Weekly submission reports",
          "Dedicated career specialist",
        ]),
        display_order: 3,
      },
      {
        title: "Recruiter Email & Response Tracking",
        description:
          "Continuous monitoring of application portals, emails, and recruiter inquiries to ensure zero missed callbacks.",
        features: JSON.stringify([
          "Inbox monitoring",
          "Immediate interview notification",
          "Follow-up scheduling",
        ]),
        display_order: 4,
      },
      {
        title: "Job Description Customization",
        description:
          "Every application is individually matched and tuned to the specific employer's hiring requirements.",
        features: JSON.stringify([
          "Tailored cover letters",
          "Matched qualification bullet points",
          "Higher response yield",
        ]),
        display_order: 5,
      },
      {
        title: "Domain & Location Targeting",
        description:
          "Precision targeting across engineering, data, product, analytics, finance, and operations in your preferred cities.",
        features: JSON.stringify([
          "Tier-1 tech & enterprise roles",
          "Remote & hybrid filtering",
          "Visa & sponsorship alignment",
        ]),
        display_order: 6,
      },
    ];

    // Clear and re-populate services for consistency
    await pool.query("DELETE FROM services");
    for (const s of services) {
      await pool.query(
        `INSERT INTO services (title, description, features, display_order, is_published, created_at, updated_at)
         VALUES ($1, $2, $3, $4, TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [s.title, s.description, s.features, s.display_order]
      );
    }
    console.log("✓ services seeded successfully.");

    // 4. Upsert Authentic Indian Testimonials (No foreign images)
    const testimonials = [
      {
        name: "Prajwala R.",
        role: "Software Engineer",
        company: "Tech Solutions",
        location: "Hyderabad",
        quote:
          "I was applying consistently for 2 months with zero responses. Nexera took over the daily applications with tailored resumes, and within 3 weeks I had 6 interviews lined up.",
        image_url: null,
        is_featured: true,
        display_order: 1,
      },
      {
        name: "Karthik V.",
        role: "Data Analyst",
        company: "Analytics Corp",
        location: "Bengaluru",
        quote:
          "My resume was getting rejected by automated ATS screening. Nexera re-engineered my profile with role-specific keywords. Within 10 days, recruiters started calling.",
        image_url: null,
        is_featured: true,
        display_order: 2,
      },
      {
        name: "Abdul K.",
        role: "Cloud Engineer",
        company: "Enterprise Cloud",
        location: "Chennai",
        quote:
          "Applying to 30 jobs daily while working on projects was exhausting. Nexera made the entire search systematic and predictable. I focused 100% on interview prep.",
        image_url: null,
        is_featured: true,
        display_order: 3,
      },
      {
        name: "Surya Teja M.",
        role: "Full Stack Developer",
        company: "FinTech Innovation",
        location: "Hyderabad",
        quote:
          "The daily tracking and transparency are unmatched. I received regular updates on submissions and recruiter responses without having to lift a finger.",
        image_url: null,
        is_featured: false,
        display_order: 4,
      },
    ];

    await pool.query("DELETE FROM testimonials");
    for (const t of testimonials) {
      await pool.query(
        `INSERT INTO testimonials (name, role, company, location, quote, image_url, is_featured, is_published, display_order, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
        [
          t.name,
          t.role,
          t.company,
          t.location,
          t.quote,
          t.image_url,
          t.is_featured,
          t.display_order,
        ]
      );
    }
    console.log("✓ testimonials seeded successfully.");

    // 5. Upsert Site Settings
    const settings = [
      { key: "company_name", value: "Nexera Career Hub" },
      { key: "whatsapp_number", value: "919553059468" },
      { key: "contact_email", value: "nexeracareerhub@gmail.com" },
      { key: "hero_badge", value: "PIPELINE ACTIVE • RECRUITER OUTREACH OS" },
      { key: "stat_applications", value: "3,000+" },
      { key: "stat_interviews", value: "150+" },
      { key: "stat_graduates", value: "80+" },
      { key: "stat_consistency", value: "85%" },
    ];

    for (const s of settings) {
      await pool.query(
        `INSERT INTO site_settings (setting_key, setting_value, updated_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (setting_key) DO UPDATE SET
           setting_value = EXCLUDED.setting_value,
           updated_at = CURRENT_TIMESTAMP`,
        [s.key, s.value]
      );
    }
    console.log("✓ site_settings seeded successfully.");

    console.log("\nALL ENSPIRIT DYNAMIC DATABASE SEEDING COMPLETED!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await pool.end();
  }
}

seedEnspiritContent();
