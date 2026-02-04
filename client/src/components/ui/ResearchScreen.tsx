import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, BookOpen, TrendingUp, Users, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

interface ResearchScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResearchScreen({ isOpen, onClose }: ResearchScreenProps) {
  const { language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const content = getForbesContent(language);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-stone-50"
          data-testid="research-screen"
        >
          <div className="flex flex-col h-full">
            <div
              className={cn(
                "flex items-center justify-between px-4 py-3 bg-white border-b transition-shadow",
                scrolled && "shadow-sm"
              )}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-sm">F</span>
                </div>
                <div>
                  <span className="font-serif font-semibold text-sm text-slate-900">{content.source}</span>
                  <span className="text-xs text-slate-500 block">{content.date}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                data-testid="button-close-research"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto"
              onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 10)}
            >
              <article className="max-w-2xl mx-auto px-5 py-8">
                {/* Hero */}
                <header className="mb-10">
                  <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight mb-4">
                    {content.title}
                  </h1>
                  <p className="text-lg text-slate-600 leading-relaxed font-serif italic">
                    {content.subtitle}
                  </p>
                </header>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {content.keyStats.map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        {stat.icon === 'trending' && <TrendingUp className="w-4 h-4 text-emerald-600" />}
                        {stat.icon === 'users' && <Users className="w-4 h-4 text-blue-600" />}
                        {stat.icon === 'dollar' && <DollarSign className="w-4 h-4 text-amber-600" />}
                        {stat.icon === 'clock' && <Clock className="w-4 h-4 text-violet-600" />}
                      </div>
                      <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Executive Summary */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 mb-10">
                  <h2 className="text-sm font-medium text-slate-300 uppercase tracking-wide mb-3">{content.summaryTitle}</h2>
                  <p className="text-base leading-relaxed">{content.summary}</p>
                </div>

                {/* Main Content */}
                {content.sections.map((section, i) => (
                  <section key={i} className="mb-10">
                    <h2 className="text-xl font-serif font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                      {section.title}
                    </h2>
                    
                    {section.content.map((block, j) => {
                      if (block.type === 'paragraph') {
                        return (
                          <p key={j} className="text-sm text-slate-700 leading-relaxed mb-4">
                            {block.text}
                          </p>
                        );
                      }
                      
                      if (block.type === 'highlight') {
                        return (
                          <div key={j} className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-4">
                            <p className="text-sm font-medium text-amber-900">{block.text}</p>
                          </div>
                        );
                      }
                      
                      if (block.type === 'list') {
                        return (
                          <ul key={j} className="space-y-2 mb-4">
                            {block.items?.map((item, k) => (
                              <li key={k} className="flex items-start gap-2 text-sm text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      
                      if (block.type === 'comparison') {
                        return (
                          <div key={j} className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-slate-100 rounded-xl p-4">
                              <div className="text-xs font-medium text-slate-500 uppercase mb-2">{block.before?.label}</div>
                              <div className="text-lg font-bold text-slate-700">{block.before?.value}</div>
                            </div>
                            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                              <div className="text-xs font-medium text-emerald-600 uppercase mb-2">{block.after?.label}</div>
                              <div className="text-lg font-bold text-emerald-700">{block.after?.value}</div>
                            </div>
                          </div>
                        );
                      }

                      if (block.type === 'table') {
                        return (
                          <div key={j} className="overflow-x-auto mb-4">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="bg-slate-100">
                                  {block.headers?.map((h, hi) => (
                                    <th key={hi} className="px-3 py-2 text-left font-medium text-slate-600">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {block.rows?.map((row, ri) => (
                                  <tr key={ri} className="border-b border-slate-100">
                                    {row.map((cell, ci) => (
                                      <td key={ci} className={cn(
                                        "px-3 py-2",
                                        ci === 0 ? "font-medium text-slate-900" : "text-slate-600"
                                      )}>{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                      
                      return null;
                    })}
                  </section>
                ))}

                {/* Conclusion */}
                <div className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-2xl p-6 mb-10">
                  <h2 className="text-lg font-serif font-bold mb-3">{content.conclusion.title}</h2>
                  <p className="text-sm leading-relaxed opacity-90">{content.conclusion.text}</p>
                </div>

                {/* Footer */}
                <footer className="pt-6 border-t border-slate-200">
                  <p className="text-xs text-slate-400 mb-4">{content.disclaimer}</p>
                  <div className="text-xs text-slate-500 space-y-1">
                    {content.sources.map((source, i) => (
                      <p key={i}>[{i + 1}] {source}</p>
                    ))}
                  </div>
                </footer>
              </article>
            </div>

            <button
              onClick={() => {
                const container = document.querySelector('[data-testid="research-screen"] .overflow-y-auto');
                container?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={cn(
                "fixed bottom-6 right-6 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all",
                scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              )}
              data-testid="button-scroll-top"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type ContentBlock = 
  | { type: 'paragraph'; text: string }
  | { type: 'highlight'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'comparison'; before: { label: string; value: string }; after: { label: string; value: string } }
  | { type: 'table'; headers: string[]; rows: string[][] };

interface ForbesContent {
  source: string;
  date: string;
  title: string;
  subtitle: string;
  keyStats: Array<{ icon: string; value: string; label: string }>;
  summaryTitle: string;
  summary: string;
  sections: Array<{
    title: string;
    content: ContentBlock[];
  }>;
  conclusion: { title: string; text: string };
  disclaimer: string;
  sources: string[];
}

function getForbesContent(language: string): ForbesContent {
  const content: Record<string, ForbesContent> = {
    ru: {
      source: "Forbes Analytics",
      date: "Февраль 2026",
      title: "Эволюция цифровой идентичности: почему AI-помощники меняют профессиональное общение",
      subtitle: "За пять десятилетий профессиональная идентичность претерпела три трансформации. Сегодня мы стоим на пороге четвёртой революции — AI-помощников.",
      keyStats: [
        { icon: 'trending', value: "2.5–3x", label: "Рост конверсии с AI vs статичный сайт" },
        { icon: 'dollar', value: "40%", label: "Премия цены для AI-усиленного присутствия" },
        { icon: 'clock', value: "6–8", label: "Недель до окупаемости ROI" },
        { icon: 'users', value: "750M+", label: "Профессионалов — потенциальный рынок" }
      ],
      summaryTitle: "Резюме",
      summary: "Бизнесы, инвестирующие в живое, AI-усиленное присутствие, привлекают лиды в 2,5–3 раза быстрее статичных сайтов, одновременно командуя 40%-й премией цены для сравнимых услуг. Впервые в истории технология созрела настолько, что не иметь динамическую цифровую визитку — это конкурентный недостаток.",
      sections: [
        {
          title: "Часть 1: История профессиональной идентичности",
          content: [
            { type: 'paragraph', text: "В течение трёх десятилетий профессиональная идентичность была синонимом визитки — картонного прямоугольника с именем, должностью и контактами. Это была транзакция: вручить визитку, установить идентичность, обменяться данными." },
            { type: 'highlight', text: "Визитки были дорогими ($0,50–$2 за штуку), создавали дефицит намеренно и требовали физического присутствия. Профессионал мог раздать 200–500 визиток ежегодно." },
            { type: 'paragraph', text: "Рост интернета разрушил экономику визиток. Между 2005 и 2015 годами корпоративный сайт стал обязательным стандартом. Но сайты имели фатальный недостаток: они не реплицировали разговор. Сайт рассказывал о бизнесе; он не говорил с вами." },
            { type: 'comparison', before: { label: "Конверсия сайта", value: "1–2%" }, after: { label: "Отказ без контакта", value: "47%" } }
          ]
        },
        {
          title: "Часть 2: Появление AI-помощников (2023–2026)",
          content: [
            { type: 'paragraph', text: "Три технологических прорыва совпали в 2023–2024, создав условия для нового формата:" },
            { type: 'list', items: [
              "Большие языковые модели достигли паритета разговора — уровень галлюцинаций упал ниже 2%",
              "Фотореалистичные видео-аватары стали доступны — стоимость снизилась с $50,000+ до $29–99/месяц",
              "WebRTC и бессерверная инфраструктура созрели — видеочат стоит <$500 на разработку"
            ]},
            { type: 'table', headers: ["Решение", "Стоимость/год"], rows: [
              ["Найм консьержа", "$50,000–$80,000"],
              ["Команда поддержки 24/7", "$150,000–$300,000"],
              ["LiveAvatar API", "$1,188–$3,588"]
            ]}
          ]
        },
        {
          title: "Часть 3: Почему статичные сайты умирают",
          content: [
            { type: 'paragraph', text: "К 2025 году индустрия веб-разработки столкнулась с парадоксом: сайты были везде, но конверсия стагнировала или падала." },
            { type: 'table', headers: ["Проблема", "Влияние", "Стоимость"], rows: [
              ["Нет ответа в реалтайме", "47% отказов", "Потеря лидов"],
              ["Посетитель не знает что делать", "Трение", "Конверсия ↓ 30–50%"],
              ["Одинаковый опыт для всех", "Нет персонализации", "Генерические воронки"],
              ["Требует заполнения формы", "Высокое трение", "2–5% заполнение"]
            ]},
            { type: 'highlight', text: "Средняя конверсия B2B сайта: 1,84%. Время первого ответа: 24–72 часа. Толерантность prospect-ов к задержке: <15 минут (69%)." }
          ]
        },
        {
          title: "Часть 4: Формат WOW Page — объединённая идентичность",
          content: [
            { type: 'paragraph', text: "WOW Page возник как ответ на конкретную боль: профессионалы нуждались в единственной, динамичной, интерактивной точке входа — не в ещё одном сайте или чатботе." },
            { type: 'list', items: [
              "Объединённый информационный центр — один URL, вся ключевая информация",
              "Живой беседовый AI — текстовый чат и видеоприсутствие 24/7",
              "Адаптивные первые впечатления — опыт персонализируется по намерению посетителя"
            ]},
            { type: 'comparison', before: { label: "Традиционная воронка", value: "$4,300–$16,300/мес" }, after: { label: "Модель WOW Page", value: "$400/мес" } },
            { type: 'paragraph', text: "Это был первый раз, когда один инструмент мог заменить несколько ролей: консьерж, SDR, поддержка и бренд-амбассадор." }
          ]
        },
        {
          title: "Часть 5: Психология «WOW-эффекта»",
          content: [
            { type: 'paragraph', text: "Психологическое влияние первого впечатления переоценить нельзя. Prospect посещает URL, ожидая статичный сайт. Вместо этого он встречает AI-ассистента, который приветствует его лично." },
            { type: 'table', headers: ["Медиум", "Сигнал доверия", "Вероятность действия"], rows: [
              ["Email", "52%", "18%"],
              ["Статичный сайт", "64%", "22%"],
              ["Текстовый чат", "68%", "26%"],
              ["Видео (AI) + чат", "81%", "52%"]
            ]},
            { type: 'highlight', text: "62% профессионалов верят, что AI-powered первый контакт увеличивает доверие. 71% prospect-ов говорят, что видео в реалтайме сделало бы их более вероятным продолжением." }
          ]
        },
        {
          title: "Часть 6: Экономика для консультанта",
          content: [
            { type: 'paragraph', text: "Давайте смоделируем конкретно для типичного консультанта с целевым годовым доходом $250K:" },
            { type: 'table', headers: ["Метрика", "Статичный сайт", "WOW Page"], rows: [
              ["Месячные визиты (тёплые)", "20", "20"],
              ["Конверсия", "1–2%", "15–25%"],
              ["Квалифицированные лиды/мес", "0.2–0.4", "3–5"],
              ["Стоимость за лид", "$375–$750", "$90–$150"],
              ["ROI (за $5K deal)", "-40% до +10%", "+500–600%"]
            ]},
            { type: 'comparison', before: { label: "Расход на объявления", value: "$2,470/мес" }, after: { label: "WOW Page", value: "$400/мес" } },
            { type: 'highlight', text: "Преимущество WOW Page: 86% снижение стоимости привлечения клиента (CAC)." }
          ]
        }
      ],
      conclusion: {
        title: "Вывод: к 2030 году это станет стандартом",
        text: "К 2030 году AI-powered presence будет так же стандартна, как сайт сегодня. К 2032+ статичный сайт будет восприниматься как устаревший — так же, как отсутствие сайта воспринимается сегодня. Ранние адопторы получают преимущество первого хода."
      },
      disclaimer: "Аналитический материал подготовлен на основе открытых рыночных данных и внутренней экспертизы.",
      sources: [
        "Исследование визиток и networking (Print Industry Association, 2005)",
        "Данные о стоимости веб-разработки (Clutch, 2015)",
        "Конверсия B2B сайтов (Unbounce, 2024)",
        "Исследование отказов посетителей (HubSpot, 2024)",
        "HeyGen API pricing (2024)",
        "Исследование AI в B2B (Gartner, 2025)"
      ]
    },
    en: {
      source: "Forbes Analytics",
      date: "February 2026",
      title: "The Evolution of Digital Identity: Why AI Assistants Are Transforming Professional Communication",
      subtitle: "Over five decades, professional identity has undergone three transformations. Today we stand at the threshold of the fourth revolution — AI assistants.",
      keyStats: [
        { icon: 'trending', value: "2.5–3x", label: "Conversion growth with AI vs static site" },
        { icon: 'dollar', value: "40%", label: "Price premium for AI-enhanced presence" },
        { icon: 'clock', value: "6–8", label: "Weeks to ROI payback" },
        { icon: 'users', value: "750M+", label: "Professionals — addressable market" }
      ],
      summaryTitle: "Executive Summary",
      summary: "Businesses investing in live, AI-enhanced presence attract leads 2.5–3x faster than static websites while commanding a 40% price premium for comparable services. For the first time in history, technology has matured to the point where not having a dynamic digital presence is a competitive disadvantage.",
      sections: [
        {
          title: "Part 1: The History of Professional Identity",
          content: [
            { type: 'paragraph', text: "For three decades, professional identity was synonymous with the business card — a cardboard rectangle with name, title, and contact details. It was a transaction: hand over a card, establish identity, exchange data." },
            { type: 'highlight', text: "Business cards were expensive ($0.50–$2 each), created scarcity intentionally, and required physical presence. A professional could hand out 200–500 cards annually." },
            { type: 'paragraph', text: "The rise of the internet shattered business card economics. Between 2005 and 2015, corporate websites became mandatory. But websites had a fatal flaw: they didn't replicate conversation. A website talked about the business; it didn't talk with you." },
            { type: 'comparison', before: { label: "Website conversion", value: "1–2%" }, after: { label: "Bounce without contact", value: "47%" } }
          ]
        },
        {
          title: "Part 2: The Rise of AI Assistants (2023–2026)",
          content: [
            { type: 'paragraph', text: "Three technological breakthroughs converged in 2023–2024, creating conditions for a new format:" },
            { type: 'list', items: [
              "Large Language Models achieved conversation parity — hallucination rates dropped below 2%",
              "Photorealistic video avatars became accessible — costs dropped from $50,000+ to $29–99/month",
              "WebRTC and serverless infrastructure matured — video chat costs <$500 to develop"
            ]},
            { type: 'table', headers: ["Solution", "Cost/year"], rows: [
              ["Hire concierge", "$50,000–$80,000"],
              ["24/7 support team", "$150,000–$300,000"],
              ["LiveAvatar API", "$1,188–$3,588"]
            ]}
          ]
        },
        {
          title: "Part 3: Why Static Websites Are Dying",
          content: [
            { type: 'paragraph', text: "By 2025, the web development industry faced a paradox: websites were everywhere, but conversion stagnated or declined." },
            { type: 'table', headers: ["Problem", "Impact", "Cost"], rows: [
              ["No real-time response", "47% bounce rate", "Lost leads"],
              ["Visitor doesn't know what to do", "Friction", "Conversion ↓ 30–50%"],
              ["Same experience for everyone", "No personalization", "Generic funnels"],
              ["Requires form submission", "High friction", "2–5% completion"]
            ]},
            { type: 'highlight', text: "Average B2B website conversion: 1.84%. Time to first response: 24–72 hours. Prospect tolerance for delay: <15 minutes (69%)." }
          ]
        },
        {
          title: "Part 4: The WOW Page Format — Unified Identity",
          content: [
            { type: 'paragraph', text: "WOW Page emerged as a response to a specific pain: professionals needed a single, dynamic, interactive entry point — not another website or chatbot." },
            { type: 'list', items: [
              "Unified information hub — one URL, all key information",
              "Live conversational AI — text chat and video presence 24/7",
              "Adaptive first impressions — experience personalizes to visitor intent"
            ]},
            { type: 'comparison', before: { label: "Traditional funnel", value: "$4,300–$16,300/mo" }, after: { label: "WOW Page model", value: "$400/mo" } },
            { type: 'paragraph', text: "For the first time, a single tool could replace multiple roles: concierge, SDR, support, and brand ambassador." }
          ]
        },
        {
          title: "Part 5: The Psychology of the 'WOW Effect'",
          content: [
            { type: 'paragraph', text: "The psychological impact of first impressions cannot be overstated. A prospect visits a URL expecting a static website. Instead, they meet an AI assistant who greets them personally." },
            { type: 'table', headers: ["Medium", "Trust signal", "Likelihood of action"], rows: [
              ["Email", "52%", "18%"],
              ["Static website", "64%", "22%"],
              ["Text chat", "68%", "26%"],
              ["Video (AI) + chat", "81%", "52%"]
            ]},
            { type: 'highlight', text: "62% of professionals believe AI-powered first contact increases trust. 71% of prospects say real-time video would make them more likely to continue." }
          ]
        },
        {
          title: "Part 6: Economics for a Consultant",
          content: [
            { type: 'paragraph', text: "Let's model specifically for a typical consultant with a target annual income of $250K:" },
            { type: 'table', headers: ["Metric", "Static website", "WOW Page"], rows: [
              ["Monthly visits (warm)", "20", "20"],
              ["Conversion", "1–2%", "15–25%"],
              ["Qualified leads/month", "0.2–0.4", "3–5"],
              ["Cost per lead", "$375–$750", "$90–$150"],
              ["ROI (per $5K deal)", "-40% to +10%", "+500–600%"]
            ]},
            { type: 'comparison', before: { label: "Ad spend", value: "$2,470/mo" }, after: { label: "WOW Page", value: "$400/mo" } },
            { type: 'highlight', text: "WOW Page advantage: 86% reduction in customer acquisition cost (CAC)." }
          ]
        }
      ],
      conclusion: {
        title: "Conclusion: By 2030 this will be standard",
        text: "By 2030, AI-powered presence will be as standard as websites are today. By 2032+, static websites will be perceived as outdated — just as having no website is perceived today. Early adopters gain first-mover advantage."
      },
      disclaimer: "Analysis prepared based on open market data and internal expertise.",
      sources: [
        "Business cards and networking research (Print Industry Association, 2005)",
        "Web development cost data (Clutch, 2015)",
        "B2B website conversion (Unbounce, 2024)",
        "Visitor bounce research (HubSpot, 2024)",
        "HeyGen API pricing (2024)",
        "AI in B2B research (Gartner, 2025)"
      ]
    },
    de: {
      source: "Forbes Analytics",
      date: "Februar 2026",
      title: "Die Evolution der digitalen Identität: Warum KI-Assistenten die professionelle Kommunikation verändern",
      subtitle: "In fünf Jahrzehnten hat die professionelle Identität drei Transformationen durchlaufen. Heute stehen wir an der Schwelle zur vierten Revolution — KI-Assistenten.",
      keyStats: [
        { icon: 'trending', value: "2,5–3x", label: "Conversion-Wachstum mit KI vs statische Website" },
        { icon: 'dollar', value: "40%", label: "Preisaufschlag für KI-gestützte Präsenz" },
        { icon: 'clock', value: "6–8", label: "Wochen bis zur ROI-Amortisation" },
        { icon: 'users', value: "750M+", label: "Fachleute — adressierbarer Markt" }
      ],
      summaryTitle: "Zusammenfassung",
      summary: "Unternehmen, die in eine lebendige, KI-gestützte Präsenz investieren, gewinnen Leads 2,5–3x schneller als statische Websites und erzielen dabei einen Preisaufschlag von 40% für vergleichbare Dienstleistungen.",
      sections: [
        {
          title: "Teil 1: Die Geschichte der professionellen Identität",
          content: [
            { type: 'paragraph', text: "Drei Jahrzehnte lang war professionelle Identität gleichbedeutend mit der Visitenkarte. Es war eine Transaktion: Karte übergeben, Identität etablieren, Daten austauschen." },
            { type: 'highlight', text: "Visitenkarten waren teuer ($0,50–$2 pro Stück), erzeugten absichtlich Knappheit und erforderten physische Anwesenheit." },
            { type: 'comparison', before: { label: "Website-Conversion", value: "1–2%" }, after: { label: "Absprung ohne Kontakt", value: "47%" } }
          ]
        },
        {
          title: "Teil 2: Der Aufstieg der KI-Assistenten (2023–2026)",
          content: [
            { type: 'paragraph', text: "Drei technologische Durchbrüche konvergierten 2023–2024 und schufen Bedingungen für ein neues Format:" },
            { type: 'list', items: [
              "Große Sprachmodelle erreichten Gesprächsparität — Halluzinationsraten fielen unter 2%",
              "Fotorealistische Video-Avatare wurden erschwinglich — Kosten sanken von $50.000+ auf $29–99/Monat",
              "WebRTC und serverlose Infrastruktur reiften — Videochat kostet <$500 zur Entwicklung"
            ]}
          ]
        },
        {
          title: "Teil 3: Das WOW Page Format",
          content: [
            { type: 'paragraph', text: "WOW Page entstand als Antwort auf einen konkreten Schmerz: Fachleute brauchten einen einzigen, dynamischen, interaktiven Einstiegspunkt." },
            { type: 'list', items: [
              "Einheitlicher Informations-Hub — eine URL, alle Schlüsselinformationen",
              "Live-Konversations-KI — Textchat und Videopräsenz 24/7",
              "Adaptive erste Eindrücke — Erfahrung personalisiert sich nach Besucherabsicht"
            ]},
            { type: 'comparison', before: { label: "Traditioneller Trichter", value: "$4.300–$16.300/Mo" }, after: { label: "WOW Page Modell", value: "$400/Mo" } }
          ]
        },
        {
          title: "Teil 4: Die Psychologie des 'WOW-Effekts'",
          content: [
            { type: 'table', headers: ["Medium", "Vertrauenssignal", "Handlungswahrscheinlichkeit"], rows: [
              ["E-Mail", "52%", "18%"],
              ["Statische Website", "64%", "22%"],
              ["Video (KI) + Chat", "81%", "52%"]
            ]},
            { type: 'highlight', text: "62% der Fachleute glauben, dass KI-gestützter Erstkontakt das Vertrauen erhöht. 71% der Prospects sagen, dass Echtzeit-Video sie eher zum Weitermachen bewegen würde." }
          ]
        }
      ],
      conclusion: {
        title: "Fazit: Bis 2030 wird dies Standard sein",
        text: "Bis 2030 wird KI-gestützte Präsenz so Standard sein wie Websites heute. Frühadoptierer gewinnen First-Mover-Vorteile."
      },
      disclaimer: "Analyse basierend auf offenen Marktdaten und interner Expertise erstellt.",
      sources: [
        "Visitenkarten- und Networking-Forschung (Print Industry Association, 2005)",
        "B2B-Website-Conversion (Unbounce, 2024)",
        "HeyGen API-Preise (2024)",
        "KI in B2B-Forschung (Gartner, 2025)"
      ]
    },
    es: {
      source: "Forbes Analytics",
      date: "Febrero 2026",
      title: "La evolución de la identidad digital: Por qué los asistentes de IA están transformando la comunicación profesional",
      subtitle: "Durante cinco décadas, la identidad profesional ha sufrido tres transformaciones. Hoy nos encontramos en el umbral de la cuarta revolución — los asistentes de IA.",
      keyStats: [
        { icon: 'trending', value: "2,5–3x", label: "Crecimiento de conversión con IA vs sitio estático" },
        { icon: 'dollar', value: "40%", label: "Prima de precio para presencia con IA" },
        { icon: 'clock', value: "6–8", label: "Semanas hasta retorno de inversión" },
        { icon: 'users', value: "750M+", label: "Profesionales — mercado direccionable" }
      ],
      summaryTitle: "Resumen Ejecutivo",
      summary: "Las empresas que invierten en presencia en vivo mejorada por IA atraen leads 2,5–3x más rápido que los sitios web estáticos mientras obtienen una prima de precio del 40% para servicios comparables.",
      sections: [
        {
          title: "Parte 1: La historia de la identidad profesional",
          content: [
            { type: 'paragraph', text: "Durante tres décadas, la identidad profesional fue sinónimo de la tarjeta de visita. Era una transacción: entregar una tarjeta, establecer identidad, intercambiar datos." },
            { type: 'highlight', text: "Las tarjetas de visita eran caras ($0,50–$2 cada una), creaban escasez intencionalmente y requerían presencia física." },
            { type: 'comparison', before: { label: "Conversión del sitio web", value: "1–2%" }, after: { label: "Rebote sin contacto", value: "47%" } }
          ]
        },
        {
          title: "Parte 2: El auge de los asistentes de IA (2023–2026)",
          content: [
            { type: 'paragraph', text: "Tres avances tecnológicos convergieron en 2023–2024, creando condiciones para un nuevo formato:" },
            { type: 'list', items: [
              "Los modelos de lenguaje grande alcanzaron paridad conversacional — las tasas de alucinación cayeron por debajo del 2%",
              "Los avatares de video fotorrealistas se volvieron accesibles — los costos cayeron de $50.000+ a $29–99/mes",
              "WebRTC e infraestructura sin servidor maduraron — el chat de video cuesta <$500 para desarrollar"
            ]}
          ]
        },
        {
          title: "Parte 3: El formato WOW Page",
          content: [
            { type: 'paragraph', text: "WOW Page surgió como respuesta a un dolor específico: los profesionales necesitaban un punto de entrada único, dinámico e interactivo." },
            { type: 'list', items: [
              "Centro de información unificado — una URL, toda la información clave",
              "IA conversacional en vivo — chat de texto y presencia de video 24/7",
              "Primeras impresiones adaptativas — la experiencia se personaliza según la intención del visitante"
            ]},
            { type: 'comparison', before: { label: "Embudo tradicional", value: "$4.300–$16.300/mes" }, after: { label: "Modelo WOW Page", value: "$400/mes" } }
          ]
        },
        {
          title: "Parte 4: La psicología del 'efecto WOW'",
          content: [
            { type: 'table', headers: ["Medio", "Señal de confianza", "Probabilidad de acción"], rows: [
              ["Email", "52%", "18%"],
              ["Sitio web estático", "64%", "22%"],
              ["Video (IA) + chat", "81%", "52%"]
            ]},
            { type: 'highlight', text: "El 62% de los profesionales cree que el primer contacto con IA aumenta la confianza. El 71% de los prospectos dice que el video en tiempo real los haría más propensos a continuar." }
          ]
        }
      ],
      conclusion: {
        title: "Conclusión: Para 2030 esto será estándar",
        text: "Para 2030, la presencia con IA será tan estándar como los sitios web hoy. Los primeros adoptantes obtienen ventaja de primer movimiento."
      },
      disclaimer: "Análisis preparado con base en datos de mercado abiertos y experiencia interna.",
      sources: [
        "Investigación de tarjetas de visita y networking (Print Industry Association, 2005)",
        "Conversión de sitios web B2B (Unbounce, 2024)",
        "Precios de API de HeyGen (2024)",
        "Investigación de IA en B2B (Gartner, 2025)"
      ]
    }
  };

  return content[language] || content.ru;
}
