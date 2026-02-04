import { useEffect, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
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
  Mic,
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
import { ChatModal } from "@/components/ui/ChatModal";
import { ChatPreviewBar } from "@/components/ui/ChatPreviewBar";
import { WowLiveScreen } from "@/components/ui/WowLiveScreen";
import { ResearchSection } from "@/components/ui/ResearchSection";
import { useLanguage } from '@/lib/LanguageContext';

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

const container = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

function Hero() {
  const { t } = useLanguage();
  
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
            <div className="relative inline-flex items-center gap-3 rounded-full bg-white/80 backdrop-blur-xl px-4 py-3 shadow-lg shadow-black/[0.06] border border-white/50">
              <div className="absolute left-3.5 h-10 w-10 rounded-full bg-gradient-to-br from-pink-400 via-purple-400 to-cyan-400 blur-xl opacity-40" />
              <div className="relative h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-400 to-cyan-400 shadow-lg shadow-pink-500/20 animate-[pulse_3s_ease-in-out_infinite]">
                <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-pink-400/80 via-purple-300/60 to-cyan-300/80" />
                <div className="absolute top-1 left-1.5 h-1.5 w-1.5 rounded-full bg-white/50 blur-[2px]" />
              </div>
              <div className="h-6 w-px bg-slate-300" />
              <span className="tracking-wide pr-1 text-slate-800 font-medium text-lg">{t.hero.orbText}</span>
            </div>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-serif text-[2rem] leading-[1.15] tracking-[-0.03em] text-balance"
            data-testid="text-hero-title"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-4 text-base leading-relaxed text-muted-foreground"
            data-testid="text-hero-subtitle"
          >
            {t.hero.subtitle}
          </motion.p>
        </motion.div>
      </LazyMotion>
    </section>
  );
}

function HowItWorks() {
  const { t } = useLanguage();

  const scrollToWhy = () => {
    const whySection = document.getElementById('why');
    whySection?.scrollIntoView({ behavior: 'smooth' });
  };

  const cards = [
    {
      icon: FileText,
      title: t.howItWorks.cards.card.title,
      text: t.howItWorks.cards.card.text,
    },
    {
      icon: MessageCircle,
      title: t.howItWorks.cards.dialog.title,
      text: t.howItWorks.cards.dialog.text,
    },
    {
      icon: MoveRight,
      title: t.howItWorks.cards.nextStep.title,
      text: t.howItWorks.cards.nextStep.text,
    },
  ];

  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-center px-4 py-12 snap-start overflow-hidden"
      id="how-it-works"
      data-testid="section-how-it-works"
    >
      <div className="relative mx-auto w-full max-w-[420px]">
        <LazyMotion features={domAnimation}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em]">
              {t.howItWorks.title}
            </h2>
            <p className="mt-3 text-muted-foreground text-sm max-w-[32ch] mx-auto">
              {t.howItWorks.subtitle}
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/50"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                    <card.icon className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-slate-800 mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="text-center mt-6 font-medium text-slate-700"
          >
            {t.howItWorks.anchor}
          </motion.p>

        </LazyMotion>
      </div>
    </section>
  );
}

