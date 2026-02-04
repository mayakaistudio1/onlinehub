import type { Express, Request, Response } from "express";
import { storage } from "../../storage";
import { getSessionToken, startSession, stopSession, sendEvent, getSessionTranscript } from "../liveavatar/routes";
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

  app.post("/api/avatar-tests/run-single", async (req: Request, res: Response) => {
    try {
      const { questionId, question } = req.body;
      if (!questionId || !question) {
        return res.status(400).json({ error: "Missing questionId or question" });
      }

      const testRun = await storage.createTestRun({
        questionId,
        question,
        status: "running",
        answer: null,
        sessionId: null,
        responseTimeMs: null,
      });

      const startTime = Date.now();

      const tokenResult = await getSessionToken("ru", undefined, true);
      const { session_id, session_token } = tokenResult;

      await storage.updateTestRun(testRun.id, { sessionId: session_id });

      await startSession(session_token);

      await new Promise(resolve => setTimeout(resolve, 2000));

      await sendEvent(session_token, "text_input", { text: question });

      await new Promise(resolve => setTimeout(resolve, 15000));

      await stopSession(session_id, session_token);

      await new Promise(resolve => setTimeout(resolve, 2000));

      let answer = "";
      try {
        const transcript = await getSessionTranscript(session_id);
        if (transcript?.data?.messages) {
          const aiMessages = transcript.data.messages.filter((m: any) => m.role === "assistant" || m.role === "ai");
          if (aiMessages.length > 0) {
            answer = aiMessages[aiMessages.length - 1].content || aiMessages[aiMessages.length - 1].text || "";
          }
        }
      } catch (e) {
        console.error("Failed to get transcript:", e);
      }

      const responseTimeMs = Date.now() - startTime;

      const updatedRun = await storage.updateTestRun(testRun.id, {
        status: "completed",
        answer,
        responseTimeMs,
      });

      res.status(200).json(updatedRun);
    } catch (error: any) {
      console.error("Run single test error:", error);
      res.status(500).json({ error: "Test failed", details: error?.message });
    }
  });

  app.post("/api/avatar-tests/run-all", async (_req: Request, res: Response) => {
    try {
      const questions = await storage.getTestQuestions();
      
      const runs = [];
      for (const q of questions) {
        const testRun = await storage.createTestRun({
          questionId: q.id,
          question: q.question,
          status: "pending",
          answer: null,
          sessionId: null,
          responseTimeMs: null,
        });
        runs.push(testRun);
      }

      res.status(200).json({ message: `Created ${runs.length} test runs`, runs });
      
      (async () => {
        for (const run of runs) {
          try {
            await storage.updateTestRun(run.id, { status: "running" });
            const startTime = Date.now();

            const tokenResult = await getSessionToken("ru", undefined, true);
            const { session_id, session_token } = tokenResult;

            await storage.updateTestRun(run.id, { sessionId: session_id });

            await startSession(session_token);
            await new Promise(resolve => setTimeout(resolve, 2000));

            await sendEvent(session_token, "text_input", { text: run.question });
            await new Promise(resolve => setTimeout(resolve, 15000));

            await stopSession(session_id, session_token);
            await new Promise(resolve => setTimeout(resolve, 2000));

            let answer = "";
            try {
              const transcript = await getSessionTranscript(session_id);
              if (transcript?.data?.messages) {
                const aiMessages = transcript.data.messages.filter((m: any) => m.role === "assistant" || m.role === "ai");
                if (aiMessages.length > 0) {
                  answer = aiMessages[aiMessages.length - 1].content || aiMessages[aiMessages.length - 1].text || "";
                }
              }
            } catch (e) {
              console.error("Failed to get transcript:", e);
            }

            const responseTimeMs = Date.now() - startTime;
            await storage.updateTestRun(run.id, {
              status: "completed",
              answer,
              responseTimeMs,
            });
          } catch (error) {
            console.error(`Test run ${run.id} failed:`, error);
            await storage.updateTestRun(run.id, { status: "failed" });
          }
        }
      })();

    } catch (error: any) {
      console.error("Run all tests error:", error);
      res.status(500).json({ error: "Failed to start tests", details: error?.message });
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
