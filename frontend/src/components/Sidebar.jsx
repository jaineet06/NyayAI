import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabase-clients";


const Sidebar = ({ children , setCaseId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    const [cases, setCases] = useState([]);
    useEffect(() => {
  const fetchCases = async () => {
    const { data } = await supabase
      .from("cases")
      .select("*")
      .order("created_at", { ascending: false });

    setCases(data || []);
  };

  fetchCases();
}, []);

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans text-gray-900 relative">
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className={`h-full bg-[#f9f9f9] border-r border-gray-200 flex flex-col shrink-0 overflow-hidden ${
          isMobile ? "absolute left-0 top-0 z-50 shadow-2xl" : "relative z-20"
        }`}
      >
        <div className="w-[280px] h-full flex flex-col justify-between p-4">
          <div>
           <button
  onClick={() => setCaseId(null)}
  className="w-full flex items-center gap-3 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 px-4 py-3 rounded-xl font-medium text-sm text-gray-900 group"
>
  <Plus
    size={16}
    className="text-gray-500 group-hover:text-gray-900 transition-colors"
  />
  New Legal Query
</button>

            <div className="mt-8">
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3 px-2">
                Recent Cases
              </p>
              <div className="flex flex-col gap-1">
                {cases.map((caseItem) => (
  <button
    key={caseItem.id}
    onClick={() => setCaseId(caseItem.id)}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-200/50 text-left transition-colors group"
  >
    <MessageSquare
      size={14}
      className="text-gray-400 group-hover:text-gray-600 shrink-0"
    />
    <span className="text-sm text-gray-600 group-hover:text-gray-900 truncate">
      {caseItem.title}
    </span>
  </button>
))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 flex flex-col gap-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-200/50 text-left transition-colors group">
              <Settings
                size={16}
                className="text-gray-400 group-hover:text-gray-600 shrink-0"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">
                Settings
              </span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-left transition-colors group">
              <LogOut
                size={16}
                className="text-red-400 group-hover:text-red-600 shrink-0"
              />
              <span className="text-sm text-red-500 group-hover:text-red-600">
                Sign Out
              </span>
            </button>

            <div className="mt-2 flex items-center gap-3 px-3 py-2">
              <div className="size-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                JD
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-gray-900 truncate">
                  John Doe
                </span>
                <span className="text-xs text-gray-500 truncate">
                  Free Plan
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col h-full relative min-w-0">
        <header className="h-14 flex items-center px-4 absolute top-0 left-0 w-full z-10 bg-white/80 backdrop-blur-sm border-b border-transparent transition-colors">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors flex items-center justify-center"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen && !isMobile ? (
              <PanelLeftClose size={20} strokeWidth={2} />
            ) : (
              <PanelLeftOpen size={20} strokeWidth={2} />
            )}
          </button>

          <AnimatePresence>
            {(!isSidebarOpen || isMobile) && (
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-bold text-lg text-gray-900 tracking-tight ml-3 cursor-pointer"
                onClick={() => navigate("/")}
              >
                NyayaAI
              </motion.h1>
            )}
          </AnimatePresence>
        </header>

        <div className="flex-1 overflow-y-auto pt-14 px-2 md:px-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
