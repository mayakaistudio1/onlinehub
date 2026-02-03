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
  FileText,
  Globe,
  GraduationCap,
  HelpCircle,
  Heart,
  MapPin,
  MessageCircle,
  MessageSquareText,
  MoveRight,
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
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-5 py-10 snap-start"
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
          className="relative mx-auto w-full max-w-sm text-center"
        >
          <motion.div 
            variants={item}
            className="relative mx-auto mb-8"
          >
            {/* Search bar style container */}
            <div className="relative inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-xl px-4 py-3 shadow-lg shadow-black/[0.06] border border-white/50">
              {/* Glow effect behind orb */}
              <div className="absolute left-3.5 h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 blur-xl opacity-40" />
              {/* Gradient orb */}
              <div className="relative h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-400 to-cyan-400 shadow-lg shadow-pink-500/20 animate-[pulse_3s_ease-in-out_infinite]">
                <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-pink-400/80 via-purple-300/60 to-cyan-300/80" />
                <div className="absolute top-1 left-1.5 h-1.5 w-1.5 rounded-full bg-white/50 blur-[2px]" />
              </div>
              {/* Divider */}
              <div className="h-6 w-px bg-slate-300" />
              {/* Text */}
              <span className="tracking-wide pr-1 text-slate-800 font-medium text-lg">WOW Page Live...</span>
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-serif text-[2rem] leading-[1.15] tracking-[-0.03em] text-balance"
            data-testid="text-hero-title"
          >
            Онлайн-представительство нового поколения
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-4 text-base leading-relaxed text-muted-foreground"
            data-testid="text-hero-subtitle"
          >
            Место, где твою идею действительно понимают.
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <a href="#demo" className="inline-flex" data-testid="button-scroll-demo">
              <Button className="h-12 gap-2 rounded-full px-6 text-sm font-semibold shadow-md shadow-black/10">
                Попробовать
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </motion.div>

          <motion.div 
            variants={item}
            className="mt-8 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"
          >
            <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
            <span>Листай вниз</span>
          </motion.div>
        </motion.div>
      </LazyMotion>
    </section>
  );
}

const comparisonData = {
  problem: {
    title: "Обычный сайт",
    items: [
      "Показывает информацию",
      "Ждёт, что человек сам разберётся",
      "Оставляет вопросы без ответа",
      "Не ведёт дальше",
    ],
  },
  solution: {
    title: "Живое онлайн-представительство",
    items: [
      "Начинает диалог сразу",
      "Отвечает на вопросы",
      "Помогает понять суть",
      "Показывает следующий шаг",
    ],
  },
};

