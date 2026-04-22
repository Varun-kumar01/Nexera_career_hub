"use client";

export default function CTA() {
  const testimonials = [
    { name: "Rahul", text: "Got 6 interviews in 3 weeks. The consistency really works." },
    { name: "Ananya", text: "Resume optimization alone made a huge difference." },
    { name: "Karthik", text: "I stopped stressing about applications completely." },
    { name: "Sneha", text: "They handled everything while I focused on interviews." },
    { name: "Arjun", text: "Finally a system that actually works." },
    { name: "Priya", text: "Got responses from companies I never expected." },
  ];

  function Card({ text, name }: any) {
    return (
      <div className="h-[200px] rounded-2xl p-5 bg-gradient-to-r from-orange-100 to-pink-100 backdrop-blur-md shadow-sm hover:shadow-md transition">
        <p className="text-md font-semibold text-textSoft leading-relaxed line-clamp-3">
          “{text}”
        </p>
        <p className="mt-4 text-xs font-semibold italic text-textMain">
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

          <div className="grid grid-cols-2 gap-6">

            <div className="space-y-6 animate-scroll-medium">
              {[...testimonials, ...testimonials].map((t, i) => (
                <Card key={i} {...t} />
              ))}
            </div>

            <div className="space-y-6 animate-scroll-slow mt-12">
              {[...testimonials, ...testimonials].map((t, i) => (
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

                  const phoneNumber = "918639315520";

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
