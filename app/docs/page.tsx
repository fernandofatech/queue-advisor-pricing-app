"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DocsContent } from "@/components/docs-content"
import type { Locale } from "@/lib/i18n"

export default function DocsPage() {
  const [locale, setLocale] = useState<Locale>("en")

  return (
    <main className="min-h-screen bg-background">
      <Header locale={locale} onLocaleChange={setLocale} />
      <DocsContent locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}
