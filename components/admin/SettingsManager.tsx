"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  RefreshCw,
  Save,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Building,
  Sparkles,
} from "lucide-react";

export default function SettingsManager() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [settings, setSettings] = useState({
    company_name: "Nexera Career Hub",
    whatsapp_number: "919553059468",
    contact_email: "nexeracareerhub@gmail.com",
    hero_badge: "Career management, simplified",
  });

  async function loadSettings() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/settings", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load settings");
      if (data.settings) {
        setSettings({
          company_name: data.settings.company_name || "Nexera Career Hub",
          whatsapp_number: data.settings.whatsapp_number || "919553059468",
          contact_email: data.settings.contact_email || "nexeracareerhub@gmail.com",
          hero_badge: data.settings.hero_badge || "Career management, simplified",
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadSettings();
  }, []);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save settings");
      setMessage("Site settings saved successfully.");
    } catch (err: any) {
      setError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold">General Site Settings</h2>
          <p className="mt-1 text-sm text-[#667085]">
            Configure contact info, WhatsApp dispatch number, and site branding.
          </p>
        </div>

        <button
          type="button"
          onClick={loadSettings}
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

      {loading ? (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-12 text-center text-sm text-[#667085]">
          Loading settings...
        </div>
      ) : (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
          <div className="space-y-5">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#111827]">
                <Building size={16} className="text-[#635BFF]" />
                Company / Brand Name
              </label>
              <input
                type="text"
                value={settings.company_name}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                placeholder="Nexera Career Hub"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10"
              />
              <p className="mt-1 text-xs text-gray-500">
                Shown in navbar, footer, and copyright notices across the website.
              </p>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#111827]">
                <Phone size={16} className="text-[#635BFF]" />
                Official WhatsApp Number (With Country Code)
              </label>
              <input
                type="text"
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                placeholder="919553059468"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10"
              />
              <p className="mt-1 text-xs text-gray-500">
                All WhatsApp buttons (&quot;Chat with us&quot;, lead redirection) send messages to this number.
              </p>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#111827]">
                <Mail size={16} className="text-[#635BFF]" />
                Contact Email
              </label>
              <input
                type="email"
                value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                placeholder="nexeracareerhub@gmail.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10"
              />
              <p className="mt-1 text-xs text-gray-500">
                Main inquiry and administrative contact email address.
              </p>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#111827]">
                <Sparkles size={16} className="text-[#635BFF]" />
                Default Hero Badge Text
              </label>
              <input
                type="text"
                value={settings.hero_badge}
                onChange={(e) => setSettings({ ...settings, hero_badge: e.target.value })}
                placeholder="Career management, simplified"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10"
              />
              <p className="mt-1 text-xs text-gray-500">
                Pill badge shown above the main heading if section subtitle is empty.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end border-t pt-5">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#635BFF] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5148e5] disabled:opacity-50"
            >
              <Save size={16} />
              {saving ? "Saving settings..." : "Save Settings"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