function WhyItMatters() {
  const { t } = useLanguage();
  
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
              {t.why.title}
            </h2>
            <p className="mt-2 text-muted-foreground text-sm">
              {t.why.subtitle}
            </p>
          </motion.div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                  <X className="w-4 h-4" />
                </div>
                <span className="font-medium text-slate-600 text-sm">{t.why.regularSite.title}</span>
              </div>
              <div className="space-y-1.5 text-slate-500 text-xs">
                {t.why.regularSite.points.map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="font-medium text-blue-900 text-sm">{t.why.livePresence.title}</span>
              </div>
              <div className="space-y-1.5 text-blue-800 text-xs font-medium">
                {t.why.livePresence.points.map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-500" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-xs">{t.why.anchor[0]}</p>
            <p className="text-foreground font-serif text-lg font-bold mt-1">{t.why.anchor[1]}</p>
          </div>

        </LazyMotion>
      </div>
    </section>
  );
}

function TextDemo({ onOpenChat }: { onOpenChat: () => void }) {
  const { t } = useLanguage();

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
            <div className="text-center mb-6">
              <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em]">
                {t.demo.title}
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">
                {t.demo.subtitle}
              </p>
            </div>

            <Card className="rounded-2xl border-0 shadow-lg shadow-black/5 overflow-hidden" data-testid="card-chat-preview">
              <div className="p-5 bg-gradient-to-br from-slate-50 to-white">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
                    <MessageSquareText className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-slate-100">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {t.demo.greeting}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {t.demo.questions.map((question, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs text-slate-500"
                    >
                      {question}
                    </span>
                  ))}
                </div>

                <Button
                  onClick={onOpenChat}
                  className="w-full h-12 gap-2 rounded-full text-sm font-semibold shadow-md"
                  data-testid="button-open-chat"
                >
                  {t.demo.tryChat || "Попробовать чат"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            <div className="mt-6 text-center">
              <a href="#scenarios" className="inline-flex" data-testid="button-demo-continue">
                <Button variant="ghost" className="h-11 gap-2 text-sm text-muted-foreground hover:text-slate-800">
                  {t.scenarios.title}
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

const AVATAR_IMAGES: Record<LiveScenario, string> = {
  sales: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  projects: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  team: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
  expert: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
};

const HIGHLIGHT_ICONS: Record<LiveScenario, React.ReactNode[]> = {
  sales: [
    <TrendingUp className="w-4 h-4" key="sales-1" />,
    <Clock className="w-4 h-4" key="sales-2" />,
    <Star className="w-4 h-4" key="sales-3" />,
  ],
  projects: [
    <Briefcase className="w-4 h-4" key="projects-1" />,
    <Star className="w-4 h-4" key="projects-2" />,
    <Globe className="w-4 h-4" key="projects-3" />,
  ],
  team: [
    <Users className="w-4 h-4" key="team-1" />,
    <Heart className="w-4 h-4" key="team-2" />,
    <Zap className="w-4 h-4" key="team-3" />,
  ],
  expert: [
    <GraduationCap className="w-4 h-4" key="expert-1" />,
    <Clock className="w-4 h-4" key="expert-2" />,
    <MapPin className="w-4 h-4" key="expert-3" />,
  ],
};

function getScenarioConfig(t: ReturnType<typeof useLanguage>['t'], scenario: LiveScenario): ScenarioConfig {
  const cardData = t.scenarios.cards[scenario];
  const icons = HIGHLIGHT_ICONS[scenario];
  
  return {
    title: cardData.title,
    description: cardData.description,
    avatarImage: AVATAR_IMAGES[scenario],
    businessCard: {
      category: cardData.category,
      businessName: cardData.businessName,
      tagline: cardData.tagline,
      avatarName: t.scenarios.avatarNames[scenario],
      highlights: cardData.highlights.map((text, i) => ({
        icon: icons[i],
        text,
      })),
      whyWorks: cardData.whyWorks,
      links: cardData.links.map((label) => ({
        label,
        url: "#",
      })),
    },
  };
}

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
  const { t, language } = useLanguage();
  const [selected, setSelected] = useState<LiveScenario>("sales");
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scenarios: LiveScenario[] = ["sales", "projects", "team", "expert"];
  const currentConfig = getScenarioConfig(t, selected);
  const { businessCard } = currentConfig;

  useEffect(() => {
    if (isCardOpen) {
      setMessages([]);
    }
  }, [isCardOpen, selected]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: inputValue
    };
    
    setMessages(prev => [...prev, userMsg]);
    const messageText = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        content: m.text,
      }));

      const response = await fetch("/api/demo/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          history,
          language,
        }),
      });

      const data = await response.json();
      
      if (data.reply) {
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: data.reply
        };
        setMessages(prev => [...prev, assistantMsg]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "Извините, произошла ошибка. Попробуйте ещё раз."
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const chatGreetingText = t.scenarios.chatGreeting.replace("{name}", businessCard.avatarName);

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
            <div className="text-center mb-5">
              <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em]">
                {t.scenarios.title}
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">
                {t.scenarios.subtitle}
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
                      {currentConfig.title}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

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
                    {t.scenarios.whyWorks}
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

                <button
                  onClick={() => {
                    setIsChatMode(false);
                    setIsCallOpen(true);
                  }}
                  className="mt-5 w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-bold shadow-xl hover:from-violet-700 hover:to-purple-700 active:scale-[0.98] transition-all"
                  data-testid="button-video-call"
                >
                  <Video className="w-5 h-5" />
                  {t.scenarios.videoCall}
                </button>

                <div className="mt-6 p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <img
                        src={currentConfig.avatarImage}
                        alt={businessCard.avatarName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{businessCard.avatarName}</div>
                      <div className="text-[10px] text-green-600 font-medium uppercase tracking-wider">{t.scenarios.online}</div>
                    </div>
                  </div>

                  <div className="relative flex flex-col h-[200px] bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="flex-1 p-3 overflow-y-auto space-y-2">
                      {messages.length === 0 ? (
                        <div className="text-xs leading-relaxed text-slate-600">
                          <TypewriterText text={chatGreetingText} />
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
                                  "px-2.5 py-1.5 rounded-lg max-w-[90%] text-xs",
                                  msg.role === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-slate-100 text-slate-700"
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

                    <div className="p-2 bg-slate-50 border-t border-slate-100">
                      <div className="relative">
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder={t.scenarios.chatPlaceholder}
                          className="h-10 pl-3 pr-9 rounded-lg border-slate-200 bg-white text-xs"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSendMessage();
                            }
                          }}
                          data-testid="input-scenario-chat"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-violet-500 rounded-md text-white"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
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
        language={language}
        autoStart={true}
      />
    </section>
  );
}

