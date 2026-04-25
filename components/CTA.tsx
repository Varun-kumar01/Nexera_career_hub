"use client";

export default function CTA() {

const testimonials1 = [
  {
    name: "Prajwala",
    text: "I was applying consistently but getting no responses. Nexera handled targeted applications, and within 3 weeks I had 6 interviews.",
  },
  {
    name: "Karthik",
    text: "My resume wasn’t getting shortlisted despite multiple applications. Nexera optimized it with ATS keywords. Within days, I started getting callbacks.",
  },
  {
    name: "Abdul",
    text: "Applying daily was exhausting and inconsistent. Nexera took over and made the process structured. I could focus completely on interview preparation.",
  },
  {
    name: "Surya Teja",
    text: "I spent hours applying without results or tracking. Nexera handled applications and follow-ups efficiently. I focused only on interviews.",
  },
  {
    name: "Arjun",
    text: "I was applying randomly without direction. Nexera made the process targeted and strategic. That’s when interview calls started coming in.",
  },
  {
    name: "Mani Dileep",
    text: "I didn’t expect responses from top companies I was aiming for. Nexera optimized my profile and applied strategically. I started getting interview calls.",
  },
];

const testimonials2 = [
  {
    name: "Mounika",
    text: "As a fresher, I struggled to get even internship calls. Nexera structured my profile properly. Within 2 weeks, I received my first internship offer.",
  },
  {
    name: "Anil",
    text: "I was in my notice period without any offers, which was stressful. Nexera ensured daily targeted applications. I secured a role before my last working day.",
  },
  {
    name: "Apoorva",
    text: "Switching domains felt confusing and my applications weren’t working. Nexera rebuilt my profile for the new domain. I started getting relevant interview calls.",
  },
  {
    name: "Pranay Cheruku",
    text: "I was applying randomly with no clear results. Nexera introduced a targeted approach. Interview calls increased noticeably in a short time.",
  },
  {
    name: "Aravind",
    text: "I couldn’t track applications and missed follow-ups. Nexera handled tracking systematically. I never missed an opportunity again.",
  },
  {
    name: "Smrithi Charan",
    text: "My resume was too generic and not aligned with roles. Nexera optimized it based on job descriptions. I started getting consistent shortlists.",
  },
  {
    name: "Sneha Reddy",
    text: "Managing a job and applications was overwhelming. Nexera handled everything end-to-end. I focused fully on interview preparation.",
  },
];

  const testimonials3 = [...testimonials1, ...testimonials2]

  function Card({ text, name }: any) {
    return (
      <div className="h-[200px] rounded-2xl p-5 bg-gradient-to-r from-orange-100 to-pink-100 backdrop-blur-md shadow-sm hover:shadow-md transition">
        <p className="text-md font-semibold text-textSoft leading-relaxed line-clamp-5">
          “{text}”
        </p>
        <p className="mt-4 text-md font-semibold italic text-textMain">
          — {name}
        </p>
      </div>
    );
  }

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">

        {/* LEFT - SCROLLING TESTIMONIALS */}
        <div className="relative h-[520px] overflow-hidden">

          <div className="absolute inset-0 pointer-events-none z-10 
            [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]
            [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" />


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* MOBILE (1 COLUMN) */}
              <div className="space-y-6 animate-scroll-slow md:hidden">
                {[...testimonials3, ...testimonials3].map((t, i) => (
                  <Card key={i} {...t} />
                ))}
              </div>

              {/* DESKTOP COLUMN 1 */}
              <div className="hidden md:block space-y-6 animate-scroll-medium">
                {[...testimonials1, ...testimonials1].map((t, i) => (
                  <Card key={i} {...t} />
                ))}
              </div>

              {/* DESKTOP COLUMN 2 */}
              <div className="hidden md:block space-y-6 animate-scroll-slow mt-12">
                {[...testimonials2, ...testimonials2].map((t, i) => (
                  <Card key={i} {...t} />
                ))}
              </div>

            </div>
          </div>

        {/* RIGHT - FORM */}
        <div className="sticky top-24">

          <div className="bg-neutral-100 backdrop-blur-md shadow-xl rounded-2xl p-8 mt-7">

            <h2 className="text-2xl md:text-3xl font-bold text-textMain">
              Start Your Job Search
            </h2>

            <p className="mt-2 text-textSoft text-sm">
              Let us handle applications while you focus on interviews.
            </p>

            <form className="mt-6 space-y-4 ">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Branch (e.g. Computer Science, Finance)"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none"
              />

              <input
                type="text"
                placeholder="Experience (e.g. Fresher, 1 year)"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();

                  const form = e.currentTarget.closest("form") as HTMLFormElement | null;

                  if (!form) return; // safety check

                  const inputs = form.querySelectorAll("input");
                  // const inputs = form.querySelectorAll("input");

                  const data = {
                    name: inputs[0]?.value.trim(),
                    email: inputs[1]?.value.trim(),
                    branch: inputs[2]?.value.trim(),
                    experience: inputs[3]?.value.trim(),
                  };

                  // ✅ VALIDATION
                  if (!data.name || !data.email) {
                    alert("Please fill Name, Email");
                    return;
                  }

                  const message = encodeURIComponent(
                    `Hi, I'm interested in Nexera Career Hub.

                    Name: ${data.name}
                    Email: ${data.email}
                    Branch: ${data.branch || "-"}
                    Experience: ${data.experience || "-"}`
                  );

                  const phoneNumber = "919553059468";

                  window.open(
                    `https://wa.me/${phoneNumber}?text=${message}`,
                    "_blank"
                  );
                }}
                className="w-full py-3 cursor-pointer rounded-xl font-semibold hover:shadow-md transition bg-gradient-to-r from-orange-100 to-pink-100 shadow-md"
              >
                Continue on WhatsApp →
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
