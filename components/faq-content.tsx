"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, ExternalLink } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"

interface FaqContentProps {
  locale: Locale
}

export function FaqContent({ locale }: FaqContentProps) {
  const t = useTranslation(locale)

  const categories = [
    {
      name: t.faq.generalCategory,
      faqs: [
        { q: t.faq.q1, a: t.faq.a1 },
        { q: t.faq.q2, a: t.faq.a2 },
        { q: t.faq.q3, a: t.faq.a3 },
      ],
    },
    {
      name: t.faq.pricingCategory,
      faqs: [
        { q: t.faq.q4, a: t.faq.a4 },
        { q: t.faq.q5, a: t.faq.a5 },
        { q: t.faq.q6, a: t.faq.a6 },
      ],
    },
    {
      name: t.faq.technicalCategory,
      faqs: [
        { q: t.faq.q7, a: t.faq.a7 },
        { q: t.faq.q8, a: t.faq.a8 },
        { q: t.faq.q9, a: t.faq.a9 },
      ],
    },
  ]

  const resources = [
    {
      title: t.faq.resource1Title,
      description: t.faq.resource1Desc,
      url: "https://aws.amazon.com/architecture/",
    },
    {
      title: t.faq.resource2Title,
      description: t.faq.resource2Desc,
      url: "https://calculator.aws/#/",
    },
    {
      title: t.faq.resource3Title,
      description: t.faq.resource3Desc,
      url: "https://aws.amazon.com/free/",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <HelpCircle className="h-10 w-10 text-teal-light" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-light to-accent bg-clip-text text-transparent">
            {t.faq.title}
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">{t.faq.subtitle}</p>
      </motion.div>

      <div className="space-y-8">
        {categories.map((category, cidx) => (
          <motion.div
            key={cidx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: cidx * 0.1 }}
          >
            <Card className="p-6">
              <Badge className="mb-4" variant="secondary">
                {category.name}
              </Badge>
              <Accordion type="single" collapsible className="w-full">
                {category.faqs.map((faq, fidx) => (
                  <AccordionItem key={fidx} value={`item-${cidx}-${fidx}`}>
                    <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Additional resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold mb-6">{t.faq.additionalResources}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, idx) => (
            <a key={idx} href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
              <Card className="p-6 h-full hover:border-teal-light transition-all hover:bg-accent/5 group">
                <h3 className="font-semibold mb-2 group-hover:text-teal-light transition-colors flex items-center gap-2">
                  {resource.title}
                  <ExternalLink className="h-4 w-4" />
                </h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </Card>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
