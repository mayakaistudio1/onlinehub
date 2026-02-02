import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Check,
  ChevronDown,
  ChevronLeft,
  Clock,
  ExternalLink,
  Globe,
  GraduationCap,
  Heart,
  MapPin,
  MessageSquareText,
  Phone,
  Star,
  TrendingUp,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LiveAvatarChat } from "@/components/ui/LiveAvatarChat";

type ChatIntent = "what" | "who" | "where";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type LiveScenario = "sales" | "projects" | "team" | "expert";

type LiveSession = {
  scenario: LiveScenario;
  sessionId: string;
  prompt: string;
};

const APP_TITLE = "Твоё живое онлайн-представительство";

const container = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function useMockChatResponse() {
  return (intent: ChatIntent) => {
    switch (intent) {
      case "what":
        return "Это твоё живое онлайн-представительство. Ассистент, который объясняет твоё дело, общается с гостями и помогает им понять, чем ты занимаешься. Всё — автоматически, в твоём стиле и 24/7.";
      case "who":
        return "Тем, кто устал объяснять одно и то же. Тем, кто работает с клиентами, партнёрами, инвесторами, командой. Тем, кому важно первое впечатление и ясная подача.";
      case "where":
        return "Для презентации проектов, онбординга, продаж, общения с сообществом. В любом случае, где важны слова — теперь за тебя говорит ассистент.";
      default:
        return "";
    }
  };
}

function Hero() {
  return (
    <section
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-6 py-12 snap-start"
      data-testid="section-hero"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white"
        aria-hidden
      />

      <LazyMotion features={domAnimation}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full max-w-lg text-center"
        >
          <motion.div 
            variants={item}
            className="mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-1 shadow-xl shadow-blue-500/20"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400"
              alt="AI Avatar"
              className="h-full w-full rounded-full object-cover"
            />
          </motion.div>

          <motion.h1
            variants={item}
            className="font-serif text-[2.5rem] leading-[1.1] tracking-[-0.03em] text-balance sm:text-5xl"
            data-testid="text-hero-title"
          >
            {APP_TITLE}
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-sm text-lg leading-relaxed text-muted-foreground"
            data-testid="text-hero-subtitle"
          >
            AI-ассистент, который общается с гостями и представляет тебя — 24/7
          </motion.p>

          <motion.div variants={item} className="mt-10">
            <a href="#demo" className="inline-flex" data-testid="button-scroll-demo">
              <Button className="h-14 gap-3 rounded-full px-8 text-base font-semibold shadow-lg shadow-black/10">
                Попробовать
                <ArrowRight className="h-5 w-5" />
              </Button>
            </a>
          </motion.div>

          <motion.div 
            variants={item}
            className="mt-16 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <ChevronDown className="h-4 w-4 animate-bounce" />
            <span>Листай вниз</span>
          </motion.div>
        </motion.div>
      </LazyMotion>
    </section>
  );
}

function WhyItMatters() {
  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-center px-6 py-16 snap-start"
      id="why"
      data-testid="section-why"
    >
      <div className="mx-auto w-full max-w-lg">
        <LazyMotion features={domAnimation}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-3xl leading-tight tracking-[-0.02em] text-center sm:text-4xl">
              Зачем это нужно?
            </h2>
            
            <div className="mt-10 space-y-6">
              <div className="rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-6 border border-red-100">
                <div className="text-lg font-medium text-red-900 mb-2">Проблема</div>
                <p className="text-muted-foreground leading-relaxed">
                  Ты постоянно объясняешь одно и то же. Клиентам, партнёрам, команде. Это отнимает время и энергию.
                </p>
              </div>
              
              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
              </div>
              
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-100">
                <div className="text-lg font-medium text-green-900 mb-2">Решение</div>
                <p className="text-muted-foreground leading-relaxed">
                  AI-ассистент говорит за тебя. Отвечает на вопросы, объясняет суть и ведёт к действию — круглосуточно.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <a href="#demo" className="inline-flex" data-testid="button-scroll-demo-why">
                <Button className="h-12 gap-2 rounded-full px-6 shadow-md">
                  Смотреть демо
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>
        </LazyMotion>
      </div>
    </section>
  );
}

function TextDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      role: "assistant",
      text: "Привет! Я — консультант сервиса. Расскажу, как работает онлайн-представительство. Что тебя интересует?",
    },
  ]);
  const [loading, setLoading] = useState<ChatIntent | null>(null);
  const respond = useMockChatResponse();

  const ask = async (intent: ChatIntent) => {
    setLoading(intent);

    const userText =
      intent === "what"
        ? "Что это такое?"
        : intent === "who"
          ? "Кому подойдёт?"
          : "Где можно применить?";

    setMessages((m) => [
      ...m,
      { id: `u-${Date.now()}`, role: "user", text: userText },
    ]);

    await new Promise((r) => setTimeout(r, 600));

    setMessages((m) => [
      ...m,
      { id: `a-${Date.now()}`, role: "assistant", text: respond(intent) },
    ]);

    setLoading(null);
  };

  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-center px-6 py-16 snap-start bg-gradient-to-b from-white to-slate-50"
      id="demo"
      data-testid="section-demo"
    >
      <div className="mx-auto w-full max-w-lg">
        <LazyMotion features={domAnimation}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl leading-tight tracking-[-0.02em] sm:text-4xl">
                Спроси консультанта
              </h2>
              <p className="mt-3 text-muted-foreground">
                Это демо — так будет общаться твой ассистент
              </p>
            </div>

            <Card className="rounded-3xl border-0 shadow-xl shadow-black/5 overflow-hidden" data-testid="card-chat">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageSquareText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium" data-testid="text-chat-title">
                      Консультант сервиса
                    </div>
                    <div className="text-white/70 text-xs">
                      Онлайн
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white min-h-[200px] max-h-[280px] overflow-y-auto" data-testid="list-chat-messages">
                <div className="space-y-3">
                  {messages.map((msg, idx) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex",
                        msg.role === "user" ? "justify-end" : "justify-start",
                      )}
                      data-testid={`row-chat-message-${idx}`}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                          msg.role === "user"
                            ? "bg-blue-500 text-white rounded-br-md"
                            : "bg-slate-100 text-foreground rounded-bl-md",
                        )}
                        data-testid={`text-chat-message-${idx}`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading ? (
                    <div className="flex justify-start" data-testid="row-chat-loading">
                      <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-muted-foreground">
                        <span className="animate-pulse">Печатает...</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100" data-testid="grid-chat-buttons">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => ask("what")}
                    disabled={loading !== null}
                    className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm hover:bg-slate-100 transition-colors disabled:opacity-50"
                    data-testid="button-intent-what"
                  >
                    Что это такое?
                  </button>
                  <button
                    onClick={() => ask("who")}
                    disabled={loading !== null}
                    className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm hover:bg-slate-100 transition-colors disabled:opacity-50"
                    data-testid="button-intent-who"
                  >
                    Кому подойдёт?
                  </button>
                  <button
                    onClick={() => ask("where")}
                    disabled={loading !== null}
                    className="px-4 py-2 rounded-full bg-white border border-slate-200 text-sm hover:bg-slate-100 transition-colors disabled:opacity-50"
                    data-testid="button-intent-where"
                  >
                    Где применить?
                  </button>
                </div>
              </div>
            </Card>

            <div className="mt-8 text-center">
              <a href="#scenarios" className="inline-flex" data-testid="button-demo-continue">
                <Button className="h-12 gap-2 rounded-full px-6 shadow-md">
                  Смотреть примеры визиток
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>
        </LazyMotion>
      </div>
    </section>
  );
}


type ScenarioConfig = {
  title: string;
  description: string;
  avatarImage: string;
  businessCard: {
    category: string;
    businessName: string;
    tagline: string;
    avatarName: string;
    highlights: { icon: React.ReactNode; text: string }[];
    whyWorks: string[];
    links: { label: string; url: string }[];
  };
};

