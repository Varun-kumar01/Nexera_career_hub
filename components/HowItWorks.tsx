"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Understand You",
    description: "We begin by understanding your goals, background, preferences and where you want to grow.",
  },
  {
    number: "02",
    title: "Position You",
    description: "Your profile is sharpened to make your strengths clear and recruiter-ready.",
  },
  {
    number: "03",
    title: "Find Opportunities",
    description: "We focus on relevant roles instead of sending random applications across the market.",
  },
  {
    number: "04",
    title: "Manage Applications",
    description: "The follow-up, tracking and next steps stay organized so nothing slips through the cracks.",
  },
  {
    number: "05",
    title: "Prepare You",
    description: "You stay focused on interviews and decisions with a clearer, calmer process behind you.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
            How Nexera works
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            A more focused job search, step by step.
          </h2>
        </motion.div>

        <div className="relative mt-12">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute left-0 right-0 top-9 hidden h-px origin-left bg-gradient-to-r from-[#E7E9EE] via-[#635BFF] to-[#E7E9EE] lg:block"
          />

          <div className="grid gap-5 lg:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className={`relative rounded-[28px] border p-5 shadow-[0_14px_30px_rgba(17,24,39,0.04)] transition ${
                  index === 0
                    ? "border-[#635BFF] bg-[#F1F0FF]"
                    : "border-[#E7E9EE] bg-white"
                }`}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#635BFF] shadow-sm">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-[#111827]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#667085]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}