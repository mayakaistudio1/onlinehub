# LiveAvatar Integration Template

## Как использовать этот шаблон в промте

Скопируй этот блок в промт для любого проекта:

```
Добавь интеграцию LiveAvatar (HeyGen) для видеозвонка с AI-аватаром.

Используй следующую структуру:
- Серверная часть: server/replit_integrations/liveavatar/
- Клиентская часть: компонент LiveAvatarChat.tsx

Три экрана:
1. До звонка - приветствие + кнопка "Позвонить"
2. Во время звонка - видео аватара + микрофон
3. После звонка - благодарность + CTA

Переменные окружения: LIVEAVATAR_API_KEY, LIVEAVATAR_AVATAR_ID, LIVEAVATAR_VOICE_ID, LIVEAVATAR_CONTEXT_ID

Зависимости: livekit-client, framer-motion, lucide-react
```

---

## Переменные окружения

```env
# Обязательные
LIVEAVATAR_API_KEY=your_heygen_api_key
LIVEAVATAR_AVATAR_ID=65f9e3c9-d48b-4118-b73a-4ae2e3cbb8f0
LIVEAVATAR_VOICE_ID=3607df3c-9de0-4274-b0be-7e035775ead5
LIVEAVATAR_CONTEXT_ID=your_default_context_id

# Опционально: разные контексты для направлений
LIVEAVATAR_CONTEXT_ID_INVITE=xxx
LIVEAVATAR_CONTEXT_ID_IWM=xxx
LIVEAVATAR_CONTEXT_ID_GENKA=xxx
LIVEAVATAR_CONTEXT_ID_MWR=xxx
```

---

## Зависимости

```bash
npm install livekit-client framer-motion lucide-react
```

---

## Структура файлов

```
server/
  replit_integrations/
    liveavatar/
      index.ts          # Экспорт функций
      routes.ts         # API эндпоинты и логика
client/
  src/
    components/
      ui/
        LiveAvatarChat.tsx  # React компонент с 3 экранами
```

---

## Серверная часть

### server/replit_integrations/liveavatar/index.ts

```typescript
export { registerLiveAvatarRoutes } from "./routes";
export {
  getSessionToken,
  startSession,
  stopSession,
  sendEvent,
  getSessionTranscript
} from "./routes";
```

### server/replit_integrations/liveavatar/routes.ts

```typescript
import type { Express, Request, Response } from "express";

// Environment configuration
const LIVEAVATAR_API_KEY = process.env.LIVEAVATAR_API_KEY;
const LIVEAVATAR_AVATAR_ID = process.env.LIVEAVATAR_AVATAR_ID || "65f9e3c9-d48b-4118-b73a-4ae2e3cbb8f0";
const LIVEAVATAR_VOICE_ID = process.env.LIVEAVATAR_VOICE_ID || "3607df3c-9de0-4274-b0be-7e035775ead5";
const LIVEAVATAR_CONTEXT_ID = process.env.LIVEAVATAR_CONTEXT_ID || "your_default_context_id";
const LIVEAVATAR_BASE_URL = "https://api.liveavatar.com/v1";

// Context IDs per direction (опционально)
const CONTEXT_IDS: Record<string, string | undefined> = {
  invite: process.env.LIVEAVATAR_CONTEXT_ID_INVITE,
  infoway: process.env.LIVEAVATAR_CONTEXT_ID_IWM,
  genka: process.env.LIVEAVATAR_CONTEXT_ID_GENKA,
  mwr: process.env.LIVEAVATAR_CONTEXT_ID_MWR,
};

function getContextIdForDirection(direction?: string): string {
  if (direction && CONTEXT_IDS[direction]) {
    return CONTEXT_IDS[direction]!;
  }
  return LIVEAVATAR_CONTEXT_ID;
}

// Get Session Token
export async function getSessionToken(
  language: string = "ru",
  direction?: string
): Promise<any> {
  if (!LIVEAVATAR_API_KEY) {
    throw new Error("Missing LIVEAVATAR_API_KEY in environment");
  }

  const contextId = getContextIdForDirection(direction);

  const payload = {
    mode: "FULL",
    avatar_id: LIVEAVATAR_AVATAR_ID,
    avatar_persona: {
      voice_id: LIVEAVATAR_VOICE_ID,
      context_id: contextId,
      language
    }
  };

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

// Start Session
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

// Stop Session
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

// Get Session Transcript
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

// Send Event
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

// Register routes
export function registerLiveAvatarRoutes(app: Express): void {
  // Token endpoint
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

  // Start session endpoint
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

  // Stop session endpoint
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

  // Send event endpoint
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

  // Get transcript endpoint
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
```

