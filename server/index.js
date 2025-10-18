import { Server } from "socket.io";

const io = new Server(8000, {
   cors: true,
});

const socketIdToEmailMap = new Map();
const emailToSocketIdMap = new Map();

io.on("connection", (socket) => {
   console.log(`Socket connected`, socket.id);
   socket.on("room:join", (data) => {
      const { email, room } = data;
      emailToSocketIdMap.set(email, socket.id);
      socketIdToEmailMap.set(socket.id, email);
      io.to(socket.id).emit("room:join", data)
   });
});
