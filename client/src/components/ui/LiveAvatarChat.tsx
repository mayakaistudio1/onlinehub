import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, VideoOff, Mic, MicOff, X, Loader2, Phone, PhoneOff, Volume2, MessageCircle, ArrowRight } from "lucide-react";
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
} from "livekit-client";

const TEXTS = {
  avatarName: "AI Ассистент",
  avatarInitial: "A",
  preCall: {
    buttonText: "Chat now",
  },
  duringCall: {
    connecting: "Подключение...",
    connectingSubtitle: "Пожалуйста, подождите",
    waitingAvatar: "Ожидание аватара...",
    waitingAvatarSubtitle: "Аватар подключается",
    online: "Онлайн",
    clickToCall: "Нажмите для звонка",
    unlockAudioTitle: "Разрешите воспроизведение звука",
    unlockAudioSubtitle: "Нажмите кнопку ниже, чтобы услышать ассистента",
    unlockAudioButton: "Включить звук",
    enableMic: "Enable Microphone",
    allowMic: "Allow mic permission to start the chat",
  },
  postCall: {
    title: "Звонок завершён",
    subtitle: "Спасибо за разговор!",
    telegramButton: "Написать в Telegram",
    newCallButton: "Новый звонок",
  },
  error: {
    title: "Ошибка подключения",
    retryButton: "Попробовать снова",
  },
};

const TELEGRAM_USERNAME = "KirillSed";

interface ScenarioConfig {
  key: string;
  title: string;
  description: string;
  avatarImage?: string;
}

interface LiveAvatarChatProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: ScenarioConfig;
  language?: string;
  className?: string;
  autoStart?: boolean;
}

