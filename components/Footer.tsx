// export default function Footer() {
//   return (
//     <footer className="py-10 px-6 border-t border-gray-200">
//       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

//         <p className="text-sm text-textSoft">
//           © {new Date().getFullYear()} Nexera Career Hub. All rights reserved.
//         </p>

//         <div className="flex gap-6 text-sm text-textSoft">
//           <span>Privacy</span>
//           <span>Terms</span>
//           <span>Contact</span>
//         </div>

//       </div>
//     </footer>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-20  bg-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* TOP */}
        <div className="flex justify-between items-center md:grid-cols-3 gap-10">

          {/* BRAND */}
          <div>
            <Image src="/logo3.png" alt="Nexera" width={50} height={50}/>

            <h3 className="text-lg font-semibold text-textMain">
              Nexera Career Hub
            </h3>
            <p className="mt-3 text-sm text-textSoft max-w-sm">
              We help graduates land interviews faster by managing their entire
              job application process — from resume optimization to daily
              targeted applications.
            </p>
          </div>

          {/* NAVIGATION */}
          {/* <div>
            <h4 className="text-sm font-semibold text-textMain mb-3">
              Navigate
            </h4>
            <div className="flex flex-col gap-2 text-sm text-textSoft">

              <Link href="#home" className="hover:text-primary transition">
                Home
              </Link>

              <Link href="#about" className="hover:text-primary transition">
                About
              </Link>

              <Link href="#services" className="hover:text-primary transition">
                Services
              </Link>

              <Link href="#trust" className="hover:text-primary transition">
                Results
              </Link>

              <Link href="#contact" className="hover:text-primary transition">
                Contact
              </Link>

            </div>
          </div> */}

          {/* CONTACT / CTA */}
          <div>
            <h4 className="text-sm font-semibold text-textMain mb-3">
              Get in Touch
            </h4>

            <p className="text-sm text-textSoft">
              Have questions or want to get started?
            </p>

            <div className="mt-4 flex flex-col gap-3">



              {/* Email */}
              <a
                href="mailto:yourmail@gmail.com"
                className="text-sm text-primary hover:underline"
              >
                nexeracareerhub@gmail.com
              </a>

            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-xs text-textSoft">
            © {new Date().getFullYear()} Nexera Career Hub. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-textSoft">
            <span className="hover:text-primary cursor-pointer">Privacy</span>
            <span className="hover:text-primary cursor-pointer">Terms</span>
          </div>

        </div>

      </div>
    </footer>
  );
}