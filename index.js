const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000","https://creedo.vercel.app"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected " + socket.id);
  socket.on("friend_request", (data) => {
    console.log(data);
    io.emit("recived_frequest", data);
  });
  socket.on('new_post', (data) => {
    console.log(data);
    io.emit('recived_new_post', data);
  });
  socket.on('comment', (data) => {
    console.log(data);
    io.emit('new_comment', data);
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
