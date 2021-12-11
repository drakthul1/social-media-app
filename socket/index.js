const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const sendUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connected
  console.log("A user has connected to the server");
  socket.on("sendUser", (userId) => {
    sendUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get messages
  socket.on("send", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnected
  socket.on("disconnection", () => {
    console.log("A user has disconnected from the server");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
