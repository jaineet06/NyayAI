import { useState } from "react";
import { LockKeyhole, Mic, SparklesIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [promptText, setPromptText] = useState("");
  const navigate = useNavigate();

  const legalAreaTags = [
    {
      name: "Consumer complaint",
      prompt:
        "I received a defective product from an online seller, and they are refusing to issue a replacement or refund...",
    },
    {
      name: "Workplace issue",
      prompt:
        "My employer has withheld my salary for the past two months and is threatening termination if I complain...",
    },
    {
      name: "RTI application",
      prompt:
        "I want to file an RTI to get details about the budget allocation and spending for road repairs in my ward...",
    },
    {
      name: "Police / FIR",
      prompt:
        "The local police station is refusing to register an FIR regarding my stolen two-wheeler. What are my options?",
    },
    {
      name: "Property dispute",
      prompt:
        "A relative is trying to claim full ownership and sell our shared ancestral property without my legal consent...",
    },
    {
      name: "Cyber crime",
      prompt:
        "I clicked on a fraudulent payment link and money was deducted from my bank account. How do I officially report this?",
    },
  ];

  const marqueeTags = [...legalAreaTags, ...legalAreaTags];

  const handleSend = (textToSend = promptText) => {
    if (textToSend.trim().length > 0) {
      navigate("/dashboard", { state: { initialPrompt: textToSend } });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

      <section className="bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridBackground.png')] relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center">
        <div className="relative z-10 px-4 pt-24 pb-12 md:pt-32 md:pb-16 md:px-16 lg:px-24 xl:px-32 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 shadow-sm">
            <div className="relative flex size-3.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-300"></span>
              <span className="relative inline-flex size-2 rounded-full bg-green-600"></span>
            </div>
            AI-powered legal guidance for every Indian
          </div>

          <div className="mb-4 flex flex-col gap-1 items-center">
            <p className="text-3xl md:text-4xl font-medium text-gray-700 tracking-wide italic">
              अपना <span className="text-[#FF9933]">हक़</span> जानो।
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mt-1">
              Know Your <span className="text-emerald-600">Rights.</span>
            </h1>
          </div>

          <p className="mt-2 mb-10 text-base text-gray-600 max-w-2xl leading-relaxed">
            Describe your legal problem in plain language — Hindi, English, or
            Hinglish. Get a step-by-step action plan backed by Indian law. Free.
            Instant. No lawyer needed.
          </p>

          <div className="w-full max-w-3xl mx-auto bg-[#0a0a0a] border border-gray-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-3 md:p-4 mb-4 transition-all duration-300 focus-within:ring-1 focus-within:ring-emerald-500/50 relative z-20">
            <div className="flex flex-col text-left">
              <textarea
                rows={2}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="e.g. My landlord is refusing to return my ₹50,000 deposit..."
                className="w-full bg-transparent text-base md:text-lg text-gray-100 placeholder:text-gray-500 border-0 focus:ring-0 px-2 py-1 resize-none outline-none"
              />

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-800/80">
                <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 tracking-wider uppercase pl-2">
                  Hindi / English / Hinglish
                </span>

                <div className="flex items-center gap-1.5 pr-1">
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors flex items-center justify-center"
                    aria-label="Voice input"
                  >
                    <Mic size={18} strokeWidth={2} />
                  </button>

                  <button
                    onClick={() => handleSend()}
                    type="button"
                    className="p-2 bg-emerald-600 text-white hover:bg-emerald-500 rounded-full transition-colors shadow-md flex items-center justify-center cursor-pointer"
                    aria-label="Send prompt"
                  >
                    <SparklesIcon className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-3xl overflow-hidden mb-10 mask-edges relative z-10">
            <div className="flex w-max animate-marquee gap-3 py-2">
              {marqueeTags.map((tag, index) => (
                <button
                  key={`${tag.name}-${index}`}
                  onClick={() => setPromptText(tag.prompt)}
                  className="bg-white/50 backdrop-blur-sm text-gray-600 whitespace-nowrap text-xs md:text-sm font-medium px-4 py-2 rounded-full border border-gray-200/80 hover:bg-white hover:shadow-sm hover:border-gray-300 hover:text-gray-900 transition-all duration-300 cursor-pointer"
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs md:text-sm font-medium">
            <LockKeyhole size={14} className="text-gray-400" />
            Free to use · No account needed · Your data stays private
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
