import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
const socket = io("https://emotionpath-1.onrender.com", {
  transports: ["websocket"],
});

export default socket;