import express, { Application } from "express";
import { WebSocketServer, WebSocket } from "ws";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`WebRTC Signaling Server running on port ${PORT}`));

const wss = new WebSocketServer({ server });

const rooms: Map<string, Set<WebSocket>> = new Map();

wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected");

  let currentRoom: string | null = null;

  ws.on("message", (message: string) => {
    try {
      const data = JSON.parse(message);

      if (data.type === "join") {
        const { roomId } = data;
        if (!roomId) return;

        if (!rooms.has(roomId)) {
          rooms.set(roomId, new Set());
        }

        rooms.get(roomId)?.add(ws);
        currentRoom = roomId;

        console.log(`Client joined room: ${roomId}`);
        return;
      }

      // WebRTC Signaling
      if (["offer", "answer", "candidate"].includes(data.type) && currentRoom && rooms.has(currentRoom)) {
        rooms.get(currentRoom)?.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        });
      }

    } catch (err) {
      console.error("Error processing message:", err);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");

    if (currentRoom && rooms.has(currentRoom)) {
      rooms.get(currentRoom)?.delete(ws);
      if (rooms.get(currentRoom)?.size === 0) {
        rooms.delete(currentRoom);
        console.log(`🗑 Room ${currentRoom} deleted (no users left)`);
      }
    }
  });
});