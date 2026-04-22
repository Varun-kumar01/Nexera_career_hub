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

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-4 w-full z-50 flex justify-center px-4">
        <nav className="w-full max-w-5xl flex items-center justify-between px-4 py-2.5 
          rounded-full backdrop-blur-md bg-white/40 border border-white/20 shadow-sm">

          {/* LOGO */}
          <a href="/" className="flex items-center gap-1">
            <Image src="/logo3.png" alt="Nexera" width={40} height={40} />
            <span className="font-semibold text-sm">Nexera</span>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6 font-semibold text-sm text-gray-700">

            <a href="#home" className="hover:text-rose-900 transition">
              Home
            </a>

            <a href="#about" className="hover:text-rose-900 transition">
              About
            </a>

            <a href="#services" className="hover:text-rose-900 transition">
              Services
            </a>

            <a href="#trust" className="hover:text-rose-900 transition">
              Why us
            </a>

            <a href="#contact">
              <button className="ml-2 bg-gradient-to-r from-primary to-secondary text-rose-900 px-4 py-1.5 rounded-full text-sm">
                Get Started
              </button>
            </a>
          </div>

          {/* HAMBURGER */}
          <button
            className="md:hidden relative w-6 h-6 flex items-center justify-center"
            onClick={() => setOpen(!open)}
          >
            <span
              className={`absolute w-5 h-[2px] bg-gray-700 transition-all duration-300 
                ${open ? "rotate-45" : "-translate-y-1.5"}`}
            />
            <span
              className={`absolute w-5 h-[2px] bg-gray-700 transition-all duration-300 
                ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute w-5 h-[2px] bg-gray-700 transition-all duration-300 
                ${open ? "-rotate-45" : "translate-y-1.5"}`}
            />
          </button>
        </nav>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed top-20 left-0 w-full px-6 z-40 md:hidden transition-all duration-300">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/30 
            p-6 shadow-lg flex flex-col gap-5 text-sm">

            <a href="#home" onClick={handleClose} className="hover:text-primary">
              Home
            </a>

            <a href="#about" onClick={handleClose} className="hover:text-primary">
              About
            </a>

            <a href="#services" onClick={handleClose} className="hover:text-primary">
              Services
            </a>

            <a href="#trust" onClick={handleClose} className="hover:text-primary">
              Why us
            </a>

            <a href="#contact" onClick={handleClose}>
              <button className="mt-4 w-full bg-gradient-to-r from-primary to-secondary font-semibold text-rose-900 px-4 py-2 rounded-xl">
                Get Started
              </button>
            </a>

          </div>
        </div>
      )}
    </>
  );
}