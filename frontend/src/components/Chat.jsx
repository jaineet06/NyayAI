import { useState, useRef, useEffect } from "react";
import { ArrowUp, Plus } from "lucide-react";
import { useLocation } from "react-router-dom";

import { supabase } from "../lib/supabase-clients";
import ReactMarkdown from "react-markdown";
import { usePdfExport } from "../hooks/usePdfExport";
import { Download } from "lucide-react";

import { Mic, MicOff } from "lucide-react";
import { useVoiceInput } from "../hooks/useVoiceInput";
import { Paperclip, X, FileText, Image } from "lucide-react"; 

const Chat = ({ caseId }) => {
  const { exportToPdf } = usePdfExport();
  const location = useLocation();
  const initialPrompt = location.state?.initialPrompt || "";
  const [prompt, setPrompt] = useState(initialPrompt);
  const [user, setUser] = useState(null);
  const [currentCaseId, setCurrentCaseId] = useState(caseId);
  const [lang, setLang] = useState("hi-IN");


  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const [attachedFile, setAttachedFile] = useState(null); // { name, type, base64, preview }
const fileInputRef = useRef(null);

const handleFileSelect = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.type)) {
    alert("Please upload a PDF, image (JPG/PNG), or Word document.");
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    alert("File must be under 10MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result.split(",")[1]; // strip data:...;base64,
    setAttachedFile({
      name: file.name,
      type: file.type,
      base64,
      preview: file.type.startsWith("image/") ? reader.result : null,
    });
  };
  reader.readAsDataURL(file);

  // reset so same file can be re-selected
  e.target.value = "";
};

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };
     
    getUser();
  }, []);

  useEffect(() => {
    if (!caseId) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("case_id", caseId)
        .order("created_at", { ascending: true });

      setMessages(data || []);
    };

    fetchMessages();
  }, [caseId]);

  // Add at top of Chat component
