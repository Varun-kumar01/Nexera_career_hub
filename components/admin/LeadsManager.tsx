"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Search,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  FileText,
  Clock,
  ExternalLink,
} from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export interface LeadRecord {
  id: number;
  name: string;
  whatsapp_number: string;
  current_status: string;
  target_role: string;
  preferred_location: string;
  resume_url?: string | null;
  status: string;
  created_at: string;
}

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: "contacted", label: "Contacted", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: "in_progress", label: "In Progress", color: "bg-purple-50 text-purple-700 border-purple-200" },
  { value: "enrolled", label: "Enrolled", color: "bg-green-50 text-green-700 border-green-200" },
  { value: "closed", label: "Closed", color: "bg-gray-100 text-gray-600 border-gray-200" },
];

export default function LeadsManager() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadLeads() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load leads");
      setLeads(data.leads || []);
    } catch (err: any) {
      setError(err.message || "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadLeads();
  }, []);

  async function handleStatusChange(leadId: number, newStatus: string) {
    setLeads((curr) =>
      curr.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setMessage("Status updated.");
    } catch (err: any) {
      setError(err.message || "Failed to update status");
      await loadLeads();
    }
  }

  async function deleteLead(lead: LeadRecord) {
    if (!window.confirm(`Delete lead from "${lead.name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${lead.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete lead");
      setMessage("Lead deleted.");
      setLeads((curr) => curr.filter((l) => l.id !== lead.id));
    } catch (err: any) {
      setError(err.message || "Failed to delete lead");
    }
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (lead.whatsapp_number || "").includes(search) ||
      (lead.target_role || "").toLowerCase().includes(search.toLowerCase()) ||
      (lead.preferred_location || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || (lead.status || "new").toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold">Candidate Inquiries &amp; Leads</h2>
          <p className="mt-1 text-sm text-[#667085]">
            View and manage candidates who submitted inquiries through the website form.
          </p>
        </div>

        <button
          type="button"
          onClick={loadLeads}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-black/[0.08] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
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

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, phone, or location..."
            className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-2 text-sm outline-none focus:border-[#635BFF]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter leads by status"
          className="rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#635BFF]"
        >
          <option value="all">All Statuses ({leads.length})</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="in_progress">In Progress</option>
          <option value="enrolled">Enrolled</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-12 text-center text-sm text-[#667085]">
          Loading leads...
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/10 bg-white p-12 text-center">
          <Users size={32} className="mx-auto mb-3 text-[#98A2B3]" />
          <h3 className="font-bold">No leads found</h3>
          <p className="mt-2 text-sm text-[#667085]">
            {search || statusFilter !== "all"
              ? "Try adjusting your search or filter."
              : "Inquiries submitted via the form will appear here in real time."}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50/70 text-xs font-semibold uppercase text-gray-500">
                <tr>
                  <th className="px-5 py-3.5">Candidate</th>
                  <th className="px-5 py-3.5">Target Role</th>
                  <th className="px-5 py-3.5">Location</th>
                  <th className="px-5 py-3.5">Current Status</th>
                  <th className="px-5 py-3.5">Lead Status</th>
                  <th className="px-5 py-3.5">Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => {
                  const whatsappClean = (lead.whatsapp_number || "").replace(/[^0-9]/g, "");
                  const whatsappMessage = encodeURIComponent(
                    `Hi ${lead.name}, thank you for reaching out to Nexera Career Hub! We received your profile inquiry for ${lead.target_role}.`
                  );
                  const chatUrl = `https://wa.me/${whatsappClean}?text=${whatsappMessage}`;

                  return (
                    <tr key={lead.id} className="transition hover:bg-gray-50/60">
                      <td className="px-5 py-4">
                        <div className="font-bold text-[#111827]">{lead.name}</div>
                        <a
                          href={chatUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-0.5 inline-flex items-center gap-1 text-xs text-[#635BFF] hover:underline"
                        >
                          <MessageSquare size={12} />
                          {lead.whatsapp_number}
                        </a>
                      </td>

                      <td className="px-5 py-4 font-medium text-gray-700">
                        {lead.target_role || "—"}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {lead.preferred_location || "—"}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs">
                          {lead.current_status || "Seeking"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={(lead.status || "new").toLowerCase()}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          aria-label={`Status for ${lead.name}`}
                          className="rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-700 outline-none focus:border-[#635BFF]"
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">
                        {lead.created_at
                          ? new Date(lead.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={chatUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="Chat on WhatsApp"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-700 transition hover:bg-green-100"
                          >
                            <MessageSquare size={15} />
                          </a>

                          {lead.resume_url && (
                            <a
                              href={lead.resume_url}
                              target="_blank"
                              rel="noreferrer"
                              title="View Resume"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700 transition hover:bg-blue-100"
                            >
                              <FileText size={15} />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => deleteLead(lead)}
                            title="Delete Lead"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
