"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ExternalLink, Github, AlertCircle, Heart, Users, Code2 } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"

interface CreditsContentProps {
  locale: Locale
}

export function CreditsContent({ locale }: CreditsContentProps) {
  const t = useTranslation(locale)

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {t.credits.title}
          </h1>
          <p className="text-muted-foreground text-lg">{t.credits.subtitle}</p>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 border-yellow-500/30 bg-yellow-500/5">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">{t.credits.disclaimer}</h2>
                <p className="text-muted-foreground leading-relaxed">{t.credits.disclaimerText}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* AWS Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">☁️</div>
              <h2 className="text-2xl font-bold">{t.credits.awsCredits}</h2>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">{t.credits.awsCreditsDesc}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://aws.amazon.com/sqs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-brand-primary transition-all hover:bg-brand-primary/5"
              >
                <span className="text-sm font-medium">Amazon SQS</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://aws.amazon.com/msk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-brand-primary transition-all hover:bg-brand-primary/5"
              >
                <span className="text-sm font-medium">Amazon MSK</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://aws.amazon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-brand-primary transition-all hover:bg-brand-primary/5"
              >
                <span className="text-sm font-medium">AWS</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </Card>
        </motion.div>

        {/* MCP Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">🤖</div>
              <h2 className="text-2xl font-bold">{t.credits.mcpCredits}</h2>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">{t.credits.mcpCreditsDesc}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/awslabs/mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-brand-primary transition-all hover:bg-brand-primary/5"
              >
                <Github className="h-4 w-4" />
                <span className="text-sm font-medium">AWS MCP GitHub</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://awslabs.github.io/mcp/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-brand-primary transition-all hover:bg-brand-primary/5"
              >
                <span className="text-sm font-medium">MCP Documentation</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </Card>
        </motion.div>

        {/* Community Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-brand-secondary" />
              <h2 className="text-2xl font-bold">{t.credits.communityCredits}</h2>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">{t.credits.communityCreditsDesc}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { name: "Next.js", url: "https://nextjs.org/" },
                { name: "React", url: "https://react.dev/" },
                { name: "TypeScript", url: "https://www.typescriptlang.org/" },
                { name: "Tailwind CSS", url: "https://tailwindcss.com/" },
                { name: "Radix UI", url: "https://www.radix-ui.com/" },
                { name: "Recharts", url: "https://recharts.org/" },
                { name: "Framer Motion", url: "https://www.framer.com/motion/" },
                { name: "Lucide Icons", url: "https://lucide.dev/" },
              ].map((lib) => (
                <a
                  key={lib.name}
                  href={lib.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-brand-secondary transition-all hover:bg-brand-secondary/5 text-sm font-medium"
                >
                  <Code2 className="h-4 w-4" />
                  {lib.name}
                </a>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Contribution Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border-brand-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-6 w-6 text-red-500" />
              <h2 className="text-2xl font-bold">{t.credits.contribute}</h2>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">{t.credits.contributeText}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/fernandofatech/queue-advisor-pricing-app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary text-white hover:bg-brand-primary/90 transition-all font-medium"
              >
                <Github className="h-4 w-4" />
                {t.credits.githubRepo}
              </a>
              <a
                href="https://github.com/fernandofatech/queue-advisor-pricing-app/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-brand-primary hover:bg-brand-primary/10 transition-all font-medium"
              >
                {t.credits.reportIssue}
              </a>
              <a
                href="https://github.com/fernandofatech/queue-advisor-pricing-app/pulls"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-brand-secondary hover:bg-brand-secondary/10 transition-all font-medium"
              >
                {t.credits.submitPR}
              </a>
            </div>
          </Card>
        </motion.div>

        {/* About Creator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl">👨‍💻</div>
              <h2 className="text-2xl font-bold">{t.credits.aboutCreator}</h2>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">{t.credits.creatorText}</p>
            <a
              href="https://fernando.moretes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-brand-primary transition-all hover:bg-brand-primary/5 font-medium"
            >
              <span>Fernando Francisco Azevedo</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
