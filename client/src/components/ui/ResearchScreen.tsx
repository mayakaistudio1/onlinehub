import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

interface ResearchScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResearchScreen({ isOpen, onClose }: ResearchScreenProps) {
  const { t, language } = useLanguage();
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

  const content = getResearchContent(language);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white"
          data-testid="research-screen"
        >
          <div className="flex flex-col h-full">
            <div
              className={cn(
                "flex items-center justify-between px-4 py-3 border-b transition-shadow",
                scrolled && "shadow-sm"
              )}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-violet-600" />
                <span className="font-medium text-sm">{t.research?.title || "Исследование"}</span>
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
              className="flex-1 overflow-y-auto px-5 py-6"
              onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 10)}
            >
              <div className="max-w-2xl mx-auto prose prose-sm prose-slate">
                <h1 className="text-2xl font-serif mb-2">{content.title}</h1>
                <p className="text-muted-foreground text-sm mb-8">{content.subtitle}</p>
                
                {content.sections.map((section, i) => (
                  <div key={i} className="mb-8">
                    <h2 className="text-lg font-semibold mb-3">{section.heading}</h2>
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-sm text-slate-700 mb-3 leading-relaxed">{p}</p>
                    ))}
                    {section.list && (
                      <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                        {section.list.map((item, k) => (
                          <li key={k}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                <div className="mt-10 pt-6 border-t text-xs text-muted-foreground">
                  {content.footer}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const container = document.querySelector('[data-testid="research-screen"] .overflow-y-auto');
                container?.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="fixed bottom-6 right-6 p-3 bg-violet-600 text-white rounded-full shadow-lg hover:bg-violet-700 transition-colors"
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

function getResearchContent(language: string) {
  const content = {
    ru: {
      title: "От визитки до живого представительства",
      subtitle: "Эволюция первого касания в бизнесе — аналитический обзор рынка",
      sections: [
        {
          heading: "Введение",
          paragraphs: [
            "В бизнесе есть правило: у вас никогда не будет второго шанса произвести первое впечатление. Это правило не изменилось за последние 50 лет. Изменились только инструменты.",
            "От бумажной визитки до сайтов, лендингов и чат-ботов — каждое поколение предпринимателей искало способ сказать: «Вот кто я. Вот чем могу помочь. Давай поговорим».",
            "Сегодня мы стоим на пороге новой эры — эры живого онлайн-представительства, где технологии наконец позволяют вернуть в цифровой мир живой диалог."
          ]
        },
        {
          heading: "Эра бумажных визиток (1970–2000)",
          paragraphs: [
            "В 1970-80-х годах визитка была символом статуса и физическим воплощением репутации. Встреча, обмен визитками как ритуал доверия, звонок в течение недели.",
            "Преимущества: высокий уровень доверия, качество важнее количества. Ограничения: географическая привязка, 10-20 контактов в неделю, зависимость от графика."
          ],
          list: [
            "Средний предприниматель раздавал 500-1000 визиток в год",
            "Конверсия во встречу: 15-25%",
            "Цикл от знакомства до сделки: 3-6 месяцев"
          ]
        },
        {
          heading: "Эра веб-сайтов (2000–2015)",
          paragraphs: [
            "Появление интернета изменило всё. Сайт стал новой визиткой — доступной 24/7 из любой точки мира. Глобальный охват, масштабируемость, аналитика.",
            "Но что было потеряно: личный контакт, диалог заменился монологом. Сайт «показывает», но не «общается». Посетитель остаётся один на один с информацией."
          ],
          list: [
            "Средний bounce rate: 45-65%",
            "Время на сайте: 2-3 минуты",
            "88% посетителей не возвращаются"
          ]
        },
        {
          heading: "Эра лендингов и ботов (2015–2023)",
          paragraphs: [
            "Лендинги повысили конверсию (с 1-3% до 5-15%), чат-боты добавили автоматизацию. Но боты раздражают — 67% пользователей недовольны типичными чат-ботами.",
            "Сценарные диалоги не отвечают на реальные вопросы. Холодный, роботизированный опыт. Потеря премиального ощущения."
          ],
          list: [
            "Рынок чат-ботов: $17.3 млрд (2023)",
            "Удовлетворённость ботами: 35-40%",
            "Отток из-за плохого бот-опыта: 30%"
          ]
        },
        {
          heading: "Эра живого представительства (2024+)",
          paragraphs: [
            "Синтез лучшего: личный контакт из эпохи визиток + глобальный охват сайтов + автоматизация ботов + новые AI-технологии.",
            "Large Language Models понимают контекст и намерения. AI-аватары создают эффект личного присутствия. Результат — формат, который ведёт живой, адаптивный, человечный диалог."
          ],
          list: [
            "Ожидаемая конверсия: 20-35%",
            "Удовлетворённость: 75-85%",
            "К 2030: стандарт для 60% B2B-сервисов"
          ]
        },
        {
          heading: "Выводы для бизнес-лидеров",
          paragraphs: [
            "Сайт — это прошлое: он показывает, но не продаёт. Боты — полумера: автоматизируют, но раздражают. Живое представительство — будущее: объединяет лучшее из всех эпох.",
            "Первые получают преимущество. Premium-позиционирование = premium-клиенты."
          ]
        }
      ],
      footer: "Аналитический материал подготовлен на основе открытых рыночных данных и внутренней экспертизы WOW Page."
    },
    en: {
      title: "From Business Card to Live Presence",
      subtitle: "Evolution of First Touch in Business — Market Analysis",
      sections: [
        {
          heading: "Introduction",
          paragraphs: [
            "In business, there's a rule: you never get a second chance to make a first impression. This rule hasn't changed in 50 years. Only the tools have.",
            "From paper business cards to websites, landing pages and chatbots — every generation of entrepreneurs sought ways to say: 'This is who I am. This is how I can help. Let's talk.'",
            "Today we stand at the threshold of a new era — the era of live online presence, where technology finally allows us to bring real dialogue back to the digital world."
          ]
        },
        {
          heading: "The Era of Paper Business Cards (1970–2000)",
          paragraphs: [
            "In the 1970-80s, a business card was a status symbol and physical embodiment of reputation. Meeting, card exchange as a ritual of trust, a call within a week.",
            "Advantages: high trust level, quality over quantity. Limitations: geographical constraints, 10-20 contacts per week, schedule dependency."
          ],
          list: [
            "Average entrepreneur gave out 500-1000 cards per year",
            "Meeting conversion rate: 15-25%",
            "Cycle from introduction to deal: 3-6 months"
          ]
        },
        {
          heading: "The Era of Websites (2000–2015)",
          paragraphs: [
            "The internet changed everything. Website became the new business card — available 24/7 from anywhere in the world. Global reach, scalability, analytics.",
            "But what was lost: personal contact, dialogue replaced by monologue. Website 'shows' but doesn't 'talk'. Visitor is left alone with information."
          ],
          list: [
            "Average bounce rate: 45-65%",
            "Time on site: 2-3 minutes",
            "88% of visitors never return"
          ]
        },
        {
          heading: "The Era of Landing Pages and Bots (2015–2023)",
          paragraphs: [
            "Landing pages increased conversion (from 1-3% to 5-15%), chatbots added automation. But bots irritate — 67% of users are dissatisfied with typical chatbots.",
            "Scripted dialogues don't answer real questions. Cold, robotic experience. Loss of premium feeling."
          ],
          list: [
            "Chatbot market: $17.3B (2023)",
            "Bot satisfaction: 35-40%",
            "Churn due to poor bot experience: 30%"
          ]
        },
        {
          heading: "The Era of Live Presence (2024+)",
          paragraphs: [
            "Synthesis of the best: personal contact from business cards + global website reach + bot automation + new AI technologies.",
            "Large Language Models understand context and intent. AI avatars create presence effect. Result — a format that leads a live, adaptive, human dialogue."
          ],
          list: [
            "Expected conversion: 20-35%",
            "Satisfaction: 75-85%",
            "By 2030: standard for 60% of B2B services"
          ]
        },
        {
          heading: "Key Takeaways for Business Leaders",
          paragraphs: [
            "Website is the past: it shows but doesn't sell. Bots are half-measures: they automate but irritate. Live presence is the future: combines the best of all eras.",
            "First movers gain advantage. Premium positioning = premium clients."
          ]
        }
      ],
      footer: "Analysis prepared based on open market data and WOW Page internal expertise."
    },
    de: {
      title: "Von der Visitenkarte zur Live-Präsenz",
      subtitle: "Evolution des Erstkontakts im Business — Marktanalyse",
      sections: [
        {
          heading: "Einführung",
          paragraphs: [
            "Im Geschäftsleben gilt: Sie bekommen nie eine zweite Chance, einen ersten Eindruck zu machen. Diese Regel hat sich in 50 Jahren nicht geändert. Nur die Werkzeuge haben sich verändert.",
            "Von Papiervisitenkarten zu Websites, Landingpages und Chatbots — jede Generation von Unternehmern suchte nach Wegen zu sagen: 'Das bin ich. So kann ich helfen. Lass uns reden.'",
            "Heute stehen wir an der Schwelle einer neuen Ära — der Ära der Live-Online-Präsenz."
          ]
        },
        {
          heading: "Die Ära der Papiervisitenkarten (1970–2000)",
          paragraphs: [
            "In den 1970-80er Jahren war eine Visitenkarte ein Statussymbol. Treffen, Kartenaustausch als Vertrauensritual, Anruf innerhalb einer Woche.",
            "Vorteile: hohes Vertrauen, Qualität über Quantität. Einschränkungen: geografische Bindung, 10-20 Kontakte pro Woche."
          ],
          list: [
            "Durchschnittlicher Unternehmer verteilte 500-1000 Karten pro Jahr",
            "Konversionsrate: 15-25%",
            "Zyklus von Kennenlernen bis Abschluss: 3-6 Monate"
          ]
        },
        {
          heading: "Die Website-Ära (2000–2015)",
          paragraphs: [
            "Das Internet veränderte alles. Website wurde zur neuen Visitenkarte — 24/7 verfügbar von überall auf der Welt.",
            "Was verloren ging: persönlicher Kontakt, Dialog wurde zum Monolog. Website 'zeigt', aber 'spricht' nicht."
          ],
          list: [
            "Durchschnittliche Absprungrate: 45-65%",
            "Zeit auf der Website: 2-3 Minuten",
            "88% der Besucher kehren nie zurück"
          ]
        },
        {
          heading: "Die Ära der Landingpages und Bots (2015–2023)",
          paragraphs: [
            "Landingpages erhöhten die Konversion, Chatbots fügten Automatisierung hinzu. Aber Bots irritieren — 67% der Nutzer sind unzufrieden.",
            "Skriptbasierte Dialoge beantworten keine echten Fragen. Kalte, roboterhafte Erfahrung."
          ],
          list: [
            "Chatbot-Markt: $17,3 Mrd. (2023)",
            "Bot-Zufriedenheit: 35-40%",
            "Abwanderung wegen schlechter Bot-Erfahrung: 30%"
          ]
        },
        {
          heading: "Die Ära der Live-Präsenz (2024+)",
          paragraphs: [
            "Synthese des Besten: persönlicher Kontakt + globale Reichweite + Automatisierung + neue KI-Technologien.",
            "Das Ergebnis — ein Format, das einen lebendigen, adaptiven, menschlichen Dialog führt."
          ],
          list: [
            "Erwartete Konversion: 20-35%",
            "Zufriedenheit: 75-85%",
            "Bis 2030: Standard für 60% der B2B-Services"
          ]
        },
        {
          heading: "Erkenntnisse für Führungskräfte",
          paragraphs: [
            "Website ist Vergangenheit: sie zeigt, aber verkauft nicht. Bots sind Halbmaßnahmen. Live-Präsenz ist die Zukunft.",
            "Erste Anwender gewinnen Vorteile. Premium-Positionierung = Premium-Kunden."
          ]
        }
      ],
      footer: "Analyse basierend auf offenen Marktdaten und WOW Page Expertise."
    },
    es: {
      title: "De la tarjeta de visita a la presencia en vivo",
      subtitle: "Evolución del primer contacto en negocios — Análisis de mercado",
      sections: [
        {
          heading: "Introducción",
          paragraphs: [
            "En los negocios hay una regla: nunca tienes una segunda oportunidad para causar una primera impresión. Esta regla no ha cambiado en 50 años. Solo las herramientas han cambiado.",
            "Desde tarjetas de visita de papel hasta sitios web, páginas de destino y chatbots — cada generación de emprendedores buscó maneras de decir: 'Esto es lo que soy. Así puedo ayudar. Hablemos.'",
            "Hoy estamos en el umbral de una nueva era — la era de la presencia en vivo online."
          ]
        },
        {
          heading: "La era de las tarjetas de visita (1970–2000)",
          paragraphs: [
            "En los años 70-80, una tarjeta de visita era un símbolo de estatus. Reunión, intercambio de tarjetas como ritual de confianza, llamada en una semana.",
            "Ventajas: alto nivel de confianza, calidad sobre cantidad. Limitaciones: atadura geográfica, 10-20 contactos por semana."
          ],
          list: [
            "Emprendedor promedio entregaba 500-1000 tarjetas al año",
            "Tasa de conversión: 15-25%",
            "Ciclo desde conocerse hasta cerrar: 3-6 meses"
          ]
        },
        {
          heading: "La era de los sitios web (2000–2015)",
          paragraphs: [
            "Internet lo cambió todo. El sitio web se convirtió en la nueva tarjeta de visita — disponible 24/7 desde cualquier lugar.",
            "Lo que se perdió: contacto personal, el diálogo fue reemplazado por monólogo. El sitio 'muestra' pero no 'habla'."
          ],
          list: [
            "Tasa de rebote promedio: 45-65%",
            "Tiempo en el sitio: 2-3 minutos",
            "88% de visitantes nunca regresan"
          ]
        },
        {
          heading: "La era de landing pages y bots (2015–2023)",
          paragraphs: [
            "Las landing pages aumentaron la conversión, los chatbots añadieron automatización. Pero los bots irritan — 67% de usuarios insatisfechos.",
            "Los diálogos con guión no responden preguntas reales. Experiencia fría y robótica."
          ],
          list: [
            "Mercado de chatbots: $17.3B (2023)",
            "Satisfacción con bots: 35-40%",
            "Abandono por mala experiencia con bots: 30%"
          ]
        },
        {
          heading: "La era de la presencia en vivo (2024+)",
          paragraphs: [
            "Síntesis de lo mejor: contacto personal + alcance global + automatización + nuevas tecnologías de IA.",
            "El resultado — un formato que lleva un diálogo vivo, adaptativo y humano."
          ],
          list: [
            "Conversión esperada: 20-35%",
            "Satisfacción: 75-85%",
            "Para 2030: estándar para 60% de servicios B2B"
          ]
        },
        {
          heading: "Conclusiones para líderes empresariales",
          paragraphs: [
            "El sitio web es el pasado: muestra pero no vende. Los bots son medidas a medias. La presencia en vivo es el futuro.",
            "Los primeros en adoptar ganan ventaja. Posicionamiento premium = clientes premium."
          ]
        }
      ],
      footer: "Análisis preparado con base en datos de mercado abiertos y experiencia de WOW Page."
    }
  };

  return content[language as keyof typeof content] || content.ru;
}
