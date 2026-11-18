const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
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
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:srilatha@localhost:5432/nexera_career",
});

async function main() {
  try {
    console.log("Checking database connection...");
    await pool.query("SELECT 1");
    console.log("Database connection successful!");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const email = "admin@nexeracareerhub.com";
    const password = "Admin@12345678";
    const hash = await bcrypt.hash(password, 12);

    const existing = await pool.query(
      "SELECT id, email FROM admin_users WHERE LOWER(email) = LOWER($1)",
      [email]
    );

    if (existing.rows.length === 0) {
      await pool.query(
        "INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)",
        [email, hash]
      );
      console.log(`Created admin user: ${email}`);
    } else {
      await pool.query(
        "UPDATE admin_users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE LOWER(email) = LOWER($2)",
        [hash, email]
      );
      console.log(`Updated admin user password: ${email}`);
    }

    console.log("\n=================================");
    console.log("ADMIN LOGIN CREDENTIALS:");
    console.log("Email:    admin@nexeracareerhub.com");
    console.log("Password: Admin@12345678");
    console.log("=================================\n");
  } catch (err) {
    console.error("Error setting up admin user:", err.message);
  } finally {
    await pool.end();
  }
}

main();
