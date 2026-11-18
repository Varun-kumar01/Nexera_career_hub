"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const defaultSpotlightQuote = {
  quote:
    "We're very happy with what we've seen so far. It's not just a vendor-client relationship; it's much more a partnership. Nexera took the time with their career specialists to dive in and learn our target tech domains, delivering 6 verified interview calls within weeks.",
  author: "Prajwala R.",
  title: "Principal Technical Architect, Quad",
};

// Testimonials matching the exact card format from the screenshot
const defaultTestimonialsList = [
  {
    id: 1,
    quote:
      "They are creative with their profile solutions and look at it from multiple angles. The end solution was amazing. And along the way, the communication lines were always open.",
    author: "Ananya Reddy",
    title: "Associate Software Engineer, Tech Solutions",
  },
  {
    id: 2,
    quote:
      "The Nexera team demonstrated a deep understanding of our specific challenges and tailored the daily applications to address our target roles effectively.",
    author: "Rahul Sharma",
    title: "Head of Operations, HRHNext Services",
  },
  {
    id: 3,
    quote:
      "Nexera surprised us with incredible positioning skills. They really know what they're doing in terms of early career placement, simultaneously considerate of hiring efficiencies.",
    author: "Sneha Patel",
    title: "CTO / Lead, In-Game Technologies",
  },
  {
    id: 4,
    quote:
      "They were able to quickly deploy daily applications and incorporate interview feedback on roles and preferences quickly. Their consistency in meeting deadlines was impressive.",
    author: "Karthik Varma",
    title: "Founder / Engineer, Car-Buying Startup",
  },
  {
    id: 5,
    quote:
      "Applying to 40 jobs daily while practicing for technical rounds was exhausting. Nexera made our entire outreach pipeline predictable, transparent, and completely governed.",
    author: "Abdul Kareem",
    title: "DevOps Engineer, Cloud Systems",
  },
  {
    id: 6,
    quote:
      "Super professional and dependable service. They positioned my resume for enterprise hiring drives and within 2 weeks I had 4 recruiter screening rounds scheduled.",
    author: "Surya Teja M.",
    title: "Frontend Developer, FinTech Innovation",
  },
  {
    id: 7,
    quote:
      "The role matching and daily submission cadence were exceptionally accurate. Every company they applied to was directly aligned with my tech stack and career direction.",
    author: "Divya Nambiar",
    title: "QA Automation Associate, Enterprise Hub",
  },
  {
    id: 8,
    quote:
      "Nexera eliminated the resume black hole completely. The ATS scoring improvement was visible immediately in recruiter response rates across LinkedIn and Naukri.",
    author: "Manoj Kumar",
    title: "Full Stack Engineer, Digital Studio",
  },
  {
    id: 9,
    quote:
      "Their daily application tracking dashboard kept me calm during campus placement season. Got hired at an incredible product startup within 20 days.",
    author: "Pooja Hegde",
    title: "Product Designer, Creative Collective",
  },
  {
    id: 10,
    quote:
      "Zero spam, 100% genuine job postings matched to my tech stack. The team took complete ownership of repetitive company portal forms.",
    author: "Vikramaditya S.",
    title: "Cloud Infrastructure Associate, Pune",
  },
  {
    id: 11,
    quote:
      "The personalized cover letters and LinkedIn outreach sync gave me an unfair advantage. Landed interviews with 3 Tier-1 consulting firms.",
    author: "Rhea D'Souza",
    title: "Business Analyst, Global Advisory",
  },
  {
    id: 12,
    quote:
      "Hands down the best investment for fresh graduates. While others were stuck filling repetitive forms, I was focused on cracking system design rounds.",
    author: "Arjun Mehta",
    title: "Machine Learning Associate, AI Labs",
  },
];

