"use client";

import { useState, useEffect } from "react";
import {
  MessageSquareQuote,
  Plus,
  RefreshCw,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Edit2,
  X,
  Star,
} from "lucide-react";
import ImageUploader from "./ImageUploader";

export interface TestimonialRecord {
  id: number;
  name: string;
  role: string;
  location?: string | null;
  quote: string;
  image_url?: string | null;
  company?: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
}

interface TestimonialsManagerProps {
  onlyFeatured?: boolean;
  title?: string;
}

export default function TestimonialsManager({
  onlyFeatured = false,
  title = "Testimonials Management",
}: TestimonialsManagerProps) {
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [editingItem, setEditingItem] = useState<TestimonialRecord | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    company: "",
    quote: "",
    image_url: "",
    is_featured: onlyFeatured,
    is_published: true,
    display_order: 1,
  });

  async function loadTestimonials() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/testimonials", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load testimonials");
      setTestimonials(data.testimonials || []);
    } catch (err: any) {
      setError(err.message || "Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadTestimonials();
  }, []);

  function startEdit(item: TestimonialRecord) {
    setEditingItem(item);
    setIsAddingNew(false);
    setFormData({
      name: item.name,
      role: item.role,
      location: item.location || "",
      company: item.company || "",
      quote: item.quote,
      image_url: item.image_url || "",
      is_featured: item.is_featured,
      is_published: item.is_published,
      display_order: item.display_order,
    });
  }

  function startAdd() {
    setIsAddingNew(true);
    setEditingItem(null);
    setFormData({
      name: "",
      role: "",
      location: "",
      company: "",
      quote: "",
      image_url: "",
      is_featured: onlyFeatured,
      is_published: true,
      display_order: testimonials.length + 1,
    });
  }

  function cancelForm() {
    setIsAddingNew(false);
    setEditingItem(null);
  }

  async function handleSaveForm() {
    if (!formData.name.trim() || !formData.quote.trim()) {
      setError("Name and quote are required");
      return;
    }

    setMessage("");
    setError("");
    setSavingId(editingItem ? editingItem.id : -1);

    try {
      if (isAddingNew) {
        const res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            role: formData.role.trim(),
            location: formData.location.trim(),
            company: formData.company.trim(),
            quote: formData.quote.trim(),
            image_url: formData.image_url || null,
            is_featured: formData.is_featured,
            is_published: formData.is_published,
            display_order: Number(formData.display_order) || 1,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to add testimonial");
        setMessage("Testimonial added successfully.");
      } else if (editingItem) {
        const res = await fetch("/api/admin/testimonials", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingItem.id,
            name: formData.name.trim(),
            role: formData.role.trim(),
            location: formData.location.trim(),
            company: formData.company.trim(),
            quote: formData.quote.trim(),
            image_url: formData.image_url || null,
            is_featured: formData.is_featured,
            is_published: formData.is_published,
            display_order: Number(formData.display_order) || 1,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to update testimonial");
        setMessage("Testimonial updated successfully.");
      }
      cancelForm();
      await loadTestimonials();
    } catch (err: any) {
      setError(err.message || "Failed to save testimonial");
    } finally {
      setSavingId(null);
    }
  }

  async function togglePublish(item: TestimonialRecord) {
    const newStatus = !item.is_published;
    setTestimonials((curr) =>
      curr.map((t) => (t.id === item.id ? { ...t, is_published: newStatus } : t))
    );
    try {
      await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, is_published: newStatus }),
      });
    } catch {
      await loadTestimonials();
    }
  }

  async function toggleFeatured(item: TestimonialRecord) {
    const newFeatured = !item.is_featured;
    setTestimonials((curr) =>
      curr.map((t) => (t.id === item.id ? { ...t, is_featured: newFeatured } : t))
    );
    try {
      await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, is_featured: newFeatured }),
      });
    } catch {
      await loadTestimonials();
    }
  }

  async function deleteItem(item: TestimonialRecord) {
    if (!window.confirm(`Delete testimonial from "${item.name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete testimonial");
      setMessage("Testimonial deleted.");
      setTestimonials((curr) => curr.filter((t) => t.id !== item.id));
    } catch (err: any) {
      setError(err.message || "Failed to delete testimonial");
    }
  }

  const displayedList = onlyFeatured
    ? testimonials.filter((t) => t.is_featured)
    : testimonials;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Manage candidate stories and verified testimonials.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadTestimonials}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-black/[0.08] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          <button
            type="button"
            onClick={startAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-[#635BFF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5148e5]"
          >
            <Plus size={16} />
            Add Story
          </button>
        </div>
      </div>

      {message && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <CheckCircle2 size={18} className="shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      {(isAddingNew || editingItem) && (
        <div className="rounded-2xl border border-[#635BFF]/30 bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between border-b pb-3">
            <h3 className="text-base font-bold text-[#111827]">
              {isAddingNew ? "Add New Testimonial" : `Edit Story: ${editingItem?.name}`}
            </h3>
            <button type="button" onClick={cancelForm} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Candidate Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Prajwala"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Role / Designation</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Computer Science Graduate"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Hyderabad"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Company / Outcome</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Software Engineer at Tech Corp"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Testimonial Quote</label>
              <textarea
                rows={4}
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="Write the candidate's feedback and experience..."
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm leading-relaxed outline-none focus:border-[#635BFF]"
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploader
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                label="Candidate Photo / Avatar"
                helperText="Upload a square photo of the candidate (optional)"
              />
            </div>

            <div className="flex items-center gap-6 pt-2 sm:col-span-2">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="h-4 w-4 accent-[#635BFF]"
                />
                Featured Story (Highlighted)
              </label>

              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="h-4 w-4 accent-[#635BFF]"
                />
                Published (Visible on site)
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={cancelForm}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveForm}
              disabled={savingId !== null}
              className="inline-flex items-center gap-2 rounded-xl bg-[#635BFF] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5148e5] disabled:opacity-50"
            >
              <Save size={16} />
              {savingId !== null ? "Saving..." : "Save Story"}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-12 text-center text-sm text-[#667085]">
          Loading testimonials...
        </div>
      ) : displayedList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/10 bg-white p-12 text-center">
          <MessageSquareQuote size={32} className="mx-auto mb-3 text-[#98A2B3]" />
          <h3 className="font-bold">No stories found</h3>
          <p className="mt-2 text-sm text-[#667085]">Click &quot;Add Story&quot; above to create a candidate testimonial.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedList.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div className="flex items-start gap-3">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-10 w-10 shrink-0 rounded-full border border-gray-200 object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1F0FF] font-bold text-[#635BFF]">
                      {item.name ? item.name.charAt(0).toUpperCase() : "N"}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-[#111827]">{item.name}</h4>
                      {item.is_featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[11px] font-semibold text-[#4338CA]">
                          <Star size={10} className="fill-[#4338CA]" /> Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#667085]">
                      {item.role} {item.location ? `• ${item.location}` : ""} {item.company ? `• ${item.company}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFeatured(item)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                      item.is_featured ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.is_featured ? "★ Featured" : "☆ Make Featured"}
                  </button>
                  <button
                    type="button"
                    onClick={() => togglePublish(item)}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      item.is_published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {item.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                    {item.is_published ? "Published" : "Draft"}
                  </button>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-[#344054] italic">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="mt-4 flex items-center justify-end gap-2 border-t pt-3">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Edit2 size={12} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteItem(item)}
                  className="inline-flex items-center gap-1 rounded-lg border border-red-100 bg-red-50/50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
