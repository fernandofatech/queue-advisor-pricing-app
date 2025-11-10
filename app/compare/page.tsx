"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, ArrowLeft, GitCompare, Share2, BarChart3 } from "lucide-react"
import Link from "next/link"
import type { ComparisonResult } from "@/types/comparison"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { toast } from "@/hooks/use-toast"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLocale } from "@/hooks/use-locale"
import { useTranslation } from "@/lib/i18n"

interface SavedAnalysis extends ComparisonResult {
  savedAt: string
  id: string
}

export default function ComparePage() {
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([])
  const [selectedAnalyses, setSelectedAnalyses] = useState<string[]>([])
  const [showCharts, setShowCharts] = useState(true)
  const { locale, setLocale, isLoaded } = useLocale()
  const t = useTranslation(locale)

  useEffect(() => {
    const analyses = JSON.parse(localStorage.getItem("queueadvisor-analyses") || "[]")
    setSavedAnalyses(analyses)
  }, [])

  if (!isLoaded) {
    return null
  }

  const shareComparison = () => {
    const text = t.compare.comparingText.replace('{count}', selectedAnalyses.length.toString())
    const url = window.location.href

    if (navigator.share) {
      navigator.share({
        title: "QueueAdvisor - " + t.compare.title,
        text: text,
        url: url
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(url)
      toast({
        title: t.compare.linkCopied,
        description: t.compare.linkCopiedDesc
      })
    }
  }

  const handleDelete = (id: string) => {
    const filtered = savedAnalyses.filter((a) => a.id !== id)
    setSavedAnalyses(filtered)
    localStorage.setItem("queueadvisor-analyses", JSON.stringify(filtered))
    setSelectedAnalyses(selectedAnalyses.filter((sid) => sid !== id))
  }

  const handleToggleSelect = (id: string) => {
    if (selectedAnalyses.includes(id)) {
      setSelectedAnalyses(selectedAnalyses.filter((sid) => sid !== id))
    } else {
      if (selectedAnalyses.length < 3) {
        setSelectedAnalyses([...selectedAnalyses, id])
      }
    }
  }

  const selectedAnalysesData = savedAnalyses.filter((a) => selectedAnalyses.includes(a.id))

  return (
    <>
      <Header locale={locale} onLocaleChange={setLocale} />
      <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
            <Link href="/">
              <Button variant="ghost" className="gap-2 mb-4 -ml-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{t.compare.backToHome}</span>
                <span className="sm:hidden">{t.compare.back}</span>
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <GitCompare className="h-6 w-6 sm:h-8 sm:w-8 text-brand-primary" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                {t.compare.title}
              </h1>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              {t.compare.subtitle}
            </p>
          </motion.div>

        {savedAnalyses.length === 0 ? (
          <Card className="border-border bg-card/80 backdrop-blur">
            <CardContent className="pt-8 pb-8 sm:pt-12 sm:pb-12 text-center px-4">
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                {t.compare.noAnalyses}
              </p>
              <Link href="/">
                <Button className="mt-4 gap-2 bg-linear-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white text-sm sm:text-base">
                  {t.compare.startNewAnalysis}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {savedAnalyses.map((analysis) => (
                <Card
                  key={analysis.id}
                  className={`border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedAnalyses.includes(analysis.id)
                      ? "border-brand-primary bg-linear-to-br from-brand-primary/10 to-brand-secondary/10"
                      : "border-border bg-card/80"
                  }`}
                  onClick={() => handleToggleSelect(analysis.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg truncate">
                          {analysis.recommendation}
                        </CardTitle>
                        <CardDescription className="text-[10px] sm:text-xs mt-1">
                          {new Date(analysis.savedAt).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(analysis.id)
                        }}
                        className="h-8 w-8 shrink-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.compare.region}:</span>
                        <span className="font-medium">{analysis.pricing.region.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.compare.sqsCost}:</span>
                        <span className="font-medium">{analysis.pricing.sqs["10M"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t.compare.kafkaCost}:</span>
                        <span className="font-medium">{analysis.pricing.kafka["10M"]}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedAnalyses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                id="comparison-content"
              >
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4 no-print">
                  <Button
                    onClick={() => setShowCharts(!showCharts)}
                    variant="outline"
                    className="gap-2 w-full sm:w-auto"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {showCharts ? t.compare.hideCharts : t.compare.showCharts}
                    </span>
                    <span className="sm:hidden">
                      {showCharts ? t.compare.hide : t.compare.show}
                    </span>
                  </Button>
                  <Button
                    onClick={shareComparison}
                    variant="outline"
                    className="gap-2 w-full sm:w-auto"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="hidden sm:inline">{t.compare.share}</span>
                  </Button>
                </div>

                {/* Cost Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {selectedAnalysesData.map((analysis) => {
                    const sqsCost = parseFloat(analysis.pricing.sqs["10M"].replace("$", "").replace(",", ""))
                    const kafkaCost = parseFloat(analysis.pricing.kafka["10M"].replace("$", "").replace(",", ""))
                    const savings = Math.abs(sqsCost - kafkaCost)
                    const sqsCheaper = sqsCost < kafkaCost
                    const savingsPercent = ((savings / Math.max(sqsCost, kafkaCost)) * 100).toFixed(0)

                    return (
                      <Card key={analysis.id} className="border-border bg-card/80 backdrop-blur shadow-lg">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <CardDescription className="text-xs mb-1">{t.compare.costSummary}</CardDescription>
                              <CardTitle className="text-lg sm:text-xl truncate">
                                {analysis.recommendation}
                              </CardTitle>
                            </div>
                            <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                              sqsCheaper
                                ? "bg-green-500/20 text-green-500 border border-green-500/30"
                                : "bg-purple-500/20 text-purple-500 border border-purple-500/30"
                            }`}>
                              {analysis.pricing.region.code}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* SQS Cost */}
                          <div className={`p-4 rounded-lg border-2 ${
                            sqsCheaper
                              ? "bg-green-500/10 border-green-500/30"
                              : "bg-muted/50 border-border"
                          }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs sm:text-sm text-muted-foreground">Amazon SQS</span>
                              {sqsCheaper && (
                                <span className="text-[10px] sm:text-xs font-semibold text-green-500 flex items-center gap-1">
                                  ✓ {savingsPercent}% {t.compare.cheaper}
                                </span>
                              )}
                            </div>
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                              {analysis.pricing.sqs["10M"]}
                            </div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                              {t.compare.monthlyCostAt10M}
                            </div>
                          </div>

                          {/* Kafka Cost */}
                          <div className={`p-4 rounded-lg border-2 ${
                            !sqsCheaper
                              ? "bg-purple-500/10 border-purple-500/30"
                              : "bg-muted/50 border-border"
                          }`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs sm:text-sm text-muted-foreground">Apache Kafka (MSK)</span>
                              {!sqsCheaper && (
                                <span className="text-[10px] sm:text-xs font-semibold text-purple-500 flex items-center gap-1">
                                  ✓ {savingsPercent}% {t.compare.cheaper}
                                </span>
                              )}
                            </div>
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                              {analysis.pricing.kafka["10M"]}
                            </div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                              {t.compare.monthlyCostAt10M}
                            </div>
                          </div>

                          {/* Savings Badge */}
                          <div className="pt-2 border-t border-border/50">
                            <div className="flex items-center justify-between text-xs sm:text-sm">
                              <span className="text-muted-foreground">{t.compare.savings}:</span>
                              <span className="font-bold text-brand-primary">
                                ${savings.toFixed(2)}/mês ({savingsPercent}%)
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                {showCharts && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <Card className="border-border bg-card/80 backdrop-blur shadow-xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg sm:text-xl">
                          {t.compare.metricsComparison}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {t.compare.metricsComparisonDesc}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={280} className="sm:h-[350px]">
                          <RadarChart data={selectedAnalysesData[0]?.radarData || []}>
                            <PolarGrid
                              stroke="hsl(var(--border))"
                              strokeWidth={1}
                            />
                            <PolarAngleAxis
                              dataKey="metric"
                              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                              stroke="hsl(var(--border))"
                            />
                            <PolarRadiusAxis
                              angle={90}
                              domain={[0, 10]}
                              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                              stroke="hsl(var(--border))"
                            />
                            {selectedAnalysesData.map((analysis, idx) => (
                              <Radar
                                key={analysis.id}
                                name={analysis.recommendation}
                                dataKey={idx === 0 ? "sqs" : "kafka"}
                                stroke={idx === 0 ? "#10b981" : idx === 1 ? "#8b5cf6" : "#f59e0b"}
                                fill={idx === 0 ? "#10b981" : idx === 1 ? "#8b5cf6" : "#f59e0b"}
                                fillOpacity={0.25}
                                strokeWidth={2}
                              />
                            ))}
                            <Legend
                              wrapperStyle={{
                                color: "hsl(var(--foreground))",
                                fontSize: "13px"
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="border-border bg-card/80 backdrop-blur shadow-xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg sm:text-xl">
                          {t.compare.costComparisonChart}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {t.compare.costComparisonChartDesc}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={280} className="sm:h-[350px]">
                          <BarChart
                            data={selectedAnalysesData.map(analysis => ({
                              name: analysis.recommendation.split(" ")[1] || analysis.recommendation,
                              SQS: parseFloat(analysis.pricing.sqs["10M"].replace("$", "")),
                              Kafka: parseFloat(analysis.pricing.kafka["10M"].replace("$", "")),
                            }))}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="hsl(var(--border))"
                              strokeOpacity={0.5}
                            />
                            <XAxis
                              dataKey="name"
                              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                              stroke="hsl(var(--border))"
                            />
                            <YAxis
                              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                              stroke="hsl(var(--border))"
                              label={{
                                value: t.compare.costLabel,
                                angle: -90,
                                position: "insideLeft",
                                fill: "hsl(var(--muted-foreground))",
                                fontSize: 12
                              }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--popover))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                color: "hsl(var(--foreground))",
                                fontSize: "13px"
                              }}
                              labelStyle={{
                                color: "hsl(var(--foreground))",
                                fontWeight: 600
                              }}
                              formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
                            />
                            <Legend
                              wrapperStyle={{
                                color: "hsl(var(--foreground))",
                                fontSize: "13px"
                              }}
                            />
                            <Bar
                              dataKey="SQS"
                              fill="#10b981"
                              radius={[8, 8, 0, 0]}
                              name="Amazon SQS"
                            />
                            <Bar
                              dataKey="Kafka"
                              fill="#8b5cf6"
                              radius={[8, 8, 0, 0]}
                              name="Apache Kafka (MSK)"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <Card className="border-border bg-card/80 backdrop-blur shadow-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg sm:text-xl">
                      {t.compare.sideBySide}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {t.compare.comparingAnalyses.replace('{count}', selectedAnalyses.length.toString())}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-2 sm:px-6">
                    <div className="overflow-x-auto -mx-2 sm:mx-0">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3 font-semibold">{t.compare.metric}</th>
                            {selectedAnalysesData.map((analysis) => (
                              <th key={analysis.id} className="text-left p-3 font-semibold">
                                {analysis.recommendation}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="p-3 text-muted-foreground">{t.compare.date}</td>
                            {selectedAnalysesData.map((analysis) => (
                              <td key={analysis.id} className="p-3">
                                {new Date(analysis.savedAt).toLocaleDateString()}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="p-3 text-muted-foreground">{t.compare.region}</td>
                            {selectedAnalysesData.map((analysis) => (
                              <td key={analysis.id} className="p-3">
                                {analysis.pricing.region.name}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="p-3 text-muted-foreground">{t.compare.sqsCostDetail}</td>
                            {selectedAnalysesData.map((analysis) => (
                              <td key={analysis.id} className="p-3 font-medium">
                                {analysis.pricing.sqs["10M"]}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="p-3 text-muted-foreground">{t.compare.kafkaCostDetail}</td>
                            {selectedAnalysesData.map((analysis) => (
                              <td key={analysis.id} className="p-3 font-medium">
                                {analysis.pricing.kafka["10M"]}
                              </td>
                            ))}
                          </tr>
                          {selectedAnalysesData[0]?.radarData.map((metric, idx) => (
                            <tr key={metric.metric} className="border-b border-border/50">
                              <td className="p-3 text-muted-foreground">{metric.metric}</td>
                              {selectedAnalysesData.map((analysis) => (
                                <td key={analysis.id} className="p-3">
                                  <div className="flex gap-4">
                                    <span className="text-chart-2">SQS: {analysis.radarData[idx]?.sqs}/10</span>
                                    <span className="text-chart-3">Kafka: {analysis.radarData[idx]?.kafka}/10</span>
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        )}
        </div>
      </div>
      <Footer locale={locale} />
    </>
  )
}
