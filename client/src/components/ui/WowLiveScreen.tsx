import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Video, Mic, MicOff, PhoneOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { LiveAvatarChat } from "./LiveAvatarChat";
import { useLanguage } from "@/lib/LanguageContext";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

interface WowLiveScreenProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

export function WowLiveScreen({ isOpen, onClose, language }: WowLiveScreenProps) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"chat" | "live">("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "m1",
          role: "assistant",
          text: t.wowLive?.greeting || "Привет! Я live-консультант WOW Page Live.\nМожем пообщаться здесь в чате или перейти в живой видеозвонок. С чего начнём?",
        },
      ]);
    }
  }, [isOpen, t.wowLive?.greeting, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && mode === "chat") {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 300);
    } else if (!isOpen) {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mode]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    setLoading(true);
    setInputValue("");

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: text.trim(),
    };

    setMessages((m) => [...m, userMessage]);

    try {
      const history = messages
        .filter((m) => m.id !== "m1")
        .map((m) => ({
          role: m.role,
          content: m.text,
        }));

      const response = await fetch("/api/demo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.trim(),
          history,
        }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((m) => [
          ...m,
          { id: `a-${Date.now()}`, role: "assistant", text: data.reply },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const startLiveCall = () => {
    setMode("live");
  };

  const endLiveCall = () => {
    setMode("chat");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col bg-gradient-to-b from-slate-50 to-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-400 to-cyan-400 shadow-md">
                <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-pink-400/80 via-purple-300/60 to-cyan-300/80" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">WOW Live</h3>
              <p className="text-xs text-green-600">
                {t.wowLive?.consultantOnline || "Live консультант онлайн"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            data-testid="button-close-wow-live"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {mode === "chat" ? (
          <>
            {/* Chat Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4"
              data-testid="list-wow-live-messages"
            >
              <div className="space-y-3 max-w-lg mx-auto">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex",
                      msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line",
                        msg.role === "user"
                          ? "bg-slate-900 text-white rounded-br-md"
                          : "bg-white text-slate-800 rounded-bl-md shadow-sm border border-slate-100"
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 text-sm text-slate-400 shadow-sm border border-slate-100">
                      <span className="inline-flex gap-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Start Live Call Button */}
            <div className="px-4 py-3 bg-gradient-to-t from-white via-white to-transparent">
              <div className="max-w-lg mx-auto">
                <button
                  onClick={startLiveCall}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white font-medium shadow-lg shadow-fuchsia-500/25 hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all"
                  data-testid="button-start-live-call"
                >
                  <Video className="w-5 h-5" />
                  <span>{t.wowLive?.startLiveCall || "Начать живое общение"}</span>
                </button>
                <p className="text-center text-xs text-slate-400 mt-2">
                  {t.wowLive?.liveCallHint || "Видеозвонок с live-аватаром"}
                </p>
              </div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-slate-100 bg-white px-4 py-3 pb-[max(env(safe-area-inset-bottom),12px)]">
              <div className="max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t.demo?.inputPlaceholder || "Напишите сообщение..."}
                    className="flex-1 h-11 text-base rounded-full border-slate-200 px-4"
                    disabled={loading}
                    data-testid="input-wow-live-chat"
                  />
                  <Button
                    type="submit"
                    className="h-11 w-11 rounded-full p-0 bg-slate-900 hover:bg-slate-800"
                    disabled={loading || !inputValue.trim()}
                    data-testid="button-wow-live-send"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </>
        ) : (
          /* Live Call Mode */
          <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            <div className="flex-1 flex items-center justify-center">
              <LiveAvatarChat
                isOpen={true}
                onClose={endLiveCall}
                scenario={{
                  key: "wow-live",
                  title: "WOW Live",
                  description: "Live Avatar Chat",
                }}
                language={language}
              />
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
