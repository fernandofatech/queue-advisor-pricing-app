"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink, Book, Database, Zap, Shield, Code2, Bot, Sparkles } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"

interface DocsContentProps {
  locale: Locale
}

export function DocsContent({ locale }: DocsContentProps) {
  const t = useTranslation(locale)

  const awsResources = [
    {
      title: "Amazon SQS",
      icon: Database,
      resources: [
        {
          name: t.docs.sqsOverview,
          url: "https://docs.aws.amazon.com/sqs/",
          description: t.docs.sqsOverviewDesc,
        },
        {
          name: t.docs.sqsPricing,
          url: "https://aws.amazon.com/sqs/pricing/",
          description: t.docs.sqsPricingDesc,
        },
        {
          name: t.docs.sqsBestPractices,
          url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-best-practices.html",
          description: t.docs.sqsBestPracticesDesc,
        },
        {
          name: t.docs.sqsFifo,
          url: "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html",
          description: t.docs.sqsFifoDesc,
        },
      ],
    },
    {
      title: "Amazon MSK (Managed Streaming for Apache Kafka)",
      icon: Zap,
      resources: [
        {
          name: t.docs.mskOverview,
          url: "https://docs.aws.amazon.com/msk/",
          description: t.docs.mskOverviewDesc,
        },
        {
          name: t.docs.mskPricing,
          url: "https://aws.amazon.com/msk/pricing/",
          description: t.docs.mskPricingDesc,
        },
        {
          name: t.docs.mskBestPractices,
          url: "https://docs.aws.amazon.com/msk/latest/developerguide/bestpractices.html",
          description: t.docs.mskBestPracticesDesc,
        },
        {
          name: t.docs.kafkaDoc,
          url: "https://kafka.apache.org/documentation/",
          description: t.docs.kafkaDocDesc,
        },
      ],
    },
  ]

  const architecturePatterns = [
    {
      title: t.docs.microservicesPattern,
      description: t.docs.microservicesPatternDesc,
      bestFor: "SQS",
      icon: Code2,
    },
    {
      title: t.docs.eventSourcingPattern,
      description: t.docs.eventSourcingPatternDesc,
      bestFor: "Kafka/MSK",
      icon: Database,
    },
    {
      title: t.docs.cqrsPattern,
      description: t.docs.cqrsPatternDesc,
      bestFor: "Kafka/MSK",
      icon: Zap,
    },
    {
      title: t.docs.taskQueuePattern,
      description: t.docs.taskQueuePatternDesc,
      bestFor: "SQS",
      icon: Shield,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-light to-accent bg-clip-text text-transparent">
            {t.docs.title}
          </h1>
          <p className="text-muted-foreground text-lg">{t.docs.subtitle}</p>
        </div>

        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="resources">
              <Book className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t.docs.awsResources}</span>
              <span className="sm:hidden">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="patterns">
              <Code2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t.docs.architecturePatterns}</span>
              <span className="sm:hidden">Patterns</span>
            </TabsTrigger>
            <TabsTrigger value="mcp">
              <Bot className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">MCP</span>
              <span className="sm:hidden">MCP</span>
            </TabsTrigger>
            <TabsTrigger value="comparison">
              <Database className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t.docs.detailedComparison}</span>
              <span className="sm:hidden">Compare</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-8">
            {awsResources.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <section.icon className="h-6 w-6 text-teal-light" />
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {section.resources.map((resource, ridx) => (
                      <a
                        key={ridx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg border border-border hover:border-teal-light transition-all hover:bg-accent/5 group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1 group-hover:text-teal-light transition-colors flex items-center gap-2">
                              {resource.name}
                              <ExternalLink className="h-4 w-4" />
                            </h3>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            {architecturePatterns.map((pattern, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <pattern.icon className="h-6 w-6 text-teal-light" />
                      <h3 className="text-xl font-bold">{pattern.title}</h3>
                    </div>
                    <Badge variant={pattern.bestFor === "SQS" ? "secondary" : "default"}>
                      {t.docs.bestFor}: {pattern.bestFor}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{pattern.description}</p>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="mcp" className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="p-6 border-brand-primary/30 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
                <div className="flex items-center gap-3 mb-4">
                  <Bot className="h-8 w-8 text-brand-primary" />
                  <div>
                    <h2 className="text-2xl font-bold">{t.docs.mcpSection}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{t.docs.mcpIntro}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-6 w-6 text-brand-secondary" />
                  <h3 className="text-xl font-bold">
                    {locale === "pt" ? "O que é o AWS MCP?" : "What is AWS MCP?"}
                  </h3>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {locale === "pt"
                      ? "O Model Context Protocol (MCP) da AWS é um framework inovador que permite integrar ferramentas de IA e automação com seus recursos AWS. Ele fornece uma interface padronizada para que assistentes de IA interajam com serviços AWS de forma segura e eficiente."
                      : "AWS Model Context Protocol (MCP) is an innovative framework that enables AI tools and automation to integrate with your AWS resources. It provides a standardized interface for AI assistants to interact with AWS services securely and efficiently."}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-lg bg-brand-primary/5 border border-brand-primary/20">
                      <h4 className="font-semibold text-foreground mb-2">
                        ✨ {locale === "pt" ? "Principais Benefícios" : "Key Benefits"}
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>
                          • {locale === "pt" ? "Automação inteligente de tarefas AWS" : "Intelligent AWS task automation"}
                        </li>
                        <li>
                          •{" "}
                          {locale === "pt"
                            ? "Decisões arquiteturais assistidas por IA"
                            : "AI-assisted architectural decisions"}
                        </li>
                        <li>
                          •{" "}
                          {locale === "pt"
                            ? "Análise de custos em tempo real"
                            : "Real-time cost analysis"}
                        </li>
                        <li>
                          •{" "}
                          {locale === "pt"
                            ? "Otimização de recursos cloud"
                            : "Cloud resource optimization"}
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-lg bg-brand-secondary/5 border border-brand-secondary/20">
                      <h4 className="font-semibold text-foreground mb-2">
                        🔧 {locale === "pt" ? "Casos de Uso" : "Use Cases"}
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>
                          •{" "}
                          {locale === "pt"
                            ? "Comparação automática de serviços"
                            : "Automatic service comparison"}
                        </li>
                        <li>
                          •{" "}
                          {locale === "pt"
                            ? "Análise de arquitetura serverless"
                            : "Serverless architecture analysis"}
                        </li>
                        <li>
                          •{" "}
                          {locale === "pt"
                            ? "Recomendações de otimização"
                            : "Optimization recommendations"}
                        </li>
                        <li>
                          •{" "}
                          {locale === "pt"
                            ? "Documentação gerada por IA"
                            : "AI-generated documentation"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Code2 className="h-6 w-6 text-brand-primary" />
                  <h3 className="text-xl font-bold">
                    {locale === "pt" ? "Recursos e Links Oficiais" : "Official Resources & Links"}
                  </h3>
                </div>
                <div className="space-y-4">
                  <a
                    href="https://github.com/awslabs/mcp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg border border-border hover:border-brand-primary transition-all hover:bg-brand-primary/5 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 group-hover:text-brand-primary transition-colors flex items-center gap-2">
                          AWS MCP GitHub Repository
                          <ExternalLink className="h-4 w-4" />
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {locale === "pt"
                            ? "Código-fonte oficial, exemplos e documentação técnica do AWS MCP"
                            : "Official source code, examples and technical documentation for AWS MCP"}
                        </p>
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://awslabs.github.io/mcp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg border border-border hover:border-brand-primary transition-all hover:bg-brand-primary/5 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 group-hover:text-brand-primary transition-colors flex items-center gap-2">
                          AWS MCP Documentation
                          <ExternalLink className="h-4 w-4" />
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {locale === "pt"
                            ? "Documentação completa, guias de início rápido e melhores práticas"
                            : "Complete documentation, quickstart guides and best practices"}
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-br from-brand-secondary/10 to-brand-primary/10 border-brand-primary/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-primary/10">
                    <Bot className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      💡{" "}
                      {locale === "pt"
                        ? "Dica: Integre MCP com QueueAdvisor"
                        : "Tip: Integrate MCP with QueueAdvisor"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {locale === "pt"
                        ? "Use o AWS MCP para automatizar análises de mensageria em seus projetos. Você pode integrar este QueueAdvisor com o MCP para obter recomendações automatizadas sobre SQS vs Kafka diretamente em seu fluxo de trabalho de desenvolvimento."
                        : "Use AWS MCP to automate messaging analysis in your projects. You can integrate this QueueAdvisor with MCP to get automated SQS vs Kafka recommendations directly in your development workflow."}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="comparison">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">{t.docs.sqsVsKafka}</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold">{t.docs.feature}</th>
                      <th className="text-left p-4 font-semibold">Amazon SQS</th>
                      <th className="text-left p-4 font-semibold">Apache Kafka (MSK)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="p-4 font-medium">{t.docs.messageOrdering}</td>
                      <td className="p-4">{t.docs.sqsOrdering}</td>
                      <td className="p-4">{t.docs.kafkaOrdering}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">{t.docs.messageRetention}</td>
                      <td className="p-4">{t.docs.sqsRetention}</td>
                      <td className="p-4">{t.docs.kafkaRetention}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">{t.docs.throughput}</td>
                      <td className="p-4">{t.docs.sqsThroughput}</td>
                      <td className="p-4">{t.docs.kafkaThroughput}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">{t.docs.replayCapability}</td>
                      <td className="p-4">{t.docs.sqsReplay}</td>
                      <td className="p-4">{t.docs.kafkaReplay}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">{t.docs.infrastructure}</td>
                      <td className="p-4">{t.docs.sqsInfrastructure}</td>
                      <td className="p-4">{t.docs.kafkaInfrastructure}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">{t.docs.pricing}</td>
                      <td className="p-4">{t.docs.sqsPricingModel}</td>
                      <td className="p-4">{t.docs.kafkaPricingModel}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">{t.docs.useCase}</td>
                      <td className="p-4">{t.docs.sqsUseCase}</td>
                      <td className="p-4">{t.docs.kafkaUseCase}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
