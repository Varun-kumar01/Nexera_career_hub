"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquareText } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function CTA() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative px-4 py-20 sm:py-24"
    >
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,91,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),transparent_32%)]"
      />

      <div className="container relative">
        <div className="rounded-[32px] bg-[#111827] px-5 py-8 shadow-[0_18px_50px_rgba(17,24,39,0.1)] sm:px-8 lg:px-10 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#C9D2FF]">
                Final CTA
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Your next opportunity starts with a better job search.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#D5DBE8]">
                Tell us where you want to go. We&apos;ll help you build the path to get there.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#635BFF] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#4F46E5]"
                >
                  Start Your Career Journey <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={getWhatsAppUrl("Hi Nexera, I'd like to talk to a career specialist on WhatsApp.")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2B3654] bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:border-[#44507A]"
                >
                  <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                  Talk to Nexera on WhatsApp
                </motion.a>
              </div>
            </motion.div>

            <LeadForm />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
