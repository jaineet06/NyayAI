import { SparklesIcon } from "lucide-react";

const CTA = () => {
  return (
    <section className="flex flex-col items-center justify-center max-w-7xl mx-auto my-10 px-4">
      <h3 className="font-domine text-3xl md:text-4xl max-w-lg text-center bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent font-bold tracking-tight">
        Your Legal Action Plan Is Just One Prompt Away
      </h3>

      <p className="mt-4 text-sm/6 text-gray-500 max-w-md text-center">
        Describe your situation in plain language—Hindi, English, or
        Hinglish—and get instant, step-by-step guidance backed by Indian law.
      </p>

      <button
        onClick={() => scrollTo({ left: 0, top: 0, behavior: "smooth" })}
        className="mt-8 flex items-center bg-black hover:bg-black/90 shadow-lg transition px-6 text-base py-3 text-white rounded-full"
      >
        <SparklesIcon width={18} />
        <span className="ml-2">Get Instant Legal Clarity Now</span>
      </button>

      <img
        src="/src/assets/hand.png"
        alt="Hand"
        width={200}
        height={200}
        className="w-40 mt-20"
      />
    </section>
  );
};

export default CTA;
