import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { useLanguage } from "@/lib/LanguageContext";

interface ChatPreviewBarProps {
  onOpenChat: (initialMessage?: string) => void;
}

export function ChatPreviewBar({ onOpenChat }: ChatPreviewBarProps) {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    onOpenChat();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onOpenChat(inputValue.trim());
      setInputValue("");
    } else {
      onOpenChat();
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 pb-[max(env(safe-area-inset-bottom),12px)]"
      data-testid="chat-preview-bar"
    >
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-700 leading-snug line-clamp-2">
              {t.demo.greeting}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={handleFocus}
            placeholder={t.demo.inputPlaceholder || "Ask anything..."}
            className="flex-1 h-11 text-base rounded-full border-slate-200 px-4"
            data-testid="input-chat-preview"
          />
          <Button
            type="submit"
            className="h-11 w-11 rounded-full p-0"
            data-testid="button-chat-preview-send"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
