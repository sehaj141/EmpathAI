export default function callHandler(io) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("user-message", async (msg) => {
      console.log("User:", msg);

      // TEMP reply to test socket
      socket.emit("ai-message", "AI heard: " + msg);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
