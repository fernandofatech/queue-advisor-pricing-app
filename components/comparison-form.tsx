"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ResultsDisplay } from "@/components/results-display"
import { Loader2, ChevronRight, ChevronLeft, Sparkles, Zap, DollarSign, TrendingUp, Check } from "lucide-react"
import type { ComparisonResult } from "@/types/comparison"
import type { Locale } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

interface ComparisonFormProps {
  locale: Locale
}

const presets = {
  microservices: {
    messagesPerMonth: 5000000,
    requireOrdering: "no",
    messageLossTolerance: "medium",
    replayNeeded: "no",
    monthlyBudget: 200,
    environment: "aws",
  },
  eventStreaming: {
    messagesPerMonth: 50000000,
    requireOrdering: "yes",
    messageLossTolerance: "low",
    replayNeeded: "yes",
    monthlyBudget: 1000,
    environment: "aws",
  },
  costEffective: {
    messagesPerMonth: 1000000,
    requireOrdering: "no",
    messageLossTolerance: "high",
    replayNeeded: "no",
    monthlyBudget: 50,
    environment: "aws",
  },
  highThroughput: {
    messagesPerMonth: 100000000,
    requireOrdering: "yes",
    messageLossTolerance: "low",
    replayNeeded: "yes",
    monthlyBudget: 2000,
    environment: "aws",
  },
}

