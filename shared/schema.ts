import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const issues = pgTable("issues", {
  id: varchar("id").primaryKey(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  photos: jsonb("photos").$type<string[]>().notNull().default([]),
  location: jsonb("location").$type<{
    lat: number;
    lng: number;
    address: string;
  }>().notNull(),
  areaCode: text("area_code").notNull(),
  status: text("status").notNull().default('submitted'),
  severity: text("severity"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  reporterId: varchar("reporter_id").notNull(),
  reporterName: text("reporter_name").notNull(),
  reporterContact: text("reporter_contact").notNull(),
  adminNotes: jsonb("admin_notes").$type<Array<{ note: string; timestamp: string; admin: string }>>().notNull().default([]),
  resolvedPhotoURL: text("resolved_photo_url"),
  updateHistory: jsonb("update_history").$type<Array<{ timestamp: string; event: string }>>().notNull().default([])
});

export const insertIssueSchema = createInsertSchema(issues).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateIssueSchema = insertIssueSchema.partial();

export type InsertIssue = z.infer<typeof insertIssueSchema>;
export type UpdateIssue = z.infer<typeof updateIssueSchema>;
export type Issue = typeof issues.$inferSelect;
