import { MoveRight, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Features", href: "#feature" },
    { name: "How it works", href: "#working" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    navLinks.forEach((link) => {
      const id = link.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleTopScroll = () => {
      if (window.scrollY < 100) setActiveLink("");
    };
    window.addEventListener("scroll", handleTopScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleTopScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleScrollClick = (e, href) => {
    e.preventDefault();
    setActiveLink(href);
    setIsOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 pointer-events-none">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 35 }}
          className={`pointer-events-auto mx-auto flex items-center justify-between backdrop-blur-md origin-top bg-transparent ${
            isScrolled
              ? "w-full md:w-[90%] md:max-w-5xl px-4 py-2.5 md:border md:border-gray-200 md:shadow-md md:rounded-full md:mt-4 bg-white/70"
              : "w-full px-4 py-4 md:px-16 lg:px-24 xl:px-32 border-gray-200 md:rounded-none md:mt-0"
          }`}
        >
          <button
            className="flex items-center gap-2 pl-2 cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setActiveLink("");
            }}
          >
            <h1 className="font-bold text-xl text-gray-900 tracking-tight">
              NyayaAI
            </h1>
          </button>

          <motion.div
            layout
            className={`hidden md:flex items-center gap-1 ${
              isScrolled
                ? "bg-gray-50/80 border border-gray-200/80 rounded-full p-1 shadow-inner"
                : "p-1"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollClick(e, link.href)}
                className="relative px-4 py-2 text-[15px] font-medium rounded-full cursor-pointer"
              >
                {activeLink === link.href && (
                  <motion.div
                    layoutId="activeBadge"
                    className="absolute inset-0 bg-white border border-gray-200/60 shadow-sm rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    activeLink === link.href
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                </span>
              </a>
            ))}
          </motion.div>

          <div className="flex items-center gap-2 md:gap-3">
            <motion.div layout className="hidden md:flex items-center gap-5">
              <Link
                to="/login"
                className="text-[14px] font-semibold text-gray-500 hover:text-gray-900 transition-colors"
              >
                Log in
              </Link>

              <span className="w-px h-4 bg-gray-300"></span>

              <Link
                to="/dashboard"
                className={`flex items-center justify-center gap-3 text-white text-[14px] font-medium rounded-full cursor-pointer transition-all duration-300 ${
                  isScrolled
                    ? "bg-black hover:bg-gray-800 pl-4 pr-1.5 py-1.5 shadow-md"
                    : "bg-black hover:bg-gray-800 px-5 py-2"
                }`}
              >
                Open App
                <span className="size-6 rounded-full bg-white flex items-center justify-center text-gray-900 shadow-sm">
                  <MoveRight size={12} strokeWidth={2.5} />
                </span>
              </Link>
            </motion.div>

            <Link
              to="/dashboard"
              className="md:hidden flex items-center justify-center bg-black text-white text-[13px] font-medium rounded-full px-4 py-2 hover:bg-gray-800 transition-colors pointer-events-auto"
            >
              Open App
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden size-9 flex items-center justify-center rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors pointer-events-auto"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-800"
              >
                <line x1="4" x2="20" y1="9" y2="9" />
                <line x1="4" x2="15" y1="15" y2="15" />
              </svg>
            </button>
          </div>
        </motion.div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-50 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h1 className="font-bold text-xl text-gray-900 tracking-tight">
                  NyayaAI
                </h1>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <XIcon className="size-5" />
                </button>
              </div>

              <div className="flex flex-col px-6 py-8 gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollClick(e, link.href)}
                    className={`text-lg font-medium transition-colors cursor-pointer ${
                      activeLink === link.href
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="mt-auto p-6 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 w-full bg-black text-white text-[15px] font-medium px-5 py-3.5 rounded-full shadow-md"
                >
                  Open App
                  <MoveRight size={16} />
                </Link>

                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-full text-gray-500 hover:text-gray-900 text-[15px] font-medium px-5 py-3 transition-colors"
                >
                  Log in to account
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