export function ComparisonForm({ locale }: ComparisonFormProps) {
  const t = useTranslation(locale)

  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<ComparisonResult | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    messagesPerMonth: 5000000,
    requireOrdering: "no",
    messageLossTolerance: "medium",
    replayNeeded: "no",
    monthlyBudget: 200,
    environment: "aws",
  })

  const handlePresetSelect = (presetKey: string) => {
    setSelectedPreset(presetKey)
    setFormData(presets[presetKey as keyof typeof presets])
    setCurrentStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          messagesPerMonth: formData.messagesPerMonth.toString(),
          monthlyBudget: formData.monthlyBudget.toString(),
        }),
      })

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error comparing services:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString(locale === "pt" ? "pt-BR" : "en-US")
  }

  return (
    <div className="space-y-8">
      <Card className="border-border bg-card/80 backdrop-blur shadow-lg overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-2">
            <CardTitle className="text-2xl">{t.formTitle}</CardTitle>
            {currentStep > 0 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {t.step} {currentStep}/{3}
                </span>
              </div>
            )}
          </div>
          <CardDescription>{t.formDescription}</CardDescription>

          {currentStep > 0 && (
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-4">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentStep / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Microservices Preset */}
                    <PresetCard
                      icon={<Sparkles className="h-5 w-5" />}
                      title={t.presetMicroservices}
                      description={t.presetMicroservicesDesc}
                      features={[`${formatNumber(5000000)} ${t.messagesMonth}`, t.noOrdering, `$200 ${t.budget}`]}
                      onClick={() => handlePresetSelect("microservices")}
                      selected={selectedPreset === "microservices"}
                    />

                    {/* Event Streaming Preset */}
                    <PresetCard
                      icon={<TrendingUp className="h-5 w-5" />}
                      title={t.presetEventStreaming}
                      description={t.presetEventStreamingDesc}
                      features={[`${formatNumber(50000000)} ${t.messagesMonth}`, t.withOrdering, `$1000 ${t.budget}`]}
                      onClick={() => handlePresetSelect("eventStreaming")}
                      selected={selectedPreset === "eventStreaming"}
                    />

                    {/* Cost Effective Preset */}
                    <PresetCard
                      icon={<DollarSign className="h-5 w-5" />}
                      title={t.presetCostEffective}
                      description={t.presetCostEffectiveDesc}
                      features={[`${formatNumber(1000000)} ${t.messagesMonth}`, t.highTolerance, `$50 ${t.budget}`]}
                      onClick={() => handlePresetSelect("costEffective")}
                      selected={selectedPreset === "costEffective"}
                    />

                    {/* High Throughput Preset */}
                    <PresetCard
                      icon={<Zap className="h-5 w-5" />}
                      title={t.presetHighThroughput}
                      description={t.presetHighThroughputDesc}
                      features={[`${formatNumber(100000000)} ${t.messagesMonth}`, t.withReplay, `$2000 ${t.budget}`]}
                      onClick={() => handlePresetSelect("highThroughput")}
                      selected={selectedPreset === "highThroughput"}
                    />
                  </div>

                  <div className="pt-4 flex justify-center">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setSelectedPreset("custom")
                        setCurrentStep(1)
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {t.customConfiguration}
                    </Button>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 py-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">{t.messagesLabel}</Label>
                      <span className="text-2xl font-bold text-brand-primary tabular-nums">
                        {formatNumber(formData.messagesPerMonth)}
                      </span>
                    </div>
                    <Slider
                      value={[formData.messagesPerMonth]}
                      onValueChange={([value]) => setFormData({ ...formData, messagesPerMonth: value })}
                      min={100000}
                      max={200000000}
                      step={100000}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>100K</span>
                      <span>200M</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">{t.budgetLabel}</Label>
                      <span className="text-2xl font-bold text-brand-secondary tabular-nums">
                        ${formatNumber(formData.monthlyBudget)}
                      </span>
                    </div>
                    <Slider
                      value={[formData.monthlyBudget]}
                      onValueChange={([value]) => setFormData({ ...formData, monthlyBudget: value })}
                      min={10}
                      max={5000}
                      step={10}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$10</span>
                      <span>$5,000</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 py-4"
                >
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">{t.orderingLabel}</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <OptionCard
                        selected={formData.requireOrdering === "yes"}
                        onClick={() => setFormData({ ...formData, requireOrdering: "yes" })}
                        label={t.yes}
                      />
                      <OptionCard
                        selected={formData.requireOrdering === "no"}
                        onClick={() => setFormData({ ...formData, requireOrdering: "no" })}
                        label={t.no}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-semibold">{t.messageLossLabel}</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <OptionCard
                        selected={formData.messageLossTolerance === "low"}
                        onClick={() => setFormData({ ...formData, messageLossTolerance: "low" })}
                        label={t.low}
                      />
                      <OptionCard
                        selected={formData.messageLossTolerance === "medium"}
                        onClick={() => setFormData({ ...formData, messageLossTolerance: "medium" })}
                        label={t.medium}
                      />
                      <OptionCard
                        selected={formData.messageLossTolerance === "high"}
                        onClick={() => setFormData({ ...formData, messageLossTolerance: "high" })}
                        label={t.high}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-semibold">{t.replayLabel}</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <OptionCard
                        selected={formData.replayNeeded === "yes"}
                        onClick={() => setFormData({ ...formData, replayNeeded: "yes" })}
                        label={t.yes}
                      />
                      <OptionCard
                        selected={formData.replayNeeded === "no"}
                        onClick={() => setFormData({ ...formData, replayNeeded: "no" })}
                        label={t.no}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6 py-4"
                >
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">{t.environmentLabel}</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <OptionCard
                        selected={formData.environment === "aws"}
                        onClick={() => setFormData({ ...formData, environment: "aws" })}
                        label={t.aws}
                        description={t.awsDesc}
                      />
                      <OptionCard
                        selected={formData.environment === "multicloud"}
                        onClick={() => setFormData({ ...formData, environment: "multicloud" })}
                        label={t.multicloud}
                        description={t.multicloudDesc}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3 mt-8 pt-6 border-t border-border">
              {currentStep > 0 && (
                <Button type="button" onClick={prevStep} variant="outline" className="gap-2 bg-transparent">
                  <ChevronLeft className="h-4 w-4" />
                  {t.previous}
                </Button>
              )}

              {currentStep > 0 && currentStep < 3 && (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {t.next}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}

              {currentStep === 3 && (
                <Button
                  type="submit"
                  className="ml-auto gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.analyzing}
                    </>
                  ) : (
                    <>
                      {t.compareButton}
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {results && <ResultsDisplay results={results} locale={locale} />}
    </div>
  )
}

interface PresetCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  onClick: () => void
  selected: boolean
}

function PresetCard({ icon, title, description, features, onClick, selected }: PresetCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative p-5 rounded-lg border-2 text-left transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        selected
          ? "border-brand-primary bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 shadow-md"
          : "border-border bg-card hover:border-brand-primary/50",
      )}
    >
      {selected && (
        <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-md">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={cn(
            "p-2 rounded-lg transition-all",
            selected
              ? "bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-sm"
              : "bg-muted text-muted-foreground",
          )}
        >
          {icon}
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-1.5">
        {features.map((feature, index) => (
          <li key={index} className="text-sm flex items-center gap-2">
            <div
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                selected ? "bg-gradient-to-br from-brand-primary to-brand-secondary" : "bg-muted-foreground",
              )}
            />
            {feature}
          </li>
        ))}
      </ul>
    </button>
  )
}

interface OptionCardProps {
  selected: boolean
  onClick: () => void
  label: string
  description?: string
}

function OptionCard({ selected, onClick, label, description }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative p-4 rounded-lg border-2 text-left transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        selected
          ? "border-brand-primary bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 shadow-sm"
          : "border-border bg-card hover:border-brand-primary/30",
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
            selected ? "border-brand-primary bg-gradient-to-br from-brand-primary to-brand-secondary" : "border-muted-foreground",
          )}
        >
          {selected && <div className="h-2 w-2 rounded-full bg-white" />}
        </div>
        <div className="flex-1">
          <span className={cn("font-medium", selected && "bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent")}>
            {label}
          </span>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </div>
    </button>
  )
}
