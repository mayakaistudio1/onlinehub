import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerLiveAvatarRoutes } from "./replit_integrations/liveavatar";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  registerLiveAvatarRoutes(app);

  return httpServer;
}
