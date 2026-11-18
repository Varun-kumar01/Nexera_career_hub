"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, motion } from "framer-motion";
import { Briefcase, CheckCircle2, Star, TrendingUp, Users } from "lucide-react";

function Counter({ target, start, suffix = "+" }: { target: number; start: boolean; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const duration = 1400;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [target, start]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const defaultStats = [
    {
      target: 3000,
      suffix: "+",
      label: "Students Supported",
      tag: "PAN-INDIA",
      icon: Users,
    },
    {
      target: 150,
      suffix: "+",
      label: "Interviews Landed",
      tag: "TIER-1 RECRUITERS",
      icon: Briefcase,
    },
    {
      target: 80,
      suffix: "+",
      label: "Graduates Supported",
      tag: "FULL PLACEMENT",
      icon: Star,
    },
    {
      target: 94,
      suffix: "%+",
      label: "Response Consistency",
      tag: "ATS YIELD RATE",
      icon: TrendingUp,
    },
  ];

  const [statsList, setStatsList] = useState(defaultStats);

  // Fetch dynamic metrics from database if updated
  useEffect(() => {
    fetch("/api/content?section_key=trust")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.section?.content) {
          try {
            const parsed = JSON.parse(data.section.content);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const icons = [Users, Briefcase, Star, TrendingUp];
              const mapped = parsed.map((item: any, idx: number) => ({
                target: item.target || 100,
                suffix: item.suffix || "+",
                label: item.label || "Students",
                tag: item.tag || "VERIFIED",
                icon: icons[idx % icons.length],
              }));
              setStatsList(mapped);
            }
          } catch {}
        }
      })
      .catch((err) => console.error("Error loading trust stats from database:", err));
  }, []);

  return (
    <section id="trust" ref={ref} className="px-4 py-6 sm:py-8 bg-white">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[30px] border border-[#DDD6FE] bg-gradient-to-r from-[#F5F3FF] via-[#EEF2FF] to-[#FAF5FF] p-6 sm:p-9 shadow-sm"
        >
          {/* Enspirit subtle background ambient radial */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#635BFF]/10 blur-3xl" />

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            
            {/* Left side: Heading + Enspirit Telemetry Tag + 4 Animated Counters */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#635BFF]">
                  SYSTEM METRICS // VERIFIED STUDENT OUTCOMES
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1E1B4B]">
                Our Impact in Numbers
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-[#4B5563]">
                Measurable results delivered for students and graduates across leading tech hubs.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {statsList.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.03 }}
                      className="flex flex-col rounded-2xl bg-white/80 p-3.5 border border-white shadow-xs backdrop-blur-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#635BFF] shadow-xs">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-[9px] font-mono text-[#9CA3AF]">{stat.tag}</span>
                      </div>
                      <p className="mt-3 text-2xl sm:text-3xl font-mono font-black text-[#111827] tracking-tight">
                        <Counter target={stat.target} start={isInView} suffix={stat.suffix} />
                      </p>
                      <p className="mt-0.5 text-xs font-bold text-[#1E1B4B]">
                        {stat.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right side: Photo of Indian Students Collaborating with verified overlay */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-2xl border-2 border-white shadow-lg group"
            >
              <img
                src="/images/students-group.jpg"
                alt="Indian college graduates collaborating on career opportunities"
                className="h-48 sm:h-56 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-white text-xs font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Placed across Bengaluru, Hyderabad & Pune</span>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
