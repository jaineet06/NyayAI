export default function Stats() {
  // These metrics reflect the actual value of an AI legal platform:
  // Volume of help, depth of legal knowledge, availability, and affordability.
  const stats = [
    {
      value: "10K+",
      label: "Queries Resolved",
    },
    {
      value: "28+",
      label: "Availability in States",
    },
    {
      value: "24/7",
      label: "Instant Accessibility",
    },
    {
      value: "₹0",
      label: "Consultation Cost",
    },
  ];

  return (
    <section className="bg-white pt-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 border-y border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center py-8 px-4"
            >
              <span className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                {stat.value}
              </span>

              <p className="text-[11px] font-medium tracking-widest text-gray-500 uppercase mt-2 text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
