"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const withoutNexera = [
  "Random applications",
  "Generic resume",
  "No tracking",
  "Missed follow-ups",
];

const withNexera = [
  "Positioned profile",
  "Relevant opportunities",
  "Organized applications",
  "Human support",
];

export default function Transformation() {
  return (
    <section id="transformation" className="px-4 py-20 sm:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
            Nexera transformation
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            A job search process that feels more intentional, not more chaotic.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30, y: 12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-[32px] border border-[#E7E9EE] bg-white p-6 shadow-[0_18px_45px_rgba(17,24,39,0.04)] sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between border-b border-[#EEF1F6] pb-4">
              <h3 className="text-2xl font-semibold text-[#111827]">Without Nexera</h3>
              <span className="rounded-full bg-[#FEE2E2] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B91C1C]">
                friction
              </span>
            </div>

            <ul className="space-y-4">
              {withoutNexera.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
                  className="flex items-center gap-3 rounded-2xl bg-[#FFF5F5] px-4 py-3 text-base font-medium text-[#4B5563]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FECACA] text-[#B91C1C]">
                    <X className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, y: 12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="rounded-[32px] border border-[#DDE4F0] bg-[#111827] p-6 text-white shadow-[0_18px_45px_rgba(17,24,39,0.12)] sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between border-b border-[#2D374C] pb-4">
              <h3 className="text-2xl font-semibold">With Nexera</h3>
              <span className="rounded-full bg-[#EEF2FF] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4338CA]">
                clarity
              </span>
            </div>

            <ul className="space-y-4">
              {withNexera.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
                  className="flex items-center gap-3 rounded-2xl bg-[#1F2937] px-4 py-3 text-base font-medium text-[#E5E7EB]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E0E7FF] text-[#4338CA]">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