type SessionState = "idle" | "connecting" | "waiting_avatar" | "connected" | "error" | "ended";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export function LiveAvatarChat({
  isOpen,
  onClose,
  scenario,
  language = "ru",
  className,
  autoStart = false,
}: LiveAvatarChatProps) {
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [isMuted, setIsMuted] = useState(true);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [showUnlockPrompt, setShowUnlockPrompt] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(60);
  const sessionStartTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContainerRef = useRef<HTMLDivElement>(null);
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const roomRef = useRef<Room | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionDataRef = useRef<{
    sessionId: string;
    sessionToken: string;
  } | null>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Timer countdown for connected state
  useEffect(() => {
    if (sessionState === "connected") {
      setRemainingSeconds(60);
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setRemainingSeconds(60);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [sessionState]);

  const telegramLink = `https://t.me/${TELEGRAM_USERNAME}`;

  const sendTextMessage = useCallback(async (text: string) => {
    if (!text.trim() || isSending) return;

    try {
      setIsSending(true);
      const userMessage: Message = { id: Date.now().toString(), role: "user", text };
      setMessages(prev => [...prev, userMessage]);
      setInputText("");

      if (sessionDataRef.current?.sessionToken) {
        const response = await fetch("/api/liveavatar/event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_token: sessionDataRef.current.sessionToken,
            event_type: "text_message",
            data: { text }
          }),
        });

        if (!response.ok) throw new Error("Failed to send message");
      } else {
        // Handle message when session is not yet active (e.g. echo or queue)
        setTimeout(() => {
          const assistantMessage: Message = { 
            id: Date.now().toString() + Math.random(), 
            role: "assistant", 
            text: "Я получу ваше сообщение, как только мы установим соединение. Нажмите «Enable Microphone», чтобы начать общение голосом и видео." 
          };
          setMessages(prev => [...prev, assistantMessage]);
        }, 1000);
      }
      
    } catch (err) {
      console.error("Error sending text message:", err);
    } finally {
      setIsSending(false);
    }
  }, [isSending]);

  const startSession = useCallback(async () => {
    if (sessionState === "connecting" || sessionState === "connected") {
      return;
    }
    
    try {
      setSessionState("connecting");
      setError(null);

      const tokenRes = await fetch("/api/liveavatar/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, direction: scenario.key }),
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
  }, [language, scenario.key, sessionState]);

  // Auto-start session if autoStart prop is true
  const autoStartRef = useRef(false);
  useEffect(() => {
    if (autoStart && isOpen && sessionState === "idle" && !autoStartRef.current) {
      autoStartRef.current = true;
      startSession();
    }
  }, [autoStart, isOpen, sessionState, startSession]);

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
        } else if (data.type === "avatar_text" || data.type === "agent_text") {
          const assistantMessage: Message = { 
            id: Date.now().toString() + Math.random(), 
            role: "assistant", 
            text: data.data?.text || data.text 
          };
          setMessages(prev => [...prev, assistantMessage]);
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
      
      setSessionState("idle");
      onClose();
      setAudioUnlocked(false);
      setShowUnlockPrompt(false);
      setIsAvatarSpeaking(false);
      setIsMuted(true);
      sessionStartTimeRef.current = 0;
    }
  }, [onClose]);

  // Auto-end call when timer reaches 0
  useEffect(() => {
    if (remainingSeconds === 0 && sessionState === "connected") {
      stopSession(false);
    }
  }, [remainingSeconds, sessionState, stopSession]);

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "fixed inset-0 z-50 flex flex-col overflow-hidden max-h-[100dvh] bg-gray-900",
          className
        )}
      >
        <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent absolute top-0 left-0 right-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">{TEXTS.avatarInitial}</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">{scenario.title}</h3>
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

        <div className="flex-1 flex flex-col relative overflow-hidden">
          {sessionState === "idle" && !autoStart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col"
            >
              {/* HERO AVATAR SECTION - Top 45% */}
              <div className="relative h-[45%] overflow-hidden">
                {scenario.avatarImage ? (
                  <img 
                    src={scenario.avatarImage} 
                    alt={scenario.title}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                    <Video className="w-24 h-24 text-white/50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              </div>

              {/* CONTENT SECTION - Bottom 55% */}
              <div className="flex-1 flex flex-col px-6 pt-6 pb-8 -mt-12 relative z-10">
                {/* Title & Description */}
                <div className="text-center mb-6">
                  <h2 className="text-white text-2xl font-bold mb-2 tracking-tight">
                    {scenario.title}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
                    {scenario.description}
                  </p>
                </div>

                {/* Two Action Buttons */}
                <div className="flex flex-col gap-3 mb-6">
                  <button
                    onClick={startSession}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all shadow-lg shadow-cyan-500/20"
                    data-testid="button-start-call"
                  >
                    <Video className="w-5 h-5" />
                    Видеозвонок
                  </button>
                </div>

                {/* Chat Section Removed */}
              </div>
            </motion.div>
          )}
          
          {/* ... other states (connecting, waiting, error) remain similar ... */}

          {(sessionState === "connected" || (autoStart && (sessionState === "idle" || sessionState === "connecting" || sessionState === "waiting_avatar"))) && (
            <div className="absolute inset-0 bg-black">
              {/* VIDEO SECTION - TRUE FULL SCREEN 9:16 */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
                data-testid="video-avatar"
              />
              
              {/* Connecting Overlay - shown when not yet connected */}
              {sessionState !== "connected" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center animate-pulse">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-white/80 text-sm">{TEXTS.duringCall.connecting}</p>
                </div>
              )}
              
              {/* Timer Display - only when connected */}
              {sessionState === "connected" && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
                  <div className={cn(
                    "px-4 py-2 rounded-full backdrop-blur-md font-mono text-lg font-semibold",
                    remainingSeconds <= 10 
                      ? "bg-red-500/80 text-white" 
                      : "bg-black/40 text-white/90"
                  )}>
                    {Math.floor(remainingSeconds / 60)}:{(remainingSeconds % 60).toString().padStart(2, '0')}
                  </div>
                </div>
              )}
              
              {/* Mute/End buttons Overlay */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-10">
                <button
                  onClick={toggleMute}
                  disabled={isAvatarSpeaking || sessionState !== "connected"}
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-lg",
                    isMuted ? "bg-white/20 text-white" : "bg-white text-black",
                    (isAvatarSpeaking || sessionState !== "connected") && "opacity-50"
                  )}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>
                <button
                  onClick={() => stopSession(true)}
                  className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg"
                >
                  <PhoneOff className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          {sessionState === "ended" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center px-6"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
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
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-full font-semibold transition-colors shadow-lg"
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
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full text-sm font-medium"
              data-testid="button-unlock-audio"
            >
              {TEXTS.duringCall.unlockAudioButton}
            </button>
          </motion.div>
        )}

        {/* CONTROL BUTTONS (во время звонка) - REMOVED AS THEY ARE NOW OVERLAYED ON VIDEO */}
        
        {/* Hidden audio container - always mounted for audio track attachment */}
        <div ref={audioContainerRef} className="hidden" />
      </motion.div>
    </AnimatePresence>
  );
}
