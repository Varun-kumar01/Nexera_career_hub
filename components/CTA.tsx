"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MessageCircle, Rocket, Sparkles } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function CTA() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="contact" className="px-4 py-6 sm:py-8 bg-[#F7F8FC]">
      <div className="container mx-auto max-w-7xl">
        
        {/* Animated Purple Gradient Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[32px] border border-[#DDD6FE] bg-gradient-to-r from-[#F5F3FF] via-[#EEF2FF] to-[#FAF5FF] p-7 sm:p-10 shadow-sm"
        >
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#635BFF]/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-[#818CF8]/15 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            
            {/* Left: Floating Rocket Icon + Engaging Copy */}
            <div className="flex items-center gap-4 sm:gap-5">
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#635BFF] text-white shadow-lg shadow-[#635BFF]/30 shrink-0"
              >
                <Rocket className="h-7 w-7 sm:h-8 sm:w-8" />
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#635BFF]">
                    Next Steps
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[#635BFF]" />
                  <span className="text-[11px] font-medium text-[#059669]">24h Fast Onboarding</span>
                </div>
                <h3 className="mt-1 text-2xl sm:text-3xl font-black text-[#1E1B4B] tracking-tight">
                  Ready to take the next step?
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#4B5563]">
                  Let Nexera guide you towards a brighter career. We take over the application stress.
                </p>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 14px 28px rgba(99,91,255,0.35)" }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setShowForm((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#635BFF] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(99,91,255,0.28)] transition hover:bg-[#4F46E5] cursor-pointer"
              >
                {showForm ? "Hide Form" : "Start Your Journey"} <ArrowRight className="h-4 w-4" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={getWhatsAppUrl("Hi Nexera, I'd like to talk directly about the application service.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DDE4F0] bg-white px-5 py-3.5 text-sm font-semibold text-[#111827] shadow-xs transition hover:border-[#635BFF]"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                WhatsApp Us
              </motion.a>
            </div>

          </div>

          {/* Expandable Lead Application Form */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-8 border-t border-[#DDD6FE] pt-7"
            >
              <div className="mx-auto max-w-xl">
                <LeadForm />
              </div>
            </motion.div>
          )}

        </motion.div>

      </div>
    </section>
  );
}
