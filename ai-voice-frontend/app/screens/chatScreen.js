import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import socket from "../services/socket"; // ✅ import only

export default function ChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("user-message", input);

    setMessages((prev) => [
      ...prev,
      { from: "me", text: input },
    ]);

    setInput("");
  };

  useEffect(() => {
    socket.on("ai-message", (msg) => {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: msg },
      ]);
    });

    return () => {
      socket.off("ai-message");
    };
  }, []);

  return (
    <View>
      {messages.map((m, i) => (
        <Text key={i}>
          {m.from}: {m.text}
        </Text>
      ))}

      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type..."
      />

      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
