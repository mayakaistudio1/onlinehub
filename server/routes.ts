import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerLiveAvatarRoutes } from "./replit_integrations/liveavatar";
import { registerChatRoutes } from "./replit_integrations/chat";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  registerLiveAvatarRoutes(app);
  registerChatRoutes(app);

  return httpServer;
}
