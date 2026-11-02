"use client";

import { MessageCircleMore } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const companyLinks = [
  { label: "About", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E7E9EE] bg-white/80">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#635BFF] text-sm font-bold text-white">
                N
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#667085]">
                  NEXERA
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]">
                  CAREER HUB
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#667085]">
              Career management, application support and interview preparation.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#667085]">Company</p>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[#475467] transition hover:text-[#111827]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#667085]">Contact</p>
            <a
              href={getWhatsAppUrl("Hi Nexera, I'd like to know more about your services.")}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#F1F0FF] px-4 py-2.5 text-sm font-semibold text-[#111827] transition hover:bg-[#E9E7FF]"
            >
              <MessageCircleMore className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#E7E9EE] pt-6 text-sm text-[#667085] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nexera Career Hub. All rights reserved.</p>
          <p>Built for clearer, smarter job searches.</p>
        </div>
      </div>
    </footer>
  );
}