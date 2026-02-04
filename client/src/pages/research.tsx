import { motion, LazyMotion, domAnimation } from "framer-motion";
import { ArrowLeft, TrendingUp, Clock, Users, Zap, Check, ChevronRight, BarChart3, DollarSign, Target, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function ResearchPage() {
  const { language } = useLanguage();
  
  const content = researchContent[language] || researchContent.ru;

  return (
    <div className="min-h-dvh bg-white" data-testid="page-research">
      <LanguageSwitcher />
      
      <LazyMotion features={domAnimation}>
        <article className="mx-auto w-full max-w-3xl px-5 py-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className="mb-12">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 transition-colors mb-8"
                data-testid="link-back-home"
              >
                <ArrowLeft className="w-4 h-4" />
                WOW Page
              </a>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  {content.badge}
                </span>
                <span className="text-xs text-slate-400">{content.date}</span>
              </div>
              
              <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-[-0.02em] text-slate-900 mb-4">
                {content.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {content.subtitle}
              </p>
            </header>

            <div className="bg-gradient-to-r from-violet-50 to-slate-50 rounded-2xl p-6 mb-12 border border-violet-100">
              <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-violet-600" />
                {content.summary.title}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                {content.summary.text}
              </p>
            </div>

            <section className="mb-16">
              <h2 className="font-serif text-2xl text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <Clock className="w-5 h-5" />
                </span>
                {content.history.title}
              </h2>
              
              <div className="relative ml-5 pl-8 border-l-2 border-slate-200 space-y-10">
                {content.history.eras.map((era, index) => (
                  <motion.div
                    key={era.period}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className={`absolute -left-[41px] w-4 h-4 rounded-full border-2 ${
                      index === content.history.eras.length - 1 
                        ? "bg-violet-500 border-violet-500" 
                        : "bg-white border-slate-300"
                    }`} />
                    <div className="text-xs font-mono text-slate-400 mb-1">{era.period}</div>
                    <h3 className={`font-semibold mb-2 ${
                      index === content.history.eras.length - 1 ? "text-violet-700" : "text-slate-800"
                    }`}>
                      {era.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{era.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {era.stats.map((stat, i) => (
                        <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                          {stat}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                  <Zap className="w-5 h-5" />
                </span>
                {content.problems.title}
              </h2>
              
              <div className="space-y-4">
                {content.problems.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-5 bg-red-50/50 rounded-xl border border-red-100"
                  >
                    <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                    {item.stat && (
                      <div className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-red-600 bg-red-100 px-3 py-1.5 rounded-lg">
                        <BarChart3 className="w-3.5 h-3.5" />
                        {item.stat}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <DollarSign className="w-5 h-5" />
                </span>
                {content.economics.title}
              </h2>
              
              <p className="text-slate-600 mb-6 leading-relaxed">{content.economics.intro}</p>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">{content.economics.table.headers[0]}</th>
                      <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">{content.economics.table.headers[1]}</th>
                      <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">{content.economics.table.headers[2]}</th>
                      <th className="text-center p-3 font-semibold text-slate-700 border-b border-slate-200">{content.economics.table.headers[3]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.economics.table.rows.map((row, index) => (
                      <tr key={index} className={row.highlight ? "bg-violet-50" : ""}>
                        <td className={`p-3 border-b border-slate-100 ${row.highlight ? "font-semibold text-violet-700" : "text-slate-700"}`}>
                          {row.channel}
                        </td>
                        <td className="p-3 border-b border-slate-100 text-center text-slate-600">{row.cost}</td>
                        <td className="p-3 border-b border-slate-100 text-center text-slate-600">{row.conversion}</td>
                        <td className={`p-3 border-b border-slate-100 text-center ${row.highlight ? "font-semibold text-violet-600" : "text-slate-600"}`}>
                          {row.cpl}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h4 className="font-semibold text-amber-800 mb-2">{content.economics.insight.title}</h4>
                <p className="text-sm text-amber-700 leading-relaxed">{content.economics.insight.text}</p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <Users className="w-5 h-5" />
                </span>
                {content.comparison.title}
              </h2>
              
              <div className="space-y-4">
                {content.comparison.solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`p-5 rounded-xl border ${
                      solution.recommended 
                        ? "bg-gradient-to-r from-violet-50 to-white border-violet-200" 
                        : "bg-slate-50 border-slate-100"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className={`font-semibold ${solution.recommended ? "text-violet-700" : "text-slate-800"}`}>
                          {solution.name}
                        </h3>
                        <span className="text-xs text-slate-500">{solution.period}</span>
                      </div>
                      {solution.recommended && (
                        <span className="text-xs font-medium bg-violet-100 text-violet-700 px-2 py-1 rounded-full">
                          {content.comparison.recommendedLabel}
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">{content.comparison.labels.cost}</div>
                        <div className="text-sm font-medium text-slate-700">{solution.cost}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">{content.comparison.labels.conversion}</div>
                        <div className={`text-sm font-medium ${solution.recommended ? "text-violet-600" : "text-slate-700"}`}>
                          {solution.conversion}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {solution.pros.map((pro, i) => (
                        <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                          + {pro}
                        </span>
                      ))}
                      {solution.cons.map((con, i) => (
                        <span key={i} className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded">
                          − {con}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <TrendingUp className="w-5 h-5" />
                </span>
                {content.roi.title}
              </h2>
              
              <p className="text-slate-600 mb-6 leading-relaxed">{content.roi.intro}</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-semibold text-slate-700 mb-3">{content.roi.traditional.title}</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {content.roi.traditional.items.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{item.label}</span>
                        <span className="font-medium text-slate-700">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between font-semibold">
                    <span>{content.roi.totalLabel}</span>
                    <span className="text-red-600">{content.roi.traditional.total}</span>
                  </div>
                </div>
                
                <div className="p-5 bg-violet-50 rounded-xl border border-violet-200">
                  <h4 className="font-semibold text-violet-700 mb-3">{content.roi.wowpage.title}</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {content.roi.wowpage.items.map((item, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{item.label}</span>
                        <span className="font-medium text-violet-700">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-violet-200 flex justify-between font-semibold">
                    <span>{content.roi.totalLabel}</span>
                    <span className="text-green-600">{content.roi.wowpage.total}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{content.roi.savings.value}</div>
                <div className="text-sm text-green-700">{content.roi.savings.label}</div>
              </div>
            </section>

            <motion.section
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-16 p-6 md:p-8 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl text-white"
            >
              <h2 className="font-serif text-2xl mb-4">{content.solution.title}</h2>
              <p className="text-violet-100 mb-6 leading-relaxed">{content.solution.description}</p>
              <ul className="space-y-3 mb-6">
                {content.solution.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-violet-200 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-3 gap-4">
                {content.solution.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-violet-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-slate-900 mb-6">{content.conclusion.title}</h2>
              <div className="prose prose-slate max-w-none">
                {content.conclusion.paragraphs.map((p, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed mb-4">{p}</p>
                ))}
              </div>
            </section>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden p-6 md:p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-amber-700">
                    {content.cta.spots}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-slate-800 mb-2">
                  {content.cta.title}
                </h3>
                <p className="text-slate-600 mb-6">
                  {content.cta.description}
                </p>
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
                  data-testid="button-cta"
                >
                  {content.cta.button}
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <footer className="mt-12 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
              <p>{content.footer.sources}</p>
              <p className="mt-2">{content.footer.copyright}</p>
            </footer>
          </motion.div>
        </article>
      </LazyMotion>
    </div>
  );
}

const researchContent: Record<string, any> = {
  ru: {
    badge: "Исследование",
    date: "Февраль 2026",
    title: "Эволюция визитной карточки: от бумаги к AI-представительству",
    subtitle: "Экономический анализ трансформации первого касания в цифровую эпоху. Почему все идёт к формату живого AI-присутствия и как WOW Page объединяет лучшие практики.",
    summary: {
      title: "Ключевые выводы",
      text: "Стоимость привлечения качественного лида через традиционные каналы выросла на 147% за последние 5 лет. AI-усиленные решения демонстрируют рост конверсии на 35-40% при снижении операционных затрат на 60%. Бизнесы с живым AI-присутствием привлекают лиды в 2.5–3 раза быстрее статичных сайтов."
    },
    history: {
      title: "300 лет эволюции первого впечатления",
      eras: [
        {
          period: "1700–1900",
          title: "Эра визитных карточек",
          description: "Визитка появилась во Франции в XVII веке как инструмент аристократии. К XIX веку стала обязательным элементом делового этикета. Ручное изготовление, дорогая бумага, срок изготовления 2-4 недели.",
          stats: ["$50-200 за партию", "Ручная передача", "Локальное распространение"]
        },
        {
          period: "1950–2000",
          title: "Золотой век печатных визиток",
          description: "Массовая печать сделала визитки доступными каждому. Стоимость снизилась до $10-50 за 1000 штук. Но 88% визиток выбрасываются в течение недели.",
          stats: ["Конверсия 2-5%", "88% выбрасывают", "Срок хранения 1-2 года"]
        },
        {
          period: "2000–2015",
          title: "Цифровая революция: сайты",
          description: "Интернет изменил правила. Появились корпоративные сайты ($5,000-50,000), email-подписи, LinkedIn. Но сайты статичны — посетитель сам ищет информацию, 47% уходят без ответа.",
          stats: ["Конверсия 1-3%", "54 сек на сайте", "47% уходят без контакта"]
        },
        {
          period: "2015–2023",
          title: "Эра социальных медиа",
          description: "Соцсети стали новыми визитками, но с ограничениями: алгоритмы, шум, фрагментированная идентичность. Органический охват упал с 20% до 2-5%. Профессионалы тратят 5-8 часов в неделю на контент.",
          stats: ["Охват 2-5%", "5-8 ч/неделю", "4-6 платформ на человека"]
        },
        {
          period: "2023–2026",
          title: "AI-представительство: WOW Page",
          description: "Три технологии сошлись: LLM достигли паритета разговора, фотореалистичные аватары стали доступны ($99/мес вместо $50,000), WebRTC созрел. Впервые один инструмент заменяет консьержа, SDR и бренд-амбассадора.",
          stats: ["Конверсия 15-25%", "24/7 работа", "В 3x быстрее привлечение"]
        }
      ]
    },
    problems: {
      title: "Что не так с текущими решениями",
      items: [
        {
          title: "Сайты молчат",
          description: "Посетитель приходит, скроллит, читает и уходит. Диалога нет, живого ответа нет, человеческого присутствия нет. Конверсия всего 1-3%.",
          stat: "47% уходят с вопросом, о котором вы даже не узнаете"
        },
        {
          title: "Соцсети съедают время",
          description: "Типичный руководитель имеет профили на 4-6 платформах. Управление требует 5-8 часов в неделю. Алгоритмы меняются, охват падает, ROI на вложенное время — нулевой.",
          stat: "Органический охват упал с 20% до 2% за 8 лет"
        },
        {
          title: "Вы работаете на алгоритм, а не наоборот",
          description: "Вместо того чтобы AI работал на вас 24/7, вы создаёте контент для алгоритмов платформ. Это не масштабируется и не работает, пока вы спите.",
          stat: "Средний профессионал теряет $62,400/год на повторяющиеся объяснения"
        },
        {
          title: "Традиционные каналы дорожают",
          description: "Стоимость лида через холодные звонки: $1,250-5,000. Через выставки: $3,300-40,000. Контекстная реклама: $300-5,000 за лид. И эти цифры растут на 20-30% ежегодно.",
          stat: "Рост стоимости привлечения +147% за 5 лет"
        }
      ]
    },
    economics: {
      title: "Экономика первого касания в 2026",
      intro: "Современный B2B-клиент требует 8-12 касаний перед принятием решения. Сравним стоимость различных каналов:",
      table: {
        headers: ["Канал", "Стоимость", "Конверсия", "Стоимость лида"],
        rows: [
          { channel: "Холодные звонки", cost: "$25-50/контакт", conversion: "1-2%", cpl: "$1,250-5,000" },
          { channel: "Email-рассылка", cost: "$2-5/контакт", conversion: "0.5-2%", cpl: "$100-1,000" },
          { channel: "Выставки", cost: "$500-2,000", conversion: "5-15%", cpl: "$3,300-40,000" },
          { channel: "Корп. сайт", cost: "$100-500/мес", conversion: "1-3%", cpl: "$3,300-50,000" },
          { channel: "Контекстная реклама", cost: "$15-100/клик", conversion: "2-5%", cpl: "$300-5,000" },
          { channel: "AI-чатбот (GPT)", cost: "$200-1,500/мес", conversion: "12-20%", cpl: "$250-1,000" },
          { channel: "WOW Page", cost: "$150-400/мес", conversion: "15-25%", cpl: "$80-533", highlight: true }
        ]
      },
      insight: {
        title: "Почему AI-представительство выигрывает",
        text: "AI-представительство работает 168 часов в неделю при стоимости $1,800-4,800/год. Традиционный ассистент стоит $30,000-60,000/год и работает только 40 часов. Разница в 4.2x по стоимости и в 4.2x по времени работы."
      }
    },
    comparison: {
      title: "Сравнение решений для онлайн-представительства",
      recommendedLabel: "Рекомендуем",
      labels: {
        cost: "Стоимость",
        conversion: "Конверсия"
      },
      solutions: [
        {
          name: "Корпоративный сайт",
          period: "2010-е",
          cost: "$5,000-50,000 + $1,000-5,000/год",
          conversion: "1-3%",
          pros: ["Полный контроль", "SEO"],
          cons: ["Статичность", "Низкая вовлечённость"]
        },
        {
          name: "Лендинг",
          period: "2015+",
          cost: "$1,000-15,000 + $500-2,000/год",
          conversion: "2-10%",
          pros: ["Фокус на действии", "Быстрая загрузка"],
          cons: ["Одна задача", "Нужен трафик"]
        },
        {
          name: "Простой чат-бот",
          period: "2018-2022",
          cost: "$500-5,000 + $50-500/мес",
          conversion: "5-10%",
          pros: ["Автоматизация FAQ", "24/7"],
          cons: ["Роботизированность", "Сценарная логика"]
        },
        {
          name: "AI-чатбот (GPT)",
          period: "2023-2024",
          cost: "$2,000-25,000 + $200-1,500/мес",
          conversion: "12-20%",
          pros: ["Понимание контекста", "Персонализация"],
          cons: ["Только текст", "Высокая стоимость"]
        },
        {
          name: "WOW Page",
          period: "2024+",
          cost: "$2,000-8,000 + $150-400/мес",
          conversion: "15-25%",
          pros: ["Текст + видео", "24/7", "Премиум-опыт"],
          cons: [],
          recommended: true
        }
      ]
    },
    roi: {
      title: "ROI-анализ для B2B-консультанта",
      intro: "Типичный консультант со ставкой $200/час тратит 6 часов в неделю на «первые касания» — повторяющиеся объяснения, ответы на одинаковые вопросы. Это 312 часов в год.",
      traditional: {
        title: "Традиционный подход",
        items: [
          { label: "Разработка сайта", value: "$12,000" },
          { label: "Поддержка/год", value: "$2,400" },
          { label: "Время на касания (312ч × $200)", value: "$62,400" }
        ],
        total: "$76,800/год"
      },
      wowpage: {
        title: "WOW Page подход",
        items: [
          { label: "Внедрение", value: "$4,500" },
          { label: "Эксплуатация/год", value: "$3,000" },
          { label: "Время на касания (50ч × $200)", value: "$10,000" }
        ],
        total: "$17,500/год"
      },
      totalLabel: "Итого год 1:",
      savings: {
        value: "$266,500",
        label: "Экономия за 5 лет"
      }
    },
    solution: {
      title: "Почему WOW Page — оптимальный выбор",
      description: "WOW Page объединяет преимущества всех предыдущих решений: интерактивность AI-чатбота, визуальное воздействие видео, доступность 24/7 и персонализацию под каждого посетителя.",
      points: [
        "GPT-4o для глубокого понимания контекста и естественного диалога",
        "LiveAvatar для живого видеоприсутствия без вашего участия",
        "Работает в Telegram и браузере — один опыт везде",
        "Адаптируется под намерение посетителя: холодный контакт, тёплое введение, партнёр"
      ],
      stats: [
        { value: "24/7", label: "Работа без выходных" },
        { value: "2.5-3x", label: "Быстрее привлечение" },
        { value: "40%", label: "Премия к цене услуг" }
      ]
    },
    conclusion: {
      title: "Заключение",
      paragraphs: [
        "За пять десятилетий профессиональная идентичность претерпела три трансформации: физические визитки, корпоративные сайты и профили в соцсетях. Сегодня мы на пороге четвёртой революции — AI-помощников, которые объединяют беседовый интеллект, видеоприсутствие и адаптивное общение.",
        "Факты ясны: бизнесы с живым AI-присутствием привлекают лиды в 2.5–3 раза быстрее статичных сайтов и командуют 40%-й премией цены за сравнимые услуги.",
        "Впервые в истории технология созрела настолько, что не иметь динамическую цифровую визитку — это конкурентный недостаток, независимо от бюджета маркетинга. WOW Page делает этот формат доступным уже сегодня."
      ]
    },
    cta: {
      spots: "7 мест осталось",
      title: "Пилот запускается",
      description: "Ограниченное количество мест по специальной цене для первых участников. Через 48 часов — формат, который работает за вас.",
      button: "Обсудить запуск"
    },
    footer: {
      sources: "Источники: AdWeek (2019), Gartner (2024), HeyGen (2024), Forbes Analytics",
      copyright: "© 2026 WOW Page Research"
    }
  },
  en: {
    badge: "Research",
    date: "February 2026",
    title: "Evolution of the Business Card: From Paper to AI Presence",
    subtitle: "Economic analysis of first-touch transformation in the digital age. Why everything leads to live AI presence and how WOW Page combines best practices.",
    summary: {
      title: "Key Findings",
      text: "The cost of acquiring quality leads through traditional channels has increased by 147% over the past 5 years. AI-enhanced solutions show 35-40% higher conversion rates while reducing operational costs by 60%. Businesses with live AI presence attract leads 2.5–3x faster than static websites."
    },
    history: {
      title: "300 Years of First Impression Evolution",
      eras: [
        {
          period: "1700–1900",
          title: "The Business Card Era",
          description: "Business cards appeared in France in the 17th century as a tool for aristocracy. By the 19th century, they became essential for business etiquette. Handmade, expensive paper, 2-4 weeks production time.",
          stats: ["$50-200 per batch", "Hand delivery", "Local distribution"]
        },
        {
          period: "1950–2000",
          title: "Golden Age of Printed Cards",
          description: "Mass printing made cards accessible to everyone. Cost dropped to $10-50 per 1000. But 88% of business cards are thrown away within a week.",
          stats: ["2-5% conversion", "88% discarded", "1-2 year shelf life"]
        },
        {
          period: "2000–2015",
          title: "Digital Revolution: Websites",
          description: "Internet changed the rules. Corporate websites ($5,000-50,000), email signatures, LinkedIn emerged. But websites are static—visitors search for info themselves, 47% leave without answers.",
          stats: ["1-3% conversion", "54 sec on site", "47% leave without contact"]
        },
        {
          period: "2015–2023",
          title: "Social Media Era",
          description: "Social networks became new business cards, but with limitations: algorithms, noise, fragmented identity. Organic reach dropped from 20% to 2-5%. Professionals spend 5-8 hours weekly on content.",
          stats: ["2-5% reach", "5-8 hrs/week", "4-6 platforms per person"]
        },
        {
          period: "2023–2026",
          title: "AI Presence: WOW Page",
          description: "Three technologies converged: LLMs reached conversation parity, photorealistic avatars became affordable ($99/mo vs $50,000), WebRTC matured. For the first time, one tool replaces concierge, SDR, and brand ambassador.",
          stats: ["15-25% conversion", "24/7 operation", "3x faster attraction"]
        }
      ]
    },
    problems: {
      title: "What's Wrong with Current Solutions",
      items: [
        {
          title: "Websites Stay Silent",
          description: "Visitor comes, scrolls, reads, and leaves. No dialogue, no live response, no human presence. Conversion is only 1-3%.",
          stat: "47% leave with questions you never know about"
        },
        {
          title: "Social Media Eats Your Time",
          description: "Typical executive has profiles on 4-6 platforms. Management requires 5-8 hours weekly. Algorithms change, reach drops, ROI on time invested is zero.",
          stat: "Organic reach dropped from 20% to 2% in 8 years"
        },
        {
          title: "You Work for the Algorithm, Not Vice Versa",
          description: "Instead of AI working for you 24/7, you create content for platform algorithms. This doesn't scale and doesn't work while you sleep.",
          stat: "Average professional loses $62,400/year on repetitive explanations"
        },
        {
          title: "Traditional Channels Getting Expensive",
          description: "Cost per lead via cold calls: $1,250-5,000. Via exhibitions: $3,300-40,000. PPC: $300-5,000 per lead. And these numbers grow 20-30% annually.",
          stat: "Acquisition cost growth +147% over 5 years"
        }
      ]
    },
    economics: {
      title: "First Touch Economics in 2026",
      intro: "Modern B2B client requires 8-12 touches before decision. Let's compare costs across channels:",
      table: {
        headers: ["Channel", "Cost", "Conversion", "Cost per Lead"],
        rows: [
          { channel: "Cold calls", cost: "$25-50/contact", conversion: "1-2%", cpl: "$1,250-5,000" },
          { channel: "Email outreach", cost: "$2-5/contact", conversion: "0.5-2%", cpl: "$100-1,000" },
          { channel: "Exhibitions", cost: "$500-2,000", conversion: "5-15%", cpl: "$3,300-40,000" },
          { channel: "Corporate website", cost: "$100-500/mo", conversion: "1-3%", cpl: "$3,300-50,000" },
          { channel: "PPC advertising", cost: "$15-100/click", conversion: "2-5%", cpl: "$300-5,000" },
          { channel: "AI chatbot (GPT)", cost: "$200-1,500/mo", conversion: "12-20%", cpl: "$250-1,000" },
          { channel: "WOW Page", cost: "$150-400/mo", conversion: "15-25%", cpl: "$80-533", highlight: true }
        ]
      },
      insight: {
        title: "Why AI Presence Wins",
        text: "AI presence works 168 hours/week at $1,800-4,800/year. Traditional assistant costs $30,000-60,000/year and works only 40 hours. That's 4.2x difference in cost and 4.2x in working hours."
      }
    },
    comparison: {
      title: "Online Presence Solutions Comparison",
      recommendedLabel: "Recommended",
      labels: {
        cost: "Cost",
        conversion: "Conversion"
      },
      solutions: [
        {
          name: "Corporate Website",
          period: "2010s",
          cost: "$5,000-50,000 + $1,000-5,000/yr",
          conversion: "1-3%",
          pros: ["Full control", "SEO"],
          cons: ["Static", "Low engagement"]
        },
        {
          name: "Landing Page",
          period: "2015+",
          cost: "$1,000-15,000 + $500-2,000/yr",
          conversion: "2-10%",
          pros: ["Action focused", "Fast loading"],
          cons: ["Single task", "Needs traffic"]
        },
        {
          name: "Simple Chatbot",
          period: "2018-2022",
          cost: "$500-5,000 + $50-500/mo",
          conversion: "5-10%",
          pros: ["FAQ automation", "24/7"],
          cons: ["Robotic", "Scripted logic"]
        },
        {
          name: "AI Chatbot (GPT)",
          period: "2023-2024",
          cost: "$2,000-25,000 + $200-1,500/mo",
          conversion: "12-20%",
          pros: ["Context understanding", "Personalization"],
          cons: ["Text only", "High cost"]
        },
        {
          name: "WOW Page",
          period: "2024+",
          cost: "$2,000-8,000 + $150-400/mo",
          conversion: "15-25%",
          pros: ["Text + video", "24/7", "Premium experience"],
          cons: [],
          recommended: true
        }
      ]
    },
    roi: {
      title: "ROI Analysis for B2B Consultant",
      intro: "Typical consultant at $200/hour spends 6 hours weekly on 'first touches'—repetitive explanations, answering same questions. That's 312 hours per year.",
      traditional: {
        title: "Traditional Approach",
        items: [
          { label: "Website development", value: "$12,000" },
          { label: "Maintenance/year", value: "$2,400" },
          { label: "Time on touches (312h × $200)", value: "$62,400" }
        ],
        total: "$76,800/year"
      },
      wowpage: {
        title: "WOW Page Approach",
        items: [
          { label: "Implementation", value: "$4,500" },
          { label: "Operation/year", value: "$3,000" },
          { label: "Time on touches (50h × $200)", value: "$10,000" }
        ],
        total: "$17,500/year"
      },
      totalLabel: "Year 1 total:",
      savings: {
        value: "$266,500",
        label: "5-year savings"
      }
    },
    solution: {
      title: "Why WOW Page is the Optimal Choice",
      description: "WOW Page combines advantages of all previous solutions: AI chatbot interactivity, video visual impact, 24/7 availability, and personalization for each visitor.",
      points: [
        "GPT-4o for deep context understanding and natural dialogue",
        "LiveAvatar for live video presence without your participation",
        "Works in Telegram and browser—same experience everywhere",
        "Adapts to visitor intent: cold contact, warm intro, partner"
      ],
      stats: [
        { value: "24/7", label: "Non-stop operation" },
        { value: "2.5-3x", label: "Faster attraction" },
        { value: "40%", label: "Price premium" }
      ]
    },
    conclusion: {
      title: "Conclusion",
      paragraphs: [
        "Over five decades, professional identity has undergone three transformations: physical business cards, corporate websites, and social media profiles. Today we stand at the threshold of a fourth revolution—AI assistants that combine conversational intelligence, video presence, and adaptive communication.",
        "The facts are clear: businesses with live AI presence attract leads 2.5–3 times faster than static websites and command a 40% price premium for comparable services.",
        "For the first time in history, technology has matured enough that not having a dynamic digital business card is a competitive disadvantage, regardless of marketing budget. WOW Page makes this format accessible today."
      ]
    },
    cta: {
      spots: "7 spots left",
      title: "Pilot is Launching",
      description: "Limited spots at special pricing for early participants. In 48 hours—a format that works for you.",
      button: "Discuss Launch"
    },
    footer: {
      sources: "Sources: AdWeek (2019), Gartner (2024), HeyGen (2024), Forbes Analytics",
      copyright: "© 2026 WOW Page Research"
    }
  },
  de: {
    badge: "Forschung",
    date: "Februar 2026",
    title: "Evolution der Visitenkarte: Von Papier zur AI-Präsenz",
    subtitle: "Wirtschaftliche Analyse der First-Touch-Transformation im digitalen Zeitalter. Warum alles zur Live-AI-Präsenz führt.",
    summary: {
      title: "Wichtigste Erkenntnisse",
      text: "Die Kosten für qualitativ hochwertige Leads über traditionelle Kanäle sind in den letzten 5 Jahren um 147% gestiegen. AI-gestützte Lösungen zeigen 35-40% höhere Konversionsraten bei 60% geringeren Betriebskosten."
    },
    history: {
      title: "300 Jahre Evolution des ersten Eindrucks",
      eras: [
        {
          period: "1700–1900",
          title: "Die Visitenkarten-Ära",
          description: "Visitenkarten entstanden im 17. Jahrhundert in Frankreich. Handgefertigt, teures Papier, 2-4 Wochen Produktionszeit.",
          stats: ["$50-200 pro Charge", "Handübergabe", "Lokale Verbreitung"]
        },
        {
          period: "1950–2000",
          title: "Goldenes Zeitalter gedruckter Karten",
          description: "Massendruck machte Karten für jeden zugänglich. 88% der Visitenkarten werden innerhalb einer Woche weggeworfen.",
          stats: ["2-5% Konversion", "88% weggeworfen", "1-2 Jahre Haltbarkeit"]
        },
        {
          period: "2000–2015",
          title: "Digitale Revolution: Websites",
          description: "Internet änderte die Regeln. Unternehmenswebsites entstanden. Aber 47% verlassen die Seite ohne Antwort.",
          stats: ["1-3% Konversion", "54 Sek auf der Seite", "47% ohne Kontakt"]
        },
        {
          period: "2015–2023",
          title: "Social-Media-Ära",
          description: "Soziale Netzwerke wurden zu neuen Visitenkarten. Organische Reichweite sank von 20% auf 2-5%.",
          stats: ["2-5% Reichweite", "5-8 Std/Woche", "4-6 Plattformen"]
        },
        {
          period: "2023–2026",
          title: "AI-Präsenz: WOW Page",
          description: "Drei Technologien konvergierten: LLMs erreichten Gesprächsparität, fotorealistische Avatare wurden erschwinglich, WebRTC reifte.",
          stats: ["15-25% Konversion", "24/7 Betrieb", "3x schnellere Anziehung"]
        }
      ]
    },
    problems: {
      title: "Was mit aktuellen Lösungen nicht stimmt",
      items: [
        {
          title: "Websites schweigen",
          description: "Besucher kommt, scrollt, liest und geht. Kein Dialog, keine Live-Antwort. Konversion nur 1-3%.",
          stat: "47% gehen mit Fragen, von denen Sie nie erfahren"
        },
        {
          title: "Social Media frisst Ihre Zeit",
          description: "Typische Führungskraft hat Profile auf 4-6 Plattformen. Management erfordert 5-8 Stunden wöchentlich.",
          stat: "Organische Reichweite sank in 8 Jahren von 20% auf 2%"
        },
        {
          title: "Sie arbeiten für den Algorithmus",
          description: "Anstatt dass AI 24/7 für Sie arbeitet, erstellen Sie Inhalte für Plattform-Algorithmen.",
          stat: "Durchschnittlicher Profi verliert $62.400/Jahr"
        },
        {
          title: "Traditionelle Kanäle werden teurer",
          description: "Kosten pro Lead über Kaltakquise: $1.250-5.000. Diese Zahlen wachsen jährlich um 20-30%.",
          stat: "Akquisitionskosten +147% in 5 Jahren"
        }
      ]
    },
    economics: {
      title: "First-Touch-Ökonomie 2026",
      intro: "Moderner B2B-Kunde benötigt 8-12 Berührungspunkte vor der Entscheidung:",
      table: {
        headers: ["Kanal", "Kosten", "Konversion", "Kosten/Lead"],
        rows: [
          { channel: "Kaltakquise", cost: "$25-50/Kontakt", conversion: "1-2%", cpl: "$1.250-5.000" },
          { channel: "E-Mail", cost: "$2-5/Kontakt", conversion: "0,5-2%", cpl: "$100-1.000" },
          { channel: "Messen", cost: "$500-2.000", conversion: "5-15%", cpl: "$3.300-40.000" },
          { channel: "Unternehmenswebsite", cost: "$100-500/Mo", conversion: "1-3%", cpl: "$3.300-50.000" },
          { channel: "PPC-Werbung", cost: "$15-100/Klick", conversion: "2-5%", cpl: "$300-5.000" },
          { channel: "AI-Chatbot (GPT)", cost: "$200-1.500/Mo", conversion: "12-20%", cpl: "$250-1.000" },
          { channel: "WOW Page", cost: "$150-400/Mo", conversion: "15-25%", cpl: "$80-533", highlight: true }
        ]
      },
      insight: {
        title: "Warum AI-Präsenz gewinnt",
        text: "AI-Präsenz arbeitet 168 Stunden/Woche für $1.800-4.800/Jahr. Traditioneller Assistent kostet $30.000-60.000/Jahr."
      }
    },
    comparison: {
      title: "Vergleich der Online-Präsenz-Lösungen",
      recommendedLabel: "Empfohlen",
      labels: { cost: "Kosten", conversion: "Konversion" },
      solutions: [
        { name: "Unternehmenswebsite", period: "2010er", cost: "$5.000-50.000", conversion: "1-3%", pros: ["Volle Kontrolle"], cons: ["Statisch"] },
        { name: "Landing Page", period: "2015+", cost: "$1.000-15.000", conversion: "2-10%", pros: ["Aktionsfokus"], cons: ["Eine Aufgabe"] },
        { name: "Einfacher Chatbot", period: "2018-2022", cost: "$500-5.000", conversion: "5-10%", pros: ["FAQ-Automatisierung"], cons: ["Roboterhaft"] },
        { name: "AI-Chatbot (GPT)", period: "2023-2024", cost: "$2.000-25.000", conversion: "12-20%", pros: ["Kontextverständnis"], cons: ["Nur Text"] },
        { name: "WOW Page", period: "2024+", cost: "$2.000-8.000", conversion: "15-25%", pros: ["Text + Video", "24/7"], cons: [], recommended: true }
      ]
    },
    roi: {
      title: "ROI-Analyse für B2B-Berater",
      intro: "Typischer Berater mit $200/Stunde verbringt 6 Stunden wöchentlich mit 'ersten Berührungen'. Das sind 312 Stunden pro Jahr.",
      traditional: { title: "Traditioneller Ansatz", items: [{ label: "Website-Entwicklung", value: "$12.000" }, { label: "Wartung/Jahr", value: "$2.400" }, { label: "Zeit (312h × $200)", value: "$62.400" }], total: "$76.800/Jahr" },
      wowpage: { title: "WOW Page Ansatz", items: [{ label: "Implementierung", value: "$4.500" }, { label: "Betrieb/Jahr", value: "$3.000" }, { label: "Zeit (50h × $200)", value: "$10.000" }], total: "$17.500/Jahr" },
      totalLabel: "Jahr 1 gesamt:",
      savings: { value: "$266.500", label: "5-Jahres-Ersparnis" }
    },
    solution: {
      title: "Warum WOW Page die optimale Wahl ist",
      description: "WOW Page vereint die Vorteile aller bisherigen Lösungen.",
      points: ["GPT-4o für tiefes Kontextverständnis", "LiveAvatar für Live-Video-Präsenz", "Funktioniert in Telegram und Browser", "Passt sich der Besucherabsicht an"],
      stats: [{ value: "24/7", label: "Non-Stop-Betrieb" }, { value: "2,5-3x", label: "Schnellere Anziehung" }, { value: "40%", label: "Preisaufschlag" }]
    },
    conclusion: {
      title: "Fazit",
      paragraphs: ["Die Fakten sind klar: Unternehmen mit Live-AI-Präsenz ziehen Leads 2,5–3 Mal schneller an als statische Websites.", "Zum ersten Mal in der Geschichte ist die Technologie so ausgereift, dass das Fehlen einer dynamischen digitalen Visitenkarte ein Wettbewerbsnachteil ist."]
    },
    cta: { spots: "7 Plätze übrig", title: "Pilot startet", description: "Begrenzte Plätze zum Sonderpreis.", button: "Launch besprechen" },
    footer: { sources: "Quellen: AdWeek (2019), Gartner (2024), HeyGen (2024)", copyright: "© 2026 WOW Page Research" }
  },
  es: {
    badge: "Investigación",
    date: "Febrero 2026",
    title: "Evolución de la Tarjeta de Visita: Del Papel a la Presencia AI",
    subtitle: "Análisis económico de la transformación del primer contacto en la era digital. Por qué todo lleva a la presencia AI en vivo.",
    summary: {
      title: "Hallazgos Clave",
      text: "El costo de adquirir leads de calidad a través de canales tradicionales ha aumentado un 147% en los últimos 5 años. Las soluciones mejoradas con AI muestran tasas de conversión 35-40% más altas."
    },
    history: {
      title: "300 Años de Evolución de la Primera Impresión",
      eras: [
        { period: "1700–1900", title: "La Era de las Tarjetas", description: "Las tarjetas de visita aparecieron en Francia en el siglo XVII. Hechas a mano, papel costoso.", stats: ["$50-200 por lote", "Entrega manual"] },
        { period: "1950–2000", title: "Edad de Oro de las Tarjetas Impresas", description: "La impresión masiva hizo las tarjetas accesibles. El 88% se tira en una semana.", stats: ["2-5% conversión", "88% descartadas"] },
        { period: "2000–2015", title: "Revolución Digital: Sitios Web", description: "Internet cambió las reglas. El 47% se va sin respuestas.", stats: ["1-3% conversión", "47% sin contacto"] },
        { period: "2015–2023", title: "Era de Redes Sociales", description: "Las redes se convirtieron en nuevas tarjetas. El alcance orgánico cayó del 20% al 2-5%.", stats: ["2-5% alcance", "5-8 hrs/semana"] },
        { period: "2023–2026", title: "Presencia AI: WOW Page", description: "Tres tecnologías convergieron. Por primera vez, una herramienta reemplaza conserje, SDR y embajador.", stats: ["15-25% conversión", "24/7", "3x más rápido"] }
      ]
    },
    problems: {
      title: "Qué Está Mal con las Soluciones Actuales",
      items: [
        { title: "Los sitios web callan", description: "El visitante viene, hace scroll, lee y se va. Sin diálogo, sin respuesta en vivo.", stat: "47% se van con preguntas" },
        { title: "Las redes devoran tu tiempo", description: "El ejecutivo típico tiene perfiles en 4-6 plataformas. La gestión requiere 5-8 horas semanales.", stat: "El alcance cayó del 20% al 2%" },
        { title: "Trabajas para el algoritmo", description: "En lugar de que AI trabaje para ti 24/7, creas contenido para algoritmos de plataformas.", stat: "Pérdida promedio de $62.400/año" },
        { title: "Los canales tradicionales se encarecen", description: "Costo por lead vía llamadas frías: $1.250-5.000. Crecen 20-30% anualmente.", stat: "Costo de adquisición +147%" }
      ]
    },
    economics: {
      title: "Economía del Primer Contacto en 2026",
      intro: "El cliente B2B moderno requiere 8-12 contactos antes de decidir:",
      table: {
        headers: ["Canal", "Costo", "Conversión", "Costo/Lead"],
        rows: [
          { channel: "Llamadas frías", cost: "$25-50/contacto", conversion: "1-2%", cpl: "$1.250-5.000" },
          { channel: "Email", cost: "$2-5/contacto", conversion: "0,5-2%", cpl: "$100-1.000" },
          { channel: "Ferias", cost: "$500-2.000", conversion: "5-15%", cpl: "$3.300-40.000" },
          { channel: "Web corporativa", cost: "$100-500/mes", conversion: "1-3%", cpl: "$3.300-50.000" },
          { channel: "Publicidad PPC", cost: "$15-100/clic", conversion: "2-5%", cpl: "$300-5.000" },
          { channel: "AI Chatbot (GPT)", cost: "$200-1.500/mes", conversion: "12-20%", cpl: "$250-1.000" },
          { channel: "WOW Page", cost: "$150-400/mes", conversion: "15-25%", cpl: "$80-533", highlight: true }
        ]
      },
      insight: { title: "Por Qué Gana la Presencia AI", text: "La presencia AI trabaja 168 horas/semana por $1.800-4.800/año. Un asistente tradicional cuesta $30.000-60.000/año." }
    },
    comparison: {
      title: "Comparación de Soluciones de Presencia Online",
      recommendedLabel: "Recomendado",
      labels: { cost: "Costo", conversion: "Conversión" },
      solutions: [
        { name: "Web Corporativa", period: "2010s", cost: "$5.000-50.000", conversion: "1-3%", pros: ["Control total"], cons: ["Estática"] },
        { name: "Landing Page", period: "2015+", cost: "$1.000-15.000", conversion: "2-10%", pros: ["Enfoque en acción"], cons: ["Una tarea"] },
        { name: "Chatbot Simple", period: "2018-2022", cost: "$500-5.000", conversion: "5-10%", pros: ["Automatización FAQ"], cons: ["Robótico"] },
        { name: "AI Chatbot (GPT)", period: "2023-2024", cost: "$2.000-25.000", conversion: "12-20%", pros: ["Comprensión contextual"], cons: ["Solo texto"] },
        { name: "WOW Page", period: "2024+", cost: "$2.000-8.000", conversion: "15-25%", pros: ["Texto + video", "24/7"], cons: [], recommended: true }
      ]
    },
    roi: {
      title: "Análisis ROI para Consultor B2B",
      intro: "Un consultor típico a $200/hora dedica 6 horas semanales a 'primeros contactos'. Son 312 horas al año.",
      traditional: { title: "Enfoque Tradicional", items: [{ label: "Desarrollo web", value: "$12.000" }, { label: "Mantenimiento/año", value: "$2.400" }, { label: "Tiempo (312h × $200)", value: "$62.400" }], total: "$76.800/año" },
      wowpage: { title: "Enfoque WOW Page", items: [{ label: "Implementación", value: "$4.500" }, { label: "Operación/año", value: "$3.000" }, { label: "Tiempo (50h × $200)", value: "$10.000" }], total: "$17.500/año" },
      totalLabel: "Total año 1:",
      savings: { value: "$266.500", label: "Ahorro en 5 años" }
    },
    solution: {
      title: "Por Qué WOW Page es la Elección Óptima",
      description: "WOW Page combina las ventajas de todas las soluciones anteriores.",
      points: ["GPT-4o para comprensión profunda del contexto", "LiveAvatar para presencia de video en vivo", "Funciona en Telegram y navegador", "Se adapta a la intención del visitante"],
      stats: [{ value: "24/7", label: "Operación continua" }, { value: "2,5-3x", label: "Atracción más rápida" }, { value: "40%", label: "Prima de precio" }]
    },
    conclusion: {
      title: "Conclusión",
      paragraphs: ["Los hechos son claros: las empresas con presencia AI en vivo atraen leads 2,5–3 veces más rápido que los sitios estáticos.", "Por primera vez en la historia, la tecnología ha madurado lo suficiente para que no tener una tarjeta digital dinámica sea una desventaja competitiva."]
    },
    cta: { spots: "7 plazas disponibles", title: "El Piloto Comienza", description: "Plazas limitadas a precio especial.", button: "Discutir Lanzamiento" },
    footer: { sources: "Fuentes: AdWeek (2019), Gartner (2024), HeyGen (2024)", copyright: "© 2026 WOW Page Research" }
  }
};
