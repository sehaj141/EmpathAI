import { useState, useEffect } from "react";
import socket from "./services/socket";

export default function HomeScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("ai-message", (msg) => {
      setMessages((prev) => [...prev, { from: "ai", text: msg }]);
    });

    return () => socket.off("ai-message");
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("user-message", input);
    setMessages((prev) => [...prev, { from: "me", text: input }]);
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      {messages.map((m, i) => (
        <p key={i}>
          <strong>{m.from}:</strong> {m.text}
        </p>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something"
      />

      <button onClick={sendMessage}>SEND</button>
    </div>
  );
}
