import { motion, LazyMotion, domAnimation } from "framer-motion";
import { Clock, Users, Zap, TrendingUp, Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  clock: Clock,
  users: Users,
  zap: Zap,
};

export function ResearchSection() {
  const { t } = useLanguage();

  return (
    <section
      className="relative min-h-[100dvh] px-5 py-12 snap-start bg-gradient-to-b from-slate-50 to-white"
      id="research"
      data-testid="section-research"
    >
      <div className="mx-auto w-full max-w-sm">
        <LazyMotion features={domAnimation}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-medium mb-3">
                <Sparkles className="w-3 h-3" />
                {t.research.badge}
              </span>
              <h2 className="font-serif text-2xl leading-tight tracking-[-0.02em] mb-2">
                {t.research.title}
              </h2>
              <p className="text-sm text-slate-500">
                {t.research.subtitle}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4 text-center">
                {t.research.evolution.title}
              </h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-200 via-violet-300 to-violet-500" />
                <div className="space-y-4">
                  {t.research.evolution.stages.map((stage: { year: string; label: string; desc: string }, index: number) => (
                    <motion.div
                      key={stage.year}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative flex items-start gap-4 pl-10"
                    >
                      <div className={`absolute left-2 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                        index === 3 
                          ? "bg-violet-500 border-violet-500 text-white" 
                          : "bg-white border-slate-300 text-slate-400"
                      }`}>
                        {index === 3 ? <Check className="w-3 h-3" /> : null}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className={`text-xs font-mono ${index === 3 ? "text-violet-600" : "text-slate-400"}`}>
                            {stage.year}
                          </span>
                          <span className={`font-medium text-sm ${index === 3 ? "text-violet-700" : "text-slate-700"}`}>
                            {stage.label}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{stage.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-medium text-slate-700 mb-4 text-center">
                {t.research.problems.title}
              </h3>
              <div className="space-y-3">
                {t.research.problems.items.map((item: { icon: string; title: string; desc: string }, index: number) => {
                  const Icon = iconMap[item.icon] || Clock;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-3 p-3 bg-red-50/50 rounded-xl border border-red-100"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-red-500" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-slate-800">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-8 p-5 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl text-white"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{t.research.solution.title}</h3>
                  <p className="text-xs text-violet-200">{t.research.solution.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {t.research.solution.points.map((point: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-violet-200 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {t.research.stats.map((stat: { value: string; label: string }, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl text-center ${
                    index === 3 
                      ? "bg-gradient-to-br from-violet-100 to-violet-50 border-2 border-violet-200" 
                      : "bg-slate-50 border border-slate-100"
                  }`}
                >
                  <div className={`text-2xl font-bold mb-1 ${
                    index === 3 ? "text-violet-600" : "text-slate-700"
                  }`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200"
            >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-200/30 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-amber-700">
                    7 {t.research.fomo.spots}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-slate-800 mb-1">
                  {t.research.fomo.title}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {t.research.fomo.subtitle}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-shadow"
                  data-testid="button-fomo-cta"
                >
                  {t.research.fomo.cta}
                </a>
              </div>
            </motion.div>
          </motion.div>
        </LazyMotion>
      </div>
    </section>
  );
}
