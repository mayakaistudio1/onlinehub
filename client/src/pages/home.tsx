import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  Check,
  ChevronDown,
  Cpu,
  FlaskConical,
  Layers,
  MessageSquareText,
  Sparkles,
  Star,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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

function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex min-h-screen items-center justify-center overflow-hidden py-16 snap-start",
        className,
      )}
      data-testid={`section-${id}`}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {eyebrow ? (
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground"
              data-testid={`text-eyebrow-${id}`}
            >
              <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
              <span>{eyebrow}</span>
            </div>
          ) : null}

          <h2
            className="font-serif text-3xl leading-tight tracking-[-0.02em] text-balance sm:text-4xl"
            data-testid={`text-title-${id}`}
          >
            {title}
          </h2>
          {subtitle ? (
            <div
              className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
              data-testid={`text-subtitle-${id}`}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div className="mt-10" data-testid={`content-${id}`}>
          {children}
        </div>
      </div>
    </section>
  );
}

function Pill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs text-muted-foreground"
      data-testid={`pill-${label.replaceAll(" ", "-").toLowerCase()}`}
    >
      <span className="text-[hsl(var(--accent))]">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function PrimaryCTA({
  href,
  label,
  testId,
  onClick,
}: {
  href: string;
  label: string;
  testId: string;
  onClick?: () => void;
}) {
  return (
    <a href={href} className="inline-flex" data-testid={testId} onClick={onClick}>
      <Button className="h-11 gap-2 rounded-full px-5">
        {label}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </a>
  );
}

function SecondaryCTA({
  href,
  label,
  testId,
}: {
  href: string;
  label: string;
  testId: string;
}) {
  return (
    <a href={href} className="inline-flex" data-testid={testId}>
      <Button
        variant="secondary"
        className="h-11 rounded-full bg-white/5 px-5 text-foreground hover:bg-white/10"
      >
        {label}
      </Button>
    </a>
  );
}

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

function useMockLiveContext() {
  return (scenario: LiveScenario) => {
    if (scenario === "sales") {
      return "Ассистент отвечает на вопросы, отбирает лидов и греет интерес — ещё до первого звонка.";
    }
    if (scenario === "projects") {
      return "Идеи, которые раньше требовали встречи — теперь объясняются сами.";
    }
    if (scenario === "team") {
      return "Единая подача для новых сотрудников и участников. Без лишних сообщений.";
    }
    return "Сильное впечатление с первой секунды. Даже если ты не онлайн.";
  };
}

