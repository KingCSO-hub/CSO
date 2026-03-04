import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.permits.get.path, async (req, res) => {
    const permit = await storage.getPermit(Number(req.params.id));
    if (!permit) {
      return res.status(404).json({ message: 'Permit not found' });
    }
    res.json(permit);
  });

  return httpServer;
}
