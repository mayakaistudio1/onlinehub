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

const APP_TITLE = "Premium AI‑Enhanced Presence";

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
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-16 sm:py-20 lg:py-24",
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
            <p
              className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
              data-testid={`text-subtitle-${id}`}
            >
              {subtitle}
            </p>
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
}: {
  href: string;
  label: string;
  testId: string;
}) {
  return (
    <a href={href} className="inline-flex" data-testid={testId}>
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
        return "This is a premium one-page representation that blends crisp positioning with AI-assisted dialogue—built for demos, intros, and Zoom conversations.";
      case "who":
        return "It fits founders, agencies, boutique consultancies, and product teams who need a high-signal narrative and a repeatable demo flow—without building a full platform.";
      case "where":
        return "Use it on a landing page, in outreach, during a call, in a conference booth, or as a ‘click-to-understand’ link before a pilot.";
      default:
        return "";
    }
  };
}

function useMockLiveContext() {
  return (scenario: LiveScenario) => {
    if (scenario === "sales") {
      return "You are a calm, premium sales avatar. Introduce the service in 45 seconds. Ask one qualifying question. Offer a pilot.";
    }
    if (scenario === "projects") {
      return "You are a delivery lead avatar. Explain how a pilot runs week-by-week. Emphasize clarity, speed, and risk reduction.";
    }
    if (scenario === "team") {
      return "You are a team avatar. Present roles, collaboration style, and communication cadence. Keep it confident and concise.";
    }
    return "You are an expert avatar. Share a strong opinion, then give a practical framework. Keep the tone warm and authoritative.";
  };
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden py-18 sm:py-22"
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
                label="Premium one-page demo"
              />
              <Pill
                icon={<MessageSquareText className="h-3.5 w-3.5" />}
                label="AI text dialogue"
              />
              <Pill icon={<Video className="h-3.5 w-3.5" />} label="Live avatar" />
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
              A crafted, minimal presentation that demonstrates your value proposition,
              an AI-assisted dialogue, and a live avatar format—ready for Zoom demos
              and pilot conversions.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <PrimaryCTA
                href="#how"
                label="Show how it works"
                testId="button-scroll-how"
              />
              <SecondaryCTA
                href="#pilot"
                label="Pilot details"
                testId="button-scroll-pilot"
              />
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 grid gap-4 sm:grid-cols-3"
              data-testid="grid-hero-metrics"
            >
              {[
                {
                  icon: <BadgeCheck className="h-4 w-4" />,
                  k: "High-signal narrative",
                  v: "Designed for clarity",
                },
                {
                  icon: <Cpu className="h-4 w-4" />,
                  k: "AI demo included",
                  v: "No typing required",
                },
                {
                  icon: <Calendar className="h-4 w-4" />,
                  k: "Pilot-ready",
                  v: "Fast to validate",
                },
              ].map((m) => (
                <div
                  key={m.k}
                  className="glass glow-ring rounded-2xl p-4"
                  data-testid={`card-hero-metric-${m.k.replaceAll(" ", "-").toLowerCase()}`}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[hsl(var(--accent))]">{m.icon}</span>
                    <span className="font-medium">{m.k}</span>
                  </div>
                  <div
                    className="mt-2 text-sm text-muted-foreground"
                    data-testid={`text-hero-metric-${m.k.replaceAll(" ", "-").toLowerCase()}`}
                  >
                    {m.v}
                  </div>
                </div>
              ))}
            </motion.div>

            <a
              href="#problem"
              className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              data-testid="link-scroll-problem"
            >
              <ChevronDown className="h-4 w-4" />
              <span>Scroll</span>
            </a>
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
        title: "Unclear positioning",
        desc: "Prospects don’t get it fast enough—so you lose the room before the call starts.",
      },
      {
        title: "Demos are inconsistent",
        desc: "Every presenter says it differently. The story shifts and confidence drops.",
      },
      {
        title: "No ‘wow’ moment",
        desc: "Your product might be great, but the first impression feels like another landing page.",
      },
      {
        title: "Hard to route to a pilot",
        desc: "The next step is unclear—people bounce instead of booking a real conversation.",
      },
    ],
    [],
  );

  return (
    <SectionShell
      id="problem"
      eyebrow="Screen 2 · Problem"
      title="A premium product deserves a premium first impression"
      subtitle="Most pages are readable. Few are persuasive. This mini-app is built to create momentum."
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
    </SectionShell>
  );
}

