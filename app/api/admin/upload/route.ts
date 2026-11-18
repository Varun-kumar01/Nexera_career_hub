import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getAdminSession } from "@/lib/auth/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminSession();
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "No file provided for upload" },
        { status: 400 }
      );
    }

    // Validate type (must be image)
    const validMimes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/avif",
    ];

    if (file.type && !validMimes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Only image files (PNG, JPG, WEBP, SVG, GIF) are allowed" },
        { status: 400 }
      );
    }

    // Limit size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Image size must be less than 10MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save into public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const ext = path.extname(file.name).toLowerCase() || ".png";
    const rawBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFileName = `${Date.now()}-${rawBase || "image"}${ext}`;
    const destinationPath = path.join(uploadDir, uniqueFileName);

    await writeFile(destinationPath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFileName,
      size: file.size,
    });
  } catch (error: any) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