function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-16 snap-start"
      data-testid="section-hero"
    >
      <div
        className="pointer-events-none absolute inset-0 grid-fade"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 noise"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-border/80 bg-white/3 p-6 shadow-[var(--shadow-soft)] sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <motion.div variants={item} className="flex flex-wrap gap-2">
              <Pill
                icon={<Star className="h-3.5 w-3.5" />}
                label="Живое представительство"
              />
              <Pill
                icon={<MessageSquareText className="h-3.5 w-3.5" />}
                label="AI диалог"
              />
              <Pill icon={<Video className="h-3.5 w-3.5" />} label="Цифровой двойник" />
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-8 font-serif text-4xl leading-[1.04] tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl"
              data-testid="text-hero-title"
            >
              {APP_TITLE}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              data-testid="text-hero-subtitle"
            >
              Общается с гостями, ведёт твои направления и вызывает эффект «вау» — легко, понятно и без твоего участия.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <PrimaryCTA
                href="#how"
                label="Показать, как это работает"
                testId="button-scroll-how"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const problems = useMemo(
    () => [
      {
        title: "Снова объяснять с нуля",
        desc: "Ты каждый раз заново рассказываешь, чем занимаешься. Для клиентов, партнёров, даже знакомых.",
      },
      {
        title: "Потеря времени",
        desc: "Первые касания съедают энергию. Много слов — мало смысла и действий.",
      },
      {
        title: "Никогда не вовремя",
        desc: "Когда тебе пишут — ты занят. А когда ты готов — уже поздно.",
      },
      {
        title: "Нельзя масштабироваться",
        desc: "Ты хочешь расти, но всё упирается в твои ответы и твой график.",
      },
    ],
    [],
  );

  return (
    <SectionShell
      id="problem"
      eyebrow="Экран 2 · Проблема"
      title="Почему это вообще нужно?"
    >
      <div className="grid gap-4 sm:grid-cols-2" data-testid="grid-problems">
        {problems.map((p, idx) => (
          <Card
            key={p.title}
            className="glass rounded-2xl p-5"
            data-testid={`card-problem-${idx}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl border border-border/70 bg-white/5 p-2 text-[hsl(var(--accent))]">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <div
                  className="text-base font-medium"
                  data-testid={`text-problem-title-${idx}`}
                >
                  {p.title}
                </div>
                <div
                  className="mt-2 text-sm leading-relaxed text-muted-foreground"
                  data-testid={`text-problem-desc-${idx}`}
                >
                  {p.desc}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10">
        <PrimaryCTA href="#solution" label="Хочу понять, как это решить" testId="button-scroll-solution" />
      </div>
    </SectionShell>
  );
}

function Solution() {
  const points = [
    {
      title: "Говорит за тебя",
      desc: "Доносит твою идею так, как ты бы рассказал сам — только чётко и без повторов.",
    },
    {
      title: "Общается 24/7",
      desc: "Отвечает на вопросы, объясняет, направляет — даже когда ты спишь или в дороге.",
    },
    {
      title: "Ведёт к действию",
      desc: "Помогает гостям сделать следующий шаг — без суеты и лишних писем.",
    },
  ];

  return (
    <SectionShell
      id="solution"
      eyebrow="Экран 3 · Решение"
      title="Это не сайт. Не бот."
      subtitle={
        <p className="text-balance">
          Это как если бы ты сам встречал каждого гостя — <span className="text-foreground font-medium">но автоматически.</span>
        </p>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3" data-testid="grid-solution">
        {points.map((p, idx) => (
          <Card
            key={p.title}
            className="glass rounded-2xl p-5"
            data-testid={`card-solution-${idx}`}
          >
            <div className="flex items-center gap-2">
              <div className="rounded-xl border border-border/70 bg-white/5 p-2 text-[hsl(var(--accent))]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div
                className="text-base font-medium"
                data-testid={`text-solution-title-${idx}`}
              >
                {p.title}
              </div>
            </div>
            <div
              className="mt-3 text-sm leading-relaxed text-muted-foreground"
              data-testid={`text-solution-desc-${idx}`}
            >
              {p.desc}
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10">
        <PrimaryCTA href="#how" label="Как это вообще работает?" testId="button-scroll-how-solution" />
      </div>
    </SectionShell>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Открытие",
      desc: "Человек открывает твоё представительство",
    },
    {
      n: "02",
      title: "Диалог",
      desc: "Сразу начинается диалог — легко и по делу",
    },
    {
      n: "03",
      title: "Понимание",
      desc: "Ассистент понимает, зачем он пришёл",
    },
    {
      n: "04",
      title: "Действие",
      desc: "И ведёт его к нужному действию: узнать больше, оставить заявку, перейти дальше",
    },
  ];

  return (
    <SectionShell
      id="how"
      eyebrow="Экран 4 · Как это работает"
      title="Как это работает"
      subtitle="Ты занимаешься важным. Ассистент — всем остальным."
    >
      <div className="grid gap-4 lg:grid-cols-4" data-testid="grid-how">
        {steps.map((s) => (
          <Card
            key={s.n}
            className="glass rounded-2xl p-5"
            data-testid={`card-step-${s.n}`}
          >
            <div className="flex items-center justify-between">
              <div
                className="font-mono text-xs text-muted-foreground"
                data-testid={`text-step-number-${s.n}`}
              >
                {s.n}
              </div>
              <div className="rounded-full border border-border/70 bg-white/5 px-2 py-1 text-xs text-[hsl(var(--accent))]">
                <Check className="h-3.5 w-3.5" />
              </div>
            </div>
            <div
              className="mt-3 text-base font-medium"
              data-testid={`text-step-title-${s.n}`}
            >
              {s.title}
            </div>
            <div
              className="mt-2 text-sm leading-relaxed text-muted-foreground"
              data-testid={`text-step-desc-${s.n}`}
            >
              {s.desc}
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10">
        <PrimaryCTA href="#text-demo" label="Показать вживую" testId="button-scroll-demo" />
      </div>
    </SectionShell>
  );
}

function TextDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      role: "assistant",
      text: "Привет! Я могу рассказать, чем мы занимаемся, ответить на любые вопросы или подсказать следующий шаг. С чего начнём?",
    },
  ]);
  const [loading, setLoading] = useState<ChatIntent | null>(null);
  const respond = useMockChatResponse();

  const ask = async (intent: ChatIntent) => {
    setLoading(intent);

    const userText =
      intent === "what"
        ? "Расскажи, что это вообще"
        : intent === "who"
          ? "Кому это нужно?"
          : "Где это можно использовать?";

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
    <SectionShell
      id="text-demo"
      eyebrow="Экран 5 · Демо"
      title="Попробуй, как это чувствуется"
      subtitle="Ассистент, который всегда в ресурсе и говорит именно твоими словами."
    >
      <div className="grid gap-6 lg:grid-cols-5" data-testid="grid-text-demo">
        <Card
          className="glass glow-ring rounded-2xl p-5 lg:col-span-3"
          data-testid="card-chat"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-xl border border-border/70 bg-white/5 p-2 text-[hsl(var(--accent))]">
                <MessageSquareText className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium" data-testid="text-chat-title">
                  AI-ассистент
                </div>
                <div
                  className="text-xs text-muted-foreground"
                  data-testid="text-chat-subtitle"
                >
                  Демонстрация диалога
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-4 space-y-3"
            data-testid="list-chat-messages"
          >
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
                    "max-w-[92%] rounded-2xl border px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "border-border/70 bg-white/6"
                      : "border-border/70 bg-white/4",
                  )}
                  data-testid={`text-chat-message-${idx}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading ? (
              <div
                className="flex justify-start"
                data-testid="row-chat-loading"
              >
                <div className="rounded-2xl border border-border/70 bg-white/4 px-4 py-3 text-sm text-muted-foreground">
                  Печатает...
                </div>
              </div>
            ) : null}
          </div>
        </Card>

        <Card className="glass rounded-2xl p-5 lg:col-span-2" data-testid="card-chat-controls">
          <div
            className="text-sm font-medium"
            data-testid="text-chat-controls-title"
          >
            Твои вопросы
          </div>
          <div
            className="mt-1 text-xs text-muted-foreground"
            data-testid="text-chat-controls-subtitle"
          >
            Нажми, чтобы проверить ответы.
          </div>

          <div className="mt-5 grid gap-3" data-testid="grid-chat-buttons">
            <Button
              variant="secondary"
              className="h-11 justify-between rounded-xl bg-white/5 text-foreground hover:bg-white/10"
              onClick={() => ask("what")}
              disabled={loading !== null}
              data-testid="button-intent-what"
            >
              <span className="text-xs sm:text-sm">Расскажи, что это вообще</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              className="h-11 justify-between rounded-xl bg-white/5 text-foreground hover:bg-white/10"
              onClick={() => ask("who")}
              disabled={loading !== null}
              data-testid="button-intent-who"
            >
              <span className="text-xs sm:text-sm">Кому это нужно?</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              className="h-11 justify-between rounded-xl bg-white/5 text-foreground hover:bg-white/10"
              onClick={() => ask("where")}
              disabled={loading !== null}
              data-testid="button-intent-where"
            >
              <span className="text-xs sm:text-sm">Где это использовать?</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div
            className="mt-6 rounded-xl border border-border/70 bg-white/4 p-4"
            data-testid="card-chat-note"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg border border-border/70 bg-white/5 p-2 text-[hsl(var(--accent))]">
                <FlaskConical className="h-4 w-4" />
              </div>
              <div>
                <div
                  className="text-sm font-medium"
                  data-testid="text-chat-note-title"
                >
                  Примечание
                </div>
                <div
                  className="mt-1 text-xs leading-relaxed text-muted-foreground"
                  data-testid="text-chat-note-desc"
                >
                  Это только демо. Твой хаб будет говорить именно твоими словами — под твои задачи.
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <PrimaryCTA href="#live" label="Продолжить" testId="button-demo-continue" />
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}

function LiveIntro() {
  return (
    <SectionShell
      id="live"
      eyebrow="Экран 6 · Live аватар"
      title="Хочешь — общайся вживую"
      subtitle={
        <div className="space-y-4">
          <p>Твоё представительство может включать видеозвонок. Гость увидит тебя — или твоего ассистента — прямо в хабе.</p>
          <p className="text-sm">Это может быть ты сам — как цифровой двойник. Или кто-то из команды. Выбираешь ты.</p>
        </div>
      }
    >
      <div className="mt-10">
        <PrimaryCTA href="#scenarios" label="Показать, как это выглядит" testId="button-scroll-scenarios" />
      </div>
    </SectionShell>
  );
}

function LiveScenarios() {
  const [selected, setSelected] = useState<LiveScenario>("sales");
  const [session, setSession] = useState<LiveSession | null>(null);
  const [busy, setBusy] = useState(false);

  const getPrompt = useMockLiveContext();

  const createSession = async (scenario: LiveScenario) => {
    setSelected(scenario);
    setBusy(true);
    await new Promise((r) => setTimeout(r, 450));
    const sessionId = `sess_${Math.random().toString(16).slice(2, 10)}`;
    setSession({ scenario, sessionId, prompt: getPrompt(scenario) });
    setBusy(false);
  };

  const buttons: { key: LiveScenario; label: string }[] = [
    { key: "sales", label: "Продажи и партнёрства" },
    { key: "projects", label: "Презентации проектов" },
    { key: "team", label: "Команда и сообщество" },
    { key: "expert", label: "Первое касание" },
  ];

  return (
    <SectionShell
      id="scenarios"
      eyebrow="Экран 7 · Сценарии"
      title="Где это по-настоящему полезно"
      subtitle="Начинаем с одного сценария. Строим — под твою задачу."
    >
      <div className="grid gap-6 lg:grid-cols-5" data-testid="grid-live">
        <Card className="glass rounded-2xl p-5 lg:col-span-2" data-testid="card-live-controls">
          <div className="text-sm font-medium" data-testid="text-live-controls-title">
            Сценарии
          </div>
          <div className="mt-1 text-xs text-muted-foreground" data-testid="text-live-controls-subtitle">
            Выберите кейс для демонстрации.
          </div>

          <div className="mt-5 grid gap-2" data-testid="grid-live-buttons">
            {buttons.map((b) => (
              <Button
                key={b.key}
                variant="secondary"
                className={cn(
                  "h-11 justify-between rounded-xl bg-white/5 text-foreground hover:bg-white/10",
                  selected === b.key && "ring-1 ring-[hsl(var(--accent))]/40",
                )}
                onClick={() => createSession(b.key)}
                disabled={busy}
                data-testid={`button-scenario-${b.key}`}
              >
                <span className="text-xs sm:text-sm truncate">{b.label}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-border/70 bg-white/4 p-4" data-testid="card-live-meta">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground" data-testid="text-live-session-label">
                  ID Сессии
                </div>
                <div className="mt-1 font-mono text-xs sm:text-sm" data-testid="text-live-session-id">
                  {session?.sessionId ?? "—"}
                </div>
              </div>
              <div className="rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs text-muted-foreground" data-testid="status-live">
                {busy ? "Загрузка..." : session ? "Готов" : "Ожидание"}
              </div>
            </div>
            <div className="mt-3 text-xs leading-relaxed text-muted-foreground" data-testid="text-live-prompt">
              {session?.prompt ??
                "Выберите сценарий, чтобы подготовить контекст для аватара."}
            </div>
          </div>
          <div className="mt-6">
            <PrimaryCTA href="#pilot" label="Хочу такое решение" testId="button-scenarios-continue" />
          </div>
        </Card>

        <Card className="glass glow-ring relative overflow-hidden rounded-2xl p-0 lg:col-span-3" data-testid="card-live-embed">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium" data-testid="text-live-embed-title">
                Визуализация аватара
              </div>
              <div className="text-xs text-muted-foreground" data-testid="text-live-embed-note">
                Живой формат
              </div>
            </div>
          </div>
          <div className="border-t border-border/70 bg-[hsl(var(--background))]/30 p-5">
            <div
              className="flex aspect-video items-center justify-center rounded-xl border border-border/70 bg-white/3"
              data-testid="iframe-live-placeholder"
            >
              <div className="max-w-md text-center p-4">
                <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                  <Video className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
                  <span>Цифровой двойник</span>
                </div>
                <div className="font-serif text-xl sm:text-2xl tracking-[-0.02em]" data-testid="text-live-placeholder-title">
                  Контекст: {buttons.find(b => b.key === selected)?.label}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-muted-foreground" data-testid="text-live-placeholder-desc">
                  В реальном продукте здесь будет видеопоток аватара, который говорит вашими словами.
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}

function Pilot() {
  return (
    <SectionShell
      id="pilot"
      eyebrow="Экран 8 · Пилот"
      title="Ты не покупаешь платформу."
      subtitle="Ты запускаешь решение — под свою задачу."
    >
      <Card className="glass glow-ring rounded-2xl p-6" data-testid="card-pilot">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="font-serif text-2xl" data-testid="text-pilot-title">
              Что входит
            </div>
            <ul className="mt-4 space-y-3" data-testid="list-pilot-items">
              {[
                "1 цифровое представительство (хаб)",
                "1–2 ассистента (текст или видео)",
                "1 конкретная цель — которую решаем вместе",
                "Полная настройка и запуск «под ключ»",
                "Индивидуальный стиль и tone of voice",
              ].map((x, i) => (
                <li key={x} className="flex items-start gap-3" data-testid={`row-pilot-item-${i}`}>
                  <div className="mt-1 rounded-full border border-border/70 bg-white/5 p-1 text-[hsl(var(--accent))]">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`text-pilot-item-${i}`}>
                    {x}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="rounded-2xl border border-border/70 bg-white/4 p-5" data-testid="card-pilot-price">
              <div className="text-xs text-muted-foreground" data-testid="text-pilot-price-label">
                Стоимость пилота
              </div>
              <div className="mt-2 font-serif text-4xl tracking-[-0.02em]" data-testid="text-pilot-price">
                $2,500
              </div>
              <div className="mt-2 text-sm text-muted-foreground" data-testid="text-pilot-price-note">
                Одноразовая настройка и запуск.
              </div>

              <div className="mt-5">
                <a href="#contact" data-testid="button-scroll-contact">
                  <Button className="h-11 w-full rounded-xl">Обсудить запуск</Button>
                </a>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border/70 bg-white/4 p-5" data-testid="card-pilot-timeline">
              <div className="text-sm font-medium" data-testid="text-pilot-timeline-title">
                Результат
              </div>
              <div className="mt-2 text-xs leading-relaxed text-muted-foreground" data-testid="text-pilot-timeline-desc">
                Если работает — масштабируем. Если нет — ты хотя бы перестал объяснять вручную.
              </div>
            </div>
          </div>
        </div>
      </Card>
    </SectionShell>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const submit = async () => {
    if (!name || !contact) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("sent");
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Экран 9 · Контакт"
      title="Созвонимся?"
      subtitle="Напиши, и мы обсудим, подойдёт ли хаб под твою задачу. Без спама. Без воронок. Просто живой разговор."
    >
      <div className="grid gap-6 lg:grid-cols-5" data-testid="grid-contact">
        <Card className="glass glow-ring rounded-2xl p-6 lg:col-span-3" data-testid="card-contact-form">
          <div className="grid gap-4">
            <div>
              <div className="text-sm font-medium" data-testid="text-contact-name-label">
                Имя *
              </div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Твоё имя"
                className="mt-2 h-11 rounded-xl border-border/70 bg-white/5"
                data-testid="input-name"
              />
            </div>

            <div>
              <div className="text-sm font-medium" data-testid="text-contact-contact-label">
                Email или Telegram *
              </div>
              <Input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="@username или email"
                className="mt-2 h-11 rounded-xl border-border/70 bg-white/5"
                data-testid="input-contact"
              />
            </div>

            <div>
              <div className="text-sm font-medium" data-testid="text-contact-message-label">
                Что хочешь автоматизировать? (необязательно)
              </div>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Опиши свою задачу в паре слов"
                className="mt-2 min-h-28 rounded-xl border-border/70 bg-white/5"
                data-testid="input-message"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                onClick={submit}
                className="h-11 rounded-xl px-8"
                disabled={status !== "idle" || !name || !contact}
                data-testid="button-submit-lead"
              >
                {status === "sending" ? "Отправка..." : status === "sent" ? "Отправлено" : "Отправить"}
              </Button>
              <div className="text-sm text-muted-foreground" data-testid="status-lead">
                {status === "sent" ? (
                  <span className="text-[hsl(var(--accent))]">Спасибо, {name}! Мы свяжемся с тобой через {contact} — без формальностей.</span>
                ) : (
                  "Никакого спама. Только живой разговор."
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card className="glass rounded-2xl p-6 lg:col-span-2" data-testid="card-contact-aside">
          <div className="font-serif text-xl" data-testid="text-contact-aside-title">
            Что дальше
          </div>
          <div className="mt-3 text-sm leading-relaxed text-muted-foreground" data-testid="text-contact-aside-desc">
            Мы изучим твой запрос и предложим удобное время для звонка, чтобы обсудить внедрение хаба в твои процессы.
          </div>

          <div className="mt-6 rounded-xl border border-border/70 bg-white/4 p-4" data-testid="card-contact-bullets">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg border border-border/70 bg-white/5 p-2 text-[hsl(var(--accent))]">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium" data-testid="text-contact-bullets-title">
                  Быстрый старт
                </div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground" data-testid="text-contact-bullets-desc">
                  Если задача понятна — запускаем пилот в течение недели.
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </SectionShell>
  );
}


function Footer() {
  return (
    <footer className="border-t border-border/70 py-10" data-testid="footer">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground" data-testid="text-footer-left">
            {APP_TITLE}
          </div>
          <div className="flex flex-wrap gap-3 text-sm" data-testid="nav-footer">
            {[
              { href: "#how", label: "How" },
              { href: "#text-demo", label: "Text demo" },
              { href: "#scenarios", label: "Live" },
              { href: "#pilot", label: "Pilot" },
              { href: "#contact", label: "Contact" },
            ].map((x) => (
              <a
                key={x.href}
                href={x.href}
                className="text-muted-foreground hover:text-foreground"
                data-testid={`link-footer-${x.label.toLowerCase()}`}
              >
                {x.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-dvh" data-testid="page-home">
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <TextDemo />
      <LiveIntro />
      <LiveScenarios />
      <Pilot />
      <Contact />
      <Footer />
    </div>
  );
}
