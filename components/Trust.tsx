"use client";

import { motion } from "framer-motion";

const trustPoints = [
  "Built for students, graduates & ambitious professionals",
  "Resume and profile support",
  "Application direction and tracking",
  "Interview preparation guidance",
];

export default function Trust() {
  return (
    <section id="trust" className="px-4 py-14 sm:py-18">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="rounded-[28px] border border-[#E7E9EE] bg-white/80 px-6 py-8 shadow-[0_15px_35px_rgba(17,24,39,0.03)]"
        >
          <p className="text-center text-sm font-semibold uppercase tracking-[0.24em] text-[#635BFF]">
            Built for ambitious career growth
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-center text-sm font-medium text-[#475467] sm:text-base">
            {trustPoints.map((point) => (
              <span key={point} className="rounded-full border border-[#E7E9EE] bg-[#F7F8FC] px-4 py-2.5">
                {point}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