const isDocumentMessage = (content) => {
  return (
    content.includes("To,") &&
    content.includes("Subject:") &&
    content.includes("Yours faithfully")
  );
};

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const { isListening, error: voiceError, startListening, stopListening } = useVoiceInput({
  onTranscript: (text) => setPrompt((prev) => prev + text),
  language: lang,
});

  const sendMessage = async () => {
    if (!prompt.trim()) return;
    
    const userMessage = prompt;
    
    const updatedMessages = [
  ...messages,
  {
    role: "user",
    content: attachedFile
      ? `${userMessage}\n\n📎 *Attached: ${attachedFile.name}*`
      : userMessage,
  },
];

    setMessages(updatedMessages);
    setPrompt("");

    setAttachedFile(null);

    try {
      
     const { data: sessionData, error } = await supabase.auth.getSession();

if (error || !sessionData?.session) {
  console.error("No active session");
  return;
}

const token = sessionData.session.access_token;

      if (!token) {
        console.error("No token found");
        return;
      }

      console.log("TOKEN:", token);

      // 2. Call backend
      const res = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          question: userMessage,
          history: updatedMessages,
          caseId: currentCaseId,

            ...(attachedFile && {
    documentBase64: attachedFile.base64,
    documentType: attachedFile.type,
    documentName: attachedFile.name,
  }),

          
        }),
      });

      const data = await res.json();

      if (!currentCaseId && data.caseId) {
  setCurrentCaseId(data.caseId); 
}
      const answer = data?.answer || "Sorry, something went wrong.";

      // 4. Update UI
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
    } catch (err) {
      console.error(err);
    }
  };

  const suggestions = [
    "How do I file a consumer complaint for a faulty product?",
    "What are my rights against unfair workplace termination?",
    "Draft an RTI application to check my passport status.",
    "How do I register an FIR for online financial fraud?",
  ];

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto w-full relative overflow-hidden">
     
     
<div className="flex-1 overflow-y-auto flex flex-col gap-3 px-4 pt-8 pb-6">
  
  {messages.length === 0 && (
    <div className="flex flex-col items-center text-center px-4 my-auto">
      <span className="text-emerald-600 font-medium tracking-wide text-lg mb-2">
        नमस्ते
      </span>
      <h2 className="text-2xl md:text-3xl font-medium text-gray-900 tracking-tight mb-2">
        How can I help you today?
      </h2>
      <p className="text-sm text-gray-500 mb-10 max-w-md">
        Describe your situation in plain language—Hindi, English, or
        Hinglish. I will guide you through your legal rights and next steps.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl text-left">
        {suggestions.map((suggestion, index) => (
          <button

            key={index}
            onClick={() => setPrompt(suggestion)}
            className="p-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all text-sm text-gray-600 text-left"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )}

  
 {messages.map((msg, index) => (
  <div
    key={index}
    className={`flex flex-col gap-2 max-w-[80%] ${
      msg.role === "user" ? "self-end" : "self-start"
    }`}
  >
    <div
      className={`p-3 rounded-xl text-sm ${
        msg.role === "user"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 mb-2">{children}</ol>,
          li: ({ children }) => <li className="text-sm">{children}</li>,
          hr: () => <hr className="border-gray-200 my-3" />,
          h1: ({ children }) => <h1 className="font-bold text-base mb-1">{children}</h1>,
          h2: ({ children }) => <h2 className="font-bold text-sm mb-1">{children}</h2>,
          code: ({ children }) => (
            <pre className="bg-gray-800 text-gray-400 text-xs rounded-lg p-3 my-2 whitespace-pre-wrap overflow-x-auto">
              {children}
            </pre>
          ),
        }}
      >
        {msg.content}
      </ReactMarkdown>
    </div>

    {/* PDF Download button — only shows on document messages */}
    {msg.role === "assistant" && isDocumentMessage(msg.content) && (
      <button
        onClick={() =>
          exportToPdf(
            msg.content,
            `NyayaAI_Document_${new Date().toLocaleDateString("en-IN").replace(/\//g, "-")}`
          )
        }
        className="flex items-center gap-2 self-start px-4 py-2 bg-gray-900 hover:bg-gray-1000 text-white text-xs font-medium rounded-xl transition-colors shadow-sm"
      >
        <Download size={14} />
        Download as PDF
      </button>
    )}
  </div>
))}
  <div ref={messagesEndRef} />
</div>

    <div className="mt-auto bg-white pt-4 pb-2 z-10">

  {/* File preview chip */}
  {attachedFile && (
    <div className="flex items-center gap-2 mb-2 px-1">
      <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 max-w-xs">
        {attachedFile.preview ? (
          <img
            src={attachedFile.preview}
            alt="preview"
            className="w-8 h-8 rounded object-cover"
          />
        ) : (
          <FileText size={16} className="text-emerald-600 shrink-0" />
        )}
        <span className="truncate text-xs font-medium">{attachedFile.name}</span>
        <button
          onClick={() => setAttachedFile(null)}
          className="ml-1 text-gray-400 hover:text-gray-700 transition-colors shrink-0"
        >
          <X size={14} />
        </button>
      </div>
      <span className="text-xs text-gray-400 italic">
        I'll summarize this document for you
      </span>
    </div>
  )}

  <div className="w-full bg-white border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-gray-900/10 focus-within:border-gray-300">
    <textarea
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      className="w-full p-4 resize-none outline-none bg-transparent text-gray-900 placeholder:text-gray-400 text-base max-h-40 overflow-y-auto"
      placeholder={
        attachedFile
          ? "Ask me to summarize, explain, or simplify this document..."
          : "Describe your legal issue..."
      }
      rows="1"
      onInput={(e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      }}
    />

    <div className="flex items-center justify-between pb-3 px-4 pt-1">
      <div className="flex items-center gap-2">

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* + / Paperclip button → triggers file input */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`flex items-center justify-center border transition-colors p-1.5 rounded-full size-8 ${
            attachedFile
              ? "bg-emerald-50 border-emerald-200 text-emerald-600"
              : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          }`}
          aria-label="Attach document"
          title="Upload PDF, image, or Word document"
        >
          <Paperclip size={18} strokeWidth={2.5} />
        </button>

        {/* 🎤 Mic button (from previous step) */}
        <button
          onClick={isListening ? stopListening : startListening}
          title={isListening ? "Stop recording" : "Speak your question"}
          className={`flex items-center justify-center p-1.5 rounded-full size-8 transition-colors border ${
            isListening
              ? "bg-red-500 border-red-400 text-white animate-pulse"
              : "bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          {isListening ? <MicOff size={18} strokeWidth={2.5} /> : <Mic size={18} strokeWidth={2.5} />}
        </button>

        {/* Language selector */}
        {isListening && (
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white text-gray-600 outline-none"
          >
            <option value="hi-IN">हिंदी</option>
            <option value="en-IN">English</option>
            <option value="gu-IN">ગુજરાતી</option>
          </select>
        )}
      </div>

      {/* Send button */}
      <button
        onClick={sendMessage}
        disabled={prompt.trim().length === 0 && !attachedFile}
        className={`flex items-center justify-center p-1.5 rounded-full size-8 transition-colors ${
          prompt.trim().length > 0 || attachedFile
            ? "bg-gray-900 text-white hover:bg-black shadow-md"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        <ArrowUp size={18} strokeWidth={2.5} />
      </button>
    </div>

    {voiceError && (
      <p className="text-xs text-red-500 px-4 pb-2">⚠️ {voiceError}</p>
    )}
  </div>

  <p className="text-[11px] text-gray-400 text-center mt-4">
    NyayaAI can make mistakes. Always verify important legal information with an advocate.
  </p>
</div>
      </div>
  );
};

export default Chat;
