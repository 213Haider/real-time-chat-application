const http = require("http");
const express = require("express");
const path = require("path");
const socketio = require("socket.io");
const {
  newUser,
  getIndividualRoomUsers,
  exitRoom,
  getActiveUser,
} = require("./helpers/userHelpers");
const formatMessage = require("./helpers/formatDate");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "frontend")));

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = newUser(socket.id, username, room);
    socket.join(user.room);

    socket.emit(
      "message",
      formatMessage("LetsChat", "Messages are limited to this room")
    );

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage("LetsChat", `${user.username} has joined the room`)
      );

    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getIndividualRoomUsers(user.room),
    });
  });

  socket.on("chatMessage", (msg) => {
    const user = getActiveUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