function Solution() {
  const points = [
    {
      title: "A single narrative",
      desc: "One page. One flow. Every time the story lands the same way.",
    },
    {
      title: "AI dialogue as proof",
      desc: "Pre-built intents demonstrate what the service does—without asking users to type.",
    },
    {
      title: "Live avatar format",
      desc: "Show multiple contexts (sales, team, expert) with a session-based prompt.",
    },
  ];

  return (
    <SectionShell
      id="solution"
      eyebrow="Screen 3 · Solution"
      title="A one-page experience with AI-augmented credibility"
      subtitle="Minimal, readable, and built for demos. It looks premium—and behaves like a product."
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
    </SectionShell>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Positioning",
      desc: "We compress your story into a high-signal narrative and a scroll flow that keeps attention.",
    },
    {
      n: "02",
      title: "AI dialogue",
      desc: "We wire 3–5 intents to demonstrate value with crisp, on-brand responses.",
    },
    {
      n: "03",
      title: "Live scenarios",
      desc: "We prepare prompts for multiple avatar roles, so the demo adapts to the audience.",
    },
    {
      n: "04",
      title: "Pilot conversion",
      desc: "A direct path to a pilot call—pricing, scope, and contact capture in one place.",
    },
  ];

  return (
    <SectionShell
      id="how"
      eyebrow="Screen 4 · How it works"
      title="Four steps. One clean demo flow."
      subtitle="This is designed for presentation, not complexity. Everything is modular and extendable."
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
    </SectionShell>
  );
}

function TextDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      role: "assistant",
      text: "Pick one of the three prompts below—this simulates an AI dialogue inside the service.",
    },
  ]);
  const [loading, setLoading] = useState<ChatIntent | null>(null);
  const respond = useMockChatResponse();

  const ask = async (intent: ChatIntent) => {
    setLoading(intent);

    const userText =
      intent === "what"
        ? "What is this?"
        : intent === "who"
          ? "Who is it for?"
          : "Where is it used?";

    setMessages((m) => [
      ...m,
      { id: `u-${Date.now()}`, role: "user", text: userText },
    ]);

    await new Promise((r) => setTimeout(r, 450));

    setMessages((m) => [
      ...m,
      { id: `a-${Date.now()}`, role: "assistant", text: respond(intent) },
    ]);

    setLoading(null);
  };

  return (
    <SectionShell
      id="text-demo"
      eyebrow="Screen 5 · Text demo"
      title="AI dialogue demo (no typing)"
      subtitle="Three intents. One click. A clean, readable response—like a real service demo."
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
                  Demo chat
                </div>
                <div
                  className="text-xs text-muted-foreground"
                  data-testid="text-chat-subtitle"
                >
                  Assistant responses are mocked in this prototype.
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
                  Thinking…
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
            Prompts
          </div>
          <div
            className="mt-1 text-xs text-muted-foreground"
            data-testid="text-chat-controls-subtitle"
          >
            User doesn’t type—buttons simulate real intents.
          </div>

          <div className="mt-5 grid gap-3" data-testid="grid-chat-buttons">
            <Button
              variant="secondary"
              className="h-11 justify-between rounded-xl bg-white/5 text-foreground hover:bg-white/10"
              onClick={() => ask("what")}
              disabled={loading !== null}
              data-testid="button-intent-what"
            >
              <span>What is this?</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              className="h-11 justify-between rounded-xl bg-white/5 text-foreground hover:bg-white/10"
              onClick={() => ask("who")}
              disabled={loading !== null}
              data-testid="button-intent-who"
            >
              <span>Who is it for?</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              className="h-11 justify-between rounded-xl bg-white/5 text-foreground hover:bg-white/10"
              onClick={() => ask("where")}
              disabled={loading !== null}
              data-testid="button-intent-where"
            >
              <span>Where is it used?</span>
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
                  Prototype mode
                </div>
                <div
                  className="mt-1 text-xs leading-relaxed text-muted-foreground"
                  data-testid="text-chat-note-desc"
                >
                  In this mockup, responses are generated client-side. When you
                  graduate to a full app, we’ll connect these intents to real
                  endpoints.
                </div>
              </div>
            </div>
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
      eyebrow="Screen 6 · Live format"
      title="Live avatar format (explained)"
      subtitle="A second mode where a live avatar presents in different roles—without changing the page flow."
    >
      <div className="grid gap-4 lg:grid-cols-3" data-testid="grid-live-intro">
        {[
          {
            title: "Role-based prompts",
            desc: "Sales, delivery, team, or expert—each with a tuned intro and tone.",
          },
          {
            title: "Session context",
            desc: "A sessionId ties the selected scenario to the live prompt context.",
          },
          {
            title: "Iframe/placeholder",
            desc: "Embed your preferred avatar runtime. This demo uses a polished placeholder.",
          },
        ].map((x, idx) => (
          <Card
            key={x.title}
            className="glass rounded-2xl p-5"
            data-testid={`card-live-intro-${idx}`}
          >
            <div
              className="text-base font-medium"
              data-testid={`text-live-intro-title-${idx}`}
            >
              {x.title}
            </div>
            <div
              className="mt-2 text-sm leading-relaxed text-muted-foreground"
              data-testid={`text-live-intro-desc-${idx}`}
            >
              {x.desc}
            </div>
          </Card>
        ))}
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
    { key: "sales", label: "Sales" },
    { key: "projects", label: "Projects" },
    { key: "team", label: "Team" },
    { key: "expert", label: "Expert" },
  ];

  return (
    <SectionShell
      id="scenarios"
      eyebrow="Screen 7 · Live scenarios"
      title="Switch the avatar context by scenario"
      subtitle="Pick a scenario to create a sessionId and load context for a live avatar embed."
    >
      <div className="grid gap-6 lg:grid-cols-5" data-testid="grid-live">
        <Card className="glass rounded-2xl p-5 lg:col-span-2" data-testid="card-live-controls">
          <div className="text-sm font-medium" data-testid="text-live-controls-title">
            Scenarios
          </div>
          <div className="mt-1 text-xs text-muted-foreground" data-testid="text-live-controls-subtitle">
            Creates a session and loads context.
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
                <span>{b.label}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-border/70 bg-white/4 p-4" data-testid="card-live-meta">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground" data-testid="text-live-session-label">
                  sessionId
                </div>
                <div className="mt-1 font-mono text-sm" data-testid="text-live-session-id">
                  {session?.sessionId ?? "—"}
                </div>
              </div>
              <div className="rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs text-muted-foreground" data-testid="status-live">
                {busy ? "Loading…" : session ? "Ready" : "Idle"}
              </div>
            </div>
            <div className="mt-3 text-xs leading-relaxed text-muted-foreground" data-testid="text-live-prompt">
              {session?.prompt ??
                "Choose a scenario to generate a context prompt for the live avatar."}
            </div>
          </div>
        </Card>

        <Card className="glass glow-ring relative overflow-hidden rounded-2xl p-0 lg:col-span-3" data-testid="card-live-embed">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium" data-testid="text-live-embed-title">
                Live avatar embed
              </div>
              <div className="text-xs text-muted-foreground" data-testid="text-live-embed-note">
                Placeholder iframe
              </div>
            </div>
          </div>
          <div className="border-t border-border/70 bg-[hsl(var(--background))]/30 p-5">
            <div
              className="flex aspect-video items-center justify-center rounded-xl border border-border/70 bg-white/3"
              data-testid="iframe-live-placeholder"
            >
              <div className="max-w-md text-center">
                <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                  <Video className="h-3.5 w-3.5 text-[hsl(var(--accent))]" />
                  <span>Live runtime goes here</span>
                </div>
                <div className="font-serif text-2xl tracking-[-0.02em]" data-testid="text-live-placeholder-title">
                  Avatar: {selected.toUpperCase()}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-muted-foreground" data-testid="text-live-placeholder-desc">
                  Embed your avatar provider in an iframe and feed it the session
                  context prompt.
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
      eyebrow="Screen 8 · Pilot"
      title="Pilot: fast validation, premium output"
      subtitle="A fixed-scope pilot to prove the narrative, the AI demo, and the live scenario flow."
    >
      <Card className="glass glow-ring rounded-2xl p-6" data-testid="card-pilot">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="font-serif text-2xl" data-testid="text-pilot-title">
              What you get
            </div>
            <ul className="mt-4 space-y-3" data-testid="list-pilot-items">
              {[
                "One-page scroll narrative (9 sections)",
                "AI text demo intents (click-to-answer)",
                "4 live avatar scenarios with session context",
                "Polished visual system: typography, spacing, motion",
                "Ready for Zoom demos and handoffs",
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
                Fixed pilot price
              </div>
              <div className="mt-2 font-serif text-4xl tracking-[-0.02em]" data-testid="text-pilot-price">
                $2,500
              </div>
              <div className="mt-2 text-sm text-muted-foreground" data-testid="text-pilot-price-note">
                Simple scope. Clear outcome.
              </div>

              <div className="mt-5">
                <a href="#contact" data-testid="button-scroll-contact">
                  <Button className="h-11 w-full rounded-xl">Contact</Button>
                </a>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border/70 bg-white/4 p-5" data-testid="card-pilot-timeline">
              <div className="text-sm font-medium" data-testid="text-pilot-timeline-title">
                Timeline
              </div>
              <div className="mt-2 text-sm text-muted-foreground" data-testid="text-pilot-timeline-desc">
                Typically delivered in 5–7 days depending on review speed.
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
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 550));
    setStatus("sent");
  };

  return (
    <SectionShell
      id="contact"
      eyebrow="Screen 9 · Contact"
      title="Let’s schedule a pilot call"
      subtitle="Share your name and contact, and we’ll follow up with next steps."
    >
      <div className="grid gap-6 lg:grid-cols-5" data-testid="grid-contact">
        <Card className="glass glow-ring rounded-2xl p-6 lg:col-span-3" data-testid="card-contact-form">
          <div className="grid gap-4">
            <div>
              <div className="text-sm font-medium" data-testid="text-contact-name-label">
                Name
              </div>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-2 h-11 rounded-xl border-border/70 bg-white/5"
                data-testid="input-name"
              />
            </div>

            <div>
              <div className="text-sm font-medium" data-testid="text-contact-contact-label">
                Contact
              </div>
              <Input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Email, Telegram, WhatsApp, etc."
                className="mt-2 h-11 rounded-xl border-border/70 bg-white/5"
                data-testid="input-contact"
              />
            </div>

            <div>
              <div className="text-sm font-medium" data-testid="text-contact-message-label">
                Message
              </div>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="A couple of lines about what you want to demo"
                className="mt-2 min-h-28 rounded-xl border-border/70 bg-white/5"
                data-testid="input-message"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                onClick={submit}
                className="h-11 rounded-xl"
                disabled={status !== "idle"}
                data-testid="button-submit-lead"
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send"}
              </Button>
              <div className="text-sm text-muted-foreground" data-testid="status-lead">
                {status === "sent"
                  ? "Thanks—message received. We’ll reply shortly."
                  : "No spam. Just a reply and next steps."}
              </div>
            </div>
          </div>
        </Card>

        <Card className="glass rounded-2xl p-6 lg:col-span-2" data-testid="card-contact-aside">
          <div className="font-serif text-xl" data-testid="text-contact-aside-title">
            What happens next
          </div>
          <div className="mt-3 text-sm leading-relaxed text-muted-foreground" data-testid="text-contact-aside-desc">
            We’ll confirm your context, pick the best scenario for your audience,
            and schedule a 25-minute call to walk through the demo and pilot.
          </div>

          <div className="mt-6 rounded-xl border border-border/70 bg-white/4 p-4" data-testid="card-contact-bullets">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-lg border border-border/70 bg-white/5 p-2 text-[hsl(var(--accent))]">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium" data-testid="text-contact-bullets-title">
                  Quick call, clear scope
                </div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground" data-testid="text-contact-bullets-desc">
                  If it’s a fit, we start immediately and deliver within a week.
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
