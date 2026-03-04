import fetch from "node-fetch";

export async function streamAIReply(message, socket) {
  console.log("🔥 OLLAMA FUNCTION CALLED");
  console.log("User message:", message);

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3",
      prompt: message,
      stream: true,
    }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let fullResponse = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split("\n").filter(Boolean);

    for (const line of lines) {
      const parsed = JSON.parse(line);
      if (parsed.response) {
        fullResponse += parsed.response;
        socket.emit("ai-stream", parsed.response);
      }
    }
  }

  socket.emit("ai-stream-end");
}