import axios from "axios";

const systemPrompt = `
You are EmpathAI, a highly intelligent therapeutic AI assistant.

- Provide emotionally supportive responses
- Keep tone calm and empathetic
- Avoid robotic language
- Keep replies under 120 words
`;

export async function getAIResponse(messages) {
  const prompt =
    systemPrompt +
    "\n\n" +
    messages.map(m => `${m.role}: ${m.content}`).join("\n");

  const res = await axios.post("http://localhost:11434/api/generate", {
    model: "llama3.2:1b",
    prompt,
    stream: false
  });

  return res.data.response;
}