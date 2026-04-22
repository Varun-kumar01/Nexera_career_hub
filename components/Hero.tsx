"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-rose-300/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div className="text-center md:text-left">

          {/* HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-textMain"
          >
            Leave the <span className="text-rose-900">'Apply'</span> button to us.{" "}
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              {/* You Focus on Interviews. */}
            </span>
          </motion.h1>

          {/* BRAND LABEL */}
          <p className="text-md text-primary font-bold tracking-wide text-gray-600">
            Nexera Career Hub
          </p>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-textSoft text-base sm:text-lg max-w-xl mx-auto md:mx-0"
          >
            We apply. You interview. The complete end-to-end application service built specifically for today’s graduates.
            {/* Built for graduates navigating a competitive job market. We manage your entire job application process, from resume optimization and role targeting to daily applications and response tracking. Instead of spending hours applying, you focus on preparation while we ensure consistent, high-quality outreach on your behalf. */}
          </motion.p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap justify-center gap-3 md:hidden">

            {[
              "Applied Daily",
              "Resume Optimized",
              "Interview Focus 🚀",
            ].map((item, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-md 
                border border-gray-200 text-xs shadow-sm"
              >
                {item}
              </div>
            ))}

          </div>

          <Link href="#contact">  
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative p-[2px] mt-10 rounded-full overflow-hidden group cursor-pointer"
            >
              {/* Animated Gradient Border */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-rose-400 to-secondary animate-[spin_4s_linear_infinite]" />

              {/* Inner Button */}
              <span className="relative flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-md text-gray-800 font-medium">

                {/* Noise Layer (CSS, no image) */}
                <span className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay 
                  [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.3)_1px,transparent_0)]
                  [background-size:4px_4px]" />

                {/* Text */}
                <span className="relative z-10 group-hover:text-gray-900 transition">
                  Get Started →
                </span>
              </span>
            </motion.button>
          </Link>

        </div>

        {/* RIGHT VISUAL (VECTOR) */}
     <div className="relative hidden md:flex justify-center items-center h-[420px]">

      {[
        { text: "Applied to 100+ Jobs Today", pos: "top-0 left-10", delay: 0 },

        { text: "Resume Optimized ✔", pos: "top-16 right-10", delay: 0.2 },

        { text: "Interview Requests Incoming 🚀", pos: "bottom-0 left-16", delay: 0.4 },

        { text: "ATS Keywords Optimized", pos: "bottom-16 right-6", delay: 0.6 },

        { text: "Daily Tracking Enabled 📊", pos: "top-1/2 left-0", delay: 0.8 },

        { text: "Targeted Job Matching 🎯", pos: "top-1/3 right-0", delay: 1 },

        { text: "Visa-Sponsored Roles Targeted", pos: "top-10 left-1/3", delay: 1.2 },

        { text: "Email Monitoring Active 📬", pos: "bottom-10 right-1/4", delay: 1.4 },
      ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: [0, -8, 0] // subtle floating
            }}
            transition={{
              delay: card.delay,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute ${card.pos} bg-white/70 backdrop-blur-lg border border-gray-200 
              rounded-xl px-4 py-3 shadow-md text-sm whitespace-nowrap`}
          >
            {card.text}
          </motion.div>
        ))}

      </div>
      </div>
    </section>
  );
}