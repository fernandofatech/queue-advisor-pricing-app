"use client"

import { ComparisonForm } from "@/components/comparison-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { useLocale } from "@/hooks/use-locale"

export default function Home() {
  const { locale, setLocale, isLoaded } = useLocale()

  if (!isLoaded) {
    return null // Avoid flash of wrong language
  }

  return (
    <main className="min-h-screen bg-background">
      <Header locale={locale} onLocaleChange={setLocale} />
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <HeroSection locale={locale} />
        <ComparisonForm locale={locale} />
      </div>
      <Footer locale={locale} />
    </main>
  )
}
