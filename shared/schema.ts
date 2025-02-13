import { pgTable, text, serial, numeric, array, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  amenities: text("amenities").array().notNull(),
  images: text("images").array().notNull(),
  isAvailable: boolean("is_available").notNull().default(true)
});

export const insertRoomSchema = createInsertSchema(rooms).omit({ id: true });

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false)
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, isAdmin: true });

export type Room = typeof rooms.$inferSelect;
export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