function ContactSection() {
  const { t } = useLanguage();
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
            <div className="text-center mb-6">
              <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em] text-slate-900">
                {t.contact.title}
              </h2>
              <p className="mt-3 text-slate-400 text-sm">
                {t.contact.trigger}
              </p>
            </div>

            <div className="mb-5 py-4 px-5 bg-slate-50 rounded-2xl">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3"></p>
              <div className="space-y-1.5 text-slate-600 text-sm">
                {t.contact.benefits.map((benefit, i) => (
                  <p key={i}>{benefit}</p>
                ))}
              </div>
            </div>

            <p className="text-center text-xs text-violet-500 mb-5">
              {t.contact.fomo}
            </p>

            <div className="space-y-2.5">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contact.form.name}
                className="h-12 rounded-xl bg-slate-50 border-0 px-4 text-sm placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-200"
                data-testid="input-name"
              />
              <Input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={t.contact.form.contact}
                className="h-12 rounded-xl bg-slate-50 border-0 px-4 text-sm placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-200"
                data-testid="input-contact"
              />
              <Button
                onClick={submit}
                className="h-12 w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm transition-all active:scale-[0.98]"
                disabled={status !== "idle" || !name || !contact}
                data-testid="button-submit-lead"
              >
                {status === "sending" ? "..." : status === "sent" ? t.contact.form.sent : t.contact.form.submit}
              </Button>
            </div>
            
            {status === "sent" && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="mt-3 text-center text-sm text-green-600"
              >
                {t.contact.form.sent}
              </motion.p>
            )}

            <p className="mt-5 text-center text-[10px] text-slate-400">
              {t.contact.footer}
            </p>
          </motion.div>
        </LazyMotion>
      </div>
    </section>
  );
}


function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t border-slate-100 py-8 px-6" data-testid="footer">
      <div className="mx-auto max-w-lg text-center">
        <div className="text-sm text-muted-foreground" data-testid="text-footer">
          {t.hero.title}
        </div>
      </div>
    </footer>
  );
}

function FloatingLiveButton({ onClick }: { onClick: () => void }) {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('wow-live-tooltip-seen');
    if (!hasSeenTooltip) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
        localStorage.setItem('wow-live-tooltip-seen', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="fixed bottom-28 right-4 z-50" data-testid="floating-live-button-container">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
          >
            {t.howItWorks?.cards?.dialog?.title || "Поговорить вживую"}
            <div className="absolute -bottom-1 right-5 w-2 h-2 bg-slate-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={onClick}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 shadow-lg shadow-fuchsia-500/30 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-testid="button-floating-live"
      >
        <Mic className="w-6 h-6" />
      </motion.button>
    </div>
  );
}

function WowLivePage({ isOpen, onClose, language }: { isOpen: boolean; onClose: () => void; language: string }) {
  if (!isOpen) return null;

  return (
    <LiveAvatarChat
      isOpen={true}
      onClose={onClose}
      scenario={{
        key: "wow-live",
        title: "WOW Live",
        description: "Live Avatar Chat",
      }}
      language={language}
      autoStart={true}
      className="!z-[100]"
    />
  );
}

export default function HomePage() {
  const { language } = useLanguage();
  const [isLiveOpen, setIsLiveOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState<string | undefined>();
  const scrollPositionRef = useRef(0);

  const openLive = () => {
    scrollPositionRef.current = window.scrollY;
    setIsLiveOpen(true);
  };

  const closeLive = () => {
    setIsLiveOpen(false);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPositionRef.current);
    });
  };

  const openChat = (initialMessage?: string) => {
    scrollPositionRef.current = window.scrollY;
    setInitialChatMessage(initialMessage);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setInitialChatMessage(undefined);
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollPositionRef.current);
    });
  };

  return (
    <div className="min-h-dvh pb-28" data-testid="page-home">
      <Hero />
      <HowItWorks />
      <LiveScenarios />
      <WhyItMatters />
      <ResearchSection />
      <ContactSection />
      <Footer />
      
      {!isLiveOpen && !isChatOpen && (
        <ChatPreviewBar onOpenChat={openLive} />
      )}
      
      <WowLiveScreen
        isOpen={isLiveOpen}
        onClose={closeLive}
        language={language}
      />
    </div>
  );
}
