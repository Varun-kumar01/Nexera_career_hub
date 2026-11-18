const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:srilatha@localhost:5432/nexera_career'
});

async function seed() {
  try {
    console.log("Seeding database tables...");

    // 1. Services
    const servicesCount = await pool.query('SELECT COUNT(*) FROM services');
    if (parseInt(servicesCount.rows[0].count) === 0) {
      console.log("Seeding services...");
      const initialServices = [
        {
          title: "Career Profile",
          description: "A more compelling profile starts with strong positioning and clearer communication.",
          features: JSON.stringify(["Resume optimization", "Profile clarity", "Career positioning"]),
          display_order: 1,
          is_published: true
        },
        {
          title: "Job Search",
          description: "Target the roles that match your strengths, preferences and growth direction.",
          features: JSON.stringify(["Relevant job discovery", "Targeted applications", "Better fit matching"]),
          display_order: 2,
          is_published: true
        },
        {
          title: "Application Management",
          description: "Keep your search organized with structure, follow-ups and momentum.",
          features: JSON.stringify(["Application tracking", "Follow-up rhythm", "Clear next steps"]),
          display_order: 3,
          is_published: true
        },
        {
          title: "Interview Support",
          description: "Prepare for conversations with feedback that helps you present your best self.",
          features: JSON.stringify(["Interview preparation", "Position-specific guidance", "Confidence-building support"]),
          display_order: 4,
          is_published: true
        }
      ];

      for (const s of initialServices) {
        await pool.query(
          `INSERT INTO services (title, description, features, display_order, is_published, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
          [s.title, s.description, s.features, s.display_order, s.is_published]
        );
      }
      console.log("Services seeded successfully.");
    }

    // 2. Testimonials
    const testimonialsCount = await pool.query('SELECT COUNT(*) FROM testimonials');
    if (parseInt(testimonialsCount.rows[0].count) === 0) {
      console.log("Seeding testimonials...");
      const initialTestimonials = [
        {
          name: "Prajwala",
          role: "Computer Science Graduate",
          location: "Hyderabad",
          quote: "I was applying consistently but getting no responses. Nexera handled targeted applications, and within 3 weeks I had 6 interviews.",
          company: "Software Engineer",
          is_featured: true,
          is_published: true,
          display_order: 1
        },
        {
          name: "Karthik",
          role: "Data Analyst Aspirant",
          location: "Bengaluru",
          quote: "My resume wasn’t getting shortlisted despite multiple applications. Nexera optimized it with ATS keywords. Within days, I started getting callbacks.",
          company: "Data Analyst",
          is_featured: true,
          is_published: true,
          display_order: 2
        },
        {
          name: "Abdul",
          role: "Software Engineer",
          location: "Chennai",
          quote: "Applying daily was exhausting and inconsistent. Nexera took over and made the process structured. I could focus completely on interview preparation.",
          company: "Tech Corp",
          is_featured: true,
          is_published: true,
          display_order: 3
        },
        {
          name: "Surya Teja",
          role: "Full Stack Developer",
          location: "Hyderabad",
          quote: "I spent hours applying without results or tracking. Nexera handled applications and follow-ups efficiently. I focused only on interviews.",
          company: "Full Stack Dev",
          is_featured: false,
          is_published: true,
          display_order: 4
        }
      ];

      for (const t of initialTestimonials) {
        await pool.query(
          `INSERT INTO testimonials (name, role, location, quote, company, is_featured, is_published, display_order, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
          [t.name, t.role, t.location, t.quote, t.company, t.is_featured, t.is_published, t.display_order]
        );
      }
      console.log("Testimonials seeded successfully.");
    }

    // 3. FAQs
    const faqsCount = await pool.query('SELECT COUNT(*) FROM faqs');
    if (parseInt(faqsCount.rows[0].count) === 0) {
      console.log("Seeding FAQs...");
      const initialFaqs = [
        {
          question: "How does Nexera work?",
          answer: "We start by understanding your target role, background, and preferred locations. Then we help position your profile, support targeted applications, and keep your search organized with clear communication.",
          display_order: 1,
          is_published: true
        },
        {
          question: "Who can use Nexera?",
          answer: "Nexera is designed for students, graduates, working professionals, career switchers, and job seekers who want more structure and better support while managing applications.",
          display_order: 2,
          is_published: true
        },
        {
          question: "Do you optimize resumes?",
          answer: "Yes. Resume and profile positioning are part of the service, with attention to role-fit, clarity, and recruiter-readiness.",
          display_order: 3,
          is_published: true
        },
        {
          question: "How do you find jobs?",
          answer: "We focus on roles that align with your experience, target function, preferred location, and career goal so the search stays relevant and efficient.",
          display_order: 4,
          is_published: true
        },
        {
          question: "Can I choose my preferred role?",
          answer: "Yes. The process starts with your goals, so the search is shaped around your preferred roles and direction.",
          display_order: 5,
          is_published: true
        },
        {
          question: "Can I choose my preferred location?",
          answer: "Yes. Your preferred locations are part of the initial brief and influence how we prioritize opportunities.",
          display_order: 6,
          is_published: true
        },
        {
          question: "How do I communicate with Nexera?",
          answer: "Communication is kept simple through WhatsApp and direct follow-up from the Nexera team, so updates and questions stay easy to manage.",
          display_order: 7,
          is_published: true
        },
        {
          question: "Do you guarantee a job?",
          answer: "We do not make unsupported guarantees. Our focus is to make your search more organized, more targeted, and more prepared for interviews.",
          display_order: 8,
          is_published: true
        },
        {
          question: "How does the application process work?",
          answer: "Once your profile and goals are set, we help with targeted discovery, application support, tracking, and communication so you can focus on interview preparation.",
          display_order: 9,
          is_published: true
        }
      ];

      for (const f of initialFaqs) {
        await pool.query(
          `INSERT INTO faqs (question, answer, display_order, is_published, created_at, updated_at)
           VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
          [f.question, f.answer, f.display_order, f.is_published]
        );
      }
      console.log("FAQs seeded successfully.");
    }

    // 4. Pricing Plans
    const pricingCount = await pool.query('SELECT COUNT(*) FROM pricing_plans');
    if (parseInt(pricingCount.rows[0].count) === 0) {
      console.log("Seeding Pricing Plans...");
      const initialPlans = [
        {
          name: "Career Profile",
          price: "Custom quote",
          description: "For candidates who need a sharper profile, focus, and a clearer search strategy.",
          features: JSON.stringify([
            "Resume optimization",
            "ATS-aligned profile positioning",
            "LinkedIn and career profile support"
          ]),
          button_text: "Get Started",
          whatsapp_message: "Hi Nexera, I'd like to get started with the Career Profile plan.",
          is_featured: false,
          is_published: true,
          display_order: 1
        },
        {
          name: "Job Search Support",
          price: "Custom quote",
          description: "For people who want better targeting and more structured application support.",
          features: JSON.stringify([
            "Job matching guidance",
            "Targeted discovery support",
            "Application assistance"
          ]),
          button_text: "Get Started",
          whatsapp_message: "Hi Nexera, I'd like to get started with the Job Search Support plan.",
          is_featured: true,
          is_published: true,
          display_order: 2
        },
        {
          name: "Full Career Management",
          price: "Custom quote",
          description: "For candidates who want hands-on support across applications, tracking, and interview readiness.",
          features: JSON.stringify([
            "Application tracking and follow-up",
            "Interview preparation support",
            "Ongoing career guidance"
          ]),
          button_text: "Get Started",
          whatsapp_message: "Hi Nexera, I'd like to get started with the Full Career Management plan.",
          is_featured: false,
          is_published: true,
          display_order: 3
        }
      ];

      for (const p of initialPlans) {
        await pool.query(
          `INSERT INTO pricing_plans (name, price, description, features, button_text, whatsapp_message, is_featured, is_published, display_order, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
          [p.name, p.price, p.description, p.features, p.button_text, p.whatsapp_message, p.is_featured, p.is_published, p.display_order]
        );
      }
      console.log("Pricing Plans seeded successfully.");
    }

    // 5. Site Settings
    const settingsCount = await pool.query('SELECT COUNT(*) FROM site_settings');
    if (parseInt(settingsCount.rows[0].count) === 0) {
      console.log("Seeding Site Settings...");
      const initialSettings = [
        { key: "company_name", value: "Nexera Career Hub" },
        { key: "whatsapp_number", value: "919553059468" },
        { key: "contact_email", value: "nexeracareerhub@gmail.com" },
        { key: "hero_badge", value: "Career management, simplified" }
      ];

      for (const s of initialSettings) {
        await pool.query(
          `INSERT INTO site_settings (setting_key, setting_value, updated_at)
           VALUES ($1, $2, CURRENT_TIMESTAMP)`,
          [s.key, s.value]
        );
      }
      console.log("Site Settings seeded successfully.");
    }

    console.log("ALL SEEDING COMPLETED!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await pool.end();
  }
}

seed();
