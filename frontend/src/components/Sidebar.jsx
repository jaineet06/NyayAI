
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LogOut, Scale, Plus, MessageSquare } from "lucide-react";
import { supabase } from "../lib/supabase-clients";

const Sidebar = ({ children, onSelectCase , onNewChat }) => {
  const [profile, setProfile] = useState(null);
  const [cases, setCases] = useState([]);
  const [activeCaseId, setActiveCaseId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", user.id)
        .single();

      setProfile(profileData);

      // Fetch cases with latest message as preview
      const { data: casesData } = await supabase
        .from("cases")
        .select("id, title, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setCases(casesData || []);
    };

    fetchData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleSelectCase = (caseId) => {
    setActiveCaseId(caseId);
    onSelectCase?.(caseId);
  };

  const handleNewChat = () => {
    setActiveCaseId(null);
    onSelectCase?.(null);
  };

  // Group cases by date
  const groupByDate = (cases) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups = { Today: [], Yesterday: [], Earlier: [] };

    cases.forEach((c) => {
      const d = new Date(c.created_at);
      if (d.toDateString() === today.toDateString()) groups.Today.push(c);
      else if (d.toDateString() === yesterday.toDateString()) groups.Yesterday.push(c);
      else groups.Earlier.push(c);
    });

    return groups;
  };

  const grouped = groupByDate(cases);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full shrink-0">

        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            
            <Link to="/"  className="font-bold text-gray-900 text-lg">NyayaAI</Link>
          </div>
        </div>

        {/* New Chat */}
        <div className="px-4 py-4">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        {/* Cases grouped by date */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-4">
          {Object.entries(grouped).map(([label, items]) =>
            items.length === 0 ? null : (
              <div key={label}>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-1">
                  {label}
                </p>
                <div className="space-y-0.5">
                  {items.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCase(c.id)}
                      className={`w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors group ${
                        activeCaseId === c.id
                          ? "bg-gray-200 text-gray-900"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                    >
                      <MessageSquare
                        size={14}
                        className="shrink-0 mt-0.5 text-gray-400"
                      />
                      <span className="text-xs truncate leading-5">
                        {c.title || "Untitled case"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )
          )}

          {cases.length === 0 && (
            <p className="text-xs text-gray-400 text-center mt-8 px-4">
              No cases yet. Start a conversation!
            </p>
          )}
        </div>

        {/* User info + sign out */}
        <div className="border-t border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-semibold text-sm shrink-0">
                {profile?.full_name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {profile?.full_name || "User"}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {profile?.email || ""}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
              title="Sign out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;