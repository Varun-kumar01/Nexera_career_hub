// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* NAVBAR */}
//       <div className="fixed top-4 w-full z-50 flex justify-center px-4">
//         <nav className="w-full max-w-5xl flex items-center justify-between px-4 py-2.5 
//           rounded-full backdrop-blur-md bg-white/40 border border-white/20 shadow-sm">

//           {/* LOGO */}
//           <a href="/" className="flex items-center gap-1">
//             <Image src="/logo3.png" alt="Nexera" width={50} height={50} />
//             <span className="font-semibold text-sm">Nexera</span>
//           </a>

//           {/* RIGHT SIDE (DESKTOP) */}
//           <div className="hidden md:flex items-center gap-6 font-semibold text-sm text-gray-700">

//             <a href="/" className="hover:text-primary transition hover:text-rose-900">
//               Home
//             </a>
//             <Link href="#about" className="hover:text-primary transition hover:text-rose-900">
//               About
//             </Link>
//             <Link href="#services" className="hover:text-primary transition hover:text-rose-900">
//               Services
//             </Link>
//             <Link href="#trust" className="hover:text-primary transition hover:text-rose-900">
//               Why us
//             </Link>

//             <Link href="#contact">
//               <button className="ml-2 bg-gradient-to-r from-primary font-semibold to-secondary cursor-pointer text-rose-900 sm:text-rose-900 px-4 py-1.5 rounded-full text-sm">
//                 Get Started
//               </button>
//             </Link>
//           </div>

//           {/* HAMBURGER */}
//           <button
//             className="md:hidden relative w-6 h-6 flex items-center justify-center"
//             onClick={() => setOpen(!open)}
//           >
//             <span
//               className={`absolute w-5 h-[2px] bg-gray-700 transition-all duration-300 
//                 ${open ? "rotate-45" : "-translate-y-1.5"}`}
//             />
//             <span
//               className={`absolute w-5 h-[2px] bg-gray-700 transition-all duration-300 
//                 ${open ? "opacity-0" : ""}`}
//             />
//             <span
//               className={`absolute w-5 h-[2px] bg-gray-700 transition-all duration-300 
//                 ${open ? "-rotate-45" : "translate-y-1.5"}`}
//             />
//           </button>
//         </nav>
//       </div>

//       {/* MOBILE MENU */}
//       {open && (
//         <div
//           className={`fixed top-20 left-0 w-full px-6 z-40 md:hidden transition-all duration-300
//             ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
//         >
//           <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 
//             p-6 shadow-lg flex flex-col gap-4 text-sm">

//             <Link href="#" onClick={() => setOpen(false)} className="hover:text-primary">
//               Home
//             </Link>
//             <Link href="#" onClick={() => setOpen(false)} className="hover:text-primary">
//               About
//             </Link>
//             <Link href="#" onClick={() => setOpen(false)} className="hover:text-primary">
//               Services
//             </Link>
//             <Link href="#" onClick={() => setOpen(false)} className="hover:text-primary">
//               Pricing
//             </Link>
//             <Link href="#" onClick={() => setOpen(false)} className="hover:text-primary">
//               Contact
//             </Link>

//             <button className="mt-4 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl">
//               Get Started
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }




"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircleMore, X } from "lucide-react";
import { useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "Why Nexera", href: "#why-nexera" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-[#EEF1F6] bg-[#F7F8FC]/85 backdrop-blur-xl"
    >
      <nav className="container flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-3" aria-label="Nexera home">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#635BFF] text-sm font-bold text-white shadow-[0_10px_24px_rgba(99,91,255,0.35)]">
            N
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#667085]">
              Nexera
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#111827]">
              Career Hub
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#475467] transition hover:text-[#111827]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={getWhatsAppUrl("Hi Nexera, I'd like to chat with your team.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#DDE4F0] bg-white px-4 py-2.5 text-sm font-semibold text-[#111827] transition hover:border-[#C9D3E7]"
          >
            <MessageCircleMore className="h-4 w-4" aria-hidden="true" />
            Chat with us
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-[#635BFF] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_12px_20px_rgba(99,91,255,0.25)] transition hover:bg-[#4F46E5]"
          >
            Start Your Journey
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#E7E9EE] bg-white text-[#111827] md:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-t border-[#EEF1F6] bg-white md:hidden"
          >
            <div className="container flex flex-col gap-4 py-5">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-[#475467]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={getWhatsAppUrl("Hi Nexera, I'd like to chat with your team.")}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DDE4F0] px-4 py-3 text-sm font-semibold text-[#111827]"
              >
                <MessageCircleMore className="h-4 w-4" aria-hidden="true" />
                Chat with us
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-[#635BFF] px-4 py-3 text-sm font-semibold text-white"
              >
                Start Your Journey
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}