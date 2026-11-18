"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Play, Sparkles, Zap } from "lucide-react";

const liveEvents = [
  {
    role: "Software Engineer",
    company: "Tier-1 Tech Services",
    ats: "ATS 98% Match",
    status: "APPLICATION SUBMITTED",
  },
  {
    role: "Data Analyst",
    company: "Global Analytics Corp",
    ats: "ATS 96% Match",
    status: "PROFILE TAILORED",
  },
  {
    role: "Cloud Associate",
    company: "FinTech Infrastructure",
    ats: "ATS 97% Match",
    status: "INTERVIEW INVITE 🚀",
  },
];

export default function Hero() {
  const [eventIndex, setEventIndex] = useState(0);
  const [heroContent, setHeroContent] = useState({
    titleLine1: "We apply.",
    titleLine2: "You interview.",
    subtitle: "Leave the 'Apply' button to us.",
    description:
      "Nexera Career Hub handles your job applications, so you can focus on preparing for interviews and building your career.",
  });

  // Fetch dynamic hero content from database if configured
  useEffect(() => {
    fetch("/api/content?section_key=hero")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.section) {
          const rawTitle = data.section.title;
          let l1 = "We apply.";
          let l2 = "You interview.";
          if (rawTitle && rawTitle.includes(".")) {
            const parts = rawTitle.split(".");
            l1 = parts[0] + ".";
            l2 = parts.slice(1).join(".").trim();
          } else if (rawTitle) {
            l1 = rawTitle;
            l2 = "";
          }

          setHeroContent((prev) => ({
            titleLine1: l1 || prev.titleLine1,
            titleLine2: l2 || prev.titleLine2,
            subtitle: data.section.subtitle || prev.subtitle,
            description: data.section.content || prev.description,
          }));
        }
      })
      .catch((err) => console.error("Error loading hero content from database:", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setEventIndex((prev) => (prev + 1) % liveEvents.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const currentEvent = liveEvents[eventIndex];

  return (
    <section id="home" className="relative overflow-hidden px-4 pt-5 pb-6 sm:pt-6 sm:pb-8 bg-[#F7F8FC] enspirit-light-grid">
      {/* Precision ambient background glow with grid mask */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(circle_at_top_left,_rgba(99,91,255,0.14),_transparent_50%),radial-gradient(circle_at_top_right,_rgba(147,197,253,0.16),_transparent_45%)]" />

      {/* Subtle floating glow orb */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-10 left-1/3 h-52 w-52 rounded-full bg-indigo-400/10 blur-3xl -z-10"
      />

      <div className="container mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          
          {/* Left Column: Core Value Proposition */}
          <div className="max-w-xl">
            
            {/* Monospace Enspirit System Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#DDE4F0] bg-white/90 px-3.5 py-1.5 text-xs font-mono text-[#4B5563] shadow-xs backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="font-bold text-[#635BFF]">● PIPELINE ACTIVE</span>
              <span className="text-[#9CA3AF]">•</span>
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280]">CAREER OPERATIONS OS</span>
            </motion.div>

            {/* Massive Bold Headline with Stagger & Gradient Beam */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#1E1B4B]"
            >
              {heroContent.titleLine1}<br />
              <motion.span
                className="relative inline-block text-[#635BFF]"
                whileHover={{ scale: 1.02 }}
              >
                {heroContent.titleLine2}
                {/* Enspirit technical underline highlight */}
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="absolute bottom-1 left-0 h-1.5 bg-gradient-to-r from-[#635BFF]/30 to-[#818CF8]/60 rounded-full -z-10"
                />
              </motion.span>
            </motion.h1>

            {/* Highlighted Sub-headline: Leave the 'Apply' button to us */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-4"
            >
              <div className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#EEF2FF] via-[#F5F3FF] to-[#EEF2FF] border-2 border-[#C7D2FE] px-4 py-2.5 shadow-sm">
                <Sparkles className="h-5 w-5 text-[#635BFF] shrink-0" />
                <h2 className="text-xl sm:text-2xl font-black text-[#1E1B4B] tracking-tight">
                  {heroContent.subtitle}
                </h2>
              </div>
            </motion.div>

            {/* Paragraph Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="mt-4 text-base sm:text-lg leading-relaxed text-[#4B5563]"
            >
              {heroContent.description}
            </motion.p>

            {/* CTAs with Enspirit Hover Spring & Glow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-7 flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.03, boxShadow: "0 16px 32px rgba(99,91,255,0.32)" }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#635BFF] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(99,91,255,0.25)] transition hover:bg-[#4F46E5]"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03, backgroundColor: "#ffffff" }}
                whileTap={{ scale: 0.97 }}
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DDE4F0] bg-white/90 px-5 py-3.5 text-sm font-semibold text-[#111827] shadow-xs transition hover:border-[#635BFF]/50"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF2FF] text-[#635BFF]">
                  <Play className="h-2.5 w-2.5 fill-[#635BFF]" />
                </div>
                Learn How It Works
              </motion.a>
            </motion.div>

            {/* Social Proof + Telemetry Tag */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="flex -space-x-2.5">
                <img
                  src="/images/ananya-reddy.jpg"
                  alt="Student"
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                />
                <img
                  src="/images/rahul-sharma.jpg"
                  alt="Student"
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                />
                <img
                  src="/images/sneha-patel.jpg"
                  alt="Student"
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-xs"
                />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#4B5563]">
                Trusted by <span className="text-[#111827] font-bold">3000+</span> Students across India
              </p>
            </motion.div>
          </div>

          {/* Right Column: Authentic Indian Student Visual with Enspirit Telemetry HUD */}
          <div className="relative mx-auto w-full max-w-[520px]">
            {/* Ambient Breathing Glow behind student */}
            <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-[#635BFF]/20 via-[#A855F7]/15 to-[#38BDF8]/20 blur-2xl animate-pulse-glow -z-10" />

            {/* Visual Container with Levitating Float Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="relative overflow-hidden rounded-[32px] border border-white/90 bg-white p-2.5 shadow-[0_24px_55px_rgba(99,91,255,0.16)] transition animate-float"
            >
              <img
                src="/images/hero-student.jpg"
                alt="Ambitious Indian graduate smiling at desk with applications handled"
                className="h-auto w-full rounded-[26px] object-cover transition-transform duration-700 hover:scale-[1.02]"
              />

              {/* Bottom Live Telemetry Stream Ticker with Animated Beacon */}
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-lg backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-[#F1F3F7] pb-2 mb-2 text-[10px] font-mono text-[#6B7280]">
                  <span className="flex items-center gap-1.5 font-bold text-[#111827]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    LIVE OUTREACH STREAM
                  </span>
                  <span className="text-[#635BFF] font-semibold">{currentEvent.ats}</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentEvent.role}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#111827]">{currentEvent.role}</p>
                      <p className="text-[11px] text-[#6B7280]">{currentEvent.company}</p>
                    </div>
                    <span className="rounded-md bg-[#EEF2FF] border border-[#E0E7FF] px-2 py-0.5 text-[10px] font-mono font-bold text-[#635BFF] animate-pulse">
                      {currentEvent.status}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Floating Top Right Pill Badge (Applications Handled) with Counter-Float */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -right-2 top-4 sm:-right-4 sm:top-6 z-20 flex items-center gap-2.5 rounded-2xl border border-[#E0E7FF] bg-white/95 px-3.5 py-2.5 shadow-[0_14px_30px_rgba(17,24,39,0.1)] backdrop-blur-md animate-float-delayed"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ECFDF5] text-[#059669]">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="pr-1 text-left">
                <p className="text-[11px] font-bold text-[#111827]">Applications</p>
                <p className="text-[10px] font-semibold text-[#059669]">Handled for You</p>
              </div>
            </motion.div>

            {/* Handwritten Style Annotation: Your Career, Our Priority */}
            <div className="absolute -right-4 -bottom-6 hidden sm:flex flex-col items-end z-20 animate-float">
              <div className="rounded-xl bg-[#F5F3FF] border border-[#DDD6FE] px-3.5 py-1.5 shadow-sm transform rotate-[-3deg] hover:rotate-0 transition duration-300">
                <span className="font-serif italic font-bold text-xs text-[#635BFF] tracking-wide flex items-center gap-1.5">
                  Your Career, Our Priority
                  <Sparkles className="h-3 w-3 text-[#635BFF] inline animate-spin" style={{ animationDuration: "6s" }} />
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
