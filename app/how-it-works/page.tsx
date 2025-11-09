"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HowItWorksContent } from "@/components/how-it-works-content"
import type { Locale } from "@/lib/i18n"

export default function HowItWorksPage() {
  const [locale, setLocale] = useState<Locale>("en")

  return (
    <main className="min-h-screen bg-background">
      <Header locale={locale} onLocaleChange={setLocale} />
      <HowItWorksContent locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}
