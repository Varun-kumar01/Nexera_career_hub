// "use client";

// import { useState } from "react";
// import {
//   LayoutDashboard,
//   Globe,
//   BriefcaseBusiness,
//   MessageSquareQuote,
//   Trophy,
//   CircleHelp,
//   CreditCard,
//   Images,
//   Users,
//   Settings,
//   LogOut,
//   Menu,
//   X,
//   ExternalLink,
// } from "lucide-react";

// type AdminDashboardProps = {
//   admin: {
//     id: number;
//     email: string;
//   };
// };

// const menuItems = [
//   {
//     label: "Overview",
//     icon: LayoutDashboard,
//   },
//   {
//     label: "Website Content",
//     icon: Globe,
//   },
//   {
//     label: "Services",
//     icon: BriefcaseBusiness,
//   },
//   {
//     label: "Testimonials",
//     icon: MessageSquareQuote,
//   },
//   {
//     label: "Success Stories",
//     icon: Trophy,
//   },
//   {
//     label: "FAQ",
//     icon: CircleHelp,
//   },
//   {
//     label: "Pricing",
//     icon: CreditCard,
//   },
//   {
//     label: "Media",
//     icon: Images,
//   },
//   {
//     label: "Leads",
//     icon: Users,
//   },
//   {
//     label: "Settings",
//     icon: Settings,
//   },
// ];

// export default function AdminDashboard({
//   admin,
// }: AdminDashboardProps) {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activePage, setActivePage] =
//     useState("Overview");

//   async function handleLogout() {
//     await fetch("/api/admin/logout", {
//       method: "POST",
//     });

//     window.location.href = "/secure";
//   }

//   function selectPage(label: string) {
//     setActivePage(label);
//     setMobileOpen(false);
//   }

//   return (
//     <div className="min-h-screen bg-[#f7f8fc] text-[#111827]">
//       {/* Mobile header */}
//       <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-black/[0.06] bg-white px-4 lg:hidden">
//         <div className="flex items-center gap-2">
//           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#635BFF] font-black text-white">
//             N
//           </div>

//           <span className="font-bold">
//             NEXERA ADMIN
//           </span>
//         </div>

//         <button
//           onClick={() =>
//             setMobileOpen(!mobileOpen)
//           }
//           className="rounded-xl border border-black/[0.06] p-2"
//         >
//           {mobileOpen ? (
//             <X size={20} />
//           ) : (
//             <Menu size={20} />
//           )}
//         </button>
//       </div>

//       <div className="flex min-h-screen">
//         {/* Sidebar */}
//         <aside
//           className={`
//             fixed inset-y-0 left-0 z-50 w-72
//             border-r border-black/[0.06]
//             bg-white
//             transition-transform duration-300
//             lg:static lg:translate-x-0
//             ${
//               mobileOpen
//                 ? "translate-x-0"
//                 : "-translate-x-full"
//             }
//           `}
//         >
//           <div className="flex h-full flex-col">
//             {/* Logo */}
//             <div className="hidden h-20 items-center gap-3 border-b border-black/[0.06] px-6 lg:flex">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#635BFF] font-black text-white">
//                 N
//               </div>

//               <div>
//                 <div className="text-sm font-black tracking-tight">
//                   NEXERA
//                 </div>

//                 <div className="text-[9px] font-semibold tracking-[0.2em] text-[#98A2B3]">
//                   ADMIN PANEL
//                 </div>
//               </div>
//             </div>

//             {/* Mobile logo */}
//             <div className="flex h-20 items-center gap-3 border-b border-black/[0.06] px-6 lg:hidden">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#635BFF] font-black text-white">
//                 N
//               </div>

//               <div>
//                 <div className="text-sm font-black">
//                   NEXERA
//                 </div>

//                 <div className="text-[9px] font-semibold tracking-[0.2em] text-[#98A2B3]">
//                   ADMIN PANEL
//                 </div>
//               </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex-1 overflow-y-auto px-4 py-6">
//               <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#98A2B3]">
//                 Management
//               </p>

//               <nav className="space-y-1">
//                 {menuItems.map((item) => {
//                   const Icon = item.icon;
//                   const active =
//                     activePage === item.label;

//                   return (
//                     <button
//                       key={item.label}
//                       onClick={() =>
//                         selectPage(item.label)
//                       }
//                       className={`
//                         flex w-full items-center gap-3
//                         rounded-xl px-3 py-2.5
//                         text-left text-sm font-medium
//                         transition
//                         ${
//                           active
//                             ? "bg-[#635BFF]/10 text-[#635BFF]"
//                             : "text-[#667085] hover:bg-[#f7f8fc] hover:text-[#111827]"
//                         }
//                       `}
//                     >
//                       <Icon size={18} />

