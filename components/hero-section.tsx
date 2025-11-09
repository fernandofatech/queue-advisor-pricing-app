"use client"

import { motion } from "framer-motion"
import type { Locale } from "@/lib/i18n"

interface HeroSectionProps {
  locale: Locale
}

export function HeroSection({ locale }: HeroSectionProps) {
  const content = {
    en: {
      title: "Make smarter AWS architecture decisions",
      description:
        "Compare Amazon SQS and Apache Kafka (MSK) with real-time pricing data and technical recommendations tailored to your use case.",
      features: ["Live AWS pricing data", "Technical requirement analysis", "Personalized recommendations"],
    },
    pt: {
      title: "Tome decisões mais inteligentes de arquitetura AWS",
      description:
        "Compare Amazon SQS e Apache Kafka (MSK) com dados de preços em tempo real e recomendações técnicas adaptadas ao seu caso de uso.",
      features: [
        "Dados de preços da AWS em tempo real",
        "Análise de requisitos técnicos",
        "Recomendações personalizadas",
      ],
    },
  }

  const t = content[locale]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 space-y-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">{t.title}</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{t.description}</p>
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-4">
        {t.features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-dark/10 dark:bg-teal-dark/20 border border-teal-light/20"
          >
            <div className="w-2 h-2 rounded-full bg-teal-light" />
            <span className="text-sm font-medium text-foreground">{feature}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
