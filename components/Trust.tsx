// "use client";

// import { useEffect, useState } from "react";

// function Counter({ target }: { target: number }) {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let start = 0;
//     const duration = 1200;
//     const increment = target / (duration / 16);

//     const counter = setInterval(() => {
//       start += increment;
//       if (start >= target) {
//         setCount(target);
//         clearInterval(counter);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, 16);

//     return () => clearInterval(counter);
//   }, [target]);

//   return <span>{count}+</span>;
// }

// export default function Trust() {
//   return (
//     <section className="py-10 px-6">
//       <div className="max-w-6xl mx-auto text-center">

//         {/* Heading */}
//         <h2 className="text-3xl md:text-4xl font-bold text-textMain">
//           Trusted by Job Seekers Like You
//         </h2>

//         <p className="mt-4 text-textSoft max-w-xl mx-auto">
//           Our system has helped graduates stay consistent and land interviews faster.
//         </p>

//         {/* Stats */}
//         <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">

//           <div>
//             <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-rose-900">
//               <Counter target={3000} />
//             </p>
//             <p className="text-lg text-textSoft mt-2 font-semibold ">
//               Applications Submitted
//             </p>
//           </div>

//           <div>
//             <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-rose-900">
//               <Counter target={150} />
//             </p>
//             <p className="text-lg text-textSoft mt-2 font-semibold ">
//               Interviews Generated
//             </p>
//           </div>

//           <div>
//             <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-rose-900">
//               <Counter target={80} />
//             </p>
//             <p className="text-lg text-textSoft mt-2 font-semibold ">
//               Active Clients
//             </p>
//           </div>

//           <div>
//             <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-rose-900">
//               <Counter target={85} />
//             </p>
//             <p className="text-lg text-textSoft mt-2 font-semibold ">
//               Success Consistency %
//             </p>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";



export default function Trust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  function Counter({ target, start }: { target: number; start: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return; // 👈 don't run until visible

    let current = 0;
    const duration = 1200;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
      current += increment;

      if (current >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [target, start]);

  return <span>{count}+</span>;
}

  return (
    <section id="trust" ref={ref} className="py-25 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-textMain">
          Trusted by Job Seekers Like You
        </h2>

        <p className="mt-4 text-textSoft max-w-xl mx-auto">
          Our system has helped graduates stay consistent and land interviews faster.
        </p>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">

          <div>
            <p className="text-3xl md:text-4xl font-bold text-rose-900">
              <Counter target={80} start={isInView} />
            </p>
            <p className="text-lg text-textSoft mt-2 font-semibold">
              Daily Applications
            </p>
          </div>

          <div>
            <p className="text-3xl md:text-4xl font-bold text-rose-900">
              <Counter target={150} start={isInView} />
            </p>
            <p className="text-lg text-textSoft mt-2 font-semibold">
              Interviews Generated
            </p>
          </div>

          <div>
            <p className="text-3xl md:text-4xl font-bold text-rose-900">
              <Counter target={80} start={isInView} />
            </p>
            <p className="text-lg text-textSoft mt-2 font-semibold">
              Graduates
            </p>
          </div>

          <div>
            <p className="text-3xl md:text-4xl font-bold text-rose-900">
              <Counter target={85} start={isInView} />
            </p>
            <p className="text-lg text-textSoft mt-2 font-semibold">
              Success Consistency %
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}