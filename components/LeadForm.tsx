"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const statusOptions = [
  "Student",
  "Recent Graduate",
  "Working Professional",
  "Career Switcher",
];

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-[28px] border border-[#E7E9EE] bg-white p-6 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ECFDF5] text-[#16A34A]">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-[#111827]">
          Thanks! A Nexera career specialist will contact you shortly.
        </h3>
        <p className="mt-3 text-sm leading-6 text-[#667085]">
          Need a faster response? Continue the conversation on WhatsApp.
        </p>
        <a
          href={getWhatsAppUrl("Hi Nexera, I'd like to continue my career journey.")}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#635BFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4F46E5]"
        >
          Chat on WhatsApp <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#E7E9EE] bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-[#111827] sm:col-span-1">
          Name
          <input
            type="text"
            name="name"
            required
            placeholder="Your name"
            className="mt-2 w-full rounded-2xl border border-[#D9DFEA] bg-[#F9FAFB] px-3.5 py-3 text-sm text-[#111827] outline-none transition focus:border-[#635BFF]"
          />
        </label>

        <label className="block text-sm font-medium text-[#111827] sm:col-span-1">
          WhatsApp number
          <input
            type="tel"
            name="whatsapp"
            required
            placeholder="e.g. +91 98765 43210"
            className="mt-2 w-full rounded-2xl border border-[#D9DFEA] bg-[#F9FAFB] px-3.5 py-3 text-sm text-[#111827] outline-none transition focus:border-[#635BFF]"
          />
        </label>

        <label className="block text-sm font-medium text-[#111827] sm:col-span-1">
          Current status
          <select
            name="status"
            defaultValue=""
            required
            className="mt-2 w-full rounded-2xl border border-[#D9DFEA] bg-[#F9FAFB] px-3.5 py-3 text-sm text-[#111827] outline-none transition focus:border-[#635BFF]"
          >
            <option value="" disabled>
              Select
            </option>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-[#111827] sm:col-span-1">
          Target role
          <input
            type="text"
            name="targetRole"
            placeholder="e.g. Frontend Developer"
            className="mt-2 w-full rounded-2xl border border-[#D9DFEA] bg-[#F9FAFB] px-3.5 py-3 text-sm text-[#111827] outline-none transition focus:border-[#635BFF]"
          />
        </label>

        <label className="block text-sm font-medium text-[#111827] sm:col-span-2">
          Preferred location
          <input
            type="text"
            name="location"
            placeholder="e.g. Bengaluru, Remote, Hyderabad"
            className="mt-2 w-full rounded-2xl border border-[#D9DFEA] bg-[#F9FAFB] px-3.5 py-3 text-sm text-[#111827] outline-none transition focus:border-[#635BFF]"
          />
        </label>

        <label className="block text-sm font-medium text-[#111827] sm:col-span-2">
          Resume upload
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            className="mt-2 block w-full rounded-2xl border border-dashed border-[#D9DFEA] bg-[#F9FAFB] px-3.5 py-3 text-sm text-[#667085] outline-none transition focus:border-[#635BFF]"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#635BFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4F46E5]"
      >
        Send my details <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
