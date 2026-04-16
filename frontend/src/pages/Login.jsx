import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  EyeOff,
  Eye,
  ArrowRight,
  Scale,
  ShieldCheck,
} from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative">
        <Link
          to="/"
          className="absolute top-8 left-8 md:top-12 md:left-16 text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2"
        >
          NyayaAI
        </Link>

        <div className="w-full max-w-md mx-auto pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                  {isLogin ? "Welcome back." : "Create an account."}
                </h1>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {isLogin
                    ? "Enter your credentials to access your legal dashboard and case history."
                    : "Join NyayaAI to decode complex legal documents and get step-by-step guidance."}
                </p>
              </div>

              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => e.preventDefault()}
              >
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex flex-col gap-2"
                  >
                    <label className="text-xs font-bold tracking-widest uppercase text-gray-500">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. John Doe"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-widest uppercase text-gray-500">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail size={18} className="absolute left-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold tracking-widest uppercase text-gray-500">
                      Password
                    </label>
                    {isLogin && (
                      <a
                        href="#"
                        className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <Lock size={18} className="absolute left-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-12 py-3.5 text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button className="w-full mt-2 bg-gray-900 hover:bg-black text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-medium text-sm transition-all shadow-sm active:scale-[0.98]">
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={16} />
                </button>

                <div className="relative flex items-center justify-center mt-4 mb-2">
                  <div className="absolute w-full h-px bg-gray-200"></div>
                  <span className="relative bg-white px-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
                    Or continue with
                  </span>
                </div>

                <button className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 rounded-xl py-3.5 flex items-center justify-center gap-3 font-medium text-sm transition-all shadow-sm">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </button>
              </form>

              {/* Toggle Login/Signup */}
              <p className="mt-8 text-center text-sm text-gray-500">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-semibold text-gray-900 hover:text-emerald-600 transition-colors underline decoration-gray-300 underline-offset-4"
                >
                  {isLogin ? "Sign up" : "Log in"}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 left-8 md:bottom-8 md:left-16 right-8 md:right-16 text-center lg:text-left">
          <p className="text-[10px] text-gray-400">
            Protected by reCAPTCHA and subject to the NyayaAI{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <div className="hidden lg:flex w-1/2 bg-[#0a0a0a] relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800/40 via-[#0a0a0a] to-[#0a0a0a] z-0 pointer-events-none"></div>

        <div className="absolute inset-0 z-0 pointer-events-none bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/dot-pattern-bg.svg')] bg-cover bg-center opacity-10"></div>

        <div className="relative z-10 max-w-lg mt-auto mb-30">
          <Scale size={48} className="text-gray-700 mb-8" strokeWidth={1} />
          <h2 className="text-4xl xl:text-5xl font-medium text-white tracking-tight leading-tight mb-6">
            Justice shouldn't be a privilege.
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed font-light">
            By logging in, you are stepping into a system designed to decode
            complex legal jargon, empower your decisions, and put the law back
            where it belongs—in your hands.
          </p>
        </div>

        <div className="relative z-10 border-t border-gray-800 pt-8 flex items-center justify-between">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`size-10 rounded-full border-2 border-[#0a0a0a] bg-gray-800 flex items-center justify-center text-xs text-gray-400 font-medium z-${
                  10 - i
                }`}
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Join thousands of informed citizens.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