const SCENARIO_CONFIGS: Record<LiveScenario, ScenarioConfig> = {
  sales: {
    title: "Продажи и партнёрства",
    description: "Ассистент отвечает на вопросы, отбирает лидов и греет интерес — ещё до первого звонка.",
    avatarImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    businessCard: {
      category: "IT-консалтинг",
      businessName: "TechPro Solutions",
      tagline: "Цифровая трансформация для вашего бизнеса",
      avatarName: "Алексей",
      highlights: [
        { icon: <TrendingUp className="w-4 h-4" />, text: "Рост конверсии до 40%" },
        { icon: <Clock className="w-4 h-4" />, text: "Ответ за 30 секунд" },
        { icon: <Star className="w-4 h-4" />, text: "50+ успешных проектов" },
      ],
      whyWorks: [
        "Квалификация лидов 24/7",
        "Персональный подход к каждому",
        "Интеграция с CRM",
      ],
      links: [
        { label: "Портфолио", url: "#" },
        { label: "Кейсы", url: "#" },
      ],
    },
  },
  projects: {
    title: "Презентации проектов", 
    description: "Идеи, которые раньше требовали встречи — теперь объясняются сами.",
    avatarImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    businessCard: {
      category: "Архитектура и дизайн",
      businessName: "Студия АРТ",
      tagline: "Создаём пространства, которые вдохновляют",
      avatarName: "Мария",
      highlights: [
        { icon: <Briefcase className="w-4 h-4" />, text: "120+ реализованных проектов" },
        { icon: <Star className="w-4 h-4" />, text: "Победитель Design Awards" },
        { icon: <Globe className="w-4 h-4" />, text: "Проекты в 5 странах" },
      ],
      whyWorks: [
        "Визуализация проекта в реальном времени",
        "Ответы на все вопросы инвесторов",
        "Интерактивное портфолио",
      ],
      links: [
        { label: "Галерея работ", url: "#" },
        { label: "Награды", url: "#" },
      ],
    },
  },
  team: {
    title: "Команда и сообщество",
    description: "Единая подача для новых сотрудников и участников. Без лишних сообщений.",
    avatarImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    businessCard: {
      category: "HR Tech",
      businessName: "HR Hub",
      tagline: "Лучшие таланты для лучших команд",
      avatarName: "Дмитрий",
      highlights: [
        { icon: <Users className="w-4 h-4" />, text: "500+ сотрудников в команде" },
        { icon: <Heart className="w-4 h-4" />, text: "Дружелюбная культура" },
        { icon: <Zap className="w-4 h-4" />, text: "Гибкий график работы" },
      ],
      whyWorks: [
        "Онбординг без менеджеров",
        "Ответы на вопросы о культуре",
        "Знакомство с командой",
      ],
      links: [
        { label: "Вакансии", url: "#" },
        { label: "О компании", url: "#" },
      ],
    },
  },
  expert: {
    title: "Первое касание",
    description: "Сильное впечатление с первой секунды. Даже если ты не онлайн.",
    avatarImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    businessCard: {
      category: "Медицинский консультант",
      businessName: "Доктор Иванов",
      tagline: "Забота о здоровье на первом месте",
      avatarName: "Андрей",
      highlights: [
        { icon: <GraduationCap className="w-4 h-4" />, text: "20+ лет опыта" },
        { icon: <Clock className="w-4 h-4" />, text: "Приём: 9:00–18:00" },
        { icon: <MapPin className="w-4 h-4" />, text: "Москва, ЦАО" },
      ],
      whyWorks: [
        "Предварительная консультация",
        "Запись на приём онлайн",
        "Ответы на частые вопросы",
      ],
      links: [
        { label: "Услуги", url: "#" },
        { label: "Отзывы", url: "#" },
      ],
    },
  },
};

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}</span>;
}

