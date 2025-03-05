import express, { Application } from "express";
import { WebSocketServer, WebSocket } from "ws";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app: Application = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("✅ New client connected");

  ws.on("message", (data: string) => {
    console.log("📩 Received:", data);

    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});
