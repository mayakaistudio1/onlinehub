import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import {
  type User,
  type InsertUser,
  type AvatarTestQuestion,
  type InsertAvatarTestQuestion,
  type AvatarTestRun,
  type InsertAvatarTestRun,
  users,
  avatarTestQuestions,
  avatarTestRuns,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getTestQuestions(): Promise<AvatarTestQuestion[]>;
  getTestQuestionsByCategory(category: string): Promise<AvatarTestQuestion[]>;
  createTestQuestion(question: InsertAvatarTestQuestion): Promise<AvatarTestQuestion>;
  deleteTestQuestion(id: string): Promise<void>;
  
  getTestRuns(): Promise<AvatarTestRun[]>;
  getTestRunsByQuestionId(questionId: string): Promise<AvatarTestRun[]>;
  createTestRun(run: InsertAvatarTestRun): Promise<AvatarTestRun>;
  updateTestRun(id: string, data: Partial<AvatarTestRun>): Promise<AvatarTestRun | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getTestQuestions(): Promise<AvatarTestQuestion[]> {
    return db.select().from(avatarTestQuestions).orderBy(desc(avatarTestQuestions.createdAt));
  }

  async getTestQuestionsByCategory(category: string): Promise<AvatarTestQuestion[]> {
    return db.select().from(avatarTestQuestions).where(eq(avatarTestQuestions.category, category));
  }

  async createTestQuestion(question: InsertAvatarTestQuestion): Promise<AvatarTestQuestion> {
    const [created] = await db.insert(avatarTestQuestions).values(question).returning();
    return created;
  }

  async deleteTestQuestion(id: string): Promise<void> {
    await db.delete(avatarTestQuestions).where(eq(avatarTestQuestions.id, id));
  }

  async getTestRuns(): Promise<AvatarTestRun[]> {
    return db.select().from(avatarTestRuns).orderBy(desc(avatarTestRuns.createdAt));
  }

  async getTestRunsByQuestionId(questionId: string): Promise<AvatarTestRun[]> {
    return db.select().from(avatarTestRuns).where(eq(avatarTestRuns.questionId, questionId));
  }

  async createTestRun(run: InsertAvatarTestRun): Promise<AvatarTestRun> {
    const [created] = await db.insert(avatarTestRuns).values(run).returning();
    return created;
  }

  async updateTestRun(id: string, data: Partial<AvatarTestRun>): Promise<AvatarTestRun | undefined> {
    const [updated] = await db.update(avatarTestRuns).set(data).where(eq(avatarTestRuns.id, id)).returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
