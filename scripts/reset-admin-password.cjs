
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

// Load environment variables from .env.local and .env
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
  connectionString: process.env.DATABASE_URL,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// Read password without displaying characters
function askHidden(question) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY || !process.stdin.setRawMode) {
      reject(new Error("Run this script in a normal interactive terminal."));
      return;
    }

    process.stdout.write(question);

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();

    let password = "";

    function cleanup() {
      process.stdin.removeListener("keypress", onKeypress);
      process.stdin.setRawMode(false);
      process.stdin.pause();
    }

    function onKeypress(char, key) {
      if (key && key.ctrl && key.name === "c") {
        cleanup();
        process.stdout.write("\n");
        reject(new Error("Operation cancelled."));
        return;
      }

      if (key && key.name === "return") {
        cleanup();
        process.stdout.write("\n");
        resolve(password);
        return;
      }

      if (key && key.name === "backspace") {
        password = password.slice(0, -1);
        return;
      }

      if (char && !key.ctrl && !key.meta) {
        password += char;
      }
    }

    process.stdin.on("keypress", onKeypress);
  });
}

async function resetAdminPassword() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is missing from your environment.");
    }

    console.log("\n=== Nexera Admin Password Reset ===\n");

    const email = (await ask("Enter existing admin email: "))
      .trim()
      .toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    const password = await askHidden("Enter new password: ");

    if (password.length < 12) {
      throw new Error("Password must contain at least 12 characters.");
    }

    const confirmPassword = await askHidden(
      "Confirm new password: "
    );

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `UPDATE public.admin_users
       SET password_hash = $1,
           updated_at = CURRENT_TIMESTAMP
       WHERE LOWER(email) = $2
       RETURNING id, email`,
      [passwordHash, email]
    );

    if (result.rowCount === 0) {
      console.log("\nNo admin account found with that email.");
      return;
    }

    console.log("\nPassword updated successfully!");
    console.log("Admin ID:", result.rows[0].id);
    console.log("Admin Email:", result.rows[0].email);
    console.log("You can now log in to Nexera Admin.");

  } catch (error) {
    console.error("\nPassword reset failed:", error.message);
    process.exitCode = 1;
  } finally {
    rl.close();
    await pool.end();
  }
}

resetAdminPassword();
