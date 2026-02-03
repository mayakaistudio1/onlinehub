import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, getTranslation } from './translations';
import { useTelegram } from './telegram';

type TranslationType = typeof translations.ru;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'wow-page-language';

function getSystemLanguage(): Language {
  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  if (browserLang === 'ru') return 'ru';
  if (browserLang === 'de') return 'de';
  if (browserLang === 'es') return 'es';
  return 'en';
}

function detectBrowserLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored && ['ru', 'en', 'de', 'es'].includes(stored)) {
    return stored;
  }
  
  return getSystemLanguage();
}

function langCodeToLanguage(langCode: string | undefined): Language | null {
  if (!langCode) return null;
  const lang = langCode.slice(0, 2).toLowerCase();
  if (lang === 'ru') return 'ru';
  if (lang === 'de') return 'de';
  if (lang === 'es') return 'es';
  if (lang === 'en') return 'en';
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { user, isTelegram, isTelegramContext, isReady } = useTelegram();
  const [language, setLanguageState] = useState<Language>('ru');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isReady) return;
    
    if (isTelegram && user?.language_code) {
      const tgLang = langCodeToLanguage(user.language_code);
      if (tgLang) {
        console.log("[Language] Using Telegram user language:", tgLang);
        setLanguageState(tgLang);
        setIsInitialized(true);
        return;
      }
    }
    
    if (isTelegramContext) {
      const systemLang = getSystemLanguage();
      console.log("[Language] In Telegram context, using system language:", systemLang);
      setLanguageState(systemLang);
      setIsInitialized(true);
      return;
    }
    
    const detected = detectBrowserLanguage();
    console.log("[Language] Using browser/stored language:", detected);
    setLanguageState(detected);
    setIsInitialized(true);
  }, [isReady, isTelegram, isTelegramContext, user]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = getTranslation(language);

  if (!isInitialized) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
