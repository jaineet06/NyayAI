import { useRef } from "react";
import { useScroll } from "framer-motion";
import {
  ArrowUpRight,
  Scale,
  BookOpen,
  ShieldCheck,
  FileText,
} from "lucide-react";
import FeatureCard from "../components/FeatureCard";

export default function Features() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const features = [
    {
      title: "Identify the Exact Law",
      description:
        "Ask your question naturally. Our AI instantly connects your issue to the correct sections of the IPC, BNS, or other Indian laws.",
      icon: <Scale className="size-5 text-gray-800" strokeWidth={2} />,
    },
    {
      title: "Step-by-Step Action Plan",
      description:
        "Get a structured, prioritized checklist of exactly what to do next to resolve your dispute legally and safely.",
      icon: <BookOpen className="size-5 text-gray-800" strokeWidth={2} />,
    },
    {
      title: "No Legal Jargon",
      description:
        "We translate complex legal language into plain, accessible terms. Ask in Hindi, English, or Hinglish with ease.",
      icon: <ShieldCheck className="size-5 text-gray-800" strokeWidth={2} />,
    },
    {
      title: "Drafting Assistance",
      description:
        "Generate structured templates for RTI applications, formal complaints, or FIRs instantly, ready to be reviewed.",
      icon: <FileText className="size-5 text-gray-800" strokeWidth={2} />,
    },
  ];

  return (
    <section id="feature" className="bg-white py-16 md:py-32 px-6">
      <div
        ref={containerRef}
        className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start"
      >
        <div className="w-full lg:w-5/12 relative lg:sticky lg:top-40 z-10">
          <p className="text-[12px] font-bold tracking-widest uppercase text-emerald-600 mb-4">
            Core Capabilities
          </p>

          <h2 className="text-2xl md:text-3xl font-medium text-gray-900 tracking-tight leading-snug mb-6">
            Everything you need to navigate the law with certainty.
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed mb-12 max-w-sm">
            We translate complex legal frameworks into actionable, step-by-step
            guidance. No jargon, no hidden fees—just complete clarity.
          </p>

          <div className="bg-[#0a0a0a] rounded-2xl p-6 md:p-8">
            <h3 className="text-base font-medium text-white mb-6 leading-snug max-w-[250px]">
              Trusted by citizens navigating complex legal situations daily.
            </h3>
            <button className="bg-white text-black text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-gray-200 transition-colors">
              Explore use cases
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-7/12 relative mt-4 lg:mt-0">
          {features.map((feature, i) => {
            const targetScale = 1 - (features.length - i) * 0.04;
            return (
              <FeatureCard
                key={i}
                i={i}
                {...feature}
                progress={scrollYProgress}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
