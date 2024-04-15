import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
// import MessageServerConstants from "../constants";
const app = express();
const PORT = 4000;

//New imports
const httpServer = new http.Server(app);

app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

const socketIO = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let connectedUsers = {};
let rooms = {};

const addUser = (user) => {
  if (!connectedUsers?.[user.id]) {
    // connectedUsers?.[user.id] = user
    connectedUsers = { ...connectedUsers, [user.id]: user };
  }
  
  if(Object.values(connectedUsers).some(alreadyConnected => alreadyConnected.username === user.username)){
    console.log("A user that refreshed!")
  }
};

const getUser = (id) => connectedUsers[id];

const removeUser = (id) => {
  delete connectedUsers?.[id];
};

const sendOnlineUsers = () => {
  socketIO.emit("connected-users", {
    users: Object.values(connectedUsers),
    onlineUsers: Object.keys(connectedUsers)?.length,
  });
};

const roomAlreadyExists = (roomName) => {
  return Object.keys(rooms).includes(roomName);
};

const createRoom = async (socketCreator, guestId) => {
  const roomName = `Room-${socketCreator.id}-${guestId}`;
  if (roomAlreadyExists(roomName)) {
    console.log(`Room ${roomName} already exists..`);
    return;
  }
  socketCreator.join(roomName);
  const guest = (await socketIO.fetchSockets()).find(
    (socket) => socket.id === guestId
  );
  guest?.join(roomName);
  console.log(
    `New room created ${roomName}, Rooms: ${Object.keys(rooms).length}`
  );
  rooms = {
    ...rooms,
    [roomName]: { participants: [socketCreator.id, guestId], messageList: [] },
  };
};

const findRoom = (ids) => {
  return Object.keys(rooms)?.find((roomName) =>
    ids?.every((id) => roomName.includes(id))
  );
};

const spreadMessage = async (senderSocket, receiverId, message) => {
  const senderId = senderSocket.id;
  const room = findRoom([senderId, receiverId]);
  if (!room) {
    console.log("No room found");
    return;
  }

  const lastMessage = {
    from: connectedUsers[senderId].username,
    to: connectedUsers[receiverId].username,
    message,
  };

  rooms[room].messageList.push(lastMessage);

  socketIO.in(room).emit("message_in_room", {
    messages: rooms[room].messageList,
    newMessage: lastMessage,
  });

  socketIO.in(room).emit("chat_lists", {
    users: [getUser(senderId), getUser(receiverId)],
    lastMessage,
  });
};

socketIO.on("connection", (socket) => {
  // console.log(`⚡: ${socket.id} user just connected but not logged in!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected", connectedUsers);
    removeUser(socket.id);
    sendOnlineUsers();
  });

  socket.on("identify", (data) => {
    console.log(`⚡: ${data?.username} user logged in!`);
    addUser({ username: data?.username, id: socket.id });
    sendOnlineUsers();
  });

  socket.on("connect_2", async (data) => {
    const { guestId } = data;
    await createRoom(socket, guestId);
  });

  socket.on("send_message", (data) => {
    const { receiverId, message } = data;
    spreadMessage(socket, receiverId, message);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
