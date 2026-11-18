"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  FileCheck,
  Sparkles,
  Send,
  Activity,
  CheckCircle2,
} from "lucide-react";

const processColumns = [
  {
    id: "strategy",
    category: "Strategy & Profile",
    accentColor: "#E1432E", // Coral red matching column 1 in screenshot
    accentBorder: "border-[#E1432E]",
    textColor: "text-[#E1432E]",
    iconBg: "bg-[#FFF1F0]",
    iconColor: "text-[#E1432E]",
    subtitle: "Your goals defined and ATS-optimized candidate profile built.",
    items: [
      {
        icon: Compass,
        title: "Share Your Goals",
        description:
          "Tell us your target roles, preferred locations, salary expectations, and tech stack.",
      },
      {
        icon: FileCheck,
        title: "ATS Resume Optimization",
        description:
          "Keyword calibration, ATS-friendly structuring, and industry recruiter positioning.",
      },
    ],
  },
  {
    id: "outreach",
    category: "Matching & Outreach",
    accentColor: "#9333EA", // Vibrant purple matching column 2 in screenshot
    accentBorder: "border-[#9333EA]",
    textColor: "text-[#9333EA]",
    iconBg: "bg-[#FAF5FF]",
    iconColor: "text-[#9333EA]",
    subtitle: "Smart role discovery and high-volume daily applications.",
    items: [
      {
        icon: Sparkles,
        title: "Smart Job Matching",
        description:
          "Targeted filtering across LinkedIn, Naukri, and verified company career portals.",
      },
      {
        icon: Send,
        title: "Daily Applications",
        description:
          "We submit 20-50 verified applications daily directly to company hiring portals.",
      },
    ],
  },
  {
    id: "telemetry",
    category: "Telemetry & Interviews",
    accentColor: "#4F46E5", // Deep indigo matching column 3 in screenshot
    accentBorder: "border-[#4F46E5]",
    textColor: "text-[#4F46E5]",
    iconBg: "bg-[#EEF2FF]",
    iconColor: "text-[#4F46E5]",
    subtitle: "Live application tracking and direct interview callback coordination.",
    items: [
      {
        icon: Activity,
        title: "Track & Monitor",
        description:
          "Real-time WhatsApp notifications and submission logs for complete visibility.",
      },
      {
        icon: CheckCircle2,
        title: "You Take Interviews",
        description:
          "Direct recruiter screening and interview calls sent to you. You focus on preparation.",
      },
    ],
  },
];

export default function HowItWorks() {
  const [headerContent, setHeaderContent] = useState({
    titleLine1: "Structure in how your career is",
    titleLine2: "positioned, applied, and secured.",
    subtitle: "No endless form filling, no resume black holes. Start with any step.",
  });

  // Fetch dynamic section headers from PostgreSQL database
  useEffect(() => {
    fetch("/api/content?section_key=how_it_works")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.section) {
          setHeaderContent((prev) => ({
            ...prev,
            titleLine1: data.section.title || prev.titleLine1,
            subtitle: data.section.subtitle || prev.subtitle,
          }));
        }
      })
      .catch((err) => console.error("Error loading how_it_works from database:", err));
  }, []);

  return (
    <section
      id="how-it-works"
      className="relative px-4 py-8 sm:py-12 bg-[#F7F8FC] border-t border-[#EEF1F6]"
    >
      <div className="container mx-auto max-w-7xl">
        
        {/* Top Header Row matching the Enspirit screenshot */}
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end pb-8 sm:pb-10">
          
          {/* Left: Subtitle & Hybrid Sans + Italic Serif Headline */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-[#6B7280]">
              <span>—</span>
              <span>HOW IT WORKS</span>
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight leading-[1.18]">
              {headerContent.titleLine1} <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#111827]">
                {headerContent.titleLine2}
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#6B7280]">
              {headerContent.subtitle}
            </p>
          </div>

          {/* Right: CTA Pill Button & Sub-link matching Screenshot */}
          <div className="flex flex-col items-start lg:items-end justify-center gap-2 pt-2 sm:pt-0">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[#635BFF] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4F46E5] hover:shadow-md cursor-pointer"
            >
              Find your starting point
            </motion.a>
            <a
              href="#services"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280] hover:text-[#111827] transition"
            >
              <span>All services</span>
              <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </a>
          </div>

        </div>

        {/* Main 3 Columns Grid matching Enspirit screenshot exactly with elevated micro-animations */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {processColumns.map((col, colIdx) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: colIdx * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className={`group flex flex-col justify-between rounded-2xl border border-[#E7E9EE] border-t-2 ${col.accentBorder} bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-[#635BFF]/30`}
            >
              {/* Category Header */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className={`text-base sm:text-lg font-bold ${col.textColor}`}>
                    {col.category}
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#6B7280]">
                    PHASE 0{colIdx + 1}
                  </span>
                </div>

                <p className="mt-1 text-xs text-[#6B7280] leading-relaxed min-h-[34px]">
                  {col.subtitle}
                </p>

                {/* Sub-item Cards inside the column with interactive hover animations */}
                <div className="mt-6 space-y-4">
                  {col.items.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="group/item rounded-xl border border-transparent p-3.5 sm:p-4 transition-all duration-200 hover:border-[#E5E7EB] hover:bg-[#F9FAFB] hover:shadow-xs cursor-pointer"
                      >
                        {/* Title Row with Icon, Title, and Right Arrow */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ scale: 1.15, rotate: 6 }}
                              className={`flex h-8 w-8 items-center justify-center rounded-lg ${col.iconBg} ${col.iconColor} shrink-0 transition-transform duration-200 group-hover/item:scale-110`}
                            >
                              <IconComponent className="h-4 w-4" />
                            </motion.div>
                            <h4 className="text-sm font-bold text-[#111827] group-hover/item:text-[#635BFF] transition leading-snug">
                              {item.title}
                            </h4>
                          </div>

                          <ArrowRight className="h-4 w-4 text-[#9CA3AF] transition-transform duration-200 group-hover/item:translate-x-1.5 group-hover/item:text-[#635BFF] shrink-0" />
                        </div>

                        {/* Description */}
                        <p className="mt-2 text-xs leading-relaxed text-[#6B7280] pl-11">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Subtle Indicator Bar with Animated Radar Beacon */}
              <div className="mt-6 pt-4 border-t border-[#F3F4F6] flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#635BFF] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#635BFF]"></span>
                  </span>
                  <span>STAGE 0{colIdx + 1} // ACTIVE</span>
                </div>
                <span className="text-[#635BFF] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Ready to deploy &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
