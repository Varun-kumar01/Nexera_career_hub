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

export default function Services() {
  const services = [
    {
      title: "Job Applications",
      desc: "We apply to relevant roles daily based on your preferences, ensuring consistency and reach.",
    },
    {
      title: "Resume Optimization",
      desc: "We tailor your resume with ATS-friendly keywords aligned to job descriptions.",
    },
    {
      title: "Fully Managed Search",
      desc: "From applications to tracking, we handle your entire job search process end-to-end.",
    },
    {
      title: "Profile Monitoring",
      desc: "We monitor your applications, emails, and responses so nothing gets missed.",
    },
    {
      title: "JD-Based Customization",
      desc: "Each application is refined based on the job description for better results.",
    },
    {
      title: "Preference Targeting",
      desc: "Roles, location, salary, visa sponsorship, everything is aligned to your goals.",
    },
  ];

  return (
    <section id="services" className="py-25 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-textMain">
            Everything You Need to Land Interviews
          </h2>
          <p className="mt-4 text-textSoft text-gray-600">
            We handle the entire job application workflow by providing following services, so you can focus on preparation and interviews.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl p-[1px] overflow-hidden"
            >

              {/* Animated Gradient Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-rose-300 to-orange-300 
                  animate-[gradientMove_6s_linear_infinite] blur-xl" />
              </div>

              {/* Card Content */}
              <div className="relative bg-white/70 backdrop-blur-md border border-gray-200 
                rounded-2xl p-6 h-full transition-all duration-300 group-hover:shadow-xl">

                <h3 className="text-lg font-semibold text-textMain">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm text-textSoft leading-relaxed text-gray-600 font-semibold">
                  {service.desc}
                </p>

                {/* Bottom Accent */}
                <div className="mt-5 h-[2px] w-0 bg-gradient-to-r from-primary to-secondary 
                  group-hover:w-full transition-all duration-300" />
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}