//                       {item.label}
//                     </button>
//                   );
//                 })}
//               </nav>
//             </div>

//             {/* Bottom */}
//             <div className="border-t border-black/[0.06] p-4">
//               <div className="mb-3 rounded-xl bg-[#f7f8fc] p-3">
//                 <p className="truncate text-xs font-semibold text-[#344054]">
//                   {admin.email}
//                 </p>

//                 <p className="mt-1 text-[10px] text-[#98A2B3]">
//                   Administrator
//                 </p>
//               </div>

//               <button
//                 onClick={handleLogout}
//                 className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#667085] transition hover:bg-red-50 hover:text-red-600"
//               >
//                 <LogOut size={18} />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </aside>

//         {/* Main */}
//         <main className="min-w-0 flex-1">
//           <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
//             {/* Top bar */}
//             <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//               <div>
//                 <p className="mb-1 text-sm text-[#98A2B3]">
//                   Nexera Admin
//                 </p>

//                 <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
//                   {activePage}
//                 </h1>
//               </div>

//               <a
//                 href="/"
//                 target="_blank"
//                 className="inline-flex w-fit items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-sm transition hover:border-[#635BFF]/30 hover:text-[#635BFF]"
//               >
//                 View Website
//                 <ExternalLink size={15} />
//               </a>
//             </div>

//             {/* Overview */}
//             {activePage === "Overview" && (
//               <Overview />
//             )}

//             {/* Placeholder pages */}
//             {activePage !== "Overview" && (
//               <ComingSoon title={activePage} />
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// function Overview() {
//   const stats = [
//     {
//       label: "Testimonials",
//       value: "0",
//       icon: MessageSquareQuote,
//     },
//     {
//       label: "Success Stories",
//       value: "0",
//       icon: Trophy,
//     },
//     {
//       label: "Services",
//       value: "0",
//       icon: BriefcaseBusiness,
//     },
//     {
//       label: "New Leads",
//       value: "0",
//       icon: Users,
//     },
//   ];

//   return (
//     <div>
//       <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {stats.map((stat) => {
//           const Icon = stat.icon;

//           return (
//             <div
//               key={stat.label}
//               className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm"
//             >
//               <div className="mb-5 flex items-center justify-between">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#635BFF]/10 text-[#635BFF]">
//                   <Icon size={19} />
//                 </div>
//               </div>

//               <p className="text-2xl font-bold">
//                 {stat.value}
//               </p>

//               <p className="mt-1 text-sm text-[#667085]">
//                 {stat.label}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       <div className="grid gap-6 lg:grid-cols-2">
//         <div className="rounded-2xl border border-black/[0.06] bg-white p-6">
//           <h2 className="text-lg font-bold">
//             Website Content
//           </h2>

//           <p className="mt-2 text-sm leading-6 text-[#667085]">
//             Manage the content displayed across
//             the Nexera website.
//           </p>

//           <div className="mt-6 space-y-3">
//             <DashboardItem
//               title="Homepage"
//               description="Hero, sections and CTA"
//             />

//             <DashboardItem
//               title="Services"
//               description="Manage career services"
//             />

//             <DashboardItem
//               title="Testimonials"
//               description="Add and manage testimonials"
//             />

//             <DashboardItem
//               title="FAQ"
//               description="Manage frequently asked questions"
//             />
//           </div>
//         </div>

//         <div className="rounded-2xl border border-black/[0.06] bg-white p-6">
//           <h2 className="text-lg font-bold">
//             Quick Actions
//           </h2>

//           <p className="mt-2 text-sm leading-6 text-[#667085]">
//             Frequently used content management
//             actions.
//           </p>

//           <div className="mt-6 grid gap-3 sm:grid-cols-2">
//             <QuickAction
//               icon={MessageSquareQuote}
//               title="Add Testimonial"
//             />

//             <QuickAction
//               icon={Trophy}
//               title="Add Success Story"
//             />

//             <QuickAction
//               icon={BriefcaseBusiness}
//               title="Add Service"
//             />

//             <QuickAction
//               icon={Images}
//               title="Upload Media"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function DashboardItem({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="flex items-center justify-between rounded-xl border border-black/[0.06] p-4">
//       <div>
//         <p className="text-sm font-semibold">
//           {title}
//         </p>

//         <p className="mt-1 text-xs text-[#98A2B3]">
//           {description}
//         </p>
//       </div>

//       <span className="text-xs font-medium text-[#635BFF]">
//         Manage
//       </span>
//     </div>
//   );
// }

