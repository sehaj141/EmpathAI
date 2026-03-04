import { useEffect, useState } from "react";
import socket from "../services/socket";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("ai-message", (msg) => {
      setMessages((prev) => [...prev, { from: "ai", text: msg }]);
    });

    return () => socket.off("ai-message");
  }, []);

  const sendMessage = (text) => {
    socket.emit("user-message", text);
    setMessages((prev) => [...prev, { from: "me", text }]);
  };

  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Mic not supported. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage;
    <select onChange={(e) => setSelectedLanguage(e.target.value)}>
  <option value="en-US">English</option>
  <option value="hi-IN">Hindi</option>
  <option value="pa-IN">Punjabi</option>
</select>

   
    recognition.start();

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      sendMessage(transcript);
    };
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Voice Chat</h2>

      <div>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.from}:</b> {m.text}
          </p>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message"
      />

      <button onClick={() => sendMessage(input)}>Send</button>
      <button onClick={startListening}>🎤 Speak</button>
    </div>
  );
}
