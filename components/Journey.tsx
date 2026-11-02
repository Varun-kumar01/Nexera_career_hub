"use client";

import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, FileCheck2, MessageSquareText, Sparkles } from "lucide-react";

const steps = [
  { label: "Profile", detail: "Clarify your goals and story", icon: FileCheck2 },
  { label: "Match", detail: "Align your profile with relevant roles", icon: Sparkles },
  { label: "Apply", detail: "Send thoughtful, targeted applications", icon: BriefcaseBusiness },
  { label: "Response", detail: "Track replies and follow-ups", icon: MessageSquareText },
  { label: "Interview", detail: "Prepare for the next step with confidence", icon: ArrowRight },
];

export default function Journey() {
  return (
    <section id="journey" className="px-4 py-20 sm:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
            Career journey
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Profile → Match → Apply → Response → Interview
          </h2>
        </motion.div>

        <div className="relative mt-12 overflow-hidden rounded-[32px] border border-[#E7E9EE] bg-white p-6 shadow-[0_18px_50px_rgba(17,24,39,0.05)] sm:p-8 lg:p-10">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute left-8 right-8 top-1/2 hidden h-px -translate-y-1/2 origin-left bg-gradient-to-r from-[#E7E9EE] via-[#635BFF] to-[#E7E9EE] lg:block"
          />

          <div className="relative grid gap-5 lg:grid-cols-5">
            {steps.map(({ label, detail, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                className="relative"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.2 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F0FF] text-[#635BFF] shadow-sm"
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </motion.div>

                <div className="rounded-[24px] border border-[#E7E9EE] bg-[#F8F9FF] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#667085]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-[#111827]">{label}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#667085]">{detail}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute -right-3 top-8 hidden text-[#635BFF] lg:block">
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
