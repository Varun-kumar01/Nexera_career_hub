"use client";

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "₹9,999",
      features: [
        "Daily job applications",
        "Role-based targeting",
        "2 months duration",
      ],
      highlight: false,
    },
    {
      name: "Standard",
      price: "₹14,999",
      features: [
        "Everything in Basic",
        "Resume optimization",
        "JD-based customization",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      price: "₹19,999",
      features: [
        "Everything in Standard",
        "Full job search management",
        "Email & profile monitoring",
      ],
      highlight: false,
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-textMain">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-textSoft">
            Choose a plan that fits your needs. No hidden charges.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">

          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 border transition-all
                ${
                  plan.highlight
                    ? "bg-white shadow-lg border-primary"
                    : "bg-white/70 backdrop-blur-md border-gray-200"
                }`}
            >
              {/* Highlight Badge */}
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs 
                  bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-lg font-semibold text-textMain text-center">
                {plan.name}
              </h3>

              {/* Price */}
              <p className="mt-4 text-3xl font-bold text-center text-textMain">
                {plan.price}
              </p>

              <p className="text-sm text-textSoft text-center mt-1">
                for 2 months
              </p>

              {/* Features */}
              <ul className="mt-6 space-y-3 text-sm text-textSoft">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-500">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`mt-8 w-full py-3 rounded-xl font-medium
                  ${
                    plan.highlight
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "border border-gray-300"
                  }`}
              >
                Get Started
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}