export default function Chat() {
    const [messages, setMessages] = useState([]);
  
    const startListening = () => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
  
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
  
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setMessages((prev) => [...prev, { from: "me", text }]);
        socket.emit("user-message", text);
      };
  
      recognition.start();
    };
  
    useEffect(() => {
      socket.on("ai-message", (msg) => {
        setMessages((prev) => [...prev, { from: "ai", text: msg }]);
  
        const speech = new SpeechSynthesisUtterance(msg);
        window.speechSynthesis.speak(speech);
      });
  
      return () => socket.off("ai-message");
    }, []);
  
    return (
      <>
        <div>
          {messages.map((m, i) => (
            <p key={i}><b>{m.from}:</b> {m.text}</p>
          ))}
        </div>
  
        <button onClick={startListening}>🎤 Speak</button>
      </>
    );
  }
  