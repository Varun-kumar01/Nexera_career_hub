"use client";

import { motion } from "framer-motion";

const steps = [
  "You share your goals, preferences, and timeline to shape the search around your direction.",
  "Your profile is reviewed and positioned for your target roles and industries.",
  "We support targeted applications with a structured, organized process.",
  "You stay focused on interview preparation while the search stays managed.",
];

export default function About() {
  return (
    <section id="about" className="px-4 py-20 sm:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
            About Nexera
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Clear guidance for a focused job search.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="rounded-[26px] border border-[#E7E9EE] bg-white p-6 shadow-[0_14px_30px_rgba(17,24,39,0.04)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F0FF] text-sm font-semibold text-[#635BFF]">
                0{index + 1}
              </div>
              <p className="text-sm leading-7 text-[#475467]">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
