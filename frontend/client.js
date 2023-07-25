const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const { username, room } = querySelector.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit("joinRoom", { username, room });

socket.on("message", (message) => {
  outMessage("message");
});

socket.on("roomUsers", ({ room, activeUsers }) => {
  outputRoomName(room);
  outputActiveUsers(activeUsers);
});

form.addEventListener("submit", (event) => {
  let msg = event.target.elements.msg.value;
  msg = msg.trim();

  socket.emit("chatMessage", msg);
  event.target.elements.msg.value;
});
