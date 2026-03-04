import { useState } from "react";

function App() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");

  const startMic = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setText(speechText);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.start();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Voice Assistant</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Speak or type..."
        style={{ width: "100%", height: 100 }}
      />

      <br /><br />

      <button onClick={startMic}>
        {listening ? "Listening..." : "🎤 Speak"}
      </button>
    </div>
  );
}

export default App;
