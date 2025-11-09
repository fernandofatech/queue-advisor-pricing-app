"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FaqContent } from "@/components/faq-content"
import type { Locale } from "@/lib/i18n"

export default function FaqPage() {
  const [locale, setLocale] = useState<Locale>("en")

  return (
    <main className="min-h-screen bg-background">
      <Header locale={locale} onLocaleChange={setLocale} />
      <FaqContent locale={locale} />
      <Footer locale={locale} />
    </main>
  )
}
