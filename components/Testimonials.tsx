"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useState } from "react";

const slides = [
  {
    id: "placeholder",
    label: "Public testimonial space",
    quote:
      "Approved feedback from real candidates and professionals will be shared here once it is available.",
    detail: "This section is ready for verified customer stories and success updates.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  const goToPrevious = () => setIndex((currentIndex) => (currentIndex === 0 ? slides.length - 1 : currentIndex - 1));
  const goToNext = () => setIndex((currentIndex) => (currentIndex === slides.length - 1 ? 0 : currentIndex + 1));

  return (
    <section id="testimonials" className="px-4 py-20 sm:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
            Testimonials
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Real stories will be featured here when they are approved for public use.
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 max-w-5xl rounded-[32px] border border-[#E7E9EE] bg-white p-6 shadow-[0_18px_50px_rgba(17,24,39,0.04)] sm:p-8 lg:p-10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2" aria-label="testimonial progress">
              {slides.map((slide, slideIndex) => (
                <motion.span
                  key={slide.id}
                  initial={{ width: 10, opacity: 0.5 }}
                  animate={{ width: slideIndex === index ? 40 : 10, opacity: slideIndex === index ? 1 : 0.5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-2.5 rounded-full bg-[#E7E9EE]"
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={goToPrevious}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E7E9EE] bg-white text-[#111827] transition hover:border-[#C9D3E7]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={goToNext}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#635BFF] text-white transition hover:bg-[#4F46E5]"
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 24, x: 12 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -18, x: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-[#F1F0FF] text-[#635BFF]"
                >
                  <Quote className="h-9 w-9" aria-hidden="true" />
                </motion.div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
                    {current.label}
                  </p>
                  <p className="mt-5 text-xl leading-9 text-[#111827] sm:text-2xl">
                    “{current.quote}”
                  </p>
                  <p className="mt-6 text-sm leading-7 text-[#667085]">{current.detail}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
