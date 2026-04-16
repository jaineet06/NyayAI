import { Plus, X } from "lucide-react";
import React from "react";

const FAQs = () => {
  const [openIndex, setOpenIndex] = React.useState(-1);

  const faqs = [
    {
      question: "Is this free to use?",
      answer:
        "Yes, completely free for basic use. No account needed, no hidden charges. Describe your situation and explore your options without paying anything.",
    },
    {
      question: "Can I write in Hindi or Gujarati?",
      answer:
        "Yes. Use Hindi, Gujarati, Hinglish, or English — whichever is comfortable. The tool will respond in the same language.",
    },
    {
      question: "Is this legal advice?",
      answer:
        "No. NyayaAI is a legal information tool, not a law firm. We help you understand what the law generally says and what options may be available. We do not provide legal advice, and nothing on this platform should be treated as such. For any formal legal action, always consult a qualified advocate.",
    },
    {
      question: "How accurate is the information?",
      answer:
        "NyayaAI references publicly available Indian laws and general legal procedures. However, laws are amended regularly, interpretations vary by court and jurisdiction, and no AI tool can account for every detail of your unique situation. Always verify any information independently before acting on it.",
    },
    {
      question: "Is my information private?",
      answer:
        "Your inputs are not shared with third parties. We do not sell user data. Using NyayaAI without an account means nothing is stored against your identity.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="flex items-center justify-center py-20 px-4 bg-white">
      <div className="w-full max-w-3xl">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 mb-3">
            FAQs
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Everything you need to know
          </h2>
        </div>

        {/* FAQs List */}
        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-b border-gray-200 last:border-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between py-5 text-left transition-colors group"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base md:text-lg font-medium pr-4 transition-colors ${
                      isOpen
                        ? "text-emerald-600"
                        : "text-gray-900 group-hover:text-emerald-600"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span className="shrink-0 ml-4">
                    <div
                      className={`size-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-gray-100 text-gray-900 rotate-90"
                          : "bg-gray-50 text-gray-500 group-hover:bg-gray-100 group-hover:text-gray-900"
                      }`}
                    >
                      {isOpen ? (
                        <X size={16} strokeWidth={2.5} />
                      ) : (
                        <Plus size={16} strokeWidth={2.5} />
                      )}
                    </div>
                  </span>
                </button>

                {/* The CSS Grid trick for perfect accordion animation.
                  It smoothly animates from 0fr to 1fr without needing a fixed max-height.
                */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-5"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-base text-gray-600 leading-relaxed pr-8 md:pr-12">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
