"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, ArrowLeft, GitCompare } from "lucide-react"
import Link from "next/link"
import type { ComparisonResult } from "@/types/comparison"

interface SavedAnalysis extends ComparisonResult {
  savedAt: string
  id: string
}

export default function ComparePage() {
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([])
  const [selectedAnalyses, setSelectedAnalyses] = useState<string[]>([])

  useEffect(() => {
    const analyses = JSON.parse(localStorage.getItem("queueadvisor-analyses") || "[]")
    setSavedAnalyses(analyses)
  }, [])

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
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <GitCompare className="h-8 w-8 text-brand-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
              Compare Analyses
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Select up to 3 analyses to compare side by side
          </p>
        </motion.div>

        {savedAnalyses.length === 0 ? (
          <Card className="border-border bg-card/80 backdrop-blur">
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-muted-foreground text-lg">
                No saved analyses yet. Run a comparison and save it to see it here!
              </p>
              <Link href="/">
                <Button className="mt-4 gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white">
                  Start New Analysis
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedAnalyses.map((analysis) => (
                <Card
                  key={analysis.id}
                  className={`border-2 cursor-pointer transition-all hover:shadow-lg ${
                    selectedAnalyses.includes(analysis.id)
                      ? "border-brand-primary bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10"
                      : "border-border bg-card/80"
                  }`}
                  onClick={() => handleToggleSelect(analysis.id)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {analysis.recommendation}
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {new Date(analysis.savedAt).toLocaleDateString()} {new Date(analysis.savedAt).toLocaleTimeString()}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(analysis.id)
                        }}
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
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

            {selectedAnalyses.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="border-border bg-card/80 backdrop-blur shadow-xl">
                  <CardHeader>
                    <CardTitle>Side-by-Side Comparison</CardTitle>
                    <CardDescription>
                      Comparing {selectedAnalyses.length} analyses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
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
  )
}
