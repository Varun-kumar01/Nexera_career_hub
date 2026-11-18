"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Upload, X, Loader2, Link as LinkIcon, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  value?: string | null;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Section Image",
  helperText = "Upload a PNG, JPG, WEBP, or SVG image (max 10MB)",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showManualUrl, setShowManualUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to upload image");
      }

      if (data.url) {
        onChange(data.url);
      }
    } catch (err: any) {
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleRemove() {
    onChange("");
    setError("");
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-[#111827]">{label}</label>
        <button
          type="button"
          onClick={() => setShowManualUrl(!showManualUrl)}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#635BFF] hover:underline"
        >
          <LinkIcon size={12} />
          {showManualUrl ? "Upload File instead" : "Enter URL manually"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-600">
          {error}
        </div>
      )}

      {/* Manual URL input if toggled */}
      {showManualUrl ? (
        <div className="space-y-2">
          <input
            type="url"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg or /uploads/image.png"
            className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10"
          />
        </div>
      ) : (
        <div>
          {value ? (
            /* Image Preview Card with Replace / Remove */
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50/70 p-3">
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={value}
                    alt="Uploaded preview"
                    className="h-full w-full object-contain p-1"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-mono text-gray-700 font-semibold">{value}</p>
                  <p className="mt-1 text-xs text-gray-400">Current active image</p>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
                    >
                      {uploading ? (
                        <>
                          <Loader2 size={13} className="animate-spin text-[#635BFF]" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={13} />
                          Replace Image
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleRemove}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-100 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <X size={13} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Upload Drop Area */
            <div
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-[#F9FAFC] p-6 text-center cursor-pointer transition hover:border-[#635BFF]/50 hover:bg-[#F3F4FD] ${
                uploading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 size={28} className="animate-spin text-[#635BFF]" />
                  <p className="text-sm font-semibold text-gray-700">Uploading image to server...</p>
                  <p className="text-xs text-gray-400">Please wait a moment</p>
                </div>
              ) : (
                <>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#635BFF]/10 text-[#635BFF]">
                    <Upload size={20} />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Click to browse and upload image
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{helperText}</p>
                </>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
