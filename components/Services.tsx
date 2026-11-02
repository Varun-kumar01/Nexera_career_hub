// "use client";

// export default function Services() {
//   const services = [
//     {
//       title: "Job Applications",
//       desc: "We apply to relevant roles daily based on your preferences, ensuring consistency and reach.",
//     },
//     {
//       title: "Resume Optimization",
//       desc: "We tailor your resume with ATS-friendly keywords aligned to job descriptions.",
//     },
//     {
//       title: "Fully Managed Search",
//       desc: "From applications to tracking, we handle your entire job search process end-to-end.",
//     },
//     {
//       title: "Profile Monitoring",
//       desc: "We monitor your applications, emails, and responses so nothing gets missed.",
//     },
//     {
//       title: "JD-Based Customization",
//       desc: "Each application is refined based on the job description for better results.",
//     },
//     {
//       title: "Preference Targeting",
//       desc: "Roles, location, salary, visa sponsorship — everything is aligned to your goals.",
//     },
//   ];

//   return (
//     <section className="py-20 px-6">
//       <div className="max-w-7xl mx-auto">

//         {/* Heading */}
//         <div className="text-center max-w-2xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-textMain">
//             Everything You Need to Land Interviews
//           </h2>
//           <p className="mt-4 text-textSoft">
//             We handle the entire job application workflow so you can focus on preparation and interviews.
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//           {services.map((service, index) => (
//             <div
//               key={index}
//               className="group bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
//             >
//               <h3 className="text-lg font-semibold text-textMain">
//                 {service.title}
//               </h3>

//               <p className="mt-3 text-sm text-textSoft">
//                 {service.desc}
//               </p>

//               {/* subtle hover line */}
//               <div className="mt-4 h-[2px] w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
//             </div>
//           ))}

//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  FileText,
  SearchCheck,
  UserRound,
} from "lucide-react";

const serviceGroups = [
  {
    title: "Career Profile",
    description: "A more compelling profile starts with strong positioning and clearer communication.",
    items: ["Resume optimization", "Profile clarity", "Career positioning"],
    visual: "profile",
    icon: UserRound,
  },
  {
    title: "Job Search",
    description: "Target the roles that match your strengths, preferences and growth direction.",
    items: ["Relevant job discovery", "Targeted applications", "Better fit matching"],
    visual: "search",
    icon: SearchCheck,
  },
  {
    title: "Application Management",
    description: "Keep your search organized with structure, follow-ups and momentum.",
    items: ["Application tracking", "Follow-up rhythm", "Clear next steps"],
    visual: "manage",
    icon: BriefcaseBusiness,
  },
  {
    title: "Interview Support",
    description: "Prepare for conversations with feedback that helps you present your best self.",
    items: ["Interview preparation", "Position-specific guidance", "Confidence-building support"],
    visual: "interview",
    icon: FileText,
  },
];

export default function Services() {
  return (
    <section id="services" className="px-4 py-20 sm:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
            Services
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
            Support built around the real work of finding the right role.
          </h2>
        </motion.div>

        <div className="mt-12 space-y-8">
          {serviceGroups.map(({ title, description, items, visual, icon: Icon }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className={`grid gap-6 rounded-[32px] border border-[#E7E9EE] bg-white p-6 shadow-[0_18px_45px_rgba(17,24,39,0.04)] lg:grid-cols-2 lg:p-8 ${
                index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col justify-center"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F0FF] text-[#635BFF]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#635BFF]">
                  {title}
                </p>
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
                  {title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#475467]">{description}</p>

                <ul className="mt-6 space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-[#111827]">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F1F0FF] text-[#635BFF]">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96, x: index % 2 === 0 ? 22 : -22 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="flex items-center justify-center rounded-[28px] bg-[#F7F8FC] p-4 sm:p-6"
              >
                {visual === "profile" && (
                  <div className="w-full rounded-[26px] border border-[#E7E9EE] bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F1F0FF] text-[#635BFF] font-semibold">
                          N
                        </div>
                        <div>
                          <p className="text-base font-semibold text-[#111827]">Nexera profile</p>
                          <p className="text-xs uppercase tracking-[0.18em] text-[#667085]">Positioned</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-[#ECFDF5] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#16A34A]">
                        Ready
                      </span>
                    </div>
                    <div className="mt-6 space-y-3">
                      {['Resume clarity', 'LinkedIn polish', 'Role-fit story'].map((tag) => (
                        <div key={tag} className="flex items-center justify-between rounded-2xl bg-[#F8F9FF] px-3 py-2.5 text-sm text-[#475467]">
                          <span>{tag}</span>
                          <ArrowRight className="h-4 w-4 text-[#635BFF]" aria-hidden="true" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {visual === "search" && (
                  <div className="w-full rounded-[26px] border border-[#E7E9EE] bg-white p-5 shadow-sm">
                    <div className="rounded-2xl border border-[#E7E9EE] bg-[#F8F9FF] p-3">
                      <div className="flex items-center gap-2 text-[#667085]">
                        <SearchCheck className="h-4 w-4 text-[#635BFF]" aria-hidden="true" />
                        <span className="text-sm font-medium">Search criteria</span>
                      </div>
                      <div className="mt-4 grid gap-2">
                        {['Frontend roles', 'Remote', 'Growth teams', 'Bengaluru'].map((entry) => (
                          <div key={entry} className="rounded-xl bg-white px-3 py-2 text-sm text-[#475467] shadow-sm">
                            {entry}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-[#EEF2FF] p-3 text-center">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#4338CA]">Match</p>
                        <p className="mt-2 text-xl font-bold text-[#111827]">Strong</p>
                      </div>
                      <div className="rounded-2xl bg-[#ECFDF5] p-3 text-center">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#15803D]">Fit</p>
                        <p className="mt-2 text-xl font-bold text-[#111827]">Relevant</p>
                      </div>
                    </div>
                  </div>
                )}

                {visual === "manage" && (
                  <div className="w-full rounded-[26px] border border-[#E7E9EE] bg-white p-5 shadow-sm">
                    <div className="space-y-3">
                      {[
                        { label: "Applied", tone: "bg-[#EEF2FF] text-[#4338CA]" },
                        { label: "Follow-up", tone: "bg-[#ECFDF5] text-[#15803D]" },
                        { label: "Interview", tone: "bg-[#FEE2E2] text-[#B91C1C]" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between rounded-2xl border border-[#E7E9EE] bg-[#F8F9FF] px-3 py-3">
                          <div className="flex items-center gap-3">
                            <div className="h-2.5 w-2.5 rounded-full bg-[#635BFF]" aria-hidden="true" />
                            <span className="text-sm font-medium text-[#111827]">{item.label}</span>
                          </div>
                          <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${item.tone}`}>
                            Active
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {visual === "interview" && (
                  <div className="w-full rounded-[26px] border border-[#E7E9EE] bg-white p-5 shadow-sm">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-[#F1F0FF] p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#635BFF]">Prep</p>
                        <p className="mt-3 text-lg font-semibold text-[#111827]">Role-specific</p>
                      </div>
                      <div className="rounded-2xl bg-[#EEF2FF] p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#4338CA]">Focus</p>
                        <p className="mt-3 text-lg font-semibold text-[#111827]">Confidence</p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl border border-[#E7E9EE] bg-[#F8F9FF] p-4">
                      <div className="flex items-center justify-between text-sm text-[#475467]">
                        <span>Interview brief</span>
                        <span className="font-semibold text-[#111827]">Ready</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-[#E7E9EE]">
                        <div className="h-2 w-[82%] rounded-full bg-[#635BFF]" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}