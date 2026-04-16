
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/ask", (req, res) => {
  try {
    const { question, history } = req.body;

    console.log("question:", question);
    console.log("history:", history);

    res.json({
      answer: "Backend working "
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal Server Error",
      details: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});