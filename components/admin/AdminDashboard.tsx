"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Globe,
  BriefcaseBusiness,
  MessageSquareQuote,
  Trophy,
  CircleHelp,
  CreditCard,
  Images,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Plus,
  Save,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import ServicesManager from "./ServicesManager";
import TestimonialsManager from "./TestimonialsManager";
import FAQManager from "./FAQManager";
import PricingManager from "./PricingManager";
import LeadsManager from "./LeadsManager";
import SettingsManager from "./SettingsManager";
import ImageUploader from "./ImageUploader";

type AdminDashboardProps = {
  admin: {
    id: number;
    email: string;
  };
};

type PageSection = {
  id: number;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  content: string | null;
  image_url: string | null;
  is_visible: boolean;
  display_order: number;
  updated_at?: string;
};

const menuItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Website Content", icon: Globe },
  { label: "Services", icon: BriefcaseBusiness },
  { label: "Testimonials", icon: MessageSquareQuote },
  { label: "Success Stories", icon: Trophy },
  { label: "FAQ", icon: CircleHelp },
  { label: "Pricing", icon: CreditCard },
  { label: "Media", icon: Images },
  { label: "Leads", icon: Users },
  { label: "Settings", icon: Settings },
];

export default function AdminDashboard({ admin }: AdminDashboardProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("Overview");

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.href = "/secure";
    }
  }

  function selectPage(label: string) {
    setActivePage(label);
    setMobileOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-[#111827]">
      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-black/[0.06] bg-white px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#635BFF] font-black text-white">
            N
          </div>
          <span className="font-bold">NEXERA ADMIN</span>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl border border-black/[0.06] p-2"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <div className="flex min-h-screen lg:h-screen lg:overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 flex-shrink-0 border-r border-black/[0.06] bg-white transition-transform duration-300 lg:static lg:h-full lg:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-20 items-center gap-3 border-b border-black/[0.06] px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#635BFF] font-black text-white">
                N
              </div>
              <div>
                <div className="text-sm font-black tracking-tight">NEXERA</div>
                <div className="text-[9px] font-semibold tracking-[0.2em] text-[#98A2B3]">
                  ADMIN PANEL
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6">
              <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#98A2B3]">
                Management
              </p>

              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = activePage === item.label;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => selectPage(item.label)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                        active
                          ? "bg-[#635BFF]/10 text-[#635BFF] font-semibold"
                          : "text-[#667085] hover:bg-[#f7f8fc] hover:text-[#111827]"
                      }`}
                    >
                      <Icon size={18} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-black/[0.06] p-4">
              <div className="mb-3 rounded-xl bg-[#f7f8fc] p-3">
                <p className="truncate text-xs font-semibold text-[#344054]">
                  {admin.email}
                </p>
                <p className="mt-1 text-[10px] text-[#98A2B3]">Administrator</p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#667085] transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 lg:h-full lg:overflow-y-auto">
          <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="mb-1 text-sm text-[#98A2B3]">Nexera Admin</p>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {activePage}
                </h1>
              </div>

              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-sm transition hover:border-[#635BFF]/30 hover:text-[#635BFF]"
              >
                View Website
                <ExternalLink size={15} />
              </a>
            </div>

            {activePage === "Overview" && <Overview onNavigate={selectPage} />}

            {activePage === "Website Content" && <WebsiteContentManager />}

            {activePage === "Services" && <ServicesManager />}

            {activePage === "Testimonials" && <TestimonialsManager />}

            {activePage === "Success Stories" && (
              <TestimonialsManager onlyFeatured={true} title="Success Stories (Featured)" />
            )}

            {activePage === "FAQ" && <FAQManager />}

            {activePage === "Pricing" && <PricingManager />}

            {activePage === "Media" && <MediaManager />}

            {activePage === "Leads" && <LeadsManager />}

            {activePage === "Settings" && <SettingsManager />}
          </div>
        </main>
      </div>
    </div>
  );
}

function Overview({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [stats, setStats] = useState({
    testimonials: 0,
    successStories: 0,
    services: 0,
    leads: 0,
    faqs: 0,
    pricing: 0,
  });
  const [loading, setLoading] = useState(true);

  async function fetchStats() {
    try {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchStats();
  }, []);

  const statCards = [
    { label: "New Leads", value: stats.leads, icon: Users, target: "Leads" },
    { label: "Services", value: stats.services, icon: BriefcaseBusiness, target: "Services" },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquareQuote, target: "Testimonials" },
    { label: "Success Stories", value: stats.successStories, icon: Trophy, target: "Success Stories" },
  ];

  return (
    <div>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <button
              key={stat.label}
              type="button"
              onClick={() => onNavigate(stat.target)}
              className="text-left rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm transition hover:border-[#635BFF]/30 hover:shadow-md"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#635BFF]/10 text-[#635BFF]">
                  <Icon size={19} />
                </div>
                <ArrowRight size={14} className="text-gray-400" />
              </div>
              <p className="text-3xl font-black text-[#111827]">
                {loading ? "..." : stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-[#667085]">{stat.label}</p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Website Content</h2>
          <p className="mt-1 text-sm leading-6 text-[#667085]">
            Manage all sections and copy across the live website.
          </p>
          <div className="mt-6 space-y-3">
            <DashboardItem
              title="Homepage Sections"
              description="Hero, Problem, How It Works, Why Nexera, and CTA"
              onManage={() => onNavigate("Website Content")}
            />
            <DashboardItem
              title="Career Services"
              description={`${stats.services} active services published in the database`}
              onManage={() => onNavigate("Services")}
            />
            <DashboardItem
              title="Candidate Testimonials"
              description={`${stats.testimonials} testimonials, ${stats.successStories} featured stories`}
              onManage={() => onNavigate("Testimonials")}
            />
            <DashboardItem
              title="FAQ Accordion"
              description={`${stats.faqs} frequently asked questions`}
              onManage={() => onNavigate("FAQ")}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold">Quick Actions</h2>
          <p className="mt-1 text-sm leading-6 text-[#667085]">
            Jump straight into essential content tasks.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <QuickAction
              icon={Users}
              title="View Inquiries"
              onClick={() => onNavigate("Leads")}
            />
            <QuickAction
              icon={BriefcaseBusiness}
              title="Manage Services"
              onClick={() => onNavigate("Services")}
            />
            <QuickAction
              icon={MessageSquareQuote}
              title="Manage Stories"
              onClick={() => onNavigate("Testimonials")}
            />
            <QuickAction
              icon={CreditCard}
              title="Manage Pricing"
              onClick={() => onNavigate("Pricing")}
            />
            <QuickAction
              icon={CircleHelp}
              title="Manage FAQs"
              onClick={() => onNavigate("FAQ")}
            />
            <QuickAction
              icon={Settings}
              title="Site Settings"
              onClick={() => onNavigate("Settings")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardItem({
  title,
  description,
  onManage,
}: {
  title: string;
  description: string;
  onManage: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onManage}
      className="flex w-full items-center justify-between rounded-xl border border-black/[0.06] p-4 text-left transition hover:border-[#635BFF]/30 hover:bg-[#F8F9FF]"
    >
      <div>
        <p className="text-sm font-semibold text-[#111827]">{title}</p>
        <p className="mt-1 text-xs text-[#98A2B3]">{description}</p>
      </div>
      <span className="text-xs font-semibold text-[#635BFF]">Manage →</span>
    </button>
  );
}

function QuickAction({
  icon: Icon,
  title,
  onClick,
}: {
  icon: typeof Images;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl border border-black/[0.06] p-4 text-left transition hover:border-[#635BFF]/30 hover:bg-[#635BFF]/5"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#635BFF]/10 text-[#635BFF]">
        <Icon size={17} />
      </div>
      <span className="text-sm font-semibold text-[#111827]">{title}</span>
    </button>
  );
}

function MediaManager() {
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!uploadedUrl) return;
    navigator.clipboard.writeText(uploadedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-8">
        <h2 className="text-lg font-bold text-[#111827]">Upload New Image</h2>
        <p className="mt-1 text-sm text-[#667085]">
          Upload images directly to the server. You can copy the generated URL and use it anywhere.
        </p>

        <div className="mt-5 max-w-xl">
          <ImageUploader
            value={uploadedUrl}
            onChange={(url) => setUploadedUrl(url)}
            label="Upload Image File"
            helperText="Upload any PNG, JPG, WEBP, SVG or GIF image"
          />

          {uploadedUrl && (
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-gray-50 border border-gray-200 p-3">
              <span className="truncate text-xs font-mono text-gray-700">{uploadedUrl}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 rounded-lg bg-[#635BFF] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#5148e5]"
              >
                {copied ? "Copied!" : "Copy URL"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-black/[0.06] bg-white p-6 sm:p-8">
        <h3 className="text-base font-bold text-[#111827]">Image Asset Guidelines</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-dashed border-gray-200 p-4 bg-[#F8F9FF]">
            <h4 className="text-sm font-semibold text-[#111827]">Direct Uploads</h4>
            <p className="mt-1 text-xs text-gray-600 leading-relaxed">
              Files uploaded here are stored in <code className="bg-white px-1 py-0.5 rounded border">public/uploads/</code> and served statically with zero latency.
            </p>
          </div>
          <div className="rounded-xl border border-dashed border-gray-200 p-4 bg-[#F8F9FF]">
            <h4 className="text-sm font-semibold text-[#111827]">Recommended Dimensions</h4>
            <ul className="mt-2 text-xs text-gray-600 space-y-1">
              <li>• <strong>Hero illustrations:</strong> 800 × 600 px (SVG or PNG)</li>
              <li>• <strong>Testimonial avatars:</strong> 200 × 200 px (Square JPG/PNG)</li>
              <li>• <strong>Services icons:</strong> Vector SVGs or 64 × 64 px PNGs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebsiteContentManager() {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadSections() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/content", {
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load website content.");
      }

      const loadedSections: PageSection[] = Array.isArray(data)
        ? data
        : data.sections ?? data.data ?? [];

      setSections(
        loadedSections.sort(
          (a, b) => a.display_order - b.display_order
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load website content."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadSections();
  }, []);

  function updateSection(
    id: number,
    field: keyof PageSection,
    value: string | boolean | number
  ) {
    setSections((current) =>
      current.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  }

  async function saveSection(section: PageSection) {
    setSavingId(section.id);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(section),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to save this section.");
      }

      setMessage(`"${section.section_key}" saved successfully.`);
      await loadSections();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save this section."
      );
    } finally {
      setSavingId(null);
    }
  }

  async function addSection() {
    const sectionKey = window.prompt(
      "Enter a unique section key (example: about_nexera):"
    );

    if (!sectionKey?.trim()) return;

    const title = window.prompt("Enter the section title:") ?? "";

    setAdding(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          section_key: sectionKey.trim().toLowerCase().replace(/\s+/g, "_"),
          title,
          subtitle: "",
          content: "",
          image_url: "",
          is_visible: true,
          display_order: sections.length + 1,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to add the section.");
      }

      setMessage("Section added successfully.");
      await loadSections();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to add the section."
      );
    } finally {
      setAdding(false);
    }
  }

  async function deleteSection(section: PageSection) {
    const confirmed = window.confirm(
      `Delete "${section.section_key}"? This cannot be undone.`
    );

    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/admin/content?id=${section.id}`,
        { method: "DELETE" }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete the section.");
      }

      setSections((current) =>
        current.filter((item) => item.id !== section.id)
      );
      setMessage("Section deleted.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete the section."
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-black/[0.06] bg-white p-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-bold">Homepage sections</h2>
          <p className="mt-1 text-sm leading-6 text-[#667085]">
            Edit section text, images and visibility. Save each section when
            you finish editing.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void loadSections()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/[0.08] px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            type="button"
            onClick={() => void addSection()}
            disabled={adding}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#635BFF] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5148e5] disabled:opacity-50"
          >
            <Plus size={16} />
            {adding ? "Adding..." : "Add Section"}
          </button>
        </div>
      </div>

      {message && (
        <div className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-black/[0.06] bg-white p-12 text-center text-sm text-[#667085]">
          Loading website content...
        </div>
      ) : sections.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-black/10 bg-white p-12 text-center">
          <Globe size={32} className="mx-auto mb-3 text-[#98A2B3]" />
          <h3 className="font-bold">No sections found</h3>
          <p className="mt-2 text-sm text-[#667085]">
            Add a section or check that your content API is returning records.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {sections.map((section) => (
            <section
              key={section.id}
              className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-sm"
            >
              <div className="flex flex-col justify-between gap-3 border-b border-black/[0.06] bg-gray-50/70 px-5 py-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold">
                      {formatSectionName(section.section_key)}
                    </h3>
                    <span className="rounded-md bg-gray-100 px-2 py-1 font-mono text-[11px] text-gray-500">
                      {section.section_key}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#98A2B3]">
                    Section ID: {section.id}
                  </p>
                </div>

                <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[#667085]">
                  <input
                    type="checkbox"
                    checked={section.is_visible}
                    onChange={(event) =>
                      updateSection(
                        section.id,
                        "is_visible",
                        event.target.checked
                      )
                    }
                    className="h-4 w-4 accent-[#635BFF]"
                  />
                  {section.is_visible ? (
                    <>
                      <Eye size={16} />
                      Visible
                    </>
                  ) : (
                    <>
                      <EyeOff size={16} />
                      Hidden
                    </>
                  )}
                </label>
              </div>

              <div className="grid gap-5 p-5 lg:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Title
                  </label>
                  <textarea
                    rows={3}
                    value={section.title ?? ""}
                    onChange={(event) =>
                      updateSection(section.id, "title", event.target.value)
                    }
                    placeholder="Enter section title"
                    className="w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Subtitle
                  </label>
                  <textarea
                    rows={3}
                    value={section.subtitle ?? ""}
                    onChange={(event) =>
                      updateSection(section.id, "subtitle", event.target.value)
                    }
                    placeholder="Enter section subtitle"
                    className="w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="mb-2 block text-sm font-semibold">
                    Content / Paragraph
                  </label>
                  <textarea
                    rows={5}
                    value={section.content ?? ""}
                    onChange={(event) =>
                      updateSection(section.id, "content", event.target.value)
                    }
                    placeholder="Enter section content"
                    className="w-full resize-y rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10"
                  />
                  <p className="mt-1 text-xs text-[#98A2B3]">
                    If the content uses | separators, preserve them unless
                    you know how the website displays them.
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <ImageUploader
                    value={section.image_url}
                    onChange={(url) => updateSection(section.id, "image_url", url)}
                    label="Section Image"
                    helperText="Upload an illustration or image file directly for this section"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Display order
                  </label>
                  <input
                    type="number"
                    value={section.display_order}
                    onChange={(event) =>
                      updateSection(
                        section.id,
                        "display_order",
                        Number(event.target.value)
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-between gap-3 border-t border-black/[0.06] bg-gray-50/50 px-5 py-4 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => void deleteSection(section)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete section
                </button>

                <button
                  type="button"
                  onClick={() => void saveSection(section)}
                  disabled={savingId === section.id}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#635BFF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5148e5] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={16} />
                  {savingId === section.id ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function formatSectionName(key: string) {
  return key
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
