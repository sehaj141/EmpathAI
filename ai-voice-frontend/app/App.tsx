import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

import ChatInterface from "./components/ChatInterface";
import VoiceCallInterface from "./components/VoiceCallInterface";

const socket = io("http://localhost:3000");

export default function App() {
  const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);
  const [message, setMessage] = useState("");
  const [callActive, setCallActive] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [aiSpeaking, setAiSpeaking] = useState(false);

  const currentMessageRef = useRef("");
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  /* =========================
     STREAMING AI RESPONSE
  ========================== */
  useEffect(() => {
    socket.on("ai-stream", (chunk: string) => {
      currentMessageRef.current += chunk;

      setChat((prev) => {
        const updated = [...prev];

        if (updated.length && updated[updated.length - 1].sender === "AI") {
          updated[updated.length - 1].text = currentMessageRef.current;
        } else {
          updated.push({ sender: "AI", text: currentMessageRef.current });
        }

        return updated;
      });
    });

    socket.on("ai-stream-end", () => {
      speak(currentMessageRef.current);
      currentMessageRef.current = "";
    });

    return () => {
      socket.off("ai-stream");
      socket.off("ai-stream-end");
    };
  }, []);

  /* =========================
     SEND MESSAGE
  ========================== */
  const sendMessage = (text: string) => {
    if (!text) return;
    setChat((prev) => [...prev, { sender: "You", text }]);
    socket.emit("user-message", text);
    setMessage("");
  };

  /* =========================
     AI TEXT TO SPEECH
  ========================== */
  const speak = (text: string) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    utterance.onstart = () => setAiSpeaking(true);
    utterance.onend = () => setAiSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  /* =========================
     CALL MODE
  ========================== */
  const startCall = () => {
    setCallActive(true);
    setCallTime(0);

    timerRef.current = setInterval(() => {
      setCallTime((prev) => prev + 1);
    }, 1000);

    startContinuousListening();
  };

  const endCall = () => {
    setCallActive(false);
    clearInterval(timerRef.current);
    stopListening();
  };

  const startContinuousListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = (event: any) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;
      sendMessage(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      {!callActive ? (
        <ChatInterface
          chat={chat}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          startCall={startCall}
        />
      ) : (
        <VoiceCallInterface
          callTime={formatTime(callTime)}
          aiSpeaking={aiSpeaking}
          endCall={endCall}
        />
      )}
    </>
  );
}