function WhyItMatters() {
  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-center px-5 py-8 snap-start overflow-hidden"
      id="why"
      data-testid="section-why"
    >
      <div className="relative mx-auto w-full max-w-sm">
        <LazyMotion features={domAnimation}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em]">
              Почему просто сайта уже недостаточно
            </h2>
            <p className="mt-2 text-muted-foreground text-sm">
              Сайт показывает. Представительство — общается.
            </p>
          </motion.div>

          <div className="space-y-3">
            {/* Обычный сайт */}
            <div className="p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                  <X className="w-4 h-4" />
                </div>
                <span className="font-medium text-slate-600 text-sm">{comparisonData.problem.title}</span>
              </div>
              <div className="space-y-1.5 text-slate-500 text-xs">
                {comparisonData.problem.items.map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Живое онлайн-представительство */}
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="font-medium text-blue-900 text-sm">{comparisonData.solution.title}</span>
              </div>
              <div className="space-y-1.5 text-blue-800 text-xs font-medium">
                {comparisonData.solution.items.map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-500" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-xs">Это не «ещё один сайт».</p>
            <p className="text-foreground font-serif text-lg font-bold mt-1">Это формат общения.</p>
          </div>

          <div className="mt-6 text-center">
            <a href="#demo" className="inline-flex" data-testid="button-scroll-demo-why">
              <Button className="h-12 gap-2 rounded-full px-6 text-sm font-semibold shadow-md bg-blue-600 hover:bg-blue-700">
                Смотреть демо
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
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
      className="relative min-h-[100dvh] flex items-center justify-center px-5 py-8 snap-start bg-white"
      id="demo"
      data-testid="section-demo"
    >
      <div className="mx-auto w-full max-w-sm">
        <LazyMotion features={domAnimation}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-5">
              <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em]">
                Как это работает
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">
                Попробуй задать вопрос
              </p>
            </div>

            <Card className="rounded-2xl border-0 shadow-lg shadow-black/5 overflow-hidden" data-testid="card-chat">
              <div className="p-3 bg-white min-h-[180px] max-h-[220px] overflow-y-auto" data-testid="list-chat-messages">
                <div className="space-y-2">
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
                          "max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed",
                          msg.role === "user"
                            ? "bg-blue-500 text-white rounded-br-sm"
                            : "bg-slate-100 text-foreground rounded-bl-sm",
                        )}
                        data-testid={`text-chat-message-${idx}`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {loading ? (
                    <div className="flex justify-start" data-testid="row-chat-loading">
                      <div className="bg-slate-100 rounded-xl rounded-bl-sm px-3 py-2 text-xs text-muted-foreground">
                        <span className="animate-pulse">Печатает...</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border-t border-slate-100" data-testid="grid-chat-buttons">
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => ask("what")}
                    disabled={loading !== null}
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs hover:bg-slate-100 transition-colors disabled:opacity-50"
                    data-testid="button-intent-what"
                  >
                    Что это?
                  </button>
                  <button
                    onClick={() => ask("who")}
                    disabled={loading !== null}
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs hover:bg-slate-100 transition-colors disabled:opacity-50"
                    data-testid="button-intent-who"
                  >
                    Кому подойдёт?
                  </button>
                  <button
                    onClick={() => ask("where")}
                    disabled={loading !== null}
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs hover:bg-slate-100 transition-colors disabled:opacity-50"
                    data-testid="button-intent-where"
                  >
                    Где применить?
                  </button>
                </div>
              </div>
            </Card>

            <div className="mt-5 text-center">
              <a href="#scenarios" className="inline-flex" data-testid="button-demo-continue">
                <Button className="h-11 gap-2 rounded-full px-5 text-sm shadow-md">
                  Смотреть примеры
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
      className="relative min-h-[100dvh] flex items-center justify-center px-5 py-8 snap-start"
      id="scenarios"
      data-testid="section-scenarios"
    >
      <div className="mx-auto w-full max-w-sm">
        <LazyMotion features={domAnimation}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-4">
              <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em]">
                Сценарии использования
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">
                Один формат — разные задачи
              </p>
            </div>

            <div className="flex items-center justify-between mb-4" data-testid="scenario-navigation">
              <button
                onClick={() => {
                  const currentIndex = scenarios.indexOf(selected);
                  const nextIndex = (currentIndex - 1 + scenarios.length) % scenarios.length;
                  setSelected(scenarios[nextIndex]);
                }}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                data-testid="button-prev-scenario"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1.5" data-testid="scenario-tabs">
                {scenarios.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelected(s)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      selected === s 
                        ? "bg-blue-500 w-6" 
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
                <ArrowRight className="w-4 h-4" />
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
                  className="relative overflow-hidden rounded-2xl border-0 shadow-xl shadow-black/10 aspect-[4/5] cursor-pointer"
                  onClick={() => setIsCardOpen(true)}
                  data-testid="card-scenario"
                >
                  <img 
                    src={currentConfig.avatarImage} 
                    alt={currentConfig.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="text-blue-400 text-[10px] font-medium uppercase tracking-wider mb-1">
                      {businessCard.category}
                    </div>
                    <h3 className="text-white font-serif text-xl tracking-tight" data-testid="text-scenario-title">
                      {businessCard.businessName}
                    </h3>
                    <p className="text-white/70 text-xs mt-1">
                      {businessCard.tagline}
                    </p>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCardOpen(true);
                      }}
                      className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 bg-white text-black rounded-full text-sm font-semibold transition-all hover:bg-white/90 shadow-lg"
                      data-testid="button-start-demo"
                    >
                      Открыть визитку
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 text-center">
              <a href="#contact" className="inline-flex" data-testid="button-scenarios-continue">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-sm">
                  Хочу такое решение
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
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
      className="relative min-h-[100dvh] flex items-center justify-center px-5 py-10 snap-start bg-white"
      id="contact"
      data-testid="section-contact"
    >
      <div className="mx-auto w-full max-w-sm">
        <LazyMotion features={domAnimation}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em] text-slate-900">
                Запускаем твоё живое онлайн-представительство
              </h2>
              <p className="mt-3 text-slate-400 text-sm">
                Через 48 часов — формат, который работает за тебя.
              </p>
            </div>

            {/* What you get */}
            <div className="mb-5 py-4 px-5 bg-slate-50 rounded-2xl">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Что ты получаешь</p>
              <div className="space-y-1.5 text-slate-600 text-sm">
                <p>— живое онлайн-представительство</p>
                <p>— ассистентов под твою задачу</p>
                <p>— понятный первый шаг для посетителей</p>
              </div>
            </div>

            {/* FOMO */}
            <p className="text-center text-xs text-violet-500 mb-5">
              Количество запусков ограничено. Работаем с теми, кто первый.
            </p>

            {/* Form */}
            <div className="space-y-2.5">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Твоё имя"
                className="h-12 rounded-xl bg-slate-50 border-0 px-4 text-sm placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-200"
                data-testid="input-name"
              />
              <Input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Telegram или email"
                className="h-12 rounded-xl bg-slate-50 border-0 px-4 text-sm placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-200"
                data-testid="input-contact"
              />
              <Button
                onClick={submit}
                className="h-12 w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all active:scale-[0.98]"
                disabled={status !== "idle" || !name || !contact}
                data-testid="button-submit-lead"
              >
                {status === "sending" ? "Отправка..." : status === "sent" ? "Отправлено!" : "Обсудить запуск"}
              </Button>
            </div>
            
            {status === "sent" && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="mt-3 text-center text-sm text-green-600"
              >
                Спасибо, {name}! Свяжемся через {contact}
              </motion.p>
            )}

            {/* Microtext */}
            <p className="mt-5 text-center text-[10px] text-slate-400">
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
