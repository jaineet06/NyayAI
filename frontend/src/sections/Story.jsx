import { useEffect, useRef, useState } from "react";
import { Scale, FileWarning, Wallet, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const Story = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.4"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
  });
  const skewX = useTransform(smoothProgress, [0, 1], [-10, 0]);
  const blur = useTransform(
    smoothProgress,
    [0, 0.7, 1],
    ["blur(15px)", "blur(2px)", "blur(0px)"]
  );
  const scale = useTransform(smoothProgress, [0, 1], [0.85, 1]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.6, 1], [0, 0, 1]);

  const physicalBoxStyle = {
    transformPerspective: "1200px",
    skewX,
    filter: blur,
    scale,
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="bg-white py-20 px-6 overflow-hidden relative"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-emerald-600"></span>
            <p className="text-xs font-bold tracking-widest uppercase text-emerald-600">
              The Justice Gap
            </p>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Why NyayaAI matters.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(250px,auto)] origin-right">
          <motion.div
            style={physicalBoxStyle}
            className="md:col-span-2 bg-[#0a0a0a] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between shadow-lg relative overflow-hidden group border border-black/10"
          >
            <Scale className="absolute -bottom-10 -right-10 size-64 text-white opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 ease-out" />

            <motion.div
              style={{ opacity: contentOpacity }}
              className="relative z-10 flex flex-col h-full justify-between"
            >
              <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-tight max-w-lg mb-6">
                The law is meant to protect everyone. Yet, it remains hidden.
              </h3>
              <p className="text-base text-gray-400 leading-relaxed max-w-md mt-auto">
                Millions endure workplace exploitation, fraud, and disputes
                simply because navigating the Indian justice system feels
                intimidating, confusing, and out of reach.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            style={physicalBoxStyle}
            className="bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            <motion.div
              style={{ opacity: contentOpacity }}
              className="flex flex-col h-full"
            >
              <div className="size-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 mb-8">
                <FileWarning
                  size={24}
                  className="text-gray-800"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  The Language Barrier
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Acts, IPC sections, and legal codes are written for
                  lawyers—making them nearly impossible for the common man to
                  interpret correctly.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={physicalBoxStyle}
            className="bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            <motion.div
              style={{ opacity: contentOpacity }}
              className="flex flex-col h-full"
            >
              <div className="size-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 mb-8">
                <Wallet size={24} className="text-gray-800" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  The Financial Wall
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Basic legal consultations carry heavy retainer fees, meaning
                  seeking justice often costs more than the dispute itself.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={physicalBoxStyle}
            className="md:col-span-2 bg-[#F2FCF5] border border-[#DDF4E4] rounded-[2rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group"
          >
            <motion.div
              style={{ opacity: contentOpacity }}
              className="flex flex-col h-full"
            >
              <div className="size-12 rounded-xl bg-white flex items-center justify-center shadow-sm mb-8 relative z-10 transition-transform duration-500 group-hover:-translate-y-1">
                <ShieldCheck
                  size={24}
                  className="text-emerald-600"
                  strokeWidth={2}
                />
              </div>
              <div className="relative z-10 mt-auto">
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight mb-3">
                  Bridging the gap with AI.
                </h4>
                <p className="text-base text-gray-700 leading-relaxed max-w-xl">
                  NyayaAI strips away the fear, cost, and complexity. By
                  translating Indian law into instant, actionable guidance, we
                  are putting the power of the justice system back where it
                  belongs—in your hands.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Story;
