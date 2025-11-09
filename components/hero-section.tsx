"use client"

import { motion } from "framer-motion"
import type { Locale } from "@/lib/i18n"

interface HeroSectionProps {
  locale: Locale
}

export function HeroSection({ locale }: HeroSectionProps) {
  const content = {
    en: {
      badge: "Open Source MVP · AWS Decision Tool",
      title: "Choose Between SQS and Kafka with Confidence",
      subtitle: "Data-Driven Recommendations for Your Messaging Architecture",
      description:
        "An open-source MVP tool that aggregates AWS information, official documentation, and best practices to help you select between Amazon SQS and Apache Kafka (MSK). Built by AWS Solutions Architect Fernando Francisco Azevedo, this tool combines existing resources to provide personalized architecture recommendations based on your technical requirements, message volume, budget, and AWS region.",
      features: [
        "9 AWS Regions with Real Pricing",
        "Aggregated AWS Best Practices",
        "Multi-Language Support (EN/PT)",
        "MCP Resources & Integration Tips",
      ],
      mcpNote:
        "💡 This MVP aggregates information from AWS, MCP documentation, and community resources. All credits to the original creators and maintainers.",
    },
    pt: {
      badge: "MVP Open Source · Ferramenta de Decisão AWS",
      title: "Escolha Entre SQS e Kafka com Confiança",
      subtitle: "Recomendações Baseadas em Dados para Sua Arquitetura de Mensageria",
      description:
        "Uma ferramenta MVP open-source que agrega informações da AWS, documentação oficial e melhores práticas para ajudá-lo a selecionar entre Amazon SQS e Apache Kafka (MSK). Construída pelo Arquiteto de Soluções AWS Fernando Francisco Azevedo, esta ferramenta combina recursos existentes para fornecer recomendações de arquitetura personalizadas baseadas em seus requisitos técnicos, volume de mensagens, orçamento e região AWS.",
      features: [
        "9 Regiões AWS com Preços Reais",
        "Melhores Práticas AWS Agregadas",
        "Suporte Multi-Idioma (EN/PT)",
        "Recursos MCP e Dicas de Integração",
      ],
      mcpNote:
        "💡 Este MVP agrega informações da AWS, documentação MCP e recursos da comunidade. Todos os créditos aos criadores e mantenedores originais.",
    },
  }

  const t = content[locale]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 md:mb-16 space-y-6 md:space-y-8 px-2"
    >
      <div className="space-y-3 md:space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-block"
        >
          <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20 text-xs md:text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            {t.badge}
          </span>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance leading-tight px-4">
          {t.title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent px-4">
          {t.subtitle}
        </p>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-4">
          {t.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 pt-2">
        {t.features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            <div className="relative flex items-center gap-2 md:gap-2.5 px-3 md:px-5 py-2 md:py-2.5 rounded-full bg-gradient-to-br from-card/80 to-card border border-brand-primary/20 backdrop-blur-sm hover:border-brand-primary/40 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary shadow-sm" />
              <span className="text-xs md:text-sm font-medium text-foreground whitespace-nowrap">{feature}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MCP Note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="max-w-2xl mx-auto"
      >
        <p className="text-xs md:text-sm text-muted-foreground text-center px-4 py-2 rounded-lg bg-muted/30 border border-border/50">
          💡 {t.mcpNote}
        </p>
      </motion.div>
    </motion.div>
  )
}
