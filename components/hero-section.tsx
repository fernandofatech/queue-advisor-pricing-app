"use client"

import { motion } from "framer-motion"
import type { Locale } from "@/lib/i18n"

interface HeroSectionProps {
  locale: Locale
}

export function HeroSection({ locale }: HeroSectionProps) {
  const content = {
    en: {
      badge: "AWS Architecture Decision Tool",
      title: "Choose Between SQS and Kafka with Confidence",
      subtitle: "Data-Driven Recommendations for Your Messaging Architecture",
      description:
        "Get expert guidance on selecting Amazon SQS or Apache Kafka (MSK) based on your technical requirements, message volume, and budget. Our recommendation engine analyzes AWS best practices and real-world use cases to help you make the optimal choice.",
      features: ["Official AWS Pricing", "Smart Recommendation Algorithm", "Multi-Language Support"],
    },
    pt: {
      badge: "Ferramenta de Decisão de Arquitetura AWS",
      title: "Escolha Entre SQS e Kafka com Confiança",
      subtitle: "Recomendações Baseadas em Dados para Sua Arquitetura de Mensageria",
      description:
        "Obtenha orientação especializada na seleção entre Amazon SQS ou Apache Kafka (MSK) baseada em seus requisitos técnicos, volume de mensagens e orçamento. Nosso mecanismo de recomendação analisa as melhores práticas da AWS e casos de uso reais para ajudá-lo a fazer a escolha ideal.",
      features: ["Preços Oficiais da AWS", "Algoritmo de Recomendação Inteligente", "Suporte Multi-Idioma"],
    },
  }

  const t = content[locale]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16 space-y-8"
    >
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            {t.badge}
          </span>
        </motion.div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight">
          {t.title}
        </h1>
        <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
          {t.subtitle}
        </p>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
          {t.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 pt-2">
        {t.features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            <div className="relative flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-br from-card/80 to-card border border-brand-primary/20 backdrop-blur-sm hover:border-brand-primary/40 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary shadow-sm" />
              <span className="text-sm font-medium text-foreground">{feature}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
