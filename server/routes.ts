import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerLiveAvatarRoutes } from "./replit_integrations/liveavatar";
import { registerChatRoutes } from "./replit_integrations/chat";
import { registerTelegramRoutes } from "./replit_integrations/telegram";
import { registerAvatarTestRoutes } from "./replit_integrations/avatar-tests";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  registerLiveAvatarRoutes(app);
  registerChatRoutes(app);
  registerTelegramRoutes(app);
  registerAvatarTestRoutes(app);

  return httpServer;
}
