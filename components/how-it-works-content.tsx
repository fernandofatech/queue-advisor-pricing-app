"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ArrowRight, Brain, BarChart3, FileCheck, Sparkles } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"

interface HowItWorksContentProps {
  locale: Locale
}

export function HowItWorksContent({ locale }: HowItWorksContentProps) {
  const t = useTranslation(locale)

  const steps = [
    {
      title: t.howItWorks.step1Title,
      description: t.howItWorks.step1Desc,
      icon: FileCheck,
      color: "from-blue-500 to-cyan-500",
      details: [t.howItWorks.step1Detail1, t.howItWorks.step1Detail2, t.howItWorks.step1Detail3],
    },
    {
      title: t.howItWorks.step2Title,
      description: t.howItWorks.step2Desc,
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      details: [t.howItWorks.step2Detail1, t.howItWorks.step2Detail2, t.howItWorks.step2Detail3],
    },
    {
      title: t.howItWorks.step3Title,
      description: t.howItWorks.step3Desc,
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
      details: [t.howItWorks.step3Detail1, t.howItWorks.step3Detail2, t.howItWorks.step3Detail3],
    },
    {
      title: t.howItWorks.step4Title,
      description: t.howItWorks.step4Desc,
      icon: Sparkles,
      color: "from-green-500 to-emerald-500",
      details: [t.howItWorks.step4Detail1, t.howItWorks.step4Detail2, t.howItWorks.step4Detail3],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-light to-accent bg-clip-text text-transparent">
          {t.howItWorks.title}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.howItWorks.subtitle}</p>
      </motion.div>

      {/* Algorithm explanation */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="p-8 mb-12 bg-gradient-to-br from-teal-darker/20 to-accent/10">
          <h2 className="text-2xl font-bold mb-4">{t.howItWorks.algorithmTitle}</h2>
          <p className="text-muted-foreground mb-6">{t.howItWorks.algorithmDesc}</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                {t.howItWorks.sqsRecommendedWhen}
              </h3>
              <ul className="space-y-2 ml-7 text-sm text-muted-foreground">
                <li>• {t.howItWorks.sqsCondition1}</li>
                <li>• {t.howItWorks.sqsCondition2}</li>
                <li>• {t.howItWorks.sqsCondition3}</li>
                <li>• {t.howItWorks.sqsCondition4}</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
                {t.howItWorks.kafkaRecommendedWhen}
              </h3>
              <ul className="space-y-2 ml-7 text-sm text-muted-foreground">
                <li>• {t.howItWorks.kafkaCondition1}</li>
                <li>• {t.howItWorks.kafkaCondition2}</li>
                <li>• {t.howItWorks.kafkaCondition3}</li>
                <li>• {t.howItWorks.kafkaCondition4}</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Step-by-step process */}
      <div className="space-y-8">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="relative"
          >
            <Card className="p-6">
              <div className="flex items-start gap-6">
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline">
                      {t.step} {idx + 1}
                    </Badge>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <div className="space-y-2">
                    {step.details.map((detail, didx) => (
                      <div key={didx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-light mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            {idx < steps.length - 1 && (
              <div className="flex justify-center my-4">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Technology stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12"
      >
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">{t.howItWorks.techStackTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-teal-light">{t.howItWorks.pricingSource}</h3>
              <p className="text-sm text-muted-foreground">{t.howItWorks.pricingSourceDesc}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-teal-light">{t.howItWorks.calculation}</h3>
              <p className="text-sm text-muted-foreground">{t.howItWorks.calculationDesc}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-teal-light">{t.howItWorks.visualization}</h3>
              <p className="text-sm text-muted-foreground">{t.howItWorks.visualizationDesc}</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
