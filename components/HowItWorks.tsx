"use client";

export default function HowItWorks() {
  const steps = [
    {
      title: "Share Your Preferences",
      desc: "Tell us your role, location, salary expectations, and visa requirements.",
    },
    {
      title: "Resume Setup & Optimization",
      desc: "We prepare or refine your resume to match ATS and job requirements.",
    },
    {
      title: "Daily Job Applications",
      desc: "We apply to relevant jobs every day (excluding weekends) for consistency.",
    },
    {
      title: "Track & Respond",
      desc: "We monitor applications, emails, and responses so you never miss an opportunity.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-textMain">
            How It Works
          </h2>
          <p className="mt-4 text-textSoft">
            A simple, structured process designed to get you consistent interview opportunities.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-8">

          {steps.map((step, index) => (
            <div key={index} className="relative text-center md:text-left">

              {/* Step Number */}
              <div className="flex justify-center md:justify-start">
                <div className="w-10 h-10 flex items-center justify-center rounded-full 
                  bg-gradient-to-r from-primary to-secondary text-white font-semibold">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <h3 className="mt-4 text-lg font-semibold text-textMain">
                {step.title}
              </h3>

              <p className="mt-2 text-sm text-textSoft">
                {step.desc}
              </p>

              {/* Connector line (desktop only) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-5 left-full w-full h-[2px] 
                  bg-gradient-to-r from-primary/30 to-secondary/30" />
              )}

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}