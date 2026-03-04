import express from "express";
import cors from "cors";

import { chat } from "./testChat.js";
import { speechToText } from "./services/speechToText.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "audio/webm", limit: "10mb" }));

// ----------------------
// CHAT ROUTE
// ----------------------
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await chat([
      { role: "user", content: message }
    ]);

    res.json({ reply });

  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "AI failed" });
  }
});

// ----------------------
// SPEECH TO TEXT ROUTE
// ----------------------
//app.post("/speech-to-text", async (req, res) => {
 // try {
 //   const audioBuffer = req.body;
//
 //   const transcript = await speechToText(audioBuffer);
//
 //   res.json({ transcript });
//
 // } catch (error) {
 //   console.error("Speech Error:", error);
 //   res.status(500).json({ error: "Speech failed" });
 // }
//});

// ----------------------
// START SERVER
// ----------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});