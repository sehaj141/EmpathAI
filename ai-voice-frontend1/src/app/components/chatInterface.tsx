import { useState, useRef } from "react";
import { Mic, Send } from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // =========================
  // TEXT MESSAGE SEND
  // =========================
  const handleSendMessage = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;

    const userMessage = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await response.json();
      const aiMessage = { role: "assistant", content: data.reply };

      setMessages((prev) => [...prev, aiMessage]);

      // Speak AI reply
      const utterance = new SpeechSynthesisUtterance(data.reply);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ AI connection failed" },
      ]);
    }

    setLoading(false);
  };

  // =========================
  // TOGGLE VOICE RECORDING
  // =========================
  const toggleRecording = async () => {
    if (!isRecording) {
      // START RECORDING
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      // Browser Speech Recognition
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert("Speech recognition not supported in this browser");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript);
      };

      recognition.start();
      recognitionRef.current = recognition;

      // Start recording audio for playback
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;

    } else {
      // STOP RECORDING
      setIsRecording(false);
      clearInterval(timerRef.current);

      recognitionRef.current?.stop();
      mediaRecorderRef.current?.stop();

      mediaRecorderRef.current!.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioURL = URL.createObjectURL(blob);

        setMessages((prev) => [
          ...prev,
          {
            role: "user",
            audio: audioURL,
            duration: recordingTime,
          },
        ]);
      };
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-slate-950 text-white">
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-lg break-words ${
              msg.role === "user"
                ? "bg-blue-600 self-end"
                : "bg-slate-800 self-start"
            }`}
          >
            {msg.content && <p>{msg.content}</p>}

            {msg.audio && (
              <div className="flex items-center gap-2">
                <audio controls src={msg.audio} />
                <span className="text-xs">
                  {Math.floor(msg.duration / 60)}:
                  {(msg.duration % 60).toString().padStart(2, "0")}
                </span>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="text-slate-400 italic self-start">
            Thinking...
          </div>
        )}
      </div>

      {/* RECORDING TIMER */}
      {isRecording && (
        <div className="text-red-400 text-sm mb-2">
          Recording... {Math.floor(recordingTime / 60)}:
          {(recordingTime % 60).toString().padStart(2, "0")}
        </div>
      )}

      {/* INPUT AREA */}
      <div className="flex gap-2 items-center">
        <input
          className="flex-1 p-3 rounded-xl bg-slate-800 text-white outline-none placeholder:text-slate-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Share your thoughts"
        />

        <button
          onClick={toggleRecording}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
            isRecording
              ? "bg-red-600 animate-pulse"
              : "bg-cyan-700 hover:bg-cyan-600"
          }`}
        >
          <Mic size={24} />
        </button>

        <button
          onClick={() => handleSendMessage()}
          className="w-12 h-12 rounded-full bg-cyan-600 hover:bg-cyan-500 flex items-center justify-center"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
}