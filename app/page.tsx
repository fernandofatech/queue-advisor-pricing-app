"use client"

import { useState } from "react"
import { ComparisonForm } from "@/components/comparison-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import type { Locale } from "@/lib/i18n"

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en")

  return (
    <main className="min-h-screen bg-background">
      <Header locale={locale} onLocaleChange={setLocale} />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <HeroSection locale={locale} />
        <ComparisonForm locale={locale} />
      </div>
      <Footer locale={locale} />
    </main>
  )
}
