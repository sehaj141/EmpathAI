import { PhoneOff, Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  callTime: string;
  aiSpeaking: boolean;
  endCall: () => void;
}

export function VoiceCallInterface({
  callTime,
  aiSpeaking,
  endCall
}: Props) {
  const [micOn, setMicOn] = useState(true);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center text-white">
      
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-2">
        Therapy Voice Session
      </h2>

      {/* Timer */}
      <p className="text-sm text-white/70 mb-10">
        Call Duration: {callTime}
      </p>

      {/* AI Avatar */}
      <motion.div
        animate={
          aiSpeaking
            ? { scale: [1, 1.05, 1] }
            : { scale: 1 }
        }
        transition={{
          repeat: aiSpeaking ? Infinity : 0,
          duration: 1.2
        }}
        className="w-40 h-40 rounded-full bg-purple-600 flex items-center justify-center shadow-2xl mb-10"
      >
        <Volume2 size={50} />
      </motion.div>

      {/* Controls */}
      <div className="flex gap-6">
        <Button
          onClick={() => setMicOn(!micOn)}
          className={`rounded-full w-14 h-14 ${
            micOn
              ? "bg-white/20 hover:bg-white/30"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {micOn ? <Mic /> : <MicOff />}
        </Button>

        <Button
          onClick={endCall}
          className="bg-red-600 hover:bg-red-700 rounded-full w-16 h-16"
        >
          <PhoneOff />
        </Button>
      </div>
    </div>
  );
}