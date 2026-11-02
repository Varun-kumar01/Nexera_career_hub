"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const audiences = [
  {
    label: "Fresh Graduate",
    description:
      "You need a sharper profile, stronger direction and a process that helps you move from campus to career with confidence.",
  },
  {
    label: "Working Professional",
    description:
      "You are looking for relevant opportunities, better positioning and a more efficient search without losing focus on your current role.",
  },
  {
    label: "Career Switcher",
    description:
      "You want clearer storytelling, better role alignment and support mapping your experience to a new direction.",
  },
  {
    label: "Student",
    description:
      "You are building your early career foundations and need structure, profile support and more informed application decisions.",
  },
  {
    label: "International Job Seeker",
    description:
      "You need role guidance, relocation-aware strategy and a process that keeps your search organized as you target new markets.",
  },
];

export default function Audience() {
  const [selected, setSelected] = useState(audiences[0].label);
  const activeAudience = audiences.find((item) => item.label === selected) ?? audiences[0];

  return (
    <section id="who-nexera-is-for" className="px-4 py-20 sm:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
            Who Nexera is for
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Support for people navigating the job market at different stages.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {audiences.map((item) => (
              <motion.button
                key={item.label}
                type="button"
                onClick={() => setSelected(item.label)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.99 }}
                className={`rounded-[22px] border px-4 py-4 text-left transition ${
                  selected === item.label
                    ? "border-[#635BFF] bg-[#F1F0FF] text-[#111827] shadow-[0_12px_28px_rgba(99,91,255,0.12)]"
                    : "border-[#E7E9EE] bg-white text-[#111827] hover:border-[#D9DFEA]"
                }`}
              >
                <span className="text-base font-semibold">{item.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="rounded-[28px] border border-[#E7E9EE] bg-white p-6 shadow-[0_18px_45px_rgba(17,24,39,0.04)] sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAudience.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
                  {activeAudience.label}
                </p>
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
                  A search built around where you are now.
                </h3>
                <p className="mt-5 text-lg leading-8 text-[#475467]">{activeAudience.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
