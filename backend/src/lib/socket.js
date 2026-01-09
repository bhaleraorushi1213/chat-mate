import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  }
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// this for storing userId and their corresponding socketId
const userSocketMap = {}; // {user id: socket id}

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.user.fullName}`);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() to broadcast to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // with socket.on we can listen to all event from clients
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.user.id}, Socket ID: ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
  
});

export { io, server, app };
