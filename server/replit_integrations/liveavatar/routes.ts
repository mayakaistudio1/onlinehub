import type { Express, Request, Response } from "express";

const LIVEAVATAR_API_KEY = process.env.LIVEAVATAR_API_KEY;
const LIVEAVATAR_BASE_URL = "https://api.liveavatar.com/v1";

// Configuration for 4 scenarios (sales, projects, team, expert)
const SCENARIOS_AVATAR_ID = process.env.LIVEAVATAR_SCENARIOS_AVATAR_ID || "0930fd59-c8ad-434d-ad53-b391a1768720";
const SCENARIOS_CONTEXT_ID = process.env.LIVEAVATAR_SCENARIOS_CONTEXT_ID || "9a8af2cd-6cc2-4189-8073-fb5031d9c421";
const SCENARIOS_VOICE_ID = process.env.LIVEAVATAR_SCENARIOS_VOICE_ID || "b952f553-f7f3-4e52-8625-86b4c415384f";

// Configuration for WOW Live (bottom bar)
const WOW_LIVE_AVATAR_ID = process.env.LIVEAVATAR_WOW_AVATAR_ID || "9650a758-1085-4d49-8bf3-f347565ec229";
const WOW_LIVE_CONTEXT_ID = process.env.LIVEAVATAR_WOW_CONTEXT_ID || "ff6ea605-fd86-449c-8b22-ecb41bd4b27e";
const WOW_LIVE_VOICE_ID = process.env.LIVEAVATAR_WOW_VOICE_ID || "f91568c4-c0a5-4dcd-8a05-69f3b8006f86";

function getConfigForDirection(direction?: string): { avatarId: string; contextId: string; voiceId: string } {
  if (direction === "wow-live") {
    return {
      avatarId: WOW_LIVE_AVATAR_ID,
      contextId: WOW_LIVE_CONTEXT_ID,
      voiceId: WOW_LIVE_VOICE_ID
    };
  }
  // All other scenarios (sales, projects, team, expert) use same config
  return {
    avatarId: SCENARIOS_AVATAR_ID,
    contextId: SCENARIOS_CONTEXT_ID,
    voiceId: SCENARIOS_VOICE_ID
  };
}

export async function getSessionToken(
  language: string = "ru",
  direction?: string,
  isSandbox: boolean = false
): Promise<any> {
  if (!LIVEAVATAR_API_KEY) {
    throw new Error("Missing LIVEAVATAR_API_KEY in environment");
  }

  const config = getConfigForDirection(direction);

  const payload: any = {
    mode: "FULL",
    avatar_id: isSandbox ? "dd73ea75-1218-4ef3-92ce-606d5f7fbc0a" : config.avatarId,
    avatar_persona: {
      voice_id: config.voiceId,
      context_id: config.contextId,
      language
    }
  };
  
  if (isSandbox) {
    payload.is_sandbox = true;
  }

  const response = await fetch(`${LIVEAVATAR_BASE_URL}/sessions/token`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-API-KEY": LIVEAVATAR_API_KEY
    },
    body: JSON.stringify(payload)
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Token generation failed: ${response.status} - ${text}`);
  }

  const json = JSON.parse(text);
  return {
    session_id: json?.data?.session_id,
    session_token: json?.data?.session_token,
    raw: json
  };
}

export async function startSession(sessionToken: string): Promise<any> {
  const response = await fetch(`${LIVEAVATAR_BASE_URL}/sessions/start`, {
    method: "POST",
    headers: {
      "accept": "application/json",
      "authorization": `Bearer ${sessionToken}`
    }
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Session start failed: ${response.status} - ${text}`);
  }

  return JSON.parse(text);
}

export async function stopSession(
  sessionId: string,
  sessionToken: string
): Promise<any> {
  const response = await fetch(`${LIVEAVATAR_BASE_URL}/sessions/stop`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
      "authorization": `Bearer ${sessionToken}`
    },
    body: JSON.stringify({ session_id: sessionId })
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Session stop failed: ${response.status} - ${text}`);
  }

  return JSON.parse(text);
}

export async function getSessionTranscript(sessionId: string): Promise<any> {
  if (!LIVEAVATAR_API_KEY) {
    throw new Error("Missing LIVEAVATAR_API_KEY in environment");
  }

  const response = await fetch(`${LIVEAVATAR_BASE_URL}/sessions/${sessionId}/transcript`, {
    method: "GET",
    headers: {
      "accept": "application/json",
      "X-API-KEY": LIVEAVATAR_API_KEY
    }
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Get transcript failed: ${response.status} - ${text}`);
  }

  return JSON.parse(text);
}

export async function sendEvent(
  sessionToken: string,
  eventType: string,
  data?: any
): Promise<any> {
  const payload = {
    type: eventType,
    ...(data && { data })
  };

  const response = await fetch(`${LIVEAVATAR_BASE_URL}/sessions/event`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json",
      "authorization": `Bearer ${sessionToken}`
    },
    body: JSON.stringify(payload)
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Send event failed: ${response.status} - ${text}`);
  }

  return JSON.parse(text);
}

export function registerLiveAvatarRoutes(app: Express): void {
  app.post("/api/liveavatar/token", async (req: Request, res: Response) => {
    try {
      const { language = "ru", direction } = req.body || {};
      const result = await getSessionToken(language, direction);
      res.status(200).json(result);
    } catch (error: any) {
      console.error("Token generation error:", error);
      res.status(500).json({
        error: "Token generation failed",
        details: error?.message || String(error)
      });
    }
  });

  app.post("/api/liveavatar/start", async (req: Request, res: Response) => {
    try {
      const { session_token } = req.body || {};
      if (!session_token) {
        return res.status(400).json({ error: "Missing session_token" });
      }
      const result = await startSession(session_token);
      res.status(200).json(result);
    } catch (error: any) {
      console.error("Start session error:", error);
      res.status(500).json({
        error: "Session start failed",
        details: error?.message || String(error)
      });
    }
  });

  app.post("/api/liveavatar/stop", async (req: Request, res: Response) => {
    try {
      const { session_id, session_token } = req.body || {};
      if (!session_id) {
        return res.status(400).json({ error: "Missing session_id" });
      }
      if (!session_token) {
        return res.status(400).json({ error: "Missing session_token" });
      }
      const result = await stopSession(session_id, session_token);
      res.status(200).json(result);
    } catch (error: any) {
      console.error("Stop session error:", error);
      res.status(500).json({
        error: "Session stop failed",
        details: error?.message || String(error)
      });
    }
  });

  app.post("/api/liveavatar/event", async (req: Request, res: Response) => {
    try {
      const { session_token, event_type, data } = req.body || {};
      if (!session_token) {
        return res.status(400).json({ error: "Missing session_token" });
      }
      if (!event_type) {
        return res.status(400).json({ error: "Missing event_type" });
      }
      const result = await sendEvent(session_token, event_type, data);
      res.status(200).json(result);
    } catch (error: any) {
      console.error("Send event error:", error);
      res.status(500).json({
        error: "Send event failed",
        details: error?.message || String(error)
      });
    }
  });

  app.get("/api/liveavatar/transcript/:sessionId", async (req: Request, res: Response) => {
    try {
      const sessionId = req.params.sessionId as string;
      if (!sessionId) {
        return res.status(400).json({ error: "Missing sessionId" });
      }
      const result = await getSessionTranscript(sessionId);
      res.status(200).json(result);
    } catch (error: any) {
      console.error("Get transcript error:", error);
      res.status(500).json({
        error: "Get transcript failed",
        details: error?.message || String(error)
      });
    }
  });
}
