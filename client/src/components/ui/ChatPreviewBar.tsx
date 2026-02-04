import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
      className="fixed bottom-4 left-4 right-4 z-40 pb-[env(safe-area-inset-bottom)]"
      data-testid="live-consultant-bar"
    >
      <button
        onClick={onOpenChat}
        className="w-full max-w-[520px] mx-auto flex items-center gap-3 px-5 py-4 rounded-[20px] bg-white/75 backdrop-blur-[14px] border border-white/40 shadow-lg shadow-black/8 hover:bg-white/85 hover:shadow-xl transition-all duration-300"
        data-testid="button-live-consultant"
      >
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-400 to-cyan-400 shadow-lg shadow-pink-500/20 animate-[pulse_3s_ease-in-out_infinite]">
            <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-pink-400/80 via-purple-300/60 to-cyan-300/80" />
            <div className="absolute top-1 left-1.5 h-1.5 w-1.5 rounded-full bg-white/50 blur-[2px]" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 flex items-center gap-1 bg-white rounded-full pl-1 pr-1.5 py-0.5 shadow-sm">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-medium text-slate-600">
              {t.liveBar?.online || "онлайн"}
            </span>
          </div>
        </div>
        
        <div className="flex-1 text-left ml-1">
          <span className="font-semibold text-slate-800 text-[15px]">
            {t.liveBar?.title || "Live консультант"}
          </span>
          <p className="text-xs text-slate-500 mt-0.5">
            {t.liveBar?.subtitle || "Нажмите для общения"}
          </p>
        </div>

        <div className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center shrink-0 shadow-md hover:bg-slate-800 transition-colors">
          <ArrowRight className="w-5 h-5 text-white" />
        </div>
      </button>
    </motion.div>
  );
}
