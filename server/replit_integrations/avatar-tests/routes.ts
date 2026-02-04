import type { Express, Request, Response } from "express";
import { storage } from "../../storage";
import { getSessionToken, getSessionTranscript } from "../liveavatar/routes";
import { insertAvatarTestQuestionSchema } from "@shared/schema";

export function registerAvatarTestRoutes(app: Express): void {
  app.get("/api/avatar-tests/questions", async (_req: Request, res: Response) => {
    try {
      const questions = await storage.getTestQuestions();
      res.status(200).json(questions);
    } catch (error: any) {
      console.error("Get questions error:", error);
      res.status(500).json({ error: "Failed to get questions", details: error?.message });
    }
  });

  app.post("/api/avatar-tests/questions", async (req: Request, res: Response) => {
    try {
      const parsed = insertAvatarTestQuestionSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid data", details: parsed.error.errors });
      }
      const question = await storage.createTestQuestion(parsed.data);
      res.status(201).json(question);
    } catch (error: any) {
      console.error("Create question error:", error);
      res.status(500).json({ error: "Failed to create question", details: error?.message });
    }
  });

  app.delete("/api/avatar-tests/questions/:id", async (req: Request, res: Response) => {
    try {
      await storage.deleteTestQuestion(req.params.id);
      res.status(200).json({ success: true });
    } catch (error: any) {
      console.error("Delete question error:", error);
      res.status(500).json({ error: "Failed to delete question", details: error?.message });
    }
  });

  app.get("/api/avatar-tests/runs", async (_req: Request, res: Response) => {
    try {
      const runs = await storage.getTestRuns();
      res.status(200).json(runs);
    } catch (error: any) {
      console.error("Get runs error:", error);
      res.status(500).json({ error: "Failed to get runs", details: error?.message });
    }
  });

  // Создать sandbox токен для тестирования
  app.post("/api/avatar-tests/sandbox-token", async (req: Request, res: Response) => {
    try {
      // Используем WOW Live контекст в sandbox режиме
      const tokenResult = await getSessionToken("ru", "wow-live", true);
      
      console.log(`[Avatar Test] Sandbox session created: ${tokenResult.session_id}`);
      
      res.status(200).json({
        session_id: tokenResult.session_id,
        session_token: tokenResult.session_token,
        is_sandbox: true
      });
    } catch (error: any) {
      console.error("Sandbox token error:", error);
      res.status(500).json({ error: "Failed to create sandbox token", details: error?.message });
    }
  });

  // Записать результат теста после сессии
  app.post("/api/avatar-tests/save-result", async (req: Request, res: Response) => {
    try {
      const { questionId, question, sessionId } = req.body;
      
      if (!questionId || !question || !sessionId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Получаем транскрипт сессии
      let answer = "";
      let responseTimeMs = null;
      
      try {
        const transcript = await getSessionTranscript(sessionId);
        if (transcript?.data?.messages) {
          const aiMessages = transcript.data.messages.filter(
            (m: any) => m.role === "assistant" || m.role === "ai" || m.role === "agent"
          );
          if (aiMessages.length > 0) {
            answer = aiMessages.map((m: any) => m.content || m.text || "").join("\n\n");
          }
        }
      } catch (e) {
        console.error("Failed to get transcript:", e);
      }

      const testRun = await storage.createTestRun({
        questionId,
        question,
        sessionId,
        answer: answer || "Транскрипт недоступен",
        status: "completed",
        responseTimeMs,
      });

      res.status(200).json(testRun);
    } catch (error: any) {
      console.error("Save result error:", error);
      res.status(500).json({ error: "Failed to save result", details: error?.message });
    }
  });

  app.get("/api/avatar-tests/export-csv", async (_req: Request, res: Response) => {
    try {
      const runs = await storage.getTestRuns();
      
      const csvHeader = "ID,Question,Answer,Status,Response Time (ms),Session ID,Created At\n";
      const csvRows = runs.map(r => {
        const answer = (r.answer || "").replace(/"/g, '""').replace(/\n/g, ' ');
        const question = (r.question || "").replace(/"/g, '""');
        return `"${r.id}","${question}","${answer}","${r.status}",${r.responseTimeMs || ''},"${r.sessionId || ''}","${r.createdAt}"`;
      }).join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=avatar-tests.csv");
      res.send(csvHeader + csvRows);
    } catch (error: any) {
      console.error("Export CSV error:", error);
      res.status(500).json({ error: "Failed to export", details: error?.message });
    }
  });
}