// function QuickAction({
//   icon: Icon,
//   title,
// }: {
//   icon: typeof Images;
//   title: string;
// }) {
//   return (
//     <button className="flex items-center gap-3 rounded-xl border border-black/[0.06] p-4 text-left transition hover:border-[#635BFF]/30 hover:bg-[#635BFF]/5">
//       <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#635BFF]/10 text-[#635BFF]">
//         <Icon size={17} />
//       </div>

//       <span className="text-sm font-semibold">
//         {title}
//       </span>
//     </button>
//   );
// }

// function ComingSoon({
//   title,
// }: {
//   title: string;
// }) {
//   return (
//     <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-black/[0.06] bg-white">
//       <div className="text-center">
//         <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#635BFF]/10 text-[#635BFF]">
//           <Settings size={24} />
//         </div>

//         <h2 className="text-xl font-bold">
//           {title}
//         </h2>

//         <p className="mt-2 text-sm text-[#667085]">
//           Content management will be added
//           here next.
//         </p>
//       </div>
//     </div>
//   );
// }





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
} from "lucide-react";

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

export default function AdminDashboard({
  admin,
}: AdminDashboardProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePage, setActivePage] = useState("Overview");

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.href = "/admin-x7k9";
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

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-black/[0.06] bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-20 items-center gap-3 border-b border-black/[0.06] px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#635BFF] font-black text-white">
                N
              </div>
              <div>
                <div className="text-sm font-black tracking-tight">
                  NEXERA
                </div>
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
                          ? "bg-[#635BFF]/10 text-[#635BFF]"
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
                <p className="mt-1 text-[10px] text-[#98A2B3]">
                  Administrator
                </p>
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
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="mb-1 text-sm text-[#98A2B3]">
                  Nexera Admin
                </p>
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

            {activePage === "Overview" && <Overview />}

            {activePage === "Website Content" && (
              <WebsiteContentManager />
            )}

            {activePage !== "Overview" &&
              activePage !== "Website Content" && (
                <ComingSoon title={activePage} />
              )}
          </div>
        </main>
      </div>
    </div>
  );
}

function Overview() {
  const stats = [
    { label: "Testimonials", value: "0", icon: MessageSquareQuote },
    { label: "Success Stories", value: "0", icon: Trophy },
    { label: "Services", value: "0", icon: BriefcaseBusiness },
    { label: "New Leads", value: "0", icon: Users },
  ];

  return (
    <div>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#635BFF]/10 text-[#635BFF]">
                  <Icon size={19} />
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-[#667085]">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h2 className="text-lg font-bold">Website Content</h2>
          <p className="mt-2 text-sm leading-6 text-[#667085]">
            Manage the content displayed across the Nexera website.
          </p>
          <div className="mt-6 space-y-3">
            <DashboardItem
              title="Homepage"
              description="Hero, sections and CTA"
            />
            <DashboardItem
              title="Services"
              description="Manage career services"
            />
            <DashboardItem
              title="Testimonials"
              description="Add and manage testimonials"
            />
            <DashboardItem
              title="FAQ"
              description="Manage frequently asked questions"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-black/[0.06] bg-white p-6">
          <h2 className="text-lg font-bold">Quick Actions</h2>
          <p className="mt-2 text-sm leading-6 text-[#667085]">
            Frequently used content management actions.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <QuickAction icon={MessageSquareQuote} title="Add Testimonial" />
            <QuickAction icon={Trophy} title="Add Success Story" />
            <QuickAction icon={BriefcaseBusiness} title="Add Service" />
            <QuickAction icon={Images} title="Upload Media" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-black/[0.06] p-4">
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs text-[#98A2B3]">{description}</p>
      </div>
      <span className="text-xs font-medium text-[#635BFF]">Manage</span>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
}: {
  icon: typeof Images;
  title: string;
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 rounded-xl border border-black/[0.06] p-4 text-left transition hover:border-[#635BFF]/30 hover:bg-[#635BFF]/5"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#635BFF]/10 text-[#635BFF]">
        <Icon size={17} />
      </div>
      <span className="text-sm font-semibold">{title}</span>
    </button>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-black/[0.06] bg-white">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#635BFF]/10 text-[#635BFF]">
          <Settings size={24} />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2 text-sm text-[#667085]">
          Content management will be added here next.
        </p>
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
                  <label className="mb-2 block text-sm font-semibold">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={section.image_url ?? ""}
                    onChange={(event) =>
                      updateSection(section.id, "image_url", event.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#635BFF] focus:ring-2 focus:ring-[#635BFF]/10"
                  />

                  {section.image_url && (
                    <div className="mt-3">
                      <p className="mb-2 text-xs text-[#98A2B3]">
                        Image preview
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={section.image_url}
                        alt={`Preview for ${section.section_key}`}
                        className="max-h-52 max-w-full rounded-xl border border-gray-100 object-contain"
                      />
                    </div>
                  )}
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
