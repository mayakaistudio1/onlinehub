import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Clock, Users, Zap, TrendingUp, Check, Sparkles, ArrowLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: Clock,
  users: Users,
  zap: Zap,
};

export default function ResearchPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 via-white to-slate-50" data-testid="page-research">
      <LanguageSwitcher />
      
      <LazyMotion features={domAnimation}>
        <div className="mx-auto w-full max-w-2xl px-5 py-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <header className="mb-10">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 transition-colors mb-6"
                data-testid="link-back-home"
              >
                <ArrowLeft className="w-4 h-4" />
                WOW Page
              </a>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  {t.research.badge}
                </span>
              </div>
              
              <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-[-0.02em] text-slate-900 mb-3">
                {t.research.title}
              </h1>
              <p className="text-lg text-slate-500">
                {t.research.subtitle}
              </p>
            </header>

            <article className="prose prose-slate max-w-none">
              <section className="mb-12">
                <h2 className="text-xl font-serif text-slate-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
                    <TrendingUp className="w-4 h-4" />
                  </span>
                  {t.research.evolution.title}
                </h2>
                
                <div className="relative ml-4">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-200 via-violet-300 to-violet-500" />
                  <div className="space-y-6 pl-8">
                    {t.research.evolution.stages.map((stage: { year: string; label: string; desc: string }, index: number) => (
                      <motion.div
                        key={stage.year}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="relative"
                      >
                        <div className={`absolute -left-8 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          index === 3 
                            ? "bg-violet-500 border-violet-500" 
                            : "bg-white border-slate-300"
                        }`}>
                          {index === 3 && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                        <div className={`p-4 rounded-xl ${
                          index === 3 
                            ? "bg-violet-50 border-2 border-violet-200" 
                            : "bg-slate-50 border border-slate-100"
                        }`}>
                          <div className="flex items-baseline gap-3 mb-1">
                            <span className={`text-sm font-mono ${index === 3 ? "text-violet-600" : "text-slate-400"}`}>
                              {stage.year}
                            </span>
                            <span className={`font-semibold ${index === 3 ? "text-violet-700" : "text-slate-700"}`}>
                              {stage.label}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600">{stage.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-xl font-serif text-slate-800 mb-6">
                  {t.research.problems.title}
                </h2>
                <div className="space-y-4">
                  {t.research.problems.items.map((item: { icon: string; title: string; desc: string }, index: number) => {
                    const Icon = iconMap[item.icon] || Clock;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex gap-4 p-5 bg-red-50/50 rounded-xl border border-red-100"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800 mb-1">{item.title}</h3>
                          <p className="text-sm text-slate-600">{item.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              <section className="mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {t.research.stats.map((stat: { value: string; label: string }, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`p-5 rounded-xl text-center ${
                        index === 3 
                          ? "bg-gradient-to-br from-violet-100 to-violet-50 border-2 border-violet-200" 
                          : "bg-slate-50 border border-slate-100"
                      }`}
                    >
                      <div className={`text-3xl font-bold mb-2 ${
                        index === 3 ? "text-violet-600" : "text-slate-700"
                      }`}>
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-500 leading-tight">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              <motion.section
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-12 p-6 md:p-8 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl text-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl">{t.research.solution.title}</h2>
                    <p className="text-sm text-violet-200">{t.research.solution.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {t.research.solution.points.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-violet-200 flex-shrink-0 mt-0.5" />
                      <span className="text-base">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
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
                      7 {t.research.fomo.spots}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl text-slate-800 mb-2">
                    {t.research.fomo.title}
                  </h2>
                  <p className="text-slate-600 mb-6">
                    {t.research.fomo.subtitle}
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center justify-center gap-2 w-full md:w-auto py-3.5 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl text-base shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
                    data-testid="button-fomo-cta"
                  >
                    {t.research.fomo.cta}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.section>
            </article>
          </motion.div>
        </div>
      </LazyMotion>
    </div>
  );
}
