"use client";

import { useState, useEffect } from "react";
import {
  CreditCard,
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
  Sparkles,
} from "lucide-react";

export interface PricingRecord {
  id: number;
  name: string;
  price: string;
  description: string;
  features?: string[] | string | null;
  button_text: string;
  whatsapp_message?: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
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

export default function PricingManager() {
  const [plans, setPlans] = useState<PricingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [editingItem, setEditingItem] = useState<PricingRecord | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    featuresText: "",
    button_text: "Get Started",
    whatsapp_message: "",
    is_featured: false,
    is_published: true,
    display_order: 1,
  });

  async function loadPlans() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/pricing", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load pricing plans");
      setPlans(data.plans || []);
    } catch (err: any) {
      setError(err.message || "Failed to load pricing plans");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadPlans();
  }, []);

  function startEdit(item: PricingRecord) {
    setEditingItem(item);
    setIsAddingNew(false);
    const features = parseFeatures(item.features);
    setFormData({
      name: item.name,
      price: item.price,
      description: item.description,
      featuresText: features.join("\n"),
      button_text: item.button_text || "Get Started",
      whatsapp_message: item.whatsapp_message || "",
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
      price: "Custom quote",
      description: "",
      featuresText: "",
      button_text: "Get Started",
      whatsapp_message: "",
      is_featured: false,
      is_published: true,
      display_order: plans.length + 1,
    });
  }

  function cancelForm() {
    setIsAddingNew(false);
    setEditingItem(null);
  }

  async function handleSaveForm() {
    if (!formData.name.trim() || !formData.price.trim()) {
      setError("Plan name and price are required");
      return;
    }

    setMessage("");
    setError("");
    setSavingId(editingItem ? editingItem.id : -1);

    const featuresArray = formData.featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      if (isAddingNew) {
        const res = await fetch("/api/admin/pricing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name.trim(),
            price: formData.price.trim(),
            description: formData.description.trim(),
            features: featuresArray,
            button_text: formData.button_text.trim() || "Get Started",
            whatsapp_message: formData.whatsapp_message.trim(),
            is_featured: formData.is_featured,
            is_published: formData.is_published,
            display_order: Number(formData.display_order) || 1,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to create plan");
        setMessage("Plan added successfully.");
      } else if (editingItem) {
        const res = await fetch("/api/admin/pricing", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingItem.id,
            name: formData.name.trim(),
            price: formData.price.trim(),
            description: formData.description.trim(),
            features: featuresArray,
            button_text: formData.button_text.trim() || "Get Started",
            whatsapp_message: formData.whatsapp_message.trim(),
            is_featured: formData.is_featured,
            is_published: formData.is_published,
            display_order: Number(formData.display_order) || 1,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to update plan");
        setMessage("Plan updated successfully.");
      }
      cancelForm();
      await loadPlans();
    } catch (err: any) {
      setError(err.message || "Failed to save plan");
    } finally {
      setSavingId(null);
    }
  }

  async function togglePublish(item: PricingRecord) {
    const newStatus = !item.is_published;
    setPlans((curr) =>
      curr.map((p) => (p.id === item.id ? { ...p, is_published: newStatus } : p))
    );
    try {
      await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, is_published: newStatus }),
      });
    } catch {
      await loadPlans();
    }
  }

  async function toggleFeatured(item: PricingRecord) {
    const newFeatured = !item.is_featured;
    setPlans((curr) =>
      curr.map((p) => (p.id === item.id ? { ...p, is_featured: newFeatured } : p))
    );
    try {
      await fetch("/api/admin/pricing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, is_featured: newFeatured }),
      });
    } catch {
      await loadPlans();
    }
  }

  async function deleteItem(item: PricingRecord) {
    if (!window.confirm(`Delete plan "${item.name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/pricing?id=${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete plan");
      setMessage("Plan deleted.");
      setPlans((curr) => curr.filter((p) => p.id !== item.id));
    } catch (err: any) {
      setError(err.message || "Failed to delete plan");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold">Pricing Plans</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Manage service packages and pricing options shown on the website.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadPlans}
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
            Add Plan
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
              {isAddingNew ? "Add New Pricing Plan" : `Edit Plan: ${editingItem?.name}`}
            </h3>
            <button type="button" onClick={cancelForm} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Plan Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Job Search Support"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Price Display</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. Custom quote or ₹4,999"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Description</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Who is this plan built for?"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">
                Features (One feature per line)
              </label>
              <textarea
                rows={4}
                value={formData.featuresText}
                onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                placeholder="Job matching guidance&#10;Targeted discovery support&#10;Application assistance"
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm font-mono outline-none focus:border-[#635BFF]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Button Text</label>
              <input
                type="text"
                value={formData.button_text}
                onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">WhatsApp Message</label>
              <input
                type="text"
                value={formData.whatsapp_message}
                onChange={(e) => setFormData({ ...formData, whatsapp_message: e.target.value })}
                placeholder="Hi Nexera, I'd like to get started..."
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
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
                Most Popular (Highlighted Badge)
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
              {savingId !== null ? "Saving..." : "Save Plan"}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-12 text-center text-sm text-[#667085]">
          Loading pricing plans...
        </div>
      ) : plans.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/10 bg-white p-12 text-center">
          <CreditCard size={32} className="mx-auto mb-3 text-[#98A2B3]" />
          <h3 className="font-bold">No pricing plans</h3>
          <p className="mt-2 text-sm text-[#667085]">Create your first plan above.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => {
            const features = parseFeatures(plan.features);

            return (
              <div
                key={plan.id}
                className={`flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
                  plan.is_featured ? "border-[#635BFF] ring-2 ring-[#635BFF]/10" : "border-black/[0.06]"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {plan.is_featured && (
                        <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#4338CA]">
                          <Sparkles size={10} /> Popular
                        </span>
                      )}
                      <h4 className="text-lg font-bold text-[#111827]">{plan.name}</h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePublish(plan)}
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        plan.is_published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {plan.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                      {plan.is_published ? "Live" : "Draft"}
                    </button>
                  </div>

                  <p className="mt-2 text-2xl font-black text-[#111827]">{plan.price}</p>
                  <p className="mt-2 text-xs text-[#667085]">{plan.description}</p>

                  <ul className="mt-4 space-y-1.5 border-t pt-3">
                    {features.map((f, i) => (
                      <li key={i} className="text-xs text-[#344054]">
                        ✓ {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between border-t pt-3">
                  <button
                    type="button"
                    onClick={() => toggleFeatured(plan)}
                    className="text-xs font-semibold text-[#635BFF] hover:underline"
                  >
                    {plan.is_featured ? "Remove featured" : "Make featured"}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => startEdit(plan)}
                      className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteItem(plan)}
                      className="rounded-lg border border-red-100 bg-red-50/50 px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
