import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-20 pb-8 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden rounded-t-[2.5rem] mt-20">
      <div className="absolute bottom-0 left-2 md:left-16 lg:left-24 translate-y-[25%] pointer-events-none z-0 select-none flex justify-center items-center">
        <h1
          className="relative text-[23vw] md:text-[14vw] leading-none font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-gray-200 to-emerald-600 opacity-25"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
        >
          NYAYAAI
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="size-8 bg-white text-black flex items-center justify-center rounded-lg font-bold text-xl">
                N
              </div>
              <span className="font-bold text-2xl tracking-tight">NyayaAI</span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              NyayaAI empowers you with instant, AI-driven legal guidance.
              Navigate Indian law confidently, in plain language, without the
              high costs.
            </p>

            {/* <div className="flex items-center gap-5 mt-2">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div> */}
          </div>

          <div className="md:col-span-12 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-5">
              <h3 className="font-semibold text-gray-100">Services</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    AI Consultation
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    Document Review
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    FIR Drafting
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    Case Analysis
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Legal Areas */}
            <div className="flex flex-col gap-5">
              <h3 className="font-semibold text-gray-100">Legal Areas</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    Consumer Rights
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    Property Disputes
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    Workplace Issues
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    Cyber Crime
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="flex flex-col gap-5">
              <h3 className="font-semibold text-gray-100">Company</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    Our Vision
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2"
                  >
                    Careers
                    <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border border-gray-600 text-gray-300">
                      HIRING
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} NyayaAI Design
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="#"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Terms of Service
            </Link>
            <p className="text-gray-500 text-sm hidden md:block">
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
