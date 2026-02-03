import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Language } from '@/lib/translations';
import { cn } from '@/lib/utils';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-lg border transition-all active:scale-95",
            language === lang.code 
              ? "bg-slate-900 border-slate-900 text-white" 
              : "bg-white/90 backdrop-blur-md border-slate-200/50 text-slate-700 hover:bg-white"
          )}
          data-testid={`button-language-${lang.code}`}
        >
          <span className="text-base">{lang.flag}</span>
          <span className="text-xs font-bold">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
