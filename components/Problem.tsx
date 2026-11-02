"use client";

import { motion } from "framer-motion";
import { ArrowDown, BriefcaseBusiness, MessageSquareText, Search, Target } from "lucide-react";

const flow = ["Job Listings", "Applications", "Silence"];
const issuePoints = [
  { icon: Search, title: "Too much noise", text: "You spend hours sorting through roles that are not actually aligned with your career direction." },
  { icon: BriefcaseBusiness, title: "No system", text: "Applications, updates and follow-ups drift without a clear process to keep momentum." },
  { icon: MessageSquareText, title: "No feedback loop", text: "Without consistent tracking, you can miss important recruiter replies or deadlines." },
  { icon: Target, title: "Lost energy", text: "Your time gets consumed by searching rather than preparing for interviews and next steps." },
];

export default function Problem() {
  return (
    <section id="problem" className="px-4 py-20 sm:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
            The problem
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-5xl">
            Job hunting became a job of its own.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="flex flex-col items-center gap-3 rounded-[32px] border border-[#E7E9EE] bg-white/70 px-6 py-8 shadow-[0_18px_45px_rgba(17,24,39,0.03)]">
              {flow.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`flex h-16 w-40 items-center justify-center rounded-2xl border text-center text-lg font-semibold ${
                      index === 0
                        ? "border-[#E7E9EE] bg-[#F8F9FF] text-[#111827]"
                        : index === 1
                          ? "border-[#DDE4F0] bg-[#EEF2FF] text-[#111827]"
                          : "border-[#F1F0FF] bg-[#F1F0FF] text-[#635BFF]"
                    }`}
                  >
                    {step}
                  </div>
                  {index < flow.length - 1 && (
                    <ArrowDown className="my-1 h-5 w-5 text-[#635BFF]" aria-hidden="true" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-lg leading-8 text-[#475467]"
            >
              Applications pile up, resumes get copied, and the search starts to feel like a second full-time job. The problem is not effort — it is lack of structure, clarity and follow-through.
            </motion.p>

            <div className="grid gap-4 sm:grid-cols-2">
              {issuePoints.map(({ icon: Icon, title, text }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className="rounded-[24px] border border-[#E7E9EE] bg-white/80 p-5 shadow-[0_12px_28px_rgba(17,24,39,0.03)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F1F0FF] text-[#635BFF]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[#111827]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#667085]">{text}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-lg font-medium text-[#111827]"
            >
              Nexera brings the structure back: a sharper profile, better job matching, organized applications and a human team to keep the process moving.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
