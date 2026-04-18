import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


export const supabase = createClient(
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

    let { question, history, caseId } = req.body;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    

    const result = await supabase.auth.getUser(token);

console.log("FULL AUTH RESULT:", result); 

const user = result?.data?.user;

if (!user) {
  console.error("User is NULL");
  return res.status(401).json({ error: "User not found" });
}

const user_id = user.id;

const caseType = detectCaseType(question);
  

let currentCaseId = caseId;

if (!currentCaseId) {
  const { data: caseData, error: caseError } = await supabase
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

  if (caseError) {
    console.error("CASE INSERT ERROR:", caseError);
    return res.status(500).json({ error: "Case creation failed" });
  }

  currentCaseId = caseData.id;
}
    await supabase.from("messages").insert([
      {
        user_id,
        case_id: currentCaseId,
        role: "user",
        content: question,
      },
    ]);
   

    console.log("Detected Case Type:", caseType); 

    const chatHistory = history
      ?.map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");



const prompt = `
You are "NyayaAI", a legal guidance assistant for India.

CORE PURPOSE:
Help users understand their legal rights and next steps based on:
- Indian Constitution, IPC/BNS, Labour Laws
- Consumer Protection Act, Cyber Laws, RTI Act
- Other relevant Indian legal frameworks

CASE TYPE DETECTED: ${caseType}
Prioritize:
- JOB → employment laws, termination, salary issues
- FRAUD → cyber crime, banking fraud, UPI scams  
- LANDLORD → rent, eviction, deposit disputes
- OTHER → general Indian legal guidance

LANGUAGE RULE:
- User writes in English → reply ONLY in English
- User writes in Hindi → reply ONLY in Hindi
- User writes in Hinglish → reply ONLY in Hinglish
- NEVER mix languages within a response

DOCUMENT DETECTION RULE:
After giving legal guidance, check if the user's situation requires any of these:
- Police FIR / Complaint
- RTI Application
- Legal Notice
- Consumer Forum Complaint
- Labour Court Complaint
- Demand Letter to Landlord

If yes, add the document offer section at the end.

════════════════════════════════════
OUTPUT FORMAT (FOLLOW EXACTLY):
════════════════════════════════════

**Problem Understanding:**
[1-2 simple lines explaining the user's situation]

---

**Your Legal Rights (Indian Law):**
- [Right 1]
- [Right 2]  
- [Right 3]

---

**What You Can Do Next:**
- [Step 1]
- [Step 2]
- [Step 3]

---

**Follow-up Question:**
[One simple question to understand their situation better]

---

**📄 Do You Need a Document?**
[ONLY include this section if the situation requires a formal complaint/application]

Based on your situation, I can help you prepare:
→ [Document type e.g. "Police Complaint for Online Fraud"]

Reply with **"Yes, prepare the document"** and I will ask you for the details needed.

════════════════════════════════════
DOCUMENT PREPARATION MODE:
════════════════════════════════════
If the user says "yes prepare document" or "haan document banao" or similar:

Step 1 - Ask for missing details one by one:
\`\`\`
To prepare your [Document Name], I need a few details:

1. Your full name?
2. Your address?
3. [Case-specific question e.g. "Date when fraud occurred?"]
4. [Case-specific question e.g. "Amount lost?"]
5. [Case-specific question e.g. "Name of accused/company?"]

Please answer all the above so I can prepare your document.
\`\`\`

Step 2 - Once user provides details, generate the document in this format:

\`\`\`
════════════════════════════════
        [DOCUMENT TITLE]
════════════════════════════════

To,
[Recipient Name & Designation]
[Recipient Address]

Date: [Date]

Subject: [Clear subject line]

Respected Sir/Madam,

[Opening paragraph - who the complainant is]

[Body - clear facts in numbered points]
1. [Fact 1]
2. [Fact 2]
3. [Fact 3]

[Closing paragraph - what action is requested]

I request you to kindly [specific action requested] at the earliest.

Thanking you,

Yours faithfully,
[User Full Name]
[User Address]
[User Phone]
[User Email]

════════════════════════════════
⚠️ Note: Please verify this document with a legal professional before submission.
════════════════════════════════
\`\`\`

════════════════════════════════════
STRICT RULES:
════════════════════════════════════
1. NEVER use fake law sections or made-up legal provisions
2. NEVER give final legal judgments
3. ALWAYS use simple, friendly language
4. Only help with Indian law — politely decline anything else
5. Keep bullet points concise — max 1-2 lines each
6. The document offer section is OPTIONAL — only show if relevant
7. In document mode, ask for ALL required details before generating
8. Generated documents must use real Indian legal language

════════════════════════════════════
CONVERSATION HISTORY:
${chatHistory || "No previous conversation"}

USER'S QUESTION:
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
        case_id: currentCaseId,
        role: "assistant",
        content: answer,
      },
    ]);

    res.json({ answer, caseId: currentCaseId  });

  } catch (err) {
    console.error("Groq Error:", err);
    res.status(500).json({ error: "AI failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
