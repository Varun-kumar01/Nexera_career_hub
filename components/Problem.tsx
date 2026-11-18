"use client";

import { motion } from "framer-motion";
import { ArrowDown, BriefcaseBusiness, MessageSquareText, Search, Target, Zap } from "lucide-react";

const flow = ["Job Listings", "Applications", "Silence"];
const issuePoints = [
  { icon: Search, title: "Too much noise", text: "You spend hours sorting through roles that are not actually aligned with your career direction." },
  { icon: BriefcaseBusiness, title: "No system", text: "Applications, updates and follow-ups drift without a clear process to keep momentum." },
  { icon: MessageSquareText, title: "No feedback loop", text: "Without consistent tracking, you can miss important recruiter replies or deadlines." },
  { icon: Target, title: "Lost energy", text: "Your time gets consumed by searching rather than preparing for interviews and next steps." },
];

export default function Problem() {
  return (
    <section id="problem" className="px-4 py-6 sm:py-8 bg-white border-y border-[#EEF1F6]">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-block rounded-full bg-[#FEE2E2] border border-[#FECACA] px-3.5 py-1 text-xs font-semibold text-[#DC2626]">
            The Challenge
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#111827] sm:text-4xl">
            Job hunting became a job of its own.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#667085]">
            Why manual job applications lead to burnout, and how Nexera solves it.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          {/* Flow visual */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="flex flex-col items-center gap-2 rounded-[28px] border border-[#E7E9EE] bg-[#FBFBFF] p-6 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] mb-2">
                The Frustrating Manual Loop
              </span>
              {flow.map((step, index) => (
                <div key={step} className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    className={`flex h-14 w-44 items-center justify-center rounded-2xl border text-center text-sm font-bold shadow-xs transition ${
                      index === 0
                        ? "border-[#E7E9EE] bg-white text-[#111827]"
                        : index === 1
                          ? "border-[#FED7AA] bg-[#FFF7ED] text-[#EA580C]"
                          : "border-[#FECACA] bg-[#FEF2F2] text-[#DC2626]"
                    }`}
                  >
                    {step}
                  </motion.div>
                  {index < flow.length - 1 && (
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowDown className="my-1.5 h-4 w-4 text-[#9CA3AF]" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Issue Points Grid */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="text-sm sm:text-base leading-relaxed text-[#475467]"
            >
              Applications pile up, resumes get ignored by automated ATS filters, and the search feels like a second full-time job. The problem is not your effort — it is the lack of a structured, human-managed outreach system.
            </motion.p>

            <div className="grid gap-4 sm:grid-cols-2">
              {issuePoints.map(({ icon: Icon, title, text }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-2xl border border-[#E7E9EE] bg-white p-5 shadow-xs transition hover:border-[#635BFF] hover:shadow-[0_12px_24px_rgba(99,91,255,0.08)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#635BFF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 text-sm font-bold text-[#111827]">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#667085]">{text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] p-4 flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#1E1B4B]"
            >
              <Zap className="h-5 w-5 text-[#635BFF] shrink-0 fill-[#635BFF]" />
              <span>
                Nexera restores your momentum: tailored ATS keywords, daily submissions, and dedicated support so you can focus entirely on interviews.
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
