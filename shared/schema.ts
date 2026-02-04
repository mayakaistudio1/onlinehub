import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
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

export const avatarTestQuestions = pgTable("avatar_test_questions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  category: text("category").notNull(),
  question: text("question").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAvatarTestQuestionSchema = createInsertSchema(avatarTestQuestions).omit({
  id: true,
  createdAt: true,
});

export type InsertAvatarTestQuestion = z.infer<typeof insertAvatarTestQuestionSchema>;
export type AvatarTestQuestion = typeof avatarTestQuestions.$inferSelect;

export const avatarTestRuns = pgTable("avatar_test_runs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  questionId: varchar("question_id").notNull().references(() => avatarTestQuestions.id),
  question: text("question").notNull(),
  answer: text("answer"),
  sessionId: varchar("session_id"),
  responseTimeMs: integer("response_time_ms"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAvatarTestRunSchema = createInsertSchema(avatarTestRuns).omit({
  id: true,
  createdAt: true,
});

export type InsertAvatarTestRun = z.infer<typeof insertAvatarTestRunSchema>;
export type AvatarTestRun = typeof avatarTestRuns.$inferSelect;
