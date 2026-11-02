import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import pool from "@/lib/db";

const secret = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET
);

export async function authenticateAdmin(
  email: string,
  password: string
) {
  const result = await pool.query(
    `
    SELECT id, email, password_hash
    FROM admin_users
    WHERE email = $1
    LIMIT 1
    `,
    [email]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const admin = result.rows[0];

  const validPassword = await bcrypt.compare(
    password,
    admin.password_hash
  );

  if (!validPassword) {
    return null;
  }

  return {
    id: admin.id,
    email: admin.email,
  };
}

export async function createAdminSession(adminId: number) {
  const token = await new SignJWT({
    adminId,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const cookieStore = await cookies();

  cookieStore.set("nexera_admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getAdminSession() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(
      "nexera_admin_session"
    )?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(
      token,
      secret
    );

    if (!payload.adminId) {
      return null;
    }

    const result = await pool.query(
      `
      SELECT id, email
      FROM admin_users
      WHERE id = $1
      LIMIT 1
      `,
      [payload.adminId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch {
    return null;
  }
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete("nexera_admin_session");
}