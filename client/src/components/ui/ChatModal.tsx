import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input } from "./input";
import { useLanguage } from "@/lib/LanguageContext";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const { t } = useLanguage();
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
          text: t.demo.greeting,
        },
      ]);
    }
  }, [isOpen, t.demo.greeting, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  const handleQuickQuestion = (index: number) => {
    sendMessage(t.demo.questions[index]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-white"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">WOW Page</h3>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            data-testid="button-close-chat"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <div
          className="flex-1 overflow-y-auto px-4 py-4"
          data-testid="list-chat-messages"
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
                data-testid={`row-chat-message-${idx}`}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-slate-100 text-slate-800 rounded-bl-md"
                  )}
                  data-testid={`text-chat-message-${idx}`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-start" data-testid="row-chat-loading">
                <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-slate-400">
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

        <div className="border-t border-slate-100 bg-white px-4 py-3 pb-[env(safe-area-inset-bottom,12px)]">
          <div className="max-w-lg mx-auto">
            <div className="flex flex-wrap gap-2 mb-3">
              {t.demo.questions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(idx)}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-xs text-slate-700 hover:bg-slate-200 transition-colors disabled:opacity-50"
                  data-testid={`button-quick-${idx}`}
                >
                  {question}
                </button>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.demo.inputPlaceholder || "Ask anything..."}
                className="flex-1 h-11 text-base rounded-full border-slate-200 px-4"
                disabled={loading}
                data-testid="input-chat"
              />
              <Button
                type="submit"
                className="h-11 w-11 rounded-full p-0"
                disabled={loading || !inputValue.trim()}
                data-testid="button-chat-send"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
