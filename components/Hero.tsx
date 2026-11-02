"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, FileText, MessageSquareText, Sparkles } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const journey = [
  { title: "Candidate Profile", note: "Clarify goals and strengths" },
  { title: "Job Match", note: "Find roles that fit" },
  { title: "Application", note: "Track your next steps" },
  { title: "Response", note: "Stay ready for outreach" },
  { title: "Interview", note: "Prepare with confidence" },
];

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-18 pt-16 sm:pb-20 sm:pt-20">
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(circle_at_top_left,_rgba(99,91,255,0.16),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(99,91,255,0.12),_transparent_30%)]" />

      <div className="container grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex rounded-full border border-[#DDE4F0] bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#635BFF]"
          >
            Career management, simplified
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
            className="mt-6 text-4xl font-black tracking-[-0.06em] text-[#111827] sm:text-5xl lg:text-6xl"
          >
            Your next opportunity shouldn&apos;t depend on how many applications you can send.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
            className="mt-6 max-w-xl text-base leading-8 text-[#475467] sm:text-lg"
          >
            Nexera helps students, graduates and professionals build a stronger career profile, discover relevant opportunities and manage their job search with a human team behind them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: "easeOut" }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#635BFF] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_24px_rgba(99,91,255,0.18)] transition hover:bg-[#4F46E5]"
            >
              Start Your Career Journey <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={getWhatsAppUrl("Hi Nexera, I'd like to talk to the team about my career journey.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DDE4F0] bg-white px-5 py-3.5 text-sm font-semibold text-[#111827] transition hover:border-[#C8D1E1]"
            >
              <MessageSquareText className="h-4 w-4" aria-hidden="true" />
              Talk to Nexera
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-3 text-sm text-[#475467]"
          >
            {"Profile strategy, Targeted search, Interview readiness".split(", ").map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="rounded-full border border-[#E7E9EE] bg-white px-3.5 py-2"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <motion.div
            style={{ y: visualY }}
            initial={{ opacity: 0, scale: 0.96, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[30px] border border-[#E7E9EE] bg-white p-5 shadow-[0_30px_50px_rgba(17,24,39,0.08)] sm:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,91,255,0.12),_transparent_45%)]" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#667085]">
                    Career journey
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-[#111827]">Search flow</h2>
                </div>
                <div className="rounded-full bg-[#EEF2FF] px-3 py-1.5 text-xs font-semibold text-[#4338CA]">
                  Guided
                </div>
              </div>

              <div className="relative space-y-3">
                <div className="absolute left-[1.4rem] top-3 bottom-3 w-px bg-gradient-to-b from-[#635BFF] via-[#C7D2FE] to-[#E7E9EE]" />

                {journey.map((step, index) => {
                  const icons = [FileText, Sparkles, BriefcaseBusiness, MessageSquareText, ArrowRight];
                  const Icon = icons[index];

                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.18 + index * 0.08, ease: "easeOut" }}
                      className="relative flex items-center gap-4"
                    >
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3.5 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E7E9EE] bg-white text-[#635BFF] shadow-sm"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </motion.div>

                      <div className="flex-1 rounded-2xl border border-[#E7E9EE] bg-[#F8F9FF] px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#667085]">
                          {index + 1}
                        </p>
                        <h3 className="mt-1 text-base font-semibold text-[#111827]">{step.title}</h3>
                        <p className="mt-1 text-sm text-[#667085]">{step.note}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -12, y: 8 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -left-4 top-12 rounded-2xl border border-[#E7E9EE] bg-white px-3 py-2 shadow-[0_16px_30px_rgba(17,24,39,0.06)]"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#667085]">Current focus</p>
            <p className="mt-2 text-sm font-semibold text-[#111827]">Targeted roles</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12, y: 8 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute -right-3 bottom-10 rounded-2xl border border-[#E7E9EE] bg-white px-3 py-2 shadow-[0_16px_30px_rgba(17,24,39,0.06)]"
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-[#111827]">
              <Sparkles className="h-4 w-4 text-[#635BFF]" aria-hidden="true" />
              Human support
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}