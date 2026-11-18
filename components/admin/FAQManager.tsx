"use client";

import { useState, useEffect } from "react";
import {
  CircleHelp,
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
  ChevronDown,
} from "lucide-react";

export interface FAQRecord {
  id: number;
  question: string;
  answer: string;
  display_order: number;
  is_published: boolean;
}

export default function FAQManager() {
  const [faqs, setFaqs] = useState<FAQRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [editingItem, setEditingItem] = useState<FAQRecord | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    display_order: 1,
    is_published: true,
  });

  async function loadFaqs() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/faqs", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load FAQs");
      setFaqs(data.faqs || []);
    } catch (err: any) {
      setError(err.message || "Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadFaqs();
  }, []);

  function startEdit(item: FAQRecord) {
    setEditingItem(item);
    setIsAddingNew(false);
    setFormData({
      question: item.question,
      answer: item.answer,
      display_order: item.display_order,
      is_published: item.is_published,
    });
  }

  function startAdd() {
    setIsAddingNew(true);
    setEditingItem(null);
    setFormData({
      question: "",
      answer: "",
      display_order: faqs.length + 1,
      is_published: true,
    });
  }

  function cancelForm() {
    setIsAddingNew(false);
    setEditingItem(null);
  }

  async function handleSaveForm() {
    if (!formData.question.trim() || !formData.answer.trim()) {
      setError("Question and answer are both required");
      return;
    }

    setMessage("");
    setError("");
    setSavingId(editingItem ? editingItem.id : -1);

    try {
      if (isAddingNew) {
        const res = await fetch("/api/admin/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: formData.question.trim(),
            answer: formData.answer.trim(),
            display_order: Number(formData.display_order) || 1,
            is_published: formData.is_published,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to create FAQ");
        setMessage("FAQ added successfully.");
      } else if (editingItem) {
        const res = await fetch("/api/admin/faqs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingItem.id,
            question: formData.question.trim(),
            answer: formData.answer.trim(),
            display_order: Number(formData.display_order) || 1,
            is_published: formData.is_published,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to update FAQ");
        setMessage("FAQ updated successfully.");
      }
      cancelForm();
      await loadFaqs();
    } catch (err: any) {
      setError(err.message || "Failed to save FAQ");
    } finally {
      setSavingId(null);
    }
  }

  async function togglePublish(item: FAQRecord) {
    const newStatus = !item.is_published;
    setFaqs((curr) =>
      curr.map((f) => (f.id === item.id ? { ...f, is_published: newStatus } : f))
    );
    try {
      await fetch("/api/admin/faqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...item, is_published: newStatus }),
      });
    } catch {
      await loadFaqs();
    }
  }

  async function deleteItem(item: FAQRecord) {
    if (!window.confirm(`Delete question "${item.question}"?`)) return;
    try {
      const res = await fetch(`/api/admin/faqs?id=${item.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete FAQ");
      setMessage("FAQ deleted.");
      setFaqs((curr) => curr.filter((f) => f.id !== item.id));
    } catch (err: any) {
      setError(err.message || "Failed to delete FAQ");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold">Frequently Asked Questions</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Manage questions and answers displayed in the public FAQ accordion.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={loadFaqs}
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
            Add FAQ
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
              {isAddingNew ? "Add New FAQ" : `Edit FAQ #${editingItem?.id}`}
            </h3>
            <button type="button" onClick={cancelForm} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Question</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="e.g. How does Nexera work?"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#635BFF]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Answer</label>
              <textarea
                rows={4}
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                placeholder="Detailed explanation..."
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm leading-relaxed outline-none focus:border-[#635BFF]"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="w-40">
                <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">Order</label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 pt-5">
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
              {savingId !== null ? "Saving..." : "Save FAQ"}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-12 text-center text-sm text-[#667085]">
          Loading FAQs from database...
        </div>
      ) : faqs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/10 bg-white p-12 text-center">
          <CircleHelp size={32} className="mx-auto mb-3 text-[#98A2B3]" />
          <h3 className="font-bold">No FAQs found</h3>
          <p className="mt-2 text-sm text-[#667085]">Add frequently asked questions using the button above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-mono text-gray-600">
                    #{faq.display_order}
                  </span>
                  <h4 className="mt-1 text-base font-bold text-[#111827]">{faq.question}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublish(faq)}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      faq.is_published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {faq.is_published ? <Eye size={12} /> : <EyeOff size={12} />}
                    {faq.is_published ? "Published" : "Draft"}
                  </button>
                </div>
              </div>

              <p className="mt-2.5 text-sm leading-relaxed text-[#475467]">{faq.answer}</p>

              <div className="mt-4 flex items-center justify-end gap-2 border-t pt-3">
                <button
                  type="button"
                  onClick={() => startEdit(faq)}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Edit2 size={12} />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteItem(faq)}
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
