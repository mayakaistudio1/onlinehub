import { createContext, useContext, useEffect, useState, ReactNode } from "react";

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    start_param?: string;
  };
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
    setText: (text: string) => void;
    enable: () => void;
    disable: () => void;
  };
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
    notificationOccurred: (type: "error" | "success" | "warning") => void;
    selectionChanged: () => void;
  };
}

interface TelegramContextType {
  webApp: TelegramWebApp | null;
  user: TelegramUser | null;
  isTelegram: boolean;
  isReady: boolean;
  colorScheme: "light" | "dark";
}

const TelegramContext = createContext<TelegramContextType>({
  webApp: null,
  user: null,
  isTelegram: false,
  isReady: false,
  colorScheme: "light",
});

export function TelegramProvider({ children }: { children: ReactNode }) {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    
    console.log("[Telegram] WebApp available:", !!tg);
    console.log("[Telegram] initData:", tg?.initData);
    console.log("[Telegram] initDataUnsafe:", JSON.stringify(tg?.initDataUnsafe, null, 2));
    console.log("[Telegram] user:", JSON.stringify(tg?.initDataUnsafe?.user, null, 2));
    console.log("[Telegram] language_code:", tg?.initDataUnsafe?.user?.language_code);
    
    if (tg && tg.initData) {
      setWebApp(tg);
      tg.ready();
      tg.expand();
      setIsReady(true);
    } else {
      setIsReady(true);
    }
  }, []);

  const value: TelegramContextType = {
    webApp,
    user: webApp?.initDataUnsafe?.user || null,
    isTelegram: !!webApp && !!webApp.initData,
    isReady,
    colorScheme: webApp?.colorScheme || "light",
  };

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
}

export function useTelegram() {
  const context = useContext(TelegramContext);
  if (!context) {
    throw new Error("useTelegram must be used within TelegramProvider");
  }
  return context;
}
