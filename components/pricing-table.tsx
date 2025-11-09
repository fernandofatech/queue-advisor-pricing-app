"use client"

import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Locale } from "@/lib/i18n"
import { useTranslation } from "@/lib/i18n"

interface PricingTableProps {
  pricing: {
    sqs: { "1M": string; "10M": string; "100M": string }
    kafka: { "1M": string; "10M": string; "100M": string }
  }
  locale: Locale
}

export function PricingTable({ pricing, locale }: PricingTableProps) {
  const t = useTranslation(locale)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="overflow-x-auto"
    >
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="text-teal-light font-semibold">{t.service}</TableHead>
            <TableHead className="text-teal-light font-semibold">1M messages</TableHead>
            <TableHead className="text-teal-light font-semibold">10M messages</TableHead>
            <TableHead className="text-teal-light font-semibold">100M messages</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-border hover:bg-muted/30 transition-colors">
            <TableCell className="font-medium">Amazon SQS</TableCell>
            <TableCell className="font-mono">{pricing.sqs["1M"]}</TableCell>
            <TableCell className="font-mono">{pricing.sqs["10M"]}</TableCell>
            <TableCell className="font-mono">{pricing.sqs["100M"]}</TableCell>
          </TableRow>
          <TableRow className="border-border hover:bg-muted/30 transition-colors">
            <TableCell className="font-medium">Apache Kafka (MSK)</TableCell>
            <TableCell className="font-mono">{pricing.kafka["1M"]}</TableCell>
            <TableCell className="font-mono">{pricing.kafka["10M"]}</TableCell>
            <TableCell className="font-mono">{pricing.kafka["100M"]}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p className="text-xs text-muted-foreground mt-4 italic">
        {locale === "en"
          ? "* All values fetched dynamically from AWS public pricing. Prices shown are estimates based on us-east-1 region."
          : "* Todos os valores são obtidos dinamicamente dos preços públicos da AWS. Os preços mostrados são estimativas baseadas na região us-east-1."}
      </p>
    </motion.div>
  )
}
