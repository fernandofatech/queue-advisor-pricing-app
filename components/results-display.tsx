"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceRadarChart } from "@/components/service-radar-chart"
import { PricingTable } from "@/components/pricing-table"
import { ExportShareMenu } from "@/components/export-share-menu"
import { CheckCircle2, ExternalLink, AlertCircle, TrendingUp, Zap, DollarSign, MapPin, Award, RotateCcw, Save, GitCompare } from "lucide-react"
import Link from "next/link"
import type { ComparisonResult } from "@/types/comparison"
import type { Locale } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ResultsDisplayProps {
  results: ComparisonResult
  locale: Locale
  onStartNewAnalysis?: () => void
}

export function ResultsDisplay({ results, locale, onStartNewAnalysis }: ResultsDisplayProps) {
  const t = useTranslation(locale)

  const handleSaveAnalysis = () => {
    // Get existing analyses from localStorage
    const savedAnalyses = JSON.parse(localStorage.getItem("queueadvisor-analyses") || "[]")

    // Add current analysis with timestamp
    const analysisWithMetadata = {
      ...results,
      savedAt: new Date().toISOString(),
      id: Date.now().toString(),
    }

    savedAnalyses.push(analysisWithMetadata)

    // Keep only last 10 analyses
    if (savedAnalyses.length > 10) {
      savedAnalyses.shift()
    }

    localStorage.setItem("queueadvisor-analyses", JSON.stringify(savedAnalyses))

    // Show success message
    alert(locale === "pt" ? "Análise salva com sucesso!" : "Analysis saved successfully!")
  }

  // Extract numeric values from pricing strings (e.g., "$0.40" -> 0.40)
  const parsePricing = (priceStr: string): number => {
    return Number.parseFloat(priceStr.replace("$", "")) || 0
  }

  // Use 10M volume as the comparison baseline
  const sqsCost = parsePricing(results.pricing.sqs["10M"])
  const kafkaCost = parsePricing(results.pricing.kafka["10M"])

  const costDifference = Math.abs(sqsCost - kafkaCost)
  const minCost = Math.min(sqsCost, kafkaCost)
  const costPercentage = minCost > 0 ? ((costDifference / minCost) * 100).toFixed(0) : "0"
  const cheaperService = sqsCost < kafkaCost ? "SQS" : "Kafka"

  const avgSqsScore = (results.radarData.reduce((acc, item) => acc + item.sqs, 0) / results.radarData.length).toFixed(1)
  const avgKafkaScore = (
    results.radarData.reduce((acc, item) => acc + item.kafka, 0) / results.radarData.length
  ).toFixed(1)

  return (
    <motion.div
      id="results-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => {
              if (onStartNewAnalysis) {
                onStartNewAnalysis()
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" })
                window.location.reload()
              }
            }}
            variant="outline"
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            {t.startNewAnalysis}
          </Button>
          <Button onClick={handleSaveAnalysis} variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            {t.saveAnalysis}
          </Button>
          <Link href="/compare">
            <Button variant="outline" className="gap-2">
              <GitCompare className="h-4 w-4" />
              {t.viewSavedAnalyses}
            </Button>
          </Link>
        </div>
        <div className="flex gap-3">
          <ExportShareMenu results={results} locale={locale} />
        </div>
      </div>

      {/* Recommendation Card */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur shadow-xl">
        <CardHeader>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div className="flex-1">
              <CardTitle className="text-2xl text-foreground">
                {t.recommended}: {results.recommendation}
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2 text-base leading-relaxed">
                {results.explanation}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Region Information */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-border bg-card/80 backdrop-blur">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-primary" />
              <CardTitle className="text-lg">
                {locale === "pt" ? "Região Selecionada" : "Selected Region"}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{results.pricing.region.location.split(" ")[0]}</span>
                <div>
                  <p className="font-semibold text-foreground">{results.pricing.region.name}</p>
                  <p className="text-sm text-muted-foreground">{results.pricing.region.code}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {results.bestRegion && results.pricing.region.code !== results.bestRegion.region.code && (
          <Card className="border-brand-secondary/30 bg-gradient-to-br from-brand-secondary/10 to-brand-secondary/5 backdrop-blur">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-brand-secondary" />
                <CardTitle className="text-lg">
                  {locale === "pt" ? "Região Recomendada" : "Recommended Region"}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{results.bestRegion.region.location.split(" ")[0]}</span>
                  <div>
                    <p className="font-semibold text-foreground">{results.bestRegion.region.name}</p>
                    <p className="text-sm text-muted-foreground">{results.bestRegion.region.code}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground pt-2 border-t border-border/50">{results.bestRegion.reason}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-border bg-card/80 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {locale === "en" ? "Cost Difference" : "Diferença de Custo"}
                </p>
                <p className="text-2xl font-bold text-foreground">{costPercentage}%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {locale === "en" ? `${cheaperService} is cheaper` : `${cheaperService} é mais barato`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {locale === "en" ? "SQS Average Score" : "Pontuação Média SQS"}
                </p>
                <p className="text-2xl font-bold text-foreground">{avgSqsScore}/10</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {locale === "en" ? "Overall performance" : "Desempenho geral"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/80 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-chart-3/10 rounded-lg">
                <Zap className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {locale === "en" ? "Kafka Average Score" : "Pontuação Média Kafka"}
                </p>
                <p className="text-2xl font-bold text-foreground">{avgKafkaScore}/10</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {locale === "en" ? "Overall performance" : "Desempenho geral"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Radar Chart */}
      <Card className="border-border bg-card/80 backdrop-blur shadow-lg">
        <CardHeader>
          <CardTitle>{t.serviceComparison}</CardTitle>
          <CardDescription>{t.serviceComparisonDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceRadarChart data={results.radarData} />
        </CardContent>
      </Card>

      {/* Pricing Table */}
      <Card className="border-border bg-card/80 backdrop-blur shadow-lg">
        <CardHeader>
          <CardTitle>{t.costComparison}</CardTitle>
          <CardDescription>{t.costComparisonDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <PricingTable pricing={results.pricing} locale={locale} />
        </CardContent>
      </Card>

      <Card className="border-border bg-card/80 backdrop-blur shadow-lg">
        <CardHeader>
          <CardTitle>{t.technicalSummary}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-1" />
                <h3 className="text-lg font-semibold text-foreground">{t.sqsTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{t.sqsFeature1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{t.sqsFeature2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{t.sqsFeature3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{t.sqsFeature4}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{t.sqsFeature5}</span>
                </li>
              </ul>
              <a
                href="https://docs.aws.amazon.com/sqs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 mt-3 transition-colors font-medium"
              >
                {t.sqsDocs}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-2" />
                <h3 className="text-lg font-semibold text-foreground">{t.kafkaTitle}</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{t.kafkaFeature1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{t.kafkaFeature2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{t.kafkaFeature3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{t.kafkaFeature4}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{t.kafkaFeature5}</span>
                </li>
              </ul>
              <a
                href="https://docs.aws.amazon.com/msk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 mt-3 transition-colors font-medium"
              >
                {t.kafkaDocs}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{locale === "en" ? "Next Steps" : "Próximos Passos"}</AlertTitle>
            <AlertDescription className="text-sm leading-relaxed">
              {locale === "en"
                ? "Review the technical documentation and consider running a proof-of-concept with your actual workload before making a final decision."
                : "Revise a documentação técnica e considere executar uma prova de conceito com sua carga de trabalho real antes de tomar uma decisão final."}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </motion.div>
  )
}
