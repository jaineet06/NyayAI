import { useEffect, useRef, useState } from "react";

const BuildProcess = () => {
  const segmentRefs = useRef([]);
  const [progress, setProgress] = useState([0, 0, 0]);

  const leftSteps = [
    {
      title: "AI Identifies The Law",
      description:
        "Our system instantly cross-references your situation with the IPC, BNS, and relevant Indian legal frameworks to pinpoint your exact rights.",
    },
    {
      title: "Draft Legal Documents",
      description:
        "Automatically generate formatted, ready-to-use templates for Police FIRs, RTI applications, or Consumer Court complaints based on your case.",
    },
  ];

  const rightSteps = [
    {
      title: "Describe Your Situation",
      description:
        "Simply type or voice-record your legal issue in everyday language—Hindi, English, or Hinglish. No legal terminology or formatting is required.",
    },
    {
      title: "Receive an Action Plan",
      description:
        "Get a clear, step-by-step checklist. Know exactly who to contact, what deadlines to meet, and how to protect yourself legally and safely.",
    },
  ];

  const mobileOrderedSteps = [
    rightSteps[0],
    leftSteps[0],
    rightSteps[1],
    leftSteps[1],
  ];

  useEffect(() => {
    const handleScroll = () => {
      const updated = segmentRefs.current.map((el) => {
        if (!el) return 0;

        const rect = el.getBoundingClientRect();

        const triggerPoint = window.innerHeight * 0.55;

        let percent = (triggerPoint - rect.top) / rect.height;

        percent = Math.min(Math.max(percent, 0), 1);

        return percent;
      });

      setProgress(updated);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="working"
      className="flex flex-col items-center mt-5 md:mt-10 px-6"
    >
      <div className="text-center mb-4">
        <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 mb-3">
          How It Works
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          From confusion to clarity <br className="hidden md:block" />
          in four simple steps.
        </h2>
      </div>

      <div className="hidden md:flex flex-row mt-24">
        <div className="flex flex-col text-right">
          {leftSteps.map((step, index) => (
            <div
              key={index}
              className="w-80 lg:w-96 h-56 mt-56 flex flex-col justify-start pt-2 pr-10"
            >
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="size-4 rounded-full border-[3px] border-gray-900 bg-gray-900 z-10" />

          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                ref={(el) => {
                  if (el) segmentRefs.current[i] = el;
                }}
                className="relative w-0.5 mx-10 h-56 bg-gray-200 overflow-hidden"
              >
                <div
                  style={{ height: `${progress[i] * 100}%` }}
                  className="absolute top-0 left-0 w-full bg-gray-900"
                />
              </div>
              <div
                className={`size-4 rounded-full border-[3px] z-10 transition-colors duration-300 ${
                  progress[i] >= 0.99
                    ? "border-gray-900 bg-gray-900"
                    : "border-gray-300 bg-white"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col text-left">
          {rightSteps.map((step, index) => (
            <div
              key={index}
              className={`w-80 lg:w-96 h-56 flex flex-col justify-start pt-2 pl-10 ${
                index === 0 ? "mt-0" : "mt-56"
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex md:hidden flex-col mt-16 max-w-md w-full">
        {mobileOrderedSteps.map((step, index) => (
          <div key={index} className="relative flex gap-6 pb-10">
            <div className="relative z-10 shrink-0 size-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold mt-0.5 shadow-sm">
              {index + 1}
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuildProcess;
