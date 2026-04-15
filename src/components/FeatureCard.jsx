import { useTransform, motion } from "framer-motion";

const FeatureCard = ({
  title,
  description,
  icon,
  i,
  progress,
  targetScale,
}) => {
  const scale = useTransform(progress, [i * 0.25, 1], [1, targetScale]);

  return (
    <div
      className="sticky h-fit flex items-center justify-center w-full mb-5"
      style={{ top: `calc(80px + ${i * 12}px)` }}
    >
      <motion.div
        style={{ scale }}
        className="w-full mb-32 lg:mb-24 last:mb-0 p-6 md:p-8 rounded-[1.5rem] bg-white border border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.04)] origin-top transition-all"
      >
        <div className="flex flex-col gap-4">
          <div className="shrink-0 w-fit p-3 rounded-xl bg-gray-50 shadow-sm border border-gray-100">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureCard;
