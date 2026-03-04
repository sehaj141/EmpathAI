import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Volume2, VolumeX, PhoneOff } from "lucide-react";

export function VoiceCallInterface() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [status, setStatus] = useState("Call inactive");

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = async (event: any) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      if (!transcript || isMuted) return;

      console.log("User said:", transcript);
      setStatus("Processing...");

      try {
        const response = await fetch("http://localhost:3000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: transcript }),
        });

        const data = await response.json();
        const reply = data.reply;

        // Speak AI reply
        if (isSpeakerOn) {
          const utterance = new SpeechSynthesisUtterance(reply);
          utterance.lang = "en-US";
          window.speechSynthesis.speak(utterance);
        }

        setStatus("Listening...");
      } catch (err) {
        console.error("Voice AI error:", err);
        setStatus("AI connection failed");
      }
    };

    recognitionRef.current = recognition;
  }, [isMuted, isSpeakerOn]);

  const startCall = () => {
    if (!recognitionRef.current) return;

    setIsCallActive(true);
    setStatus("Listening...");
    recognitionRef.current.start();
  };

  const endCall = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.stop();
    window.speechSynthesis.cancel();

    setIsCallActive(false);
    setStatus("Call ended");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setStatus(!isMuted ? "Muted" : "Listening...");
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-950 text-white p-6">
      <div className="text-xl mb-6">{status}</div>

      {!isCallActive ? (
        <button
          onClick={startCall}
          className="w-24 h-24 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg hover:bg-green-500 transition"
        >
          <Mic size={32} />
        </button>
      ) : (
        <div className="flex gap-8 items-center">
          <button
            onClick={toggleMute}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition ${
              isMuted ? "bg-red-600" : "bg-slate-700"
            }`}
          >
            {isMuted ? <MicOff /> : <Mic />}
          </button>

          <button
            onClick={endCall}
            className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg hover:bg-red-500 transition"
          >
            <PhoneOff size={28} />
          </button>

          <button
            onClick={toggleSpeaker}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition ${
              isSpeakerOn ? "bg-slate-700" : "bg-red-600"
            }`}
          >
            {isSpeakerOn ? <Volume2 /> : <VolumeX />}
          </button>
        </div>
      )}
    </div>
  );
}