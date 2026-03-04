import { useRef, useEffect, useState } from "react";
import { Send, User, Sparkles, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

interface ChatMessage {
  sender: string;
  text: string;
}

interface Props {
  chat: ChatMessage[];
  message: string;
  setMessage: (value: string) => void;
  sendMessage: (text: string) => void;
  startCall: () => void;
}

export function ChatInterface({
  chat,
  message,
  setMessage,
  sendMessage,
  startCall
}: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgrounds = [
    "from-slate-900 via-purple-900 to-slate-900",
    "from-slate-900 via-indigo-900 to-slate-900",
    "from-slate-900 via-blue-900 to-slate-900"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
  };

  return (
    <div
      className={`h-screen w-full bg-gradient-to-br ${backgrounds[currentBgIndex]} transition-all duration-1000 flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Sparkles className="text-purple-400" />
          <h1 className="text-white font-semibold text-lg">
            Psychological Therapy AI
          </h1>
        </div>

        <Button
          onClick={startCall}
          className="bg-purple-600 hover:bg-purple-700 rounded-xl"
        >
          <Phone className="w-4 h-4 mr-2" />
          Voice Call
        </Button>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 px-6 py-6">
        <div className="space-y-6 max-w-3xl mx-auto">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md px-4 py-3 rounded-2xl shadow-lg backdrop-blur-md ${
                  msg.sender === "You"
                    ? "bg-purple-600 text-white"
                    : "bg-white/10 text-white border border-white/10"
                }`}
              >
                <div className="flex items-center gap-2 mb-1 text-xs opacity-70">
                  {msg.sender === "You" ? (
                    <User size={14} />
                  ) : (
                    <Sparkles size={14} />
                  )}
                  {msg.sender}
                  <span>
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-white/10 backdrop-blur-md">
        <div className="max-w-3xl mx-auto flex gap-3">
          <Input
            placeholder="Share what's on your mind..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl"
          />
          <Button
            onClick={handleSend}
            className="bg-purple-600 hover:bg-purple-700 rounded-xl px-5"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}