export default function Testimonials() {
  const [spotlightQuote, setSpotlightQuote] = useState(defaultSpotlightQuote);
  const [testimonialsList, setTestimonialsList] = useState(defaultTestimonialsList);
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(testimonialsList.length / cardsPerPage));

  // Fetch live testimonials from PostgreSQL database
  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
          const rawItems = data.testimonials;
          
          // Find featured for spotlight
          const featured = rawItems.find((t: any) => t.is_featured) || rawItems[0];
          if (featured) {
            setSpotlightQuote({
              quote: featured.quote,
              author: featured.name,
              title: `${featured.role}${featured.company ? `, ${featured.company}` : featured.location ? `, ${featured.location}` : ""}`,
            });
          }

          // Map items for the carousel
          const mapped = rawItems.map((item: any) => ({
            id: item.id,
            quote: item.quote,
            author: item.name,
            title: `${item.role}${item.company ? `, ${item.company}` : item.location ? `, ${item.location}` : ""}`,
          }));

          setTestimonialsList(mapped);
        }
      })
      .catch((err) => console.error("Error loading testimonials from database:", err));
  }, []);

  // Auto-play review progression with pause-on-hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setPage((curr) => (curr === totalPages - 1 ? 0 : curr + 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, totalPages]);

  const prev = () => {
    setPage((curr) => (curr === 0 ? totalPages - 1 : curr - 1));
  };

  const next = () => {
    setPage((curr) => (curr === totalPages - 1 ? 0 : curr + 1));
  };

  const currentCards = testimonialsList.slice(
    page * cardsPerPage,
    (page + 1) * cardsPerPage
  );

  return (
    <section id="testimonials" className="relative px-4 py-8 sm:py-12 bg-[#F8F9FB] border-t border-[#EEF1F6]">
      <div className="container mx-auto max-w-7xl">
        
        {/* Top Split Row: Exactly matching Enspirit reference screenshot */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start pb-8 sm:pb-12 border-b border-[#E7E9EE]">
          
          {/* Top Left: Subtitle & Serif Title */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-[#6B7280]">
              <span>—</span>
              <span>TESTIMONIALS</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-normal text-[#111827] tracking-tight font-serif leading-[1.15]">
              What our clients say.
            </h2>
          </div>

          {/* Top Right: Featured Spotlight Testimonial with Accent Left Border */}
          <div className="border-l-2 border-[#635BFF] pl-6 sm:pl-8 py-1">
            <p className="text-base sm:text-lg lg:text-xl text-[#1E1B4B] font-medium leading-relaxed font-serif">
              &ldquo;{spotlightQuote.quote}&rdquo;
            </p>
            <div className="mt-4 flex flex-wrap items-baseline gap-2">
              <span className="text-sm font-bold text-[#111827]">
                {spotlightQuote.author}
              </span>
              <span className="text-xs font-mono text-[#6B7280]">
                {spotlightQuote.title}
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Row: Carousel of 4 Cards with Pause-on-hover & Arrow Controls */}
        <div
          className="relative mt-8 sm:mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          
          {/* Circular Left Arrow Button */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#635BFF", color: "#FFFFFF", borderColor: "#635BFF" }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={prev}
            aria-label="Previous testimonials"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 border border-[#DDE4F0] text-[#111827] shadow-md backdrop-blur-md transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          {/* Circular Right Arrow Button */}
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#635BFF", color: "#FFFFFF", borderColor: "#635BFF" }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={next}
            aria-label="Next testimonials"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/95 border border-[#DDE4F0] text-[#111827] shadow-md backdrop-blur-md transition-colors cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>

          {/* Cards Grid with Smooth Page Transitions */}
          <div className="overflow-hidden px-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              >
                {currentCards.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="flex flex-col justify-between rounded-2xl border border-[#E7E9EE] bg-white p-5 sm:p-6 shadow-xs transition hover:border-[#635BFF]/50 hover:shadow-md min-h-[250px]"
                  >
                    {/* Top Quote Content with Opening Quotation Mark */}
                    <div>
                      <p className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                        <span className="text-sm font-serif font-bold text-[#111827] mr-1">&ldquo;</span>
                        {item.quote}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Author Section with Left Accent Tick matching Screenshot */}
                    <div className="mt-6 pt-4 border-t border-[#F1F3F7]">
                      <div className="flex items-start gap-2.5">
                        <div className="h-7 w-[3px] bg-[#635BFF] shrink-0 mt-0.5 rounded-full" />
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-[#111827] leading-tight">
                            {item.author}
                          </p>
                          <p className="text-[11px] font-mono text-[#6B7280] mt-0.5 leading-tight">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Capsule & Dots indicator matching Screenshot */}
          <div className="mt-8 flex items-center justify-center gap-1.5">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPage(idx)}
                aria-label={`Go to testimonial page ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  page === idx
                    ? "h-2 w-7 bg-[#635BFF]"
                    : "h-2 w-2 bg-[#D1D5DB] hover:bg-[#9CA3AF]"
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
