import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertRoomSchema } from "@shared/schema";
import jwt from "jsonwebtoken";

const JWT_SECRET = "shree-taarini-secret";

export function registerRoutes(app: Express) {
  // Auth middleware
  const authenticateAdmin = async (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const user = await storage.getUserByUsername(decoded.username);
      if (!user?.isAdmin) throw new Error();
      req.user = user;
      next();
    } catch {
      res.status(401).json({ message: "Unauthorized" });
    }
  };

  // Auth routes
  app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await storage.getUserByUsername(username);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username, isAdmin: user.isAdmin }, JWT_SECRET);
    res.json({ token });
  });

  // Room routes
  app.get("/api/rooms", async (_req, res) => {
    const rooms = await storage.getRooms();
    res.json(rooms);
  });

  app.get("/api/rooms/:id", async (req, res) => {
    const room = await storage.getRoom(parseInt(req.params.id));
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  });

  app.post("/api/rooms", authenticateAdmin, async (req, res) => {
    const parsed = insertRoomSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid room data" });
    }
    
    const room = await storage.createRoom(parsed.data);
    res.status(201).json(room);
  });

  app.put("/api/rooms/:id", authenticateAdmin, async (req, res) => {
    const parsed = insertRoomSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid room data" });
    }

    const room = await storage.updateRoom(parseInt(req.params.id), parsed.data);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  });

  app.delete("/api/rooms/:id", authenticateAdmin, async (req, res) => {
    const success = await storage.deleteRoom(parseInt(req.params.id));
    if (!success) return res.status(404).json({ message: "Room not found" });
    res.status(204).send();
  });

  const httpServer = createServer(app);
  return httpServer;
}
