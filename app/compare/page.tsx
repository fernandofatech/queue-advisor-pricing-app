"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, ArrowLeft, GitCompare, Download, Share2, BarChart3 } from "lucide-react"
import Link from "next/link"
import type { ComparisonResult } from "@/types/comparison"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import html2canvas from "html2canvas"
import { toast } from "@/hooks/use-toast"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Locale } from "@/lib/i18n"

interface SavedAnalysis extends ComparisonResult {
  savedAt: string
  id: string
}

export default function ComparePage() {
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([])
  const [selectedAnalyses, setSelectedAnalyses] = useState<string[]>([])
  const [showCharts, setShowCharts] = useState(true)
  const [locale, setLocale] = useState<Locale>("en")

  useEffect(() => {
    const analyses = JSON.parse(localStorage.getItem("queueadvisor-analyses") || "[]")
    setSavedAnalyses(analyses)
  }, [])

  const exportComparison = async () => {
    try {
      const comparisonElement = document.getElementById("comparison-content")
      if (!comparisonElement) {
        toast({
          title: locale === "pt" ? "Erro ao exportar" : "Export error",
          description: locale === "pt" ? "Elemento não encontrado" : "Element not found",
          variant: "destructive"
        })
        return
      }

      toast({
        title: locale === "pt" ? "Gerando imagem..." : "Generating image...",
        description: locale === "pt" ? "Por favor, aguarde" : "Please wait"
      })

      await new Promise(resolve => setTimeout(resolve, 500))

      const canvas = await html2canvas(comparisonElement, {
        backgroundColor: "#0a0a0a",
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: comparisonElement.scrollWidth,
        windowHeight: comparisonElement.scrollHeight,
      })

      canvas.toBlob((blob) => {
        if (!blob) {
          toast({
            title: locale === "pt" ? "Erro ao exportar" : "Export error",
            description: locale === "pt" ? "Falha ao gerar imagem" : "Failed to generate image",
            variant: "destructive"
          })
          return
        }
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `queueadvisor-comparison-${Date.now()}.png`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)

        toast({
          title: locale === "pt" ? "✓ Exportação concluída!" : "✓ Export complete!",
          description: locale === "pt" ? "Imagem salva com sucesso" : "Image saved successfully"
        })
      }, "image/png")
    } catch (error) {
      console.error("Export error:", error)
      toast({
        title: locale === "pt" ? "Erro ao exportar" : "Export error",
        description: locale === "pt" ? "Ocorreu um erro ao gerar a imagem" : "An error occurred while generating the image",
        variant: "destructive"
      })
    }
  }

  const shareComparison = () => {
    const text = `Comparando ${selectedAnalyses.length} análises no QueueAdvisor`
    const url = window.location.href

    if (navigator.share) {
      navigator.share({
        title: "QueueAdvisor - Comparação",
        text: text,
        url: url
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(url)
      toast({
        title: "Link copiado!",
        description: "Cole para compartilhar"
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
                <span className="hidden sm:inline">{locale === "pt" ? "Voltar ao Início" : "Back to Home"}</span>
                <span className="sm:hidden">{locale === "pt" ? "Voltar" : "Back"}</span>
              </Button>
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <GitCompare className="h-6 w-6 sm:h-8 sm:w-8 text-brand-primary" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                {locale === "pt" ? "Comparar Análises" : "Compare Analyses"}
              </h1>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              {locale === "pt"
                ? "Selecione até 3 análises para comparar lado a lado"
                : "Select up to 3 analyses to compare side by side"}
            </p>
          </motion.div>

        {savedAnalyses.length === 0 ? (
          <Card className="border-border bg-card/80 backdrop-blur">
            <CardContent className="pt-8 pb-8 sm:pt-12 sm:pb-12 text-center px-4">
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                {locale === "pt"
                  ? "Nenhuma análise salva ainda. Execute uma comparação e salve para ver aqui!"
                  : "No saved analyses yet. Run a comparison and save it to see it here!"}
              </p>
              <Link href="/">
                <Button className="mt-4 gap-2 bg-linear-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white text-sm sm:text-base">
                  {locale === "pt" ? "Iniciar Nova Análise" : "Start New Analysis"}
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
                        <span className="text-muted-foreground">Region:</span>
                        <span className="font-medium">{analysis.pricing.region.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SQS Cost:</span>
                        <span className="font-medium">{analysis.pricing.sqs["10M"]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kafka Cost:</span>
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
                      {showCharts
                        ? (locale === "pt" ? "Ocultar Gráficos" : "Hide Charts")
                        : (locale === "pt" ? "Mostrar Gráficos" : "Show Charts")}
                    </span>
                    <span className="sm:hidden">
                      {showCharts ? (locale === "pt" ? "Ocultar" : "Hide") : (locale === "pt" ? "Mostrar" : "Show")}
                    </span>
                  </Button>
                  <div className="flex gap-2 sm:gap-3">
                    <Button
                      onClick={exportComparison}
                      className="gap-2 flex-1 sm:flex-none bg-linear-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">{locale === "pt" ? "Exportar" : "Export"}</span>
                    </Button>
                    <Button
                      onClick={shareComparison}
                      variant="outline"
                      className="gap-2 flex-1 sm:flex-none"
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="hidden sm:inline">{locale === "pt" ? "Compartilhar" : "Share"}</span>
                    </Button>
                  </div>
                </div>

                {showCharts && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <Card className="border-border bg-card/80 backdrop-blur shadow-xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg sm:text-xl">
                          {locale === "pt" ? "Comparação de Métricas (Radar)" : "Metrics Comparison (Radar)"}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {locale === "pt" ? "Comparação visual entre todas as métricas" : "Visual comparison across all metrics"}
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
                          {locale === "pt" ? "Comparação de Custos (Barras)" : "Cost Comparison (Bar)"}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {locale === "pt" ? "Custos mensais com 10M mensagens/mês" : "Monthly costs at 10M messages/month"}
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
                                value: "Cost ($)",
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
                      {locale === "pt" ? "Comparação Lado a Lado" : "Side-by-Side Comparison"}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {locale === "pt"
                        ? `Comparando ${selectedAnalyses.length} análises`
                        : `Comparing ${selectedAnalyses.length} analyses`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-2 sm:px-6">
                    <div className="overflow-x-auto -mx-2 sm:mx-0">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-3 font-semibold">Metric</th>
                            {selectedAnalysesData.map((analysis) => (
                              <th key={analysis.id} className="text-left p-3 font-semibold">
                                {analysis.recommendation}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="p-3 text-muted-foreground">Date</td>
                            {selectedAnalysesData.map((analysis) => (
                              <td key={analysis.id} className="p-3">
                                {new Date(analysis.savedAt).toLocaleDateString()}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="p-3 text-muted-foreground">Region</td>
                            {selectedAnalysesData.map((analysis) => (
                              <td key={analysis.id} className="p-3">
                                {analysis.pricing.region.name}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="p-3 text-muted-foreground">SQS Cost (10M msgs)</td>
                            {selectedAnalysesData.map((analysis) => (
                              <td key={analysis.id} className="p-3 font-medium">
                                {analysis.pricing.sqs["10M"]}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="p-3 text-muted-foreground">Kafka Cost (10M msgs)</td>
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
