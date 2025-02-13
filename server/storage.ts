import { rooms, users, type Room, type InsertRoom, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  async getRooms(): Promise<Room[]> {
    return await db.select().from(rooms);
  }

  async getRoom(id: number): Promise<Room | undefined> {
    const [room] = await db.select().from(rooms).where(eq(rooms.id, id));
    return room;
  }

  async createRoom(room: InsertRoom): Promise<Room> {
    const [newRoom] = await db.insert(rooms).values({
      ...room,
      price: room.price.toString(), // Ensure price is stored as string
    }).returning();
    return newRoom;
  }

  async updateRoom(id: number, room: Partial<InsertRoom>): Promise<Room | undefined> {
    const [updated] = await db
      .update(rooms)
      .set({
        ...room,
        price: room.price?.toString(), // Convert price to string if it exists
      })
      .where(eq(rooms.id, id))
      .returning();
    return updated;
  }

  async deleteRoom(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(rooms)
      .where(eq(rooms.id, id))
      .returning();
    return !!deleted;
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values({
      ...user,
      isAdmin: false // Ensure regular users can't be admin
    }).returning();
    return newUser;
  }
}

// Create default admin user on startup
async function createDefaultAdmin() {
  const storage = new DatabaseStorage();
  const existingAdmin = await storage.getUserByUsername("admin");
  if (!existingAdmin) {
    await db.insert(users).values({
      username: "admin",
      password: "admin123",
      isAdmin: true
    });
  }
}

export const storage = new DatabaseStorage();
createDefaultAdmin().catch(console.error);