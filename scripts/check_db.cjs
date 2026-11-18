const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:srilatha@localhost:5432/nexera_career'
});

async function run() {
  try {
    const sections = await pool.query('SELECT id, section_key, title, subtitle, is_visible FROM page_sections ORDER BY id');
    console.log('--- PAGE SECTIONS ---');
    console.log(sections.rows);

    const services = await pool.query('SELECT id, title, is_published FROM services ORDER BY id');
    console.log('--- SERVICES ---', services.rows.length);

    const testimonials = await pool.query('SELECT id, name, is_published FROM testimonials ORDER BY id');
    console.log('--- TESTIMONIALS ---', testimonials.rows.length);

    const faqs = await pool.query('SELECT id, question, is_published FROM faqs ORDER BY id');
    console.log('--- FAQS ---', faqs.rows.length);

    const pricing = await pool.query('SELECT id, name, price, is_published FROM pricing_plans ORDER BY id');
    console.log('--- PRICING ---', pricing.rows.length);

    const settings = await pool.query('SELECT setting_key, setting_value FROM site_settings');
    console.log('--- SETTINGS ---', settings.rows);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

run();
