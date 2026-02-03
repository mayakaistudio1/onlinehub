export type Language = 'ru' | 'en' | 'de' | 'es';

export const translations = {
  ru: {
    hero: {
      orbText: "WOW Page Live...",
      title: "Онлайн-представительство нового поколения",
      subtitle: "Место, где твою идею действительно понимают.",
      cta: "Попробовать",
      scrollHint: "Листай вниз"
    },
    howItWorks: {
      title: "Как работает живое онлайн-представительство",
      subtitle: "Один адрес — и человек не теряется.",
      cards: {
        card: {
          title: "Твоя онлайн-визитка",
          text: "Вся ключевая информация о тебе, проектах и направлениях — коротко и по делу."
        },
        dialog: {
          title: "Живой диалог",
          text: "Ассистент встречает посетителя, отвечает на вопросы и уточняет, что ему нужно."
        },
        nextStep: {
          title: "Понятный следующий шаг",
          text: "Человек сразу понимает, куда идти дальше: сценарий, контакт, действие."
        }
      },
      anchor: "Не страница. А маршрут для человека.",
      cta: "Смотреть дальше"
    },
    why: {
      title: "Почему просто сайта уже недостаточно",
      subtitle: "Сайт показывает. Представительство — общается.",
      regularSite: {
        title: "Обычный сайт",
        points: [
          "Показывает информацию",
          "Ждёт, что человек сам разберётся",
          "Оставляет вопросы без ответа",
          "Не ведёт дальше"
        ]
      },
      livePresence: {
        title: "Живое представительство",
        points: [
          "Начинает диалог сразу",
          "Отвечает на вопросы",
          "Помогает понять суть",
          "Показывает следующий шаг"
        ]
      },
      anchor: ["Это не «ещё один сайт».", "Это формат общения."],
      cta: "Смотреть демо"
    },
    demo: {
      title: "Как это работает",
      subtitle: "Посмотри, как твоё представительство общается в реальности",
      greeting: "Привет! Я — консультант сервиса. Расскажу, как работает онлайн-представительство. Что тебя интересует?",
      questions: [
        "Что это такое?",
        "Кому подойдёт?",
        "Где применить?"
      ],
      answers: {
        what: "Это твоё живое онлайн-представительство. Ассистент, который объясняет твоё дело так, как ты бы сам — но в любое время.",
        who: "Тем, кто устал объяснять одно и то же. Экспертам, командам, бизнесам с уникальным продуктом.",
        where: "Для презентации проектов, онбординга новых сотрудников, первого касания с клиентами, продаж и партнёрств."
      },
      inputPlaceholder: "Спроси что угодно...",
      tryChat: "Попробовать чат",
      switchToLive: "Live звонок"
    },
    scenarios: {
      title: "Сценарии использования",
      subtitle: "Один формат — разные задачи",
      videoCall: "Пообщаться вживую",
      online: "в сети",
      whyWorks: "Почему это работает",
      chatPlaceholder: "Напиши вопрос...",
      chatGreeting: "Привет! Я {name}. Помогу разобраться — что хочешь узнать?",
      cards: {
        sales: {
          title: "Продажи и партнёрства",
          description: "Ассистент отвечает на вопросы, отбирает лидов и греет интерес — ещё до первого звонка.",
          category: "IT-консалтинг",
          businessName: "TechPro Solutions",
          tagline: "Цифровая трансформация для вашего бизнеса",
          highlights: [
            "Рост конверсии до 40%",
            "Ответ за 30 секунд",
            "50+ успешных проектов"
          ],
          whyWorks: [
            "Квалификация лидов 24/7",
            "Персональный подход к каждому",
            "Интеграция с CRM"
          ],
          links: ["Портфолио", "Кейсы"]
        },
        projects: {
          title: "Презентации проектов",
          description: "Идеи, которые раньше требовали встречи — теперь объясняются сами.",
          category: "Архитектура и дизайн",
          businessName: "ART Studio",
          tagline: "Создаём пространства, которые вдохновляют",
          highlights: [
            "120+ реализованных проектов",
            "Победитель Design Awards",
            "Проекты в 5 странах"
          ],
          whyWorks: [
            "Визуализация проекта в реальном времени",
            "Ответы на все вопросы инвесторов",
            "Интерактивное портфолио"
          ],
          links: ["Галерея работ", "Награды"]
        },
        team: {
          title: "Команда и сообщество",
          description: "Единая подача для новых сотрудников и участников. Без лишних сообщений.",
          category: "HR Tech",
          businessName: "HR Hub",
          tagline: "Лучшие таланты для лучших команд",
          highlights: [
            "500+ сотрудников в команде",
            "Дружелюбная культура",
            "Гибкий график работы"
          ],
          whyWorks: [
            "Онбординг без менеджеров",
            "Ответы на вопросы о культуре",
            "Знакомство с командой"
          ],
          links: ["Вакансии", "О компании"]
        },
        expert: {
          title: "Первое касание",
          description: "Сильное впечатление с первой секунды. Даже если ты не онлайн.",
          category: "Медицинский консультант",
          businessName: "Dr. Andrew Miller",
          tagline: "Забота о здоровье на первом месте",
          highlights: [
            "20+ лет опыта",
            "Приём: 9:00–18:00",
            "Москва, ЦАО"
          ],
          whyWorks: [
            "Предварительная консультация",
            "Запись на приём онлайн",
            "Ответы на частые вопросы"
          ],
          links: ["Услуги", "Отзывы"]
        }
      },
      avatarNames: {
        sales: "Alex",
        projects: "Maria",
        team: "David",
        expert: "Andrew"
      }
    },
    contact: {
      title: "Запускаем твоё живое онлайн-представительство",
      trigger: "Через 48 часов — формат, который работает за тебя.",
      benefits: [
        "— живое онлайн-представительство",
        "— ассистентов под твою задачу",
        "— понятный первый шаг для посетителей"
      ],
      fomo: "Количество запусков ограничено. Работаем с теми, кто первый.",
      form: {
        name: "Имя",
        contact: "Telegram или email",
        submit: "Обсудить запуск",
        sent: "Отправлено!"
      },
      footer: "Без спама. Без воронок. Просто разговор."
    }
  },
  en: {
    hero: {
      orbText: "WOW Page Live...",
      title: "Next-Generation Online Presence",
      subtitle: "A place where your idea is truly understood.",
      cta: "Try It",
      scrollHint: "Scroll down"
    },
    howItWorks: {
      title: "How a Live Online Presence Works",
      subtitle: "One address — and the visitor never gets lost.",
      cards: {
        card: {
          title: "Your Online Card",
          text: "All key info about you, your projects and directions — short and to the point."
        },
        dialog: {
          title: "Live Dialogue",
          text: "The assistant greets visitors, answers questions and clarifies what they need."
        },
        nextStep: {
          title: "Clear Next Step",
          text: "The visitor immediately knows where to go: scenario, contact, action."
        }
      },
      anchor: "Not a page. A journey for the visitor.",
      cta: "See More"
    },
    why: {
      title: "Why a website alone is no longer enough",
      subtitle: "A website shows. A presence — communicates.",
      regularSite: {
        title: "Regular Website",
        points: [
          "Displays information",
          "Expects visitors to figure it out",
          "Leaves questions unanswered",
          "Doesn't guide further"
        ]
      },
      livePresence: {
        title: "Live Presence",
        points: [
          "Starts a dialogue immediately",
          "Answers questions",
          "Helps understand the essence",
          "Shows the next step"
        ]
      },
      anchor: ["This is not 'just another website'.", "It's a communication format."],
      cta: "Watch Demo"
    },
    demo: {
      title: "How It Works",
      subtitle: "See how your presence communicates in real life",
      greeting: "Hi! I'm a service consultant. I'll explain how the online presence works. What interests you?",
      questions: [
        "What is this?",
        "Who is it for?",
        "Where to apply?"
      ],
      answers: {
        what: "This is your live online presence. An assistant that explains your business the way you would — but anytime.",
        who: "For those tired of explaining the same thing. Experts, teams, businesses with unique products.",
        where: "For project presentations, onboarding new employees, first touch with clients, sales and partnerships."
      },
      inputPlaceholder: "Ask anything...",
      tryChat: "Try Chat",
      switchToLive: "Live call"
    },
    scenarios: {
      title: "Use Cases",
      subtitle: "One format — different tasks",
      videoCall: "Chat Live",
      online: "online",
      whyWorks: "Why it works",
      chatPlaceholder: "Ask a question...",
      chatGreeting: "Hi! I'm {name}. I'll help you understand — what would you like to know?",
      cards: {
        sales: {
          title: "Sales & Partnerships",
          description: "The assistant answers questions, qualifies leads and warms interest — before the first call.",
          category: "IT Consulting",
          businessName: "TechPro Solutions",
          tagline: "Digital transformation for your business",
          highlights: [
            "Conversion growth up to 40%",
            "Response in 30 seconds",
            "50+ successful projects"
          ],
          whyWorks: [
            "Lead qualification 24/7",
            "Personal approach to everyone",
            "CRM integration"
          ],
          links: ["Portfolio", "Cases"]
        },
        projects: {
          title: "Project Presentations",
          description: "Ideas that used to require meetings — now explain themselves.",
          category: "Architecture & Design",
          businessName: "ART Studio",
          tagline: "Creating spaces that inspire",
          highlights: [
            "120+ completed projects",
            "Design Awards winner",
            "Projects in 5 countries"
          ],
          whyWorks: [
            "Real-time project visualization",
            "Answers to all investor questions",
            "Interactive portfolio"
          ],
          links: ["Gallery", "Awards"]
        },
        team: {
          title: "Team & Community",
          description: "Unified presentation for new employees and members. No unnecessary messages.",
          category: "HR Tech",
          businessName: "HR Hub",
          tagline: "Best talents for the best teams",
          highlights: [
            "500+ team members",
            "Friendly culture",
            "Flexible schedule"
          ],
          whyWorks: [
            "Onboarding without managers",
            "Culture Q&A",
            "Meet the team"
          ],
          links: ["Vacancies", "About Us"]
        },
        expert: {
          title: "First Touch",
          description: "Strong impression from the first second. Even when you're offline.",
          category: "Medical Consultant",
          businessName: "Dr. Andrew Miller",
          tagline: "Health care comes first",
          highlights: [
            "20+ years of experience",
            "Hours: 9:00–18:00",
            "New York, Manhattan"
          ],
          whyWorks: [
            "Preliminary consultation",
            "Online appointment booking",
            "FAQ answers"
          ],
          links: ["Services", "Reviews"]
        }
      },
      avatarNames: {
        sales: "Alex",
        projects: "Maria",
        team: "David",
        expert: "Andrew"
      }
    },
    contact: {
      title: "Let's launch your live online presence",
      trigger: "In 48 hours — a format that works for you.",
      benefits: [
        "— live online presence",
        "— assistants tailored to your task",
        "— clear first step for visitors"
      ],
      fomo: "Limited launches available. We work with those who come first.",
      form: {
        name: "Name",
        contact: "Telegram or email",
        submit: "Discuss Launch",
        sent: "Sent!"
      },
      footer: "No spam. No funnels. Just a conversation."
    }
  },
  de: {
    hero: {
      orbText: "WOW Page Live...",
      title: "Online-Präsenz der nächsten Generation",
      subtitle: "Ein Ort, an dem Ihre Idee wirklich verstanden wird.",
      cta: "Ausprobieren",
      scrollHint: "Nach unten scrollen"
    },
    howItWorks: {
      title: "So funktioniert eine Live-Online-Präsenz",
      subtitle: "Eine Adresse — und der Besucher verliert sich nicht.",
      cards: {
        card: {
          title: "Ihre Online-Visitenkarte",
          text: "Alle wichtigen Infos über Sie, Ihre Projekte und Richtungen — kurz und prägnant."
        },
        dialog: {
          title: "Live-Dialog",
          text: "Der Assistent begrüßt Besucher, beantwortet Fragen und klärt, was sie brauchen."
        },
        nextStep: {
          title: "Klarer nächster Schritt",
          text: "Der Besucher weiß sofort, wohin: Szenario, Kontakt, Aktion."
        }
      },
      anchor: "Keine Seite. Ein Weg für den Besucher.",
      cta: "Mehr sehen"
    },
    why: {
      title: "Warum eine Website allein nicht mehr ausreicht",
      subtitle: "Eine Website zeigt. Eine Präsenz — kommuniziert.",
      regularSite: {
        title: "Normale Website",
        points: [
          "Zeigt Informationen",
          "Erwartet, dass Besucher es selbst verstehen",
          "Lässt Fragen unbeantwortet",
          "Führt nicht weiter"
        ]
      },
      livePresence: {
        title: "Live-Präsenz",
        points: [
          "Startet sofort einen Dialog",
          "Beantwortet Fragen",
          "Hilft, das Wesentliche zu verstehen",
          "Zeigt den nächsten Schritt"
        ]
      },
      anchor: ["Das ist keine 'weitere Website'.", "Es ist ein Kommunikationsformat."],
      cta: "Demo ansehen"
    },
    demo: {
      title: "So funktioniert es",
      subtitle: "Sehen Sie, wie Ihre Präsenz in der Realität kommuniziert",
      greeting: "Hallo! Ich bin ein Service-Berater. Ich erkläre, wie die Online-Präsenz funktioniert. Was interessiert Sie?",
      questions: [
        "Was ist das?",
        "Für wen ist es?",
        "Wo anwenden?"
      ],
      answers: {
        what: "Das ist Ihre Live-Online-Präsenz. Ein Assistent, der Ihr Geschäft erklärt, wie Sie es tun würden — aber jederzeit.",
        who: "Für alle, die es leid sind, immer dasselbe zu erklären. Experten, Teams, Unternehmen mit einzigartigen Produkten.",
        where: "Für Projektpräsentationen, Onboarding neuer Mitarbeiter, Erstkontakt mit Kunden, Vertrieb und Partnerschaften."
      },
      inputPlaceholder: "Frag was du willst...",
      tryChat: "Chat ausprobieren",
      switchToLive: "Live-Anruf"
    },
    scenarios: {
      title: "Anwendungsfälle",
      subtitle: "Ein Format — verschiedene Aufgaben",
      videoCall: "Live chatten",
      online: "online",
      whyWorks: "Warum es funktioniert",
      chatPlaceholder: "Frage stellen...",
      chatGreeting: "Hallo! Ich bin {name}. Ich helfe Ihnen — was möchten Sie wissen?",
      cards: {
        sales: {
          title: "Vertrieb & Partnerschaften",
          description: "Der Assistent beantwortet Fragen, qualifiziert Leads und weckt Interesse — vor dem ersten Anruf.",
          category: "IT-Beratung",
          businessName: "TechPro Solutions",
          tagline: "Digitale Transformation für Ihr Unternehmen",
          highlights: [
            "Konversionswachstum bis 40%",
            "Antwort in 30 Sekunden",
            "50+ erfolgreiche Projekte"
          ],
          whyWorks: [
            "Lead-Qualifizierung 24/7",
            "Persönlicher Ansatz für jeden",
            "CRM-Integration"
          ],
          links: ["Portfolio", "Cases"]
        },
        projects: {
          title: "Projektpräsentationen",
          description: "Ideen, die früher Meetings erforderten — erklären sich jetzt selbst.",
          category: "Architektur & Design",
          businessName: "ART Studio",
          tagline: "Wir schaffen Räume, die inspirieren",
          highlights: [
            "120+ abgeschlossene Projekte",
            "Design Awards Gewinner",
            "Projekte in 5 Ländern"
          ],
          whyWorks: [
            "Echtzeit-Projektvisualisierung",
            "Antworten auf alle Investorenfragen",
            "Interaktives Portfolio"
          ],
          links: ["Galerie", "Auszeichnungen"]
        },
        team: {
          title: "Team & Community",
          description: "Einheitliche Präsentation für neue Mitarbeiter und Mitglieder. Ohne unnötige Nachrichten.",
          category: "HR Tech",
          businessName: "HR Hub",
          tagline: "Die besten Talente für die besten Teams",
          highlights: [
            "500+ Teammitglieder",
            "Freundliche Kultur",
            "Flexibler Zeitplan"
          ],
          whyWorks: [
            "Onboarding ohne Manager",
            "Kultur-Q&A",
            "Das Team kennenlernen"
          ],
          links: ["Stellenangebote", "Über uns"]
        },
        expert: {
          title: "Erster Kontakt",
          description: "Starker Eindruck von der ersten Sekunde. Auch wenn Sie offline sind.",
          category: "Medizinischer Berater",
          businessName: "Dr. Andrew Miller",
          tagline: "Gesundheit steht an erster Stelle",
          highlights: [
            "20+ Jahre Erfahrung",
            "Sprechzeiten: 9:00–18:00",
            "Berlin, Mitte"
          ],
          whyWorks: [
            "Vorgespräch",
            "Online-Terminbuchung",
            "FAQ-Antworten"
          ],
          links: ["Leistungen", "Bewertungen"]
        }
      },
      avatarNames: {
        sales: "Alex",
        projects: "Maria",
        team: "David",
        expert: "Andrew"
      }
    },
    contact: {
      title: "Starten wir Ihre Live-Online-Präsenz",
      trigger: "In 48 Stunden — ein Format, das für Sie arbeitet.",
      benefits: [
        "— Live-Online-Präsenz",
        "— Assistenten für Ihre Aufgabe",
        "— Klarer erster Schritt für Besucher"
      ],
      fomo: "Begrenzte Anzahl an Launches. Wir arbeiten mit denen, die zuerst kommen.",
      form: {
        name: "Name",
        contact: "Telegram oder E-Mail",
        submit: "Launch besprechen",
        sent: "Gesendet!"
      },
      footer: "Kein Spam. Keine Trichter. Nur ein Gespräch."
    }
  },
  es: {
    hero: {
      orbText: "WOW Page Live...",
      title: "Presencia online de nueva generación",
      subtitle: "Un lugar donde tu idea realmente se entiende.",
      cta: "Probar",
      scrollHint: "Desliza hacia abajo"
    },
    howItWorks: {
      title: "Cómo funciona una presencia online en vivo",
      subtitle: "Una dirección — y el visitante nunca se pierde.",
      cards: {
        card: {
          title: "Tu tarjeta online",
          text: "Toda la info clave sobre ti, tus proyectos y direcciones — breve y directo."
        },
        dialog: {
          title: "Diálogo en vivo",
          text: "El asistente recibe visitantes, responde preguntas y aclara qué necesitan."
        },
        nextStep: {
          title: "Siguiente paso claro",
          text: "El visitante sabe de inmediato adónde ir: escenario, contacto, acción."
        }
      },
      anchor: "No es una página. Es un recorrido para el visitante.",
      cta: "Ver más"
    },
    why: {
      title: "Por qué un sitio web ya no es suficiente",
      subtitle: "Un sitio web muestra. Una presencia — comunica.",
      regularSite: {
        title: "Sitio web normal",
        points: [
          "Muestra información",
          "Espera que el visitante lo entienda solo",
          "Deja preguntas sin responder",
          "No guía más allá"
        ]
      },
      livePresence: {
        title: "Presencia en vivo",
        points: [
          "Inicia un diálogo de inmediato",
          "Responde preguntas",
          "Ayuda a entender la esencia",
          "Muestra el siguiente paso"
        ]
      },
      anchor: ["Esto no es 'otro sitio web más'.", "Es un formato de comunicación."],
      cta: "Ver demo"
    },
    demo: {
      title: "Cómo funciona",
      subtitle: "Mira cómo tu presencia se comunica en la realidad",
      greeting: "¡Hola! Soy un consultor del servicio. Te explicaré cómo funciona la presencia online. ¿Qué te interesa?",
      questions: [
        "¿Qué es esto?",
        "¿Para quién es?",
        "¿Dónde aplicarlo?"
      ],
      answers: {
        what: "Esta es tu presencia online en vivo. Un asistente que explica tu negocio como tú lo harías — pero en cualquier momento.",
        who: "Para quienes están cansados de explicar lo mismo. Expertos, equipos, negocios con productos únicos.",
        where: "Para presentaciones de proyectos, onboarding de nuevos empleados, primer contacto con clientes, ventas y alianzas."
      },
      inputPlaceholder: "Pregunta lo que quieras...",
      tryChat: "Probar chat",
      switchToLive: "Llamada en vivo"
    },
    scenarios: {
      title: "Casos de uso",
      subtitle: "Un formato — diferentes tareas",
      videoCall: "Chatear en vivo",
      online: "en línea",
      whyWorks: "Por qué funciona",
      chatPlaceholder: "Escribe una pregunta...",
      chatGreeting: "¡Hola! Soy {name}. Te ayudaré a entender — ¿qué quieres saber?",
      cards: {
        sales: {
          title: "Ventas y alianzas",
          description: "El asistente responde preguntas, califica leads y despierta interés — antes de la primera llamada.",
          category: "Consultoría IT",
          businessName: "TechPro Solutions",
          tagline: "Transformación digital para tu negocio",
          highlights: [
            "Crecimiento de conversión hasta 40%",
            "Respuesta en 30 segundos",
            "50+ proyectos exitosos"
          ],
          whyWorks: [
            "Calificación de leads 24/7",
            "Enfoque personal para cada uno",
            "Integración con CRM"
          ],
          links: ["Portafolio", "Casos"]
        },
        projects: {
          title: "Presentaciones de proyectos",
          description: "Ideas que antes requerían reuniones — ahora se explican solas.",
          category: "Arquitectura y diseño",
          businessName: "ART Studio",
          tagline: "Creamos espacios que inspiran",
          highlights: [
            "120+ proyectos completados",
            "Ganador de Design Awards",
            "Proyectos en 5 países"
          ],
          whyWorks: [
            "Visualización en tiempo real",
            "Respuestas a todas las preguntas de inversores",
            "Portafolio interactivo"
          ],
          links: ["Galería", "Premios"]
        },
        team: {
          title: "Equipo y comunidad",
          description: "Presentación unificada para nuevos empleados y miembros. Sin mensajes innecesarios.",
          category: "HR Tech",
          businessName: "HR Hub",
          tagline: "Los mejores talentos para los mejores equipos",
          highlights: [
            "500+ miembros del equipo",
            "Cultura amigable",
            "Horario flexible"
          ],
          whyWorks: [
            "Onboarding sin gerentes",
            "Preguntas sobre cultura",
            "Conoce al equipo"
          ],
          links: ["Vacantes", "Sobre nosotros"]
        },
        expert: {
          title: "Primer contacto",
          description: "Impresión fuerte desde el primer segundo. Incluso cuando estás offline.",
          category: "Consultor médico",
          businessName: "Dr. Andrew Miller",
          tagline: "La salud es lo primero",
          highlights: [
            "20+ años de experiencia",
            "Horario: 9:00–18:00",
            "Madrid, Centro"
          ],
          whyWorks: [
            "Consulta preliminar",
            "Reserva de cita online",
            "Respuestas a preguntas frecuentes"
          ],
          links: ["Servicios", "Opiniones"]
        }
      },
      avatarNames: {
        sales: "Alex",
        projects: "Maria",
        team: "David",
        expert: "Andrew"
      }
    },
    contact: {
      title: "Lanzamos tu presencia online en vivo",
      trigger: "En 48 horas — un formato que trabaja por ti.",
      benefits: [
        "— presencia online en vivo",
        "— asistentes para tu tarea",
        "— primer paso claro para visitantes"
      ],
      fomo: "Lanzamientos limitados. Trabajamos con quienes llegan primero.",
      form: {
        name: "Nombre",
        contact: "Telegram o email",
        submit: "Discutir lanzamiento",
        sent: "¡Enviado!"
      },
      footer: "Sin spam. Sin embudos. Solo una conversación."
    }
  }
};

export function getTranslation(lang: Language) {
  return translations[lang];
}
