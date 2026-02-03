import { motion } from "framer-motion";
import { Video } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface ChatPreviewBarProps {
  onOpenChat: () => void;
}

export function ChatPreviewBar({ onOpenChat }: ChatPreviewBarProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="fixed bottom-4 left-4 right-4 z-40"
      data-testid="live-consultant-bar"
    >
      <button
        onClick={onOpenChat}
        className="w-full max-w-md mx-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-black/10 hover:bg-white/90 hover:shadow-xl transition-all duration-300"
        data-testid="button-live-consultant"
      >
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </div>
        
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 text-sm">
              {t.liveBar?.title || "Live консультант"}
            </span>
            <span className="text-[10px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
              {t.liveBar?.online || "онлайн"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.liveBar?.subtitle || "Нажмите для живого общения"}
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md">
          <Video className="w-4 h-4 text-white" />
        </div>
      </button>
    </motion.div>
  );
}
