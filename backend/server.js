import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
//import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function detectCaseType(question) {
  const q = question.toLowerCase();

  // JOB / EMPLOYMENT
  if (
    q.includes("salary") ||
    q.includes("fired") ||
    q.includes("terminated") ||
    q.includes("job") ||
    q.includes("employer") ||
    q.includes("company")
  ) {
    return "JOB";
  }

  // FRAUD / CYBER
  if (
    q.includes("fraud") ||
    q.includes("scam") ||
    q.includes("otp") ||
    q.includes("bank") ||
    q.includes("upi") ||
    q.includes("money lost") ||
    q.includes("hack")
  ) {
    return "FRAUD";
  }

  // LANDLORD / RENT
  if (
    q.includes("landlord") ||
    q.includes("rent") ||
    q.includes("deposit") ||
    q.includes("flat") ||
    q.includes("house") ||
    q.includes("evict")
  ) {
    return "LANDLORD";
  }

  return "OTHER";
}

app.post("/ask", async (req, res) => {
  try {

    const token = req.headers.authorization?.split(" ")[1];

    const { question, history, caseId } = req.body;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

  
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: "Invalid user" });
    }

   const user_id = user.id; 
    const caseType = detectCaseType(question);
  //   const { question, history } = req.body;

  //  let caseId = req.body.caseId;

if (!caseId) {
  const { data: caseData } = await supabase
    .from("cases")
    .insert([
      {
        user_id,
        case_type: caseType,
        title: question.slice(0, 50),
      },
    ])
    .select()
    .single();

  caseId = caseData.id;
}

await supabase.from("messages").insert([
  {
    user_id,
    case_id: caseId,
    role: "user",
    content: question,
  },
]);
    
   

    console.log("Detected Case Type:", caseType); 

    const chatHistory = history
      ?.map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const prompt = `
You are "LegalSahayak AI", a legal guidance assistant for India.

CORE PURPOSE:
You help users understand their legal rights and possible next steps based on:
- Indian Constitution
- Indian Penal Code (IPC / BNS where applicable)
- Labour laws
- Consumer Protection Act
- Cyber laws of India
- Other relevant Indian legal frameworks

CASE TYPE DETECTED: ${caseType}
You MUST prioritize this legal category:
- JOB → employment laws, termination, salary issues
- FRAUD → cyber crime, banking fraud, UPI scams
- LANDLORD → rent, eviction, deposit disputes
- OTHER → general Indian legal guidance

IMPORTANT RULES:
1. Always respond ONLY in the exact same language as the user input.
- If the user writes in English → respond ONLY in simple English
- If the user writes in Hinglish → respond ONLY in Hinglish

Do NOT mix languages inside a single sentence or response.
2. Use very simple language like explaining to a friend
3. DO NOT use legal jargon or complex law terms
4. DO NOT give final legal judgments or act like a lawyer in court
5. Always base your answer on Indian laws and rights only
6. If the issue is not related to Indian law → politely say you can only help with Indian legal guidance
7. Never hallucinate fake sections or fake legal provisions
8. Do not answer in a paragraph format. Always structure your answer in the given example format:

RESPONSE FORMAT (STRICT - MUST FOLLOW EXACTLY):

You MUST NOT add anything outside this format.
You MUST NOT rename sections.
You MUST NOT merge lines.
You MUST NOT add extra headings.

Follow EXACT structure:

Problem Understanding:
<1-2 simple lines>

Relevant Rights (as per Indian law):
- point 1
- point 2
- point 3

What you can do next (Practical steps in India):
- step 1
- step 2
- step 3

Follow-up question:
<one simple question>

⚠️ IMPORTANT:
- Do NOT add bold, markdown, or extra formatting
- Do NOT add extra sections but maintain proper spacing between sections
- Do NOT repeat headings differently
- Output must match EXACT structure above 

EXAMPLE OUTPUT (FOLLOW THIS EXACTLY):

User Question:
My employer fired me without reason. What can I do?

Problem Understanding:
You have been terminated from your job without a clear reason, which may be unfair.

Relevant Rights (as per Indian law):
- You have the right to receive proper notice before termination.
- You may be entitled to compensation if termination is illegal.
- You can approach Labour Court or Industrial Tribunal for unfair dismissal.

What you can do next (Practical steps in India):
- Ask your employer for written reason of termination.
- Collect your appointment letter and salary records.
- File a complaint in Labour Office or Labour Court.

Follow-up question:
Do you have your appointment letter or any written termination notice?

Conversation history:
${chatHistory || "No history"}

User question:
${question}
`;

   const response = await fetch(
      `https://api.groq.com/openai/v1/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model:  "llama-3.1-8b-instant", // "llama3-70b-8192"
          messages: [
            {
              role: "system",
              content: "You are a helpful legal assistant for India.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      },
    );   

    
    const data = await response.json();

    const answer =
      data?.choices?.[0]?.message?.content || "No response from AI";
    await supabase.from("messages").insert([
  {
    user_id,
    case_id: caseId,
    role: "assistant",
    content: answer,
  },
]);

   res.json({ answer, caseId });
  } catch (err) {
    console.error("Groq Error:", err);
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
