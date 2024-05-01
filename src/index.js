const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let messageId = 1; // keep track of the message id

//write a message to the terminal
console.log(
  "Type a message down below and press enter to send a chat message:"
);

// listener for chat message from terminal
rl.on("line", (input) => {
  const message = {
    _id: messageId++,
    text: input, // Message text from terminal
    createdAt: new Date(),
    user: {
      _id: "terminal", // User id for terminal input
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150/",
    },
  };
  io.emit("chat message", message);
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("chat message", (msg) => {
    console.log("chat message received: ", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(8080, () => {
  console.log("Listening to port 8080");
});
