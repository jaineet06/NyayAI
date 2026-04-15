import { MenuIcon, MoveRight, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/#working");

  const navLinks = [
    { name: "How it works", href: "/#working" },
    { name: "Legal Areas", href: "/#legalAreas" },
    { name: "About", href: "/#about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 pointer-events-none">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 35 }}
          className={`pointer-events-auto mx-auto flex items-center justify-between backdrop-blur-md origin-top ${
            isScrolled
              ? "w-full md:w-[90%] md:max-w-5xl px-4 py-2.5 bg-white/95 md:border md:border-gray-200 md:shadow-md md:rounded-full md:mt-4"
              : "w-full px-4 py-4 md:px-16 lg:px-24 xl:px-32 bg-transparent border-gray-200 md:rounded-none md:mt-0"
          }`}
        >
          <Link
            to="/"
            className="flex items-center gap-2 pl-2"
            onClick={() => setActiveLink("/")}
          >
            <h1 className="font-bold text-xl text-gray-900 tracking-tight">
              NyayaAI
            </h1>
          </Link>

          <motion.div
            layout
            className={`hidden md:flex items-center gap-1 ${
              isScrolled
                ? "bg-gray-50/80 border border-gray-200/80 rounded-full p-1"
                : "p-1"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setActiveLink(link.href)}
                className="relative px-4 py-2 text-[16px] font-medium rounded-full"
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
              </Link>
            ))}
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.div layout>
              <Link
                to="/login"
                className={`hidden md:flex items-center justify-center gap-3 text-zinc-50 text-[16px] font-medium rounded-full cursor-pointer transition-colors duration-300 ${
                  isScrolled
                    ? "bg-gradient-to-r from-gray-900 to-gray-700 hover:from-black hover:to-gray-800 pl-5 pr-1.5 py-1.5 shadow-sm"
                    : "bg-black hover:bg-gray-800 px-5 py-2"
                }`}
              >
                Login
                <span className="size-7 rounded-full bg-white flex items-center justify-center text-gray-900 shadow-sm">
                  <MoveRight size={14} strokeWidth={2.5} />
                </span>
              </Link>
            </motion.div>

            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <MenuIcon className="size-6 text-gray-800" />
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Redesigned Mobile Menu Side-Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-50 flex flex-col md:hidden"
            >
              {/* Mobile Header */}
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
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => {
                      setActiveLink(link.href);
                      setIsOpen(false);
                    }}
                    className={`text-lg font-medium transition-colors ${
                      activeLink === link.href
                        ? "text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto p-6 border-t border-gray-100">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 w-full bg-black text-white text-base font-medium px-5 py-3.5 rounded-full"
                >
                  Login
                  <MoveRight size={18} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