---

## Клиентская часть

### client/src/components/ui/LiveAvatarChat.tsx

```typescript
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, VideoOff, Mic, MicOff, X, Loader2, Phone, PhoneOff, Volume2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Room,
  RoomEvent,
  Track,
  RemoteTrack,
  RemoteTrackPublication,
  RemoteParticipant,
  ConnectionState,
  Participant,
  DataPacket_Kind,
} from "livekit-client";

// ============================================
// ЕДИНЫЕ ТЕКСТЫ (редактируй здесь для всех проектов)
// ============================================
const TEXTS = {
  // Имя аватара
  avatarName: "София",
  avatarInitial: "С",
  
  // Экран 1: До звонка
  preCall: {
    title: "Видеозвонок с Софией",
    subtitle: "Нажмите кнопку ниже, чтобы начать разговор с AI-ассистентом",
    buttonText: "Позвонить",
  },
  
  // Экран 2: Во время звонка
  duringCall: {
    connecting: "Подключение к Софии...",
    connectingSubtitle: "Пожалуйста, подождите",
    waitingAvatar: "Ожидание Софии...",
    waitingAvatarSubtitle: "Аватар подключается, это может занять несколько секунд",
    online: "Онлайн",
    clickToCall: "Нажмите для звонка",
    unlockAudioTitle: "Разрешите воспроизведение звука",
    unlockAudioSubtitle: "Нажмите кнопку ниже, чтобы услышать Софию",
    unlockAudioButton: "Включить звук",
  },
  
  // Экран 3: После звонка
  postCall: {
    title: "Звонок завершён",
    subtitle: "Спасибо за разговор! Если у вас остались вопросы, свяжитесь с нами напрямую.",
    telegramButton: "Написать в Telegram",
    newCallButton: "Новый звонок",
  },
  
  // Ошибки
  error: {
    title: "Ошибка подключения",
    retryButton: "Попробовать снова",
  },
};

// ============================================
// ЕДИНЫЕ ЦВЕТА И СТИЛИ
// ============================================
const STYLES = {
  // Градиент аватара
  avatarGradient: "from-purple-500 to-pink-500",
  
  // Кнопка звонка (зелёная)
  callButton: "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-green-500/30",
  
  // Кнопка завершения (красная)
  endCallButton: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/30",
  
  // Telegram кнопка
  telegramButton: "bg-[#0088cc] hover:bg-[#0077b5]",
  
  // Фон модального окна
  modalBackground: "bg-black/90",
};

// ============================================
// TELEGRAM КОНТАКТ (замени на свой)
// ============================================
const TELEGRAM_USERNAME = "KirillSed";

// ============================================
// ИНТЕРФЕЙС КОМПОНЕНТА
// ============================================
interface LiveAvatarChatProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
  className?: string;
  direction?: string;
}

type SessionState = "idle" | "connecting" | "waiting_avatar" | "connected" | "error" | "ended";

export function LiveAvatarChat({
  isOpen,
  onClose,
  language = "ru",
  className,
  direction = "default",
}: LiveAvatarChatProps) {
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [isMuted, setIsMuted] = useState(true);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [showUnlockPrompt, setShowUnlockPrompt] = useState(false);
  const sessionStartTimeRef = useRef<number>(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContainerRef = useRef<HTMLDivElement>(null);
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const roomRef = useRef<Room | null>(null);
  const sessionDataRef = useRef<{
    sessionId: string;
    sessionToken: string;
  } | null>(null);

  // Telegram ссылка
  const telegramLink = `https://t.me/${TELEGRAM_USERNAME}`;

  // ============================================
  // ЛОГИКА СЕССИИ
  // ============================================
  const startSession = useCallback(async () => {
    if (sessionState === "connecting" || sessionState === "connected") {
      return;
    }
    
    try {
      setSessionState("connecting");
      setError(null);

      // 1. Получить токен
      const tokenRes = await fetch("/api/liveavatar/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, direction }),
      });

      if (!tokenRes.ok) {
        const errData = await tokenRes.json();
        throw new Error(errData.details || "Failed to get session token");
      }

      const tokenData = await tokenRes.json();
      sessionDataRef.current = {
        sessionId: tokenData.session_id,
        sessionToken: tokenData.session_token,
      };
      sessionStartTimeRef.current = Date.now();

      // 2. Запустить сессию
      const startRes = await fetch("/api/liveavatar/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_token: tokenData.session_token }),
      });

      if (!startRes.ok) {
        const errData = await startRes.json();
        throw new Error(errData.details || "Failed to start session");
      }

      const startData = await startRes.json();
      const { livekit_url, livekit_client_token } = startData.data || startData;

      if (!livekit_url || !livekit_client_token) {
        throw new Error("Missing LiveKit connection data");
      }

      // 3. Подключиться к LiveKit
      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
      });

      room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
      room.on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed);
      room.on(RoomEvent.Disconnected, handleDisconnected);
      room.on(RoomEvent.ConnectionStateChanged, handleConnectionStateChanged);
      room.on(RoomEvent.ParticipantConnected, handleParticipantConnected);
      room.on(RoomEvent.DataReceived, handleDataReceived);
      room.on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakersChanged);

      await room.connect(livekit_url, livekit_client_token);
      await room.localParticipant.setMicrophoneEnabled(false);
      setIsMuted(true);

      roomRef.current = room;
      
      const hasRemoteParticipants = room.remoteParticipants.size > 0;
      if (hasRemoteParticipants) {
        room.remoteParticipants.forEach((participant) => {
          participant.trackPublications.forEach((publication) => {
            if (publication.track && publication.isSubscribed) {
              handleTrackSubscribed(
                publication.track as RemoteTrack,
                publication as RemoteTrackPublication,
                participant
              );
            }
          });
        });
        setSessionState("connected");
      } else {
        setSessionState("waiting_avatar");
      }

    } catch (err: any) {
      console.error("LiveAvatar session error:", err);
      setError(err.message || "Connection failed");
      setSessionState("error");
    }
  }, [language, direction, sessionState]);

  // ============================================
  // ОБРАБОТЧИКИ LIVEKIT
  // ============================================
  const handleTrackSubscribed = useCallback(
    (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
      setSessionState("connected");
      
      if (track.kind === Track.Kind.Video && videoRef.current) {
        track.attach(videoRef.current);
      } else if (track.kind === Track.Kind.Audio && audioContainerRef.current) {
        const trackId = `${participant.identity}-${track.sid}`;
        
        let audioEl = audioElementsRef.current.get(trackId);
        if (!audioEl) {
          audioEl = document.createElement("audio");
          audioEl.autoplay = true;
          audioEl.setAttribute("playsinline", "true");
          audioEl.id = trackId;
          audioContainerRef.current.appendChild(audioEl);
          audioElementsRef.current.set(trackId, audioEl);
        }
        
        track.attach(audioEl);
        
        audioEl.play()
          .then(() => setAudioUnlocked(true))
          .catch(() => setShowUnlockPrompt(true));
      }
    },
    []
  );

  const handleTrackUnsubscribed = useCallback(
    (track: RemoteTrack, publication: RemoteTrackPublication, participant: RemoteParticipant) => {
      track.detach();
      
      if (track.kind === Track.Kind.Audio) {
        const trackId = `${participant.identity}-${track.sid}`;
        const audioEl = audioElementsRef.current.get(trackId);
        if (audioEl) {
          audioEl.remove();
          audioElementsRef.current.delete(trackId);
        }
      }
    },
    []
  );

  const handleDisconnected = useCallback(() => {
    setSessionState("idle");
  }, []);

  const handleConnectionStateChanged = useCallback((state: ConnectionState) => {
    if (state === ConnectionState.Disconnected) {
      setSessionState("idle");
    }
  }, []);

  const handleParticipantConnected = useCallback((participant: RemoteParticipant) => {
    setSessionState("connected");
    
    participant.trackPublications.forEach((publication) => {
      if (publication.track && publication.isSubscribed) {
        if (publication.track.kind === Track.Kind.Video && videoRef.current) {
          publication.track.attach(videoRef.current);
        } else if (publication.track.kind === Track.Kind.Audio && audioContainerRef.current) {
          const track = publication.track;
          const trackId = `${participant.identity}-${track.sid}`;
          
          let audioEl = audioElementsRef.current.get(trackId);
          if (!audioEl) {
            audioEl = document.createElement("audio");
            audioEl.autoplay = true;
            audioEl.setAttribute("playsinline", "true");
            audioEl.id = trackId;
            audioContainerRef.current.appendChild(audioEl);
            audioElementsRef.current.set(trackId, audioEl);
          }
          
          track.attach(audioEl);
          audioEl.play()
            .then(() => setAudioUnlocked(true))
            .catch(() => setShowUnlockPrompt(true));
        }
      }
    });
  }, []);

  const handleDataReceived = useCallback(
    (payload: Uint8Array, participant?: RemoteParticipant) => {
      try {
        const message = new TextDecoder().decode(payload);
        const data = JSON.parse(message);
        
        if (data.type === "avatar_start_talking" || data.type === "agent_start_talking") {
          setIsAvatarSpeaking(true);
          if (roomRef.current) {
            roomRef.current.localParticipant.setMicrophoneEnabled(false);
            setIsMuted(true);
          }
        } else if (data.type === "avatar_stop_talking" || data.type === "agent_stop_talking") {
          setIsAvatarSpeaking(false);
          if (roomRef.current) {
            roomRef.current.localParticipant.setMicrophoneEnabled(true);
            setIsMuted(false);
          }
        }
      } catch (e) {}
    },
    []
  );

  const handleActiveSpeakersChanged = useCallback(
    (speakers: Participant[]) => {
      if (!roomRef.current) return;
      
      const localIdentity = roomRef.current.localParticipant.identity;
      const avatarIsSpeaking = speakers.some((speaker) => speaker.identity !== localIdentity);
      
      setIsAvatarSpeaking((prevSpeaking) => {
        if (avatarIsSpeaking && !prevSpeaking) {
          roomRef.current?.localParticipant.setMicrophoneEnabled(false);
          setIsMuted(true);
          return true;
        } else if (!avatarIsSpeaking && prevSpeaking) {
          roomRef.current?.localParticipant.setMicrophoneEnabled(true);
          setIsMuted(false);
          return false;
        }
        return prevSpeaking;
      });
    },
    []
  );

  // ============================================
  // ОСТАНОВКА СЕССИИ
  // ============================================
  const stopSession = useCallback(async (showEnded: boolean = true) => {
    try {
      if (roomRef.current) {
        roomRef.current.disconnect();
        roomRef.current = null;
      }

      if (sessionDataRef.current) {
        await fetch("/api/liveavatar/stop", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionDataRef.current.sessionId,
            session_token: sessionDataRef.current.sessionToken,
          }),
        });
        sessionDataRef.current = null;
      }
    } catch (err) {
      console.error("Error stopping session:", err);
    } finally {
      audioElementsRef.current.forEach((audioEl) => audioEl.remove());
      audioElementsRef.current.clear();
      
      setSessionState(showEnded ? "ended" : "idle");
      setAudioUnlocked(false);
      setShowUnlockPrompt(false);
      setIsAvatarSpeaking(false);
      setIsMuted(true);
      sessionStartTimeRef.current = 0;
    }
  }, []);

  // ============================================
  // УПРАВЛЕНИЕ МИКРОФОНОМ
  // ============================================
  const toggleMute = useCallback(async () => {
    if (isAvatarSpeaking) return;
    
    if (roomRef.current) {
      const newMuteState = !isMuted;
      await roomRef.current.localParticipant.setMicrophoneEnabled(!newMuteState);
      setIsMuted(newMuteState);
    }
  }, [isMuted, isAvatarSpeaking]);

  const unlockAudio = useCallback(async () => {
    const audioElements = audioElementsRef.current;
    if (audioElements.size === 0) return;
    
    try {
      const playPromises: Promise<void>[] = [];
      audioElements.forEach((audioEl) => {
        audioEl.muted = false;
        playPromises.push(audioEl.play());
      });
      
      await Promise.all(playPromises);
      setAudioUnlocked(true);
      setShowUnlockPrompt(false);
    } catch (err) {
      setShowUnlockPrompt(true);
    }
  }, []);

  // ============================================
  // CLEANUP
  // ============================================
  useEffect(() => {
    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect();
        roomRef.current = null;
      }
      if (sessionDataRef.current) {
        fetch("/api/liveavatar/stop", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionDataRef.current.sessionId,
            session_token: sessionDataRef.current.sessionToken,
          }),
        }).catch(console.error);
        sessionDataRef.current = null;
      }
    };
  }, []);

  const handleClose = useCallback(() => {
    stopSession(false);
    onClose();
  }, [stopSession, onClose]);

  const handleNewCall = useCallback(() => {
    setSessionState("idle");
  }, []);

  if (!isOpen) return null;

  // ============================================
  // РЕНДЕР
  // ============================================
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "fixed inset-0 z-50 flex flex-col overflow-hidden max-h-[100dvh]",
          STYLES.modalBackground,
          className
        )}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent absolute top-0 left-0 right-0 z-10">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center",
              STYLES.avatarGradient
            )}>
              <span className="text-white font-bold text-sm">{TEXTS.avatarInitial}</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">{TEXTS.avatarName}</h3>
              <p className="text-white/60 text-xs">
                {sessionState === "connected" ? TEXTS.duringCall.online : 
                 sessionState === "connecting" ? TEXTS.duringCall.connecting :
                 sessionState === "waiting_avatar" ? TEXTS.duringCall.waitingAvatar :
                 TEXTS.duringCall.clickToCall}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            data-testid="button-close-avatar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 flex items-center justify-center relative">
          
          {/* ========== ЭКРАН 1: ДО ЗВОНКА ========== */}
          {sessionState === "idle" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className={cn(
                "w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br flex items-center justify-center",
                STYLES.avatarGradient
              )}>
                <Video className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-white text-xl font-semibold mb-2">
                {TEXTS.preCall.title}
              </h2>
              <p className="text-white/60 text-sm mb-6 max-w-xs mx-auto">
                {TEXTS.preCall.subtitle}
              </p>
              <button
                onClick={startSession}
                className={cn(
                  "px-8 py-4 bg-gradient-to-r text-white rounded-full font-semibold flex items-center gap-3 mx-auto transition-all shadow-lg",
                  STYLES.callButton
                )}
                data-testid="button-start-call"
              >
                <Phone className="w-5 h-5" />
                {TEXTS.preCall.buttonText}
              </button>
            </motion.div>
          )}

          {/* CONNECTING */}
          {sessionState === "connecting" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <Loader2 className="w-16 h-16 text-purple-500 animate-spin mx-auto mb-4" />
              <p className="text-white text-lg">{TEXTS.duringCall.connecting}</p>
              <p className="text-white/60 text-sm mt-2">{TEXTS.duringCall.connectingSubtitle}</p>
            </motion.div>
          )}

          {/* WAITING AVATAR */}
          {sessionState === "waiting_avatar" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className={cn(
                  "absolute inset-0 rounded-full bg-gradient-to-br animate-pulse",
                  STYLES.avatarGradient
                )} />
                <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
                  <Video className="w-8 h-8 text-white" />
                </div>
              </div>
              <p className="text-white text-lg">{TEXTS.duringCall.waitingAvatar}</p>
              <p className="text-white/60 text-sm mt-2">{TEXTS.duringCall.waitingAvatarSubtitle}</p>
            </motion.div>
          )}

          {/* ERROR */}
          {sessionState === "error" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <VideoOff className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-white text-lg mb-2">{TEXTS.error.title}</p>
              <p className="text-white/60 text-sm mb-4 max-w-xs mx-auto">{error}</p>
              <button
                onClick={startSession}
                className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                data-testid="button-retry-call"
              >
                {TEXTS.error.retryButton}
              </button>
            </motion.div>
          )}

          {/* ========== ЭКРАН 2: ВО ВРЕМЯ ЗВОНКА ========== */}
          {sessionState === "connected" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full max-h-[calc(100dvh-120px)] overflow-hidden flex items-center justify-center"
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full max-h-[calc(100dvh-120px)] object-cover"
                data-testid="video-avatar"
              />
              <div ref={audioContainerRef} className="hidden" />
            </motion.div>
          )}

          {/* ========== ЭКРАН 3: ПОСЛЕ ЗВОНКА ========== */}
          {sessionState === "ended" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center px-6"
            >
              <div className={cn(
                "w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br flex items-center justify-center",
                STYLES.avatarGradient
              )}>
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-white text-2xl font-semibold mb-2">
                {TEXTS.postCall.title}
              </h2>
              <p className="text-white/70 text-sm mb-8 max-w-xs mx-auto">
                {TEXTS.postCall.subtitle}
              </p>
              
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center justify-center gap-3 px-6 py-4 text-white rounded-full font-semibold transition-colors shadow-lg",
                    STYLES.telegramButton
                  )}
                  data-testid="button-telegram"
                >
                  <MessageCircle className="w-5 h-5" />
                  {TEXTS.postCall.telegramButton}
                </a>
                
                <button
                  onClick={handleNewCall}
                  className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
                  data-testid="button-new-call"
                >
                  {TEXTS.postCall.newCallButton}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* AUDIO UNLOCK PROMPT */}
        {showUnlockPrompt && (sessionState === "connected" || sessionState === "waiting_avatar") && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-xs text-center"
          >
            <Volume2 className="w-8 h-8 text-white mx-auto mb-2" />
            <p className="text-white text-sm font-medium mb-1">{TEXTS.duringCall.unlockAudioTitle}</p>
            <p className="text-white/60 text-xs mb-3">{TEXTS.duringCall.unlockAudioSubtitle}</p>
            <button
              onClick={unlockAudio}
              className={cn(
                "px-4 py-2 bg-gradient-to-r text-white rounded-full text-sm font-medium",
                STYLES.callButton
              )}
              data-testid="button-unlock-audio"
            >
              {TEXTS.duringCall.unlockAudioButton}
            </button>
          </motion.div>
        )}

        {/* CONTROL BUTTONS (во время звонка) */}
        {sessionState === "connected" && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 p-4">
            <button
              onClick={toggleMute}
              disabled={isAvatarSpeaking}
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center transition-all",
                isMuted ? "bg-white/20" : "bg-white text-black",
                isAvatarSpeaking && "opacity-50 cursor-not-allowed"
              )}
              data-testid="button-toggle-mute"
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            
            <button
              onClick={() => stopSession(true)}
              className={cn(
                "w-14 h-14 rounded-full bg-gradient-to-r flex items-center justify-center shadow-lg",
                STYLES.endCallButton
              )}
              data-testid="button-end-call"
            >
              <PhoneOff className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## Подключение в main server

