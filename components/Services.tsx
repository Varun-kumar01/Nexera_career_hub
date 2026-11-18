"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  Compass,
  FileCheck2,
  Handshake,
  Mail,
  Send,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

interface ServiceItem {
  step: string;
  tag: string;
  title: string;
  description: string;
  features?: string[];
  icon: any;
}

const defaultServices: ServiceItem[] = [
  {
    step: "01",
    tag: "OUTREACH_ENGINE",
    title: "Daily Application Pipeline",
    description:
      "Systematic daily outreach to 20–50 verified roles aligned with your domain, skills, and target locations.",
    features: [
      "20–50 verified submissions daily",
      "Direct portal & recruiter outreach",
      "Real-time submission telemetry",
    ],
    icon: Send,
  },
  {
    step: "02",
    tag: "RESUME_ENGINE",
    title: "ATS Keyword Engineering",
    description:
      "Algorithmically tailored resumes optimized for applicant tracking systems to ensure 90%+ pass-through rates.",
    features: [
      "Role-specific ATS keyword injection",
      "Clean single-column parsing layout",
      "Recruiter-ready technical positioning",
    ],
    icon: FileCheck2,
  },
  {
    step: "03",
    tag: "CAREER_OS",
    title: "Full Career Management OS",
    description:
      "End-to-end governance of your entire job search workflow — applications, tracking, and interview momentum.",
    features: [
      "Structured application pipeline",
      "WhatsApp status broadcasts",
      "Interview prep questions & coaching",
    ],
    icon: Zap,
  },
  {
    step: "04",
    tag: "TELEMETRY",
    title: "Recruiter Email & Response Tracking",
    description:
      "Continuous monitoring of application portals, emails, and recruiter inquiries to ensure zero missed callbacks.",
    features: [
      "Instant callback notifications",
      "Portal follow-up cadence",
      "Screening round scheduling assistance",
    ],
    icon: BarChart3,
  },
  {
    step: "05",
    tag: "ROLE_CUSTOM",
    title: "Job Description Customization",
    description:
      "Every application is individually matched and tuned to the specific employer's hiring requirements.",
    features: [
      "Tailored project highlight bullet points",
      "Custom cover letter generation",
      "Domain alignment per vacancy",
    ],
    icon: Target,
  },
  {
    step: "06",
    tag: "TARGETING",
    title: "Domain & Location Targeting",
    description:
      "Precision targeting across engineering, data, product, analytics, finance, and operations in your preferred cities.",
    features: [
      "Bengaluru, Hyderabad, Pune, Gurugram & remote",
      "Fresh graduate & early career specialization",
      "Salary expectation calibration",
    ],
    icon: Compass,
  },
];

const iconMap = [Send, FileCheck2, Zap, BarChart3, Target, Compass, Handshake, Mail, Sparkles];

export default function Services() {
  const [servicesList, setServicesList] = useState<ServiceItem[]>(defaultServices);

  // Fetch live services from PostgreSQL Database
  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.services) && data.services.length > 0) {
          const defaultTags = [
            "OUTREACH_ENGINE",
            "RESUME_ENGINE",
            "CAREER_OS",
            "TELEMETRY",
            "ROLE_CUSTOM",
            "TARGETING",
          ];

          const mapped: ServiceItem[] = data.services.map((item: any, idx: number) => {
            let parsedFeatures: string[] = [];
            if (item.features) {
              try {
                const parsed =
                  typeof item.features === "string" ? JSON.parse(item.features) : item.features;
                if (Array.isArray(parsed)) parsedFeatures = parsed;
                else if (typeof parsed === "string") {
                  parsedFeatures = parsed.split("\n").map((s: string) => s.trim()).filter(Boolean);
                }
              } catch {
                if (typeof item.features === "string") {
                  parsedFeatures = item.features.split("\n").map((s: string) => s.trim()).filter(Boolean);
                }
              }
            }

            return {
              step: idx < 9 ? `0${idx + 1}` : `${idx + 1}`,
              tag: defaultTags[idx % defaultTags.length],
              title: item.title,
              description: item.description,
              features:
                parsedFeatures.length > 0
                  ? parsedFeatures
                  : defaultServices[idx % defaultServices.length]?.features || [],
              icon: iconMap[idx % iconMap.length],
            };
          });

          setServicesList(mapped);
        }
      })
      .catch((err) => console.error("Error loading services from database:", err));
  }, []);

  return (
    <section id="services" className="relative px-4 py-8 sm:py-14 bg-white border-y border-[#EEF1F6]">
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-8 sm:pb-12 border-b border-[#E7E9EE]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-[#6B7280]">
              <span>—</span>
              <span>WHAT WE HANDLE FOR YOU</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827]">
              End-to-End Career Services.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6B7280]">
              A complete job application infrastructure, engineered for today&apos;s ambitious graduates.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="shrink-0"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#EEF2FF] border border-[#DDD6FE] px-5 py-2.5 text-xs font-bold text-[#635BFF] transition hover:bg-[#635BFF] hover:text-white"
            >
              <span>Explore Custom Plans</span>
              <span>&rarr;</span>
            </a>
          </motion.div>
        </div>

        {/* Perfectly Balanced 3-Column Grid (3 columns x 2 rows = 6 cards) */}
        <div className="mt-8 sm:mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative flex flex-col justify-between rounded-3xl border border-[#E7E9EE] bg-white p-6 sm:p-7 shadow-xs transition-all duration-300 hover:border-[#635BFF]/50 hover:shadow-xl hover:shadow-[#635BFF]/8 overflow-hidden"
              >
                {/* Top Subtle Shimmer Accent Line on Hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#635BFF] via-[#818CF8] to-[#38BDF8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Top Row: Icon Container on Left, Step Pill on Right */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] text-[#635BFF] shadow-xs transition-all duration-300 group-hover:bg-[#635BFF] group-hover:text-white group-hover:scale-110">
                      <Icon className="h-6 w-6 transition-transform duration-300" />
                    </div>

                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280] group-hover:bg-[#EEF2FF] group-hover:text-[#635BFF] transition duration-200">
                      {service.step}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-5 text-lg font-bold text-[#111827] group-hover:text-[#635BFF] transition duration-200 leading-snug">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Feature Checklist */}
                  {service.features && service.features.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-[#F3F4F6] space-y-2">
                      {service.features.slice(0, 3).map((feat, featIdx) => (
                        <div key={featIdx} className="flex items-start gap-2.5 text-xs text-[#6B7280]">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#635BFF] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Row: Telemetry Tag on Left, Action Link on Right */}
                <div className="mt-6 pt-4 border-t border-[#F3F4F6] flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-[#9CA3AF]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 group-hover:animate-ping" />
                    <span>{service.tag}</span>
                  </div>

                  <a
                    href="#contact"
                    className="text-xs font-semibold text-[#635BFF] flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Get Started</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
