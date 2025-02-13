import { type Room, type InsertRoom, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  // Room operations
  getRooms(): Promise<Room[]>;
  getRoom(id: number): Promise<Room | undefined>;
  createRoom(room: InsertRoom): Promise<Room>;
  updateRoom(id: number, room: Partial<InsertRoom>): Promise<Room | undefined>;
  deleteRoom(id: number): Promise<boolean>;
  
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private rooms: Map<number, Room>;
  private users: Map<number, User>;
  private roomId: number;
  private userId: number;

  constructor() {
    this.rooms = new Map();
    this.users = new Map();
    this.roomId = 1;
    this.userId = 1;

    // Create default admin user
    this.createUser({
      username: "admin",
      password: "admin123",
      isAdmin: true
    } as InsertUser);
  }

  async getRooms(): Promise<Room[]> {
    return Array.from(this.rooms.values());
  }

  async getRoom(id: number): Promise<Room | undefined> {
    return this.rooms.get(id);
  }

  async createRoom(room: InsertRoom): Promise<Room> {
    const id = this.roomId++;
    const newRoom = { ...room, id };
    this.rooms.set(id, newRoom);
    return newRoom;
  }

  async updateRoom(id: number, room: Partial<InsertRoom>): Promise<Room | undefined> {
    const existing = this.rooms.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...room };
    this.rooms.set(id, updated);
    return updated;
  }

  async deleteRoom(id: number): Promise<boolean> {
    return this.rooms.delete(id);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userId++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }
}

export const storage = new MemStorage();
