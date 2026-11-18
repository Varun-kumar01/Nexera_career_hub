"use client";

import { useState, useEffect } from "react";
import {
  BriefcaseBusiness,
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
} from "lucide-react";
import ImageUploader from "./ImageUploader";

export interface ServiceRecord {
  id: number;
  title: string;
  description: string;
  image_url?: string | null;
  features?: string[] | string | null;
  display_order: number;
  is_published: boolean;
}

function parseFeatures(features: string[] | string | null | undefined): string[] {
  if (!features) return [];
  if (Array.isArray(features)) return features;
  try {
    const parsed = JSON.parse(features);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    if (typeof features === "string") {
      return features.split("\n").map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

export default function ServicesManager() {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Edit / Add state
  const [editingService, setEditingService] = useState<ServiceRecord | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    featuresText: "",
    display_order: 1,
    is_published: true,
  });

  async function loadServices() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/services", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load services");
      setServices(data.services || []);
    } catch (err: any) {
      setError(err.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadServices();
  }, []);

  function startEdit(service: ServiceRecord) {
    setEditingService(service);
    setIsAddingNew(false);
    const features = parseFeatures(service.features);
    setFormData({
      title: service.title,
      description: service.description,
      featuresText: features.join("\n"),
      display_order: service.display_order,
      is_published: service.is_published,
    });
  }

  function startAdd() {
    setIsAddingNew(true);
    setEditingService(null);
    setFormData({
      title: "",
      description: "",
      featuresText: "",
      display_order: services.length + 1,
      is_published: true,
    });
  }

  function cancelForm() {
    setIsAddingNew(false);
    setEditingService(null);
  }

  async function handleSaveForm() {
    if (!formData.title.trim()) {
      setError("Service title is required");
      return;
    }

    setMessage("");
    setError("");
    setSavingId(editingService ? editingService.id : -1);

    const featuresArray = formData.featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      if (isAddingNew) {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title.trim(),
            description: formData.description.trim(),
            features: featuresArray,
            display_order: Number(formData.display_order) || 1,
            is_published: formData.is_published,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to create service");
        setMessage("Service added successfully.");
      } else if (editingService) {
        const res = await fetch("/api/admin/services", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingService.id,
            title: formData.title.trim(),
            description: formData.description.trim(),
            features: featuresArray,
            display_order: Number(formData.display_order) || 1,
            is_published: formData.is_published,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to update service");
        setMessage("Service updated successfully.");
      }
      cancelForm();
      await loadServices();
    } catch (err: any) {
      setError(err.message || "Failed to save service");
    } finally {
      setSavingId(null);
    }
  }

  async function togglePublish(service: ServiceRecord) {
    const newStatus = !service.is_published;
    setServices((curr) =>
      curr.map((s) => (s.id === service.id ? { ...s, is_published: newStatus } : s))
    );

    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...service,
          is_published: newStatus,
        }),
      });
      if (!res.ok) {
        await loadServices();
      }
    } catch {
      await loadServices();
    }
  }

  async function deleteService(service: ServiceRecord) {
    if (!window.confirm(`Delete service "${service.title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/services?id=${service.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete service");
      setMessage("Service deleted.");
      setServices((curr) => curr.filter((s) => s.id !== service.id));
    } catch (err: any) {
      setError(err.message || "Failed to delete service");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold">Services Management</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Add, update, or remove services displayed on the public website.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadServices}
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
            Add Service
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

      {/* Edit / Add Modal or Card */}
      {(isAddingNew || editingService) && (
        <div className="rounded-2xl border border-[#635BFF]/30 bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between border-b pb-3">
            <h3 className="text-base font-bold text-[#111827]">
              {isAddingNew ? "Add New Service" : `Edit Service: ${editingService?.title}`}
            </h3>
            <button type="button" onClick={cancelForm} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Service Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Job Search Support"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#635BFF]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="A brief overview of this service..."
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">
                Key Features (One feature per line)
              </label>
              <textarea
                rows={4}
                value={formData.featuresText}
                onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                placeholder="Resume optimization&#10;Profile clarity&#10;Career positioning"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-mono outline-none focus:border-[#635BFF]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Display Order</label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
              />
            </div>

            <div className="flex items-center pt-5">
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
              {savingId !== null ? "Saving..." : "Save Service"}
            </button>
          </div>
        </div>
      )}

      {/* Services List */}
      {loading ? (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-12 text-center text-sm text-[#667085]">
          Loading services from database...
        </div>
      ) : services.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/10 bg-white p-12 text-center">
          <BriefcaseBusiness size={32} className="mx-auto mb-3 text-[#98A2B3]" />
          <h3 className="font-bold">No services found</h3>
          <p className="mt-2 text-sm text-[#667085]">Add your first service to have it appear on the website.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => {
            const features = parseFeatures(service.features);

            return (
              <div
                key={service.id}
                className="flex flex-col justify-between rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-600">
                        Order #{service.display_order}
                      </span>
                      <h3 className="mt-2 text-lg font-bold text-[#111827]">{service.title}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePublish(service)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        service.is_published
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {service.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {service.is_published ? "Published" : "Draft"}
                    </button>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-[#475467]">{service.description}</p>

                  {features.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {features.map((f, i) => (
                        <span
                          key={i}
                          className="rounded-lg bg-[#F7F8FC] border border-[#E7E9EE] px-2.5 py-1 text-xs text-[#344054]"
                        >
                          • {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-end gap-2 border-t pt-4">
                  <button
                    type="button"
                    onClick={() => startEdit(service)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Edit2 size={13} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteService(service)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-100 bg-red-50/50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
