"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const defaultPlans = [
  {
    tag: "TIER_01",
    name: "Career Profile",
    subtitle: "Resume optimization & expert feedback",
    price: "₹999",
    period: "/ month",
    features: [
      "ATS-compliant resume revamp",
      "Domain-specific keywords",
      "LinkedIn profile audit",
      "Career direction guidance",
    ],
    isPopular: false,
    cta: "Get Started",
    whatsappMsg: "Hi Nexera, I'd like to get started with the Career Profile plan (₹999).",
  },
  {
    tag: "TIER_02 // RECOMMENDED",
    name: "Job Search Support",
    subtitle: "Let us find the right opportunities for you.",
    price: "₹1,999",
    period: "/ month",
    features: [
      "Daily verified applications (20-50/day)",
      "Role-specific resume customization",
      "Portal & recruiter application tracking",
      "Continuous follow-up management",
      "Interview prep questions & coaching",
    ],
    isPopular: true,
    cta: "Start Application Support",
    whatsappMsg: "Hi Nexera, I'd like to get started with the Job Search Support plan (₹1,999).",
  },
  {
    tag: "TIER_03",
    name: "Full Career Management",
    subtitle: "Complete support from start to success.",
    price: "₹2,999",
    period: "/ month",
    features: [
      "All services in Job Search Support",
      "Dedicated personal career advisor",
      "Mock technical & HR interview rounds",
      "Priority WhatsApp callback assistance",
      "Salary negotiation guidance",
    ],
    isPopular: false,
    cta: "Get Full Support",
    whatsappMsg: "Hi Nexera, I'd like to get started with the Full Career Management plan (₹2,999).",
  },
];

export default function Pricing() {
  const [plansList, setPlansList] = useState(defaultPlans);

  // Fetch live pricing plans from PostgreSQL database
  useEffect(() => {
    fetch("/api/pricing")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.pricing) && data.pricing.length > 0) {
          const defaultTags = ["TIER_01", "TIER_02 // RECOMMENDED", "TIER_03"];

          const mapped = data.pricing.map((item: any, idx: number) => {
            let parsedFeatures: string[] = [];
            if (item.features) {
              try {
                const parsed = typeof item.features === "string" ? JSON.parse(item.features) : item.features;
                if (Array.isArray(parsed)) parsedFeatures = parsed;
                else if (typeof parsed === "string") parsedFeatures = parsed.split("\n").filter(Boolean);
              } catch {
                if (typeof item.features === "string") {
                  parsedFeatures = item.features.split("\n").filter(Boolean);
                }
              }
            }

            return {
              tag: defaultTags[idx % defaultTags.length],
              name: item.name,
              subtitle: item.description || "Tailored job search package",
              price: item.price?.startsWith("₹") || item.price?.toLowerCase().includes("quote") ? item.price : `₹${item.price}`,
              period: item.price?.toLowerCase().includes("quote") ? "" : "/ month",
              features: parsedFeatures.length > 0 ? parsedFeatures : defaultPlans[idx % defaultPlans.length].features,
              isPopular: Boolean(item.is_featured),
              cta: item.button_text || "Get Started",
              whatsappMsg: item.whatsapp_message || `Hi Nexera, I'd like to get started with the ${item.name} plan.`,
            };
          });

          setPlansList(mapped);
        }
      })
      .catch((err) => console.error("Error loading pricing plans from database:", err));
  }, []);
  return (
    <section id="pricing" className="px-4 py-6 sm:py-8 bg-white border-t border-[#EEF1F6]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
          
          {/* Left Column: Heading */}
          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] px-3.5 py-1 text-xs font-mono font-bold text-[#635BFF]"
            >
              <Zap className="h-3 w-3 fill-[#635BFF] text-[#635BFF]" />
              <span>ENGAGEMENT PROTOCOLS</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-[#111827] leading-tight"
            >
              Choose the Plan That Fits You
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              className="mt-3 text-sm sm:text-base text-[#4B5563] leading-relaxed"
            >
              Transparent, flexible packages for every career stage. No hidden fees. Cancel anytime.
            </motion.p>

            <div className="mt-6 flex flex-col gap-2.5 text-xs font-mono text-[#6B7280]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#635BFF]" />
                <span>100% human-managed verified applications</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#635BFF]" />
                <span>Tailored for Indian tech, finance & analytics roles</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Pricing Cards with Rich Spring Animations */}
          <div className="grid gap-5 grid-cols-1 md:grid-cols-3 items-stretch">
            {plansList.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.09 }}
                whileHover={{ y: -8, transition: { duration: 0.22, ease: "easeOut" } }}
                className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 ${
                  plan.isPopular
                    ? "border-2 border-[#635BFF] bg-white shadow-[0_22px_50px_rgba(99,91,255,0.2)] ring-4 ring-[#635BFF]/10"
                    : "border border-[#E7E9EE] bg-[#FBFBFF] shadow-xs hover:border-[#635BFF]/50 hover:bg-white hover:shadow-md"
                }`}
              >
                {/* Most Popular Pill with Soft Pulse */}
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#635BFF] to-[#818CF8] px-4 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-white shadow-md animate-pulse">
                    ★ Most Popular
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono font-bold text-[#635BFF]">
                    {plan.tag}
                  </span>
                  <h3 className="text-lg font-black text-[#111827] mt-1">{plan.name}</h3>
                  <p className="mt-1 text-xs text-[#667085] min-h-[32px]">{plan.subtitle}</p>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-[#111827] tracking-tight">{plan.price}</span>
                    <span className="text-xs text-[#667085] font-medium">{plan.period}</span>
                  </div>

                  <ul className="mt-6 space-y-2.5 border-t border-[#F1F3F7] pt-5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs text-[#374151]">
                        <Check className="h-4 w-4 text-[#635BFF] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-2">
                  <motion.a
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 24px rgba(99,91,255,0.25)" }}
                    whileTap={{ scale: 0.97 }}
                    href={getWhatsAppUrl(plan.whatsappMsg)}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-center rounded-2xl py-3.5 text-center text-xs font-bold transition shadow-xs cursor-pointer ${
                      plan.isPopular
                        ? "bg-[#635BFF] text-white hover:bg-[#4F46E5]"
                        : "bg-white border border-[#DDE4F0] text-[#111827] hover:border-[#635BFF] hover:bg-[#F5F3FF]"
                    }`}
                  >
                    {plan.cta} &rarr;
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
