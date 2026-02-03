import type { Express, Request, Response } from "express";
import OpenAI from "openai";
import { WOW_PAGE_SYSTEM_PROMPT } from "../shared/prompts";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      first_name: string;
      language_code?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    text?: string;
    date: number;
  };
}

async function sendTelegramMessage(
  chatId: number,
  text: string,
  replyMarkup?: object
) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const body: Record<string, unknown> = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
  };

  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Telegram API error:", error);
  }

  return response;
}

async function getAIResponse(userMessage: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: WOW_PAGE_SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      max_tokens: 300,
    });

    return response.choices[0]?.message?.content || "Sorry, I couldn't process your request.";
  } catch (error) {
    console.error("OpenAI error:", error);
    return "Sorry, something went wrong. Please try again.";
  }
}

export function registerTelegramRoutes(app: Express): void {
  app.post("/api/telegram/webhook", async (req: Request, res: Response) => {
    try {
      const update: TelegramUpdate = req.body;

      if (!update.message?.text) {
        return res.sendStatus(200);
      }

      const chatId = update.message.chat.id;
      const userMessage = update.message.text;
      const firstName = update.message.from.first_name;

      if (userMessage === "/start") {
        const welcomeMessage = `Привет, ${firstName}! 👋

Я — AI-ассистент WOW Page. Расскажу, как создать живое онлайн-представительство с AI-аватаром, который общается с вашими посетителями 24/7.

Спрашивайте что угодно или откройте приложение для живого демо! 👇`;

        await sendTelegramMessage(chatId, welcomeMessage, {
          inline_keyboard: [
            [
              {
                text: "🚀 Открыть демо",
                web_app: { url: process.env.REPLIT_DEV_DOMAIN 
                  ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
                  : "https://wow-page.replit.app" },
              },
            ],
          ],
        });
      } else {
        const aiResponse = await getAIResponse(userMessage);

        await sendTelegramMessage(chatId, aiResponse, {
          inline_keyboard: [
            [
              {
                text: "🎬 Попробовать Live демо",
                web_app: { url: process.env.REPLIT_DEV_DOMAIN 
                  ? `https://${process.env.REPLIT_DEV_DOMAIN}` 
                  : "https://wow-page.replit.app" },
              },
            ],
          ],
        });
      }

      res.sendStatus(200);
    } catch (error) {
      console.error("Telegram webhook error:", error);
      res.sendStatus(200);
    }
  });

  app.get("/api/telegram/setup-webhook", async (req: Request, res: Response) => {
    try {
      const webhookUrl = process.env.REPLIT_DEV_DOMAIN
        ? `https://${process.env.REPLIT_DEV_DOMAIN}/api/telegram/webhook`
        : req.query.url;

      if (!webhookUrl) {
        return res.status(400).json({ error: "Webhook URL required" });
      }

      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: webhookUrl }),
      });

      const result = await response.json();
      res.json({ success: true, result, webhookUrl });
    } catch (error) {
      console.error("Setup webhook error:", error);
      res.status(500).json({ error: "Failed to setup webhook" });
    }
  });

  app.get("/api/telegram/webhook-info", async (req: Request, res: Response) => {
    try {
      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo`;
      const response = await fetch(url);
      const result = await response.json();
      res.json(result);
    } catch (error) {
      console.error("Get webhook info error:", error);
      res.status(500).json({ error: "Failed to get webhook info" });
    }
  });
}
