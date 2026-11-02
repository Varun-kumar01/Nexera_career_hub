"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageSquareText, Sparkles, Target, Users, Workflow } from "lucide-react";

const benefits = [
  { title: "Personalized approach", description: "Your profile is shaped around your goals, background, and timing.", icon: Users },
  { title: "Targeted applications", description: "Opportunities are selected based on fit rather than volume alone.", icon: Target },
  { title: "Professional positioning", description: "Your resume and profile tell the right story to recruiters and hiring teams.", icon: Sparkles },
  { title: "Consistent job search", description: "Your search stays organized, active, and easier to manage over time.", icon: Workflow },
  { title: "Human support", description: "You get guidance and communication from a real career specialist.", icon: MessageSquareText },
  { title: "Clear communication", description: "Application progress, updates, and next steps remain easy to follow.", icon: CheckCircle2 },
];

export default function WhyNexera() {
  return (
    <section id="why-nexera" className="px-4 py-20 sm:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
            Why Nexera
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            More structure. Less guesswork.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-[26px] border border-[#E7E9EE] bg-white p-6 shadow-[0_14px_30px_rgba(17,24,39,0.04)]"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F1F0FF] text-[#635BFF]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-[#111827]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#667085]">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
