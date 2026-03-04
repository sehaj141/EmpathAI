const { getAIResponse } = require("./services/aiService");

require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// initialize socket AFTER server exists
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// NOW io exists → safe to pass
require("./socket/callHandler")(io);

(async () => {
  const reply = await getAIResponse([
    { role: "user", content: "I feel anxious and overwhelmed today" },
  ]);
  console.log("AI says:", reply);
})();


server.listen(5000, () => {
  console.log("Server running on port 5000");
});

