// // components/About.tsx
// "use client";

// import { motion } from "framer-motion";

// export default function About() {
//   const steps = [
//     "You share your preferences (role, location, salary, visa)",
//     "Our domain-specific team builds your profile",
//     "Resume is optimized based on your target roles",
//     "We apply daily to relevant opportunities",
//     "We track applications, emails, and responses",
//     "You focus on interviews while we handle the rest",
//   ];

//   return (
//     <section className="py-24 px-6">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

//         {/* LEFT VISUAL FLOW */}
//         <div className="relative">

//           <div className="flex flex-col gap-6">
//             {steps.map((step, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: -30 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 viewport={{ once: true }}
//                 className="flex items-start gap-4"
//               >
//                 {/* Dot */}
//                 <div className="w-3 h-3 mt-2 rounded-full bg-gradient-to-r from-primary to-secondary" />

//                 {/* Text */}
//                 <p className="text-sm text-textSoft">{step}</p>
//               </motion.div>
//             ))}
//           </div>

//           {/* vertical line */}
//           <div className="absolute left-[6px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary/40 to-secondary/40" />

//         </div>

//         {/* RIGHT CONTENT */}
//         <div>

//           <p className="mt-10 text-md text-primary text-gray-600 font-semibold tracking-wide">
//             About Nexera Career Hub
//           </p>

//           <h2 className="mt-2 text-3xl md:text-4xl font-bold text-textMain">
//             Built for Graduates Across Every Domain
//           </h2>

//           <p className="mt-6 text-textSoft">
//             Whether you're from tech, business, analytics, or any other stream, 
//             our specialized teams understand your domain and position your profile accordingly.
//           </p>

//           <p className="mt-4 text-textSoft">
//             We don’t just apply randomly, we build your profile strategically, 
//             align it with your preferences, and ensure every application is targeted and consistent.
//           </p>

//           <p className="mt-4 text-textSoft">
//             From profile setup to daily applications and tracking, everything is handled 
//             systematically so you can focus entirely on preparing for interviews.
//           </p>

//         </div>

//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
  const steps = [
    "You share your preferences (role, location, salary, visa)....",
    "Our domain-specific team builds your profile....",
    "Resume is optimized based on your target roles....",
    "We apply daily to relevant opportunities....",
    "We track applications, emails, and responses....",
    "You focus on interviews while we handle the rest....",
  ];
  
  const stepIcons = [
    "🎯",
    "👥",
    "📄",
    "🚀",
    "📬",
    "✅",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % steps.length);
    }, 2500); // speed control

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="pt-20 pb-15 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT FLIP BOARD */}
        {/* <div className="flex justify-center items-center h-[180px]">

          <div className="relative w-full max-w-md h-[100px] perspective">

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 90, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full h-full flex flex-col items-center justify-center
                  rounded-xl backdrop-blur-lg border border-white/30 shadow-md px-6 text-center overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >

                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-white/40 to-rose-100/40" />

                <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-300/20 blur-2xl rounded-full" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-300/20 blur-2xl rounded-full" />

                <div className="relative z-10 text-2xl mb-3">
                  {stepIcons[index]}
                </div>

                <p className="relative z-10 text-sm md:text-base text-textMain leading-relaxed">
                  {steps[index]}
                </p>

              </motion.div>
            </AnimatePresence>

          </div>

        </div> */}

        <div className="flex flex-col items-center justify-center gap-6">

          {/* IMAGE SLOT */}
          <div className="w-full max-w-md">
            <img
              src="/about-visual.png" // 👉 place your image here
              alt="Job application process"
              className="mt-10 w-full h-60 sm:h-70 object-contain"
            />
          </div>

          {/* FLIP CARD */}
          <div className="relative w-full max-w-md h-[110px] perspective">

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: 90, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full h-full flex items-center justify-center
                  rounded-xl backdrop-blur-lg border border-white/30 shadow-md px-6 text-center overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
              >

                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/40 via-white/40 to-rose-100/40" />

                {/* Glow */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-300/20 blur-2xl rounded-full" />
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-300/20 blur-2xl rounded-full" />

                {/* TEXT */}
                <p className="relative z-10 text-md font-semibold italic text-gray-600 md:text-base text-textMain">
                  {steps[index]}
                </p>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* RIGHT CONTENT (UNCHANGED) */}
        <div>

          <p className="mt-10 text-md text-primary text-rose-900 font-semibold tracking-wide">
            About Nexera Career Hub
          </p>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-textMain">
            Built for Graduates Across Every Domain
          </h2>

          <p className="mt-6 text-textSoft">
            Whether you're from Science, tech, engineering, management, construction, business or any other stream, 
            our specialized teams understand your domain and position your profile accordingly.
          </p>

          <p className="mt-4 text-textSoft">
            We don’t just apply randomly, we build your profile strategically, 
            align it with your preferences, and ensure every application is targeted and consistent.
          </p>

          <p className="mt-4 text-textSoft">
            From profile setup to daily applications and tracking, everything is handled 
            systematically so you can focus entirely on preparing for interviews.
          </p>

        </div>

      </div>
    </section>
  );
} 