В файле `server/routes.ts` или `server/index.ts`:

```typescript
import { registerLiveAvatarRoutes } from "./replit_integrations/liveavatar";

// После создания Express app
registerLiveAvatarRoutes(app);
```

---

## Использование компонента

```tsx
import { LiveAvatarChat } from "@/components/ui/LiveAvatarChat";
import { useState } from "react";

function MyPage() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Позвонить Софии
      </button>
      
      <LiveAvatarChat
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        language="ru"
        direction="default"
      />
    </>
  );
}
```

---

## API эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/api/liveavatar/token` | Получить токен сессии |
| POST | `/api/liveavatar/start` | Запустить видео |
| POST | `/api/liveavatar/stop` | Остановить сессию |
| POST | `/api/liveavatar/event` | Отправить событие |
| GET | `/api/liveavatar/transcript/:sessionId` | Получить транскрипт |

---

## Кастомизация

### Изменить тексты
Редактируй объект `TEXTS` в начале компонента.

### Изменить цвета
Редактируй объект `STYLES` в начале компонента.

### Изменить Telegram контакт
Измени константу `TELEGRAM_USERNAME`.

### Добавить свои направления (context_id)
1. Добавь переменную окружения `LIVEAVATAR_CONTEXT_ID_YOURNAME`
2. Добавь в `CONTEXT_IDS` на сервере
3. Передай `direction="yourname"` в компонент
