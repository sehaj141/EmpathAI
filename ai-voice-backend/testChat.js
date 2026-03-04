import { getAIResponse } from "./services/aiService.js";
import { isCrisis } from "./utils/crisisDetector.js";

export async function chat(messages) {
  const lastMessage = messages[messages.length - 1].content;

  if (isCrisis(lastMessage)) {
    return "I'm really concerned about you. Please contact someone you trust or local support immediately.";
  }

  const reply = await getAIResponse(messages);
  return reply;
}