function LiveScenarios() {
  const [selected, setSelected] = useState<LiveScenario>("sales");
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scenarios: LiveScenario[] = ["sales", "projects", "team", "expert"];
  const currentConfig = SCENARIO_CONFIGS[selected];
  const { businessCard } = currentConfig;

  useEffect(() => {
    if (isCardOpen) {
      setMessages([]);
    }
  }, [isCardOpen, selected]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: inputValue
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    // Mock response logic
    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "Отличный вопрос! Я с удовольствием расскажу подробнее. Для этого лучше всего созвониться в видео-формате, где я смогу показать всё наглядно. Нажми кнопку 'Позвонить аватару' ниже!"
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, 1000);
  };

  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-center px-6 py-16 snap-start"
      id="scenarios"
      data-testid="section-scenarios"
    >
      <div className="mx-auto w-full max-w-lg">
        <LazyMotion features={domAnimation}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl leading-tight tracking-[-0.02em] sm:text-4xl">
                Примеры визиток
              </h2>
              <p className="mt-3 text-muted-foreground">
                Нажми, чтобы открыть визитку
              </p>
            </div>

            <div className="flex items-center justify-between mb-6" data-testid="scenario-navigation">
              <button
                onClick={() => {
                  const currentIndex = scenarios.indexOf(selected);
                  const nextIndex = (currentIndex - 1 + scenarios.length) % scenarios.length;
                  setSelected(scenarios[nextIndex]);
                }}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                data-testid="button-prev-scenario"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2" data-testid="scenario-tabs">
                {scenarios.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelected(s)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all",
                      selected === s 
                        ? "bg-blue-500 w-8" 
                        : "bg-slate-200 hover:bg-slate-300"
                    )}
                    data-testid={`tab-scenario-${s}`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  const currentIndex = scenarios.indexOf(selected);
                  const nextIndex = (currentIndex + 1) % scenarios.length;
                  setSelected(scenarios[nextIndex]);
                }}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                data-testid="button-next-scenario"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className="relative overflow-hidden rounded-3xl border-0 shadow-2xl shadow-black/10 aspect-[3/4] cursor-pointer"
                  onClick={() => setIsCardOpen(true)}
                  data-testid="card-scenario"
                >
                  <img 
                    src={currentConfig.avatarImage} 
                    alt={currentConfig.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="text-blue-400 text-xs font-medium uppercase tracking-wider mb-2">
                      {businessCard.category}
                    </div>
                    <h3 className="text-white font-serif text-2xl tracking-tight" data-testid="text-scenario-title">
                      {businessCard.businessName}
                    </h3>
                    <p className="text-white/70 text-sm mt-1">
                      {businessCard.tagline}
                    </p>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCardOpen(true);
                      }}
                      className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black rounded-full font-semibold transition-all hover:bg-white/90 shadow-lg"
                      data-testid="button-start-demo"
                    >
                      Открыть визитку
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 text-center">
              <a href="#contact" className="inline-flex" data-testid="button-scenarios-continue">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Хочу такое решение
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </motion.div>
        </LazyMotion>
      </div>

      <AnimatePresence>
        {isCardOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white overflow-y-auto"
            data-testid="modal-business-card"
          >
            <div className="min-h-full">
              <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100">
                <div className="flex items-center justify-between px-4 py-3">
                  <button
                    onClick={() => setIsCardOpen(false)}
                    className="flex items-center gap-1 text-blue-500 font-medium"
                    data-testid="button-back"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Назад
                  </button>
                  <button
                    onClick={() => setIsCardOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100"
                    data-testid="button-close-card"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="text-blue-500 text-xs font-semibold uppercase tracking-wider mb-2">
                  {businessCard.category}
                </div>
                <h1 className="font-serif text-3xl font-bold tracking-tight">
                  {businessCard.businessName}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {businessCard.tagline}
                </p>

                <div className="mt-6 p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl">
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-medium mb-3">
                    <TrendingUp className="w-4 h-4" />
                    Ключевые показатели
                  </div>
                  <div className="space-y-3">
                    {businessCard.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          {h.icon}
                        </div>
                        <span className="text-sm font-medium">{h.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                  <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium mb-3">
                    <Check className="w-4 h-4" />
                    Почему это работает
                  </div>
                  <div className="space-y-2">
                    {businessCard.whyWorks.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  {businessCard.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-medium transition-colors"
                      data-testid={`link-${link.label}`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="mt-8 p-5 bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 rounded-2xl border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={currentConfig.avatarImage}
                        alt={businessCard.avatarName}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{businessCard.avatarName}</div>
                      <div className="text-xs text-green-600 font-semibold uppercase tracking-wider">в сети</div>
                    </div>
                  </div>

                  <div className="mt-5 relative flex flex-col h-[300px] bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 overflow-hidden">
                    <div className="absolute -top-6 left-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white/80" />
                    
                    <div className="flex-1 p-4 overflow-y-auto space-y-3">
                      {messages.length === 0 ? (
                        <div className="text-sm leading-relaxed text-slate-700">
                          <TypewriterText text={`Привет! Я ${businessCard.avatarName}. Помогу разобраться — что хочешь узнать?`} />
                        </div>
                      ) : (
                        <>
                          {messages.map((msg) => (
                            <div
                              key={msg.id}
                              className={cn(
                                "flex flex-col",
                                msg.role === "user" ? "items-end" : "items-start"
                              )}
                            >
                              <div
                                className={cn(
                                  "px-3 py-2 rounded-xl max-w-[90%] text-sm",
                                  msg.role === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-slate-700 border border-slate-100 shadow-sm"
                                )}
                              >
                                {msg.text}
                              </div>
                            </div>
                          ))}
                          <div ref={chatEndRef} />
                        </>
                      )}
                    </div>

                    <div className="p-2 bg-slate-50/50 border-t border-slate-100">
                      <div className="relative group">
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Напиши вопрос..."
                          className="h-12 pl-4 pr-10 rounded-xl border-slate-200 bg-white shadow-sm focus-visible:ring-purple-400 transition-all text-sm"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSendMessage();
                            }
                          }}
                          data-testid="input-scenario-chat"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg text-white shadow-sm hover:scale-105 transition-transform"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <button
                      onClick={() => {
                        setIsChatMode(false);
                        setIsCallOpen(true);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-slate-800 active:scale-[0.98] transition-all"
                      data-testid="button-video-call"
                    >
                      <Video className="w-5 h-5" />
                      Позвонить аватару
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LiveAvatarChat
        isOpen={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        scenario={{
          key: selected,
          title: businessCard.businessName,
          description: businessCard.tagline,
          avatarImage: currentConfig.avatarImage,
        }}
        language="ru"
      />
    </section>
  );
}

function ContactSection() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const submit = async () => {
    if (!name || !contact) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  };

  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-center px-6 py-16 snap-start bg-gradient-to-b from-slate-50 to-white"
      id="contact"
      data-testid="section-contact"
    >
      <div className="mx-auto w-full max-w-lg">
        <LazyMotion features={domAnimation}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl leading-tight tracking-[-0.02em] sm:text-4xl">
                Запустим пилот?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Настройка под ключ — $2,500
              </p>
            </div>

            <Card className="rounded-3xl border-0 shadow-xl shadow-black/5 p-6" data-testid="card-contact">
              <div className="space-y-4">
                <div className="space-y-4 mb-6">
                  {[
                    "Цифровое представительство",
                    "1–2 AI-ассистента",
                    "Индивидуальный стиль",
                    "Запуск за неделю",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3" data-testid={`feature-${i}`}>
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <div className="space-y-4">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Твоё имя"
                      className="h-12 rounded-xl border-slate-200 bg-slate-50"
                      data-testid="input-name"
                    />
                    <Input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Telegram или email"
                      className="h-12 rounded-xl border-slate-200 bg-slate-50"
                      data-testid="input-contact"
                    />
                    <Button
                      onClick={submit}
                      className="h-12 w-full rounded-xl"
                      disabled={status !== "idle" || !name || !contact}
                      data-testid="button-submit-lead"
                    >
                      {status === "sending" ? "Отправка..." : status === "sent" ? "Отправлено!" : "Обсудить запуск"}
                    </Button>
                  </div>
                  
                  {status === "sent" && (
                    <p className="mt-4 text-center text-sm text-green-600" data-testid="status-success">
                      Спасибо, {name}! Свяжемся через {contact}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Без спама. Без воронок. Просто разговор.
            </p>
          </motion.div>
        </LazyMotion>
      </div>
    </section>
  );
}


function Footer() {
  return (
    <footer className="border-t border-slate-100 py-8 px-6" data-testid="footer">
      <div className="mx-auto max-w-lg text-center">
        <div className="text-sm text-muted-foreground" data-testid="text-footer">
          {APP_TITLE}
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-dvh" data-testid="page-home">
      <Hero />
      <WhyItMatters />
      <TextDemo />
      <LiveScenarios />
      <ContactSection />
      <Footer />
    </div>
  );
}
