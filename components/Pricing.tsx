"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const plans = [
  {
    name: "Career Profile",
    price: "Custom quote",
    description: "For candidates who need a sharper profile, focus, and a clearer search strategy.",
    features: [
      "Resume optimization",
      "ATS-aligned profile positioning",
      "LinkedIn and career profile support",
    ],
  },
  {
    name: "Job Search Support",
    price: "Custom quote",
    description: "For people who want better targeting and more structured application support.",
    features: [
      "Job matching guidance",
      "Targeted discovery support",
      "Application assistance",
    ],
  },
  {
    name: "Full Career Management",
    price: "Custom quote",
    description: "For candidates who want hands-on support across applications, tracking, and interview readiness.",
    features: [
      "Application tracking and follow-up",
      "Interview preparation support",
      "Ongoing career guidance",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-4 py-20 sm:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
            Pricing
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Choose the support that matches your job search stage.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`rounded-[28px] border p-6 shadow-[0_12px_30px_rgba(17,24,39,0.05)] ${
                index === 1
                  ? "border-[#635BFF] bg-[#111827] text-white"
                  : "border-[#E7E9EE] bg-white text-[#111827]"
              }`}
            >
              <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${index === 1 ? "text-[#B7B2FF]" : "text-[#635BFF]"}`}>
                {plan.name}
              </p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
              </div>
              <p className={`mt-4 text-sm leading-6 ${index === 1 ? "text-[#D7DBE6]" : "text-[#667085]"}`}>
                {plan.description}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-6">
                    <span className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full ${index === 1 ? "bg-[#262E46] text-[#D8D6FF]" : "bg-[#F1F0FF] text-[#635BFF]"}`}>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className={index === 1 ? "text-[#EDF2FF]" : "text-[#111827]"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={getWhatsAppUrl("Hi Nexera, I'd like to know more about your career services.")}
                target="_blank"
                rel="noreferrer"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition-colors ${
                  index === 1
                    ? "bg-white text-[#111827] hover:bg-[#F1F0FF]"
                    : "bg-[#635BFF] text-white hover:bg-[#4F46E5]"
                }`}
              >
                Talk to Nexera
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}