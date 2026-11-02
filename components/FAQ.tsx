"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How does Nexera work?",
    answer: "We start by understanding your target role, background, and preferred locations. Then we help position your profile, support targeted applications, and keep your search organized with clear communication.",
  },
  {
    question: "Who can use Nexera?",
    answer: "Nexera is designed for students, graduates, working professionals, career switchers, and job seekers who want more structure and better support while managing applications.",
  },
  {
    question: "Do you optimize resumes?",
    answer: "Yes. Resume and profile positioning are part of the service, with attention to role-fit, clarity, and recruiter-readiness.",
  },
  {
    question: "How do you find jobs?",
    answer: "We focus on roles that align with your experience, target function, preferred location, and career goal so the search stays relevant and efficient.",
  },
  {
    question: "Can I choose my preferred role?",
    answer: "Yes. The process starts with your goals, so the search is shaped around your preferred roles and direction.",
  },
  {
    question: "Can I choose my preferred location?",
    answer: "Yes. Your preferred locations are part of the initial brief and influence how we prioritize opportunities.",
  },
  {
    question: "How do I communicate with Nexera?",
    answer: "Communication is kept simple through WhatsApp and direct follow-up from the Nexera team, so updates and questions stay easy to manage.",
  },
  {
    question: "Do you guarantee a job?",
    answer: "We do not make unsupported guarantees. Our focus is to make your search more organized, more targeted, and more prepared for interviews.",
  },
  {
    question: "How does the application process work?",
    answer: "Once your profile and goals are set, we help with targeted discovery, application support, tracking, and communication so you can focus on interview preparation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 py-20 sm:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Answers for a clearer job search.
          </h2>
        </motion.div>

        <div className="mx-auto mt-12 max-w-4xl space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
                className="overflow-hidden rounded-[22px] border border-[#E7E9EE] bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-[#111827] sm:text-lg">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F0FF] text-[#635BFF]"
                  >
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <p className="border-t border-[#EEF1F6] px-5 py-4 text-sm leading-7 text-[#667085] sm:px